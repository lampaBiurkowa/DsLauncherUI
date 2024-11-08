use tauri::command;

use crate::session_data::{error::SessionDataError, store::Store};

#[command]
pub(crate) fn get_session_value(
    store: tauri::State<'_, Store>,
    key: &str
) -> Result<String, SessionDataError> {
    store.get(key)
}