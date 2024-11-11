use tauri::command;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::consts::{METADATA_FILE, NDIB_FOLDER};
use crate::ndib::helpers::utils::read_serialized_object;
use crate::ndib::models::ndib_data::NdibData;
use std::path::Path;

#[command]
pub(crate) fn get_repository_metadata(path: &str) -> Result<NdibData, NdibError> {    
    Ok(read_serialized_object(&Path::new(path).join(NDIB_FOLDER).join(METADATA_FILE))?)
}
