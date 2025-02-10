use tauri::command;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::consts::METADATA_FILE;
use crate::ndib::helpers::utils::read_serialized_ndib_object;
use crate::ndib::models::ndib_data::NdibData;

#[command]
pub(crate) fn get_repository_metadata(path: &str) -> Result<NdibData, NdibError> {   
    Ok(read_serialized_ndib_object(METADATA_FILE, path)?)
}
