use std::time::{Duration, SystemTime, UNIX_EPOCH};

use serde_json::Value;
use surrealdb::{RecordId, Surreal};
use surrealdb::engine::local::{Db, Mem};
use tokio::time::sleep;

use crate::configuration::remote_vars::RemoteVars;
use super::data_providers::data_provider::DataProvider;
use super::data_providers::developer_data_provider::DeveloperDataProvider;
use super::data_providers::product_data_provider::ProductDataProvider;
use super::data_providers::tag_data_provider::TagDataProvider;
use super::data_providers::tag_group_data_provider::TagGroupDataProvider;
use super::data_providers::user_data_provider::UserDataProvider;
use super::error::CacheError;
use super::models::item::{Item, ItemType, Type};

pub(crate) struct Database {
    db: Surreal<Db>,
    user: UserDataProvider,
    developer: DeveloperDataProvider,
    tag: TagDataProvider,
    tag_group: TagGroupDataProvider,
    product: ProductDataProvider,
}

const DB_NAME: &str = "cache";
const CACHE_NAME: &str = "cache";
const CACHE_FILE_NAME: &str = ".cache";
const EXPIRATION_MINUTES: u64 = 2;
const REFRESH_MINUTES: u64 = 2;

impl Database {
    pub(crate) async fn try_initialize(remote_vars: RemoteVars) -> Result<Self, CacheError> {
        let db: Surreal<Db> = Self::try_connect().await?;
        let user = UserDataProvider::new();
        let developer = DeveloperDataProvider::new();
        let tag = TagDataProvider::new();
        let tag_group = TagGroupDataProvider::new();
        let product = ProductDataProvider::new(remote_vars);

        _ = db.import(CACHE_FILE_NAME).await;
        tokio::spawn(Self::persist_cache_worker(db.clone()));
        
        Ok(Self {
            db,
            user,
            developer,
            product,
            tag,
            tag_group,
        })
    }

    async fn try_connect() -> Result<Surreal<Db>, CacheError> {
        let db = Surreal::new::<Mem>(()).await?;
        db.use_ns(CACHE_NAME).use_db(DB_NAME).await?;
        Ok(db)
    }

    pub(crate) async fn get_item(&self, entity_type: Type, id: &str) -> Result<Option<Item>, CacheError> {
        if let Some(cache_item) = self.fetch_item_from_db(&entity_type, id).await? {
            if cache_item.expire > current_timestamp() {
                Ok(Some(cache_item))
            } else {
                let refreshed_item = self.refresh_and_update_cache(entity_type, id).await?;
                Ok(refreshed_item)
            }
        } else {
            Ok(self.fetch_and_cache_new_item(entity_type, id).await?)
        }
    }

    pub(crate) async fn get_items(&self, entity_type: Type, ids: &[&str]) -> Result<Vec<Item>, CacheError> {
        let mut query_result = self.db.query("SELECT * FROM $ids").bind(("ids", ids.iter().map(|x| RecordId::from_table_key(entity_type.as_str(), *x)).collect::<Vec<_>>())).await?;
        let found_items: Vec<Item> = query_result.take(0)?;
        
        let mut query_result = self.db.query("SELECT * FROM $ids").bind(("ids", ids.iter().map(|x| RecordId::from_table_key(entity_type.as_str(), *x)).collect::<Vec<_>>())).await?;
        let found_ids: Vec<RecordId> = query_result.take("id")?;
        let found_ids: Vec<String> = found_ids.iter().map(|x| x.key().to_string().trim_matches(|c| c == '⟨' || c == '⟩').to_string()).collect();
    
        let mut items_to_return = Vec::new();
        for i in 0..found_items.len() {
            if found_items[i].expire > current_timestamp() {
                items_to_return.push(found_items[i].clone());
            } else if let Some(refreshed_item) = self.refresh_and_update_cache(entity_type, &found_ids[i]).await? {
                items_to_return.push(refreshed_item);
            }
        }

        let ids_to_fetch: Vec<&str> = ids.iter().filter(|id| !found_ids.contains(&id.to_string())).cloned().collect();
        for id in ids_to_fetch {
            if let Ok(Some(refreshed_item)) = self.fetch_and_cache_new_item(entity_type, id).await {
                items_to_return.push(refreshed_item);
            }
        }
    
        Ok(items_to_return)
    }
    

    async fn fetch_item_from_db(&self, entity_type: &Type, id: &str) -> Result<Option<Item>, surrealdb::Error> {
        self.db.select((entity_type.as_str(), id)).await
    }

    async fn refresh_and_update_cache(&self, entity_type: Type, id: &str) -> Result<Option<Item>, CacheError> {
        let data = self.refresh(&entity_type, id).await?;
        let expire = expiration_timestamp(EXPIRATION_MINUTES);
        Ok(self.db.update((entity_type.as_str(), id)).content(Item { data, expire }).await?)
    }

    async fn fetch_and_cache_new_item(&self, entity_type: Type, id: &str) -> Result<Option<Item>, CacheError> {
        let model = self.refresh(&entity_type, id).await?;
        let new_item = Item {
            data: model,
            expire: expiration_timestamp(EXPIRATION_MINUTES),
        };

        Ok(self.db.create((entity_type.as_str(), id)).content(new_item).await?)
    }

    async fn refresh(&self, item_type: &Type, id: &str) -> Result<Value, CacheError> {
        match item_type {
            Type::Developer => self.developer.get_data_as_json(id).await,
            Type::User => self.user.get_data_as_json(id).await,
            Type::Product => self.product.get_data_as_json(id).await,
            Type::Tag => self.tag.get_data_as_json(id).await,
            Type::TagGroup => self.tag_group.get_data_as_json(id).await,
        }
    }

    async fn persist_cache_worker(db: Surreal<Db>) {
        loop {
            sleep(Duration::from_secs(60 * REFRESH_MINUTES)).await;
            if let Err(e) = db.export(CACHE_FILE_NAME).await {
                eprintln!("Failed to export cache: {}", e);
            }
        }
    }
}

fn current_timestamp() -> u64 {
    SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()
}

fn expiration_timestamp(minutes: u64) -> u64 {
    current_timestamp() + minutes * 60
}
