use std::path::Path;

use tauri::{async_runtime::Runtime, command};
use tauri::async_runtime::TokioRuntime;

use crate::clients::launcher_client::DsLauncherClient;
use crate::clients::ndib_client::DsNdibClient;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::utils::{create_zip, read_serialized_object};
use crate::ndib::helpers::vec_extensions::VecStringExt;
use crate::ndib::helpers::consts::{METADATA_FILE, METADATA_NAME, NDIB_FOLDER};
use crate::ndib::models::ndib_data::NdibData;
use crate::session_data::keys::TOKEN_KEY;
use crate::session_data::store::Store;

#[command]
pub(crate) fn update_metadata(store: tauri::State<'_, Store>, name: &str) -> Result<(), NdibError> {
    let ndib_data: NdibData = read_serialized_object(&Path::new(NDIB_FOLDER).join(METADATA_FILE))?;
    let mut extra_paths: Vec<String> = Vec::new();
    extra_paths.add_if_non_empty(ndib_data.icon);
    extra_paths.add_if_non_empty(ndib_data.background);
    for img in ndib_data.images {
        extra_paths.add_if_non_empty(img);
    }
    extra_paths.push(Path::new(NDIB_FOLDER).join(METADATA_FILE).to_string_lossy().into_owned());
    create_zip(extra_paths.into_iter().map(Ok), METADATA_NAME.to_string())?;
    
    let rt = Runtime::Tokio(TokioRuntime::new()?);
    rt.block_on(handle_update(store, name))?;

    Ok(())
}

async fn handle_update(store: tauri::State<'_, Store>, name: &str) -> Result<(), NdibError> {
    let launcher_api = DsLauncherClient::new();
    let ndib_api = DsNdibClient::new();
    let product_guid = launcher_api.get_product_guid(name).await?;
    ndib_api.update_metadata(&store.get(TOKEN_KEY)?, &product_guid, Path::new(METADATA_NAME)).await?;
    Ok(())
}