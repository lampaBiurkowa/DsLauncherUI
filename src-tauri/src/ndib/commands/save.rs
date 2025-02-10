use std::collections::{HashMap, HashSet};
use tauri::command;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::consts::{MANIFEST_CORE, MANIFEST_LINUX, MANIFEST_MAC, MANIFEST_WIN, METADATA_FILE, NDIB_FOLDER};
use std::fs::File;
use std::io::{Write, BufWriter};
use std::path::Path;
use crate::ndib::helpers::utils::save_serialized_ndib_object;
use crate::ndib::models::ndib_data::NdibData;

#[command]
pub(crate) async fn save(metadata: NdibData, paths: HashMap<String, Vec<String>>, path: &str) -> Result<(), NdibError> {
    save_serialized_ndib_object(&metadata, METADATA_FILE, &Path::new(path).join(NDIB_FOLDER))?;
    let manifest_files = [
        ("core", MANIFEST_CORE),
        ("windows", MANIFEST_WIN),
        ("linux", MANIFEST_LINUX),
        ("mac", MANIFEST_MAC),
    ];

    for (key, manifest_file) in &manifest_files {
        let manifest_path = Path::new(path).join(NDIB_FOLDER).join(manifest_file);
        if let Some(file_list) = paths.get(*key) {
            let unique_files: HashSet<_> = file_list.iter().collect();
            let file = File::create(&manifest_path)?;
            let mut writer = BufWriter::new(file);

            for file_path in unique_files {
                writeln!(writer, "{}", file_path)?;
            }
        }
    }

    Ok(())
}