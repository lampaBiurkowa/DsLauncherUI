use tauri::command;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::consts::{MANIFEST_CORE, MANIFEST_LINUX, MANIFEST_MAC, MANIFEST_WIN, NDIB_FOLDER};
use std::fs;
use std::io::{BufReader, BufRead};
use std::path::Path;
use std::collections::HashMap;

#[command]
pub(crate) fn get_repository_files(path: &str) -> Result<HashMap<String, Vec<String>>, NdibError> {
    let manifest_files = [
        ("core", MANIFEST_CORE),
        ("windows", MANIFEST_WIN),
        ("linux", MANIFEST_LINUX),
        ("mac", MANIFEST_MAC),
    ];

    let mut dict: HashMap<String, Vec<String>> = HashMap::new();
    for (key, manifest_file) in &manifest_files {
        let manifest_path = Path::new(path).join(NDIB_FOLDER).join(manifest_file);
        
        match fs::File::open(&manifest_path) {
            Ok(file) => {
                let reader = BufReader::new(file);
                let lines: Vec<String> = reader.lines()
                    .filter_map(|line| line.ok())
                    .collect();
                
                dict.insert(key.to_string(), lines);
            }
            Err(_) => {
                dict.insert(key.to_string(), Vec::new());
            }
        }
    }

    Ok(dict)
}
