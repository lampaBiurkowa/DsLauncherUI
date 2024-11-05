use serde_json::Value;
use tauri::command;

use crate::cache::{db::Database, error::CacheError, models::item::Type};

#[command]
pub(crate) async fn get_item(
    cache: tauri::State<'_, Database>,
    item_type: Type, 
    id: &str
) -> Result<Value, CacheError> {
    match cache.get_item(item_type, id).await? {
        Some(x) => Ok(x.data),
        None => Err(CacheError::InternalCacheError("Failed to get item".to_owned()))
    }
}