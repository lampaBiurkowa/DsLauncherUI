use serde_json::Value;
use tauri::command;

use crate::cache::{db::Database, error::CacheError, models::item::Type};

#[command]
pub(crate) async fn get_items(
    cache: tauri::State<'_, Database>,
    item_type: Type, 
    ids: Vec<String>
) -> Result<Vec<Value>, CacheError> {
    Ok(cache.get_items(item_type, &ids.iter().map(|s| s.as_str()).collect::<Vec<&str>>()).await?.iter().map(|x| x.data.clone()).collect())
}