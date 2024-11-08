use serde::Serialize;
use serde_json::Value;

use crate::cache::error::CacheError;

pub(crate) trait DataProvider<T: Serialize> {
    async fn fetch_data(&self, id: &str) -> Result<T, CacheError>;
    async fn get_data_as_json(&self, id: &str) -> Result<Value, CacheError> {
        Ok(serde_json::to_value(self.fetch_data(id).await?)?)
    }
}