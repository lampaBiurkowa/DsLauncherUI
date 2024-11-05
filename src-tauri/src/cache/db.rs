use std::time::{SystemTime, UNIX_EPOCH};

use serde_json::Value;
use surrealdb::Surreal;
use surrealdb::engine::local::{Db, Mem};

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

impl Database {
    pub(crate) async fn try_initialize(remote_vars: RemoteVars) -> Result<Self, CacheError> {
        let db = Self::try_connect().await?;
        let currency = CurrencyDataProvider::new();
        let user = UserDataProvider::new();
        let developer = DeveloperDataProvider::new();
        let product = ProductDataProvider::new(remote_vars);

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

    pub(crate) async fn get_item(&self, entity: ItemType, id: &str, expiration_minutes: u64) -> Result<Option<Item>, CacheError> {
        let item: Option<ItemType> = self.db.select((entity.as_str(), id)).await?;
        
        if let Some(mut cache_item) = item {
            if cache_item.item.expire > current_timestamp() {
                return Ok(Some(cache_item.item));
            } else {
                cache_item.item.data = self.refresh(entity.item_type, id).await?;
                cache_item.item.expire = expiration_timestamp(expiration_minutes);
                let result: Option<Item> = self.db.update((entity.as_str(), id)).content(cache_item.item).await?;
                return Ok(result);
            }
        } else {
            let model = self.refresh(entity.item_type, id).await?;
            let cache_item = ItemType { item_type: entity.item_type, item: Item { data: model.clone(), expire: expiration_timestamp(expiration_minutes) } };
            let result: Option<Item> = self.db.create((entity.as_str(), id)).content(cache_item.item).await?;
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