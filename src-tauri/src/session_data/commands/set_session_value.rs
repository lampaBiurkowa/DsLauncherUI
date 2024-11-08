use tauri::command;

use crate::session_data::{error::SessionDataError, store::Store};

#[command]
pub(crate) fn set_session_value(
    store: tauri::State<Store>,
    key: &str,
    value: &str
) -> Result<(), SessionDataError> {
    store.set(key, value)?;
    Ok(())
}