use std::fs;
use std::path::Path;
use tauri::command;
use crate::clients::ndib_client::DsNdibClient;
use crate::ndib::error::NdibError;
use crate::session_data::keys::TOKEN_KEY;
use crate::session_data::store::Store;

#[command]
pub(crate) async fn pull(store: tauri::State<'_, Store>, id: &str, path: &str) -> Result<(), NdibError> {
    let ndib_api = DsNdibClient::new();
    fs::create_dir(path)?;
    ndib_api.pull(&store.get(TOKEN_KEY)?, id, Path::new(path)).await?;
    Ok(())
}