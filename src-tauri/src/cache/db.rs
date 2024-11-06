use std::time::{Duration, SystemTime, UNIX_EPOCH};

use serde_json::Value;
use surrealdb::Surreal;
use surrealdb::engine::local::{Db, Mem};
use tokio::time::sleep;

use crate::configuration::remote_var::RemoteVars;

use super::data_providers::currency_data_provider::CurrencyDataProvider;
use super::data_providers::data_provider::DataProvider;
use super::data_providers::developer_data_provider::DeveloperDataProvider;
use super::data_providers::product_data_provider::ProductDataProvider;
use super::data_providers::user_data_provider::UserDataProvider;
use super::error::CacheError;
use super::models::item::{Item, ItemType, Type};

pub(crate) struct Database {
    db: Surreal<Db>,
    currency: CurrencyDataProvider,
    user: UserDataProvider,
    developer: DeveloperDataProvider,
    product: ProductDataProvider,
}

const DB_NAME: &str = "cache";
const CACHE_NAME: &str = "cache";
const CACHE_FILE_NAME: &str = ".cache";
const EXPIRATION_MINUTES: u64 = 2;
const REFRESH_MINUTES: u64 = 2;

impl Database {
    pub(crate) async fn try_initialize(remote_vars: RemoteVars) -> Result<Self, CacheError> {
        let db = Self::try_connect().await?;
        let currency = CurrencyDataProvider::new();
        let user = UserDataProvider::new();
        let developer = DeveloperDataProvider::new();
        let product = ProductDataProvider::new(remote_vars);

        db.import(CACHE_FILE_NAME).await?;
        let db_clone = db.clone();
        tokio::spawn(Self::persist_cache_worker(db_clone));
        Ok(Self {
            db,
            currency,
            user,
            developer,
            product
        })
    }

    async fn try_connect() -> Result<Surreal<Db>, CacheError> {
        let db = Surreal::new::<Mem>(()).await?;
        db.use_ns(CACHE_NAME).use_db(DB_NAME).await?;
        Ok(db)
    }

    pub(crate) async fn get_item(&self, entity_type: Type, id: &str) -> Result<Option<Item>, CacheError> {
        let item: Option<ItemType> = self.db.select((entity_type.as_str(), id)).await?;
        
        if let Some(mut cache_item) = item {
            if cache_item.item.expire > current_timestamp() {
                return Ok(Some(cache_item.item));
            } else {
                cache_item.item.data = self.refresh(entity_type, id).await?;
                cache_item.item.expire = expiration_timestamp(EXPIRATION_MINUTES);
                let result: Option<Item> = self.db.update((entity_type.as_str(), id)).content(cache_item.item).await?;
                return Ok(result);
            }
        } else {
            let model = self.refresh(entity_type, id).await?;
            let cache_item = ItemType { item_type: entity_type, item: Item { data: model.clone(), expire: expiration_timestamp(EXPIRATION_MINUTES) } };
            let result: Option<Item> = self.db.create((entity_type.as_str(), id)).content(cache_item.item).await?;
            Ok(result)
        }
    }

    pub(crate) async fn refresh(&self, item_type: Type, id: &str) -> Result<Value, CacheError> {
        match item_type {
            Type::Developer => Ok(self.developer.get_data_as_json(id).await?),
            Type::User => Ok(self.user.get_data_as_json(id).await?),
            Type::Product => Ok(self.product.get_data_as_json(id).await?),
            Type::Currency => Ok(self.currency.get_data_as_json(id).await?)
        }
    }

    async fn export_to_file(&self) -> Result<(), surrealdb::Error> {
        Ok(self.db.export(CACHE_FILE_NAME).await?)
    }

    async fn persist_cache_worker(db: Surreal<Db>) {
        loop {
            sleep(Duration::from_secs(60 * REFRESH_MINUTES)).await;
            db.export(CACHE_FILE_NAME).await.unwrap();
        }
    }
}

fn current_timestamp() -> u64 {
    SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()
}

fn expiration_timestamp(minutes: u64) -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs()
        + minutes * 60
}