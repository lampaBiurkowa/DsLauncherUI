use tauri::command;

use crate::ndib::error::NdibError;

#[command]
pub(crate) fn pull(_name: &str) -> Result<(), NdibError> {

    Ok(())
}