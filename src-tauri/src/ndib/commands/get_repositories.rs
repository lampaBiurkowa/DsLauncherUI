use tauri::command;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::consts::{METADATA_FILE, NDIB_FOLDER};
use std::fs;
use std::path::Path;

#[command]
pub(crate) fn get_repositories(paths: Vec<String>) -> Result<Vec<String>, NdibError> {
    let mut matching_directories = Vec::new();

    for path in paths {
        let base_path = Path::new(&path);
        if base_path.exists() && base_path.is_dir() {
            for entry in fs::read_dir(base_path)? {
                let entry = entry?;
                let entry_path = entry.path();

                if entry_path.is_dir() {
                    let metadata_path = entry_path.join(NDIB_FOLDER).join(METADATA_FILE);
                    if metadata_path.exists() && metadata_path.is_file() {
                        matching_directories.push(entry_path.to_string_lossy().to_string());
                    }
                }
            }
        }
    }
    
    Ok(matching_directories)
}
