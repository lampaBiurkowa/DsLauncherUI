use tauri::command;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::consts::{MANIFEST_CORE, MANIFEST_LINUX, MANIFEST_MAC, MANIFEST_WIN, NDIB_FOLDER};
use std::fs;
use std::io::{BufReader, BufRead};
use std::path::Path;
use std::collections::HashMap;

fn list_files_recursive(dir: &Path) -> Vec<String> {
    let mut files = Vec::new();
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                files.extend(list_files_recursive(&path));
            } else if let Some(path_str) = path.to_str() {
                files.push(path_str.to_string());
            }
        }
    }
    files
}

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
                let mut file_list = Vec::new();

                for line in reader.lines().filter_map(|line| line.ok()) {
                    let file_path = Path::new(path).join(&line);
                    if file_path.is_dir() {
                        file_list.extend(list_files_recursive(&file_path));
                    } else if let Some(line_str) = file_path.to_str() {
                        file_list.push(line_str.to_string());
                    }
                }

                dict.insert(key.to_string(), file_list);
            }
            Err(_) => {
                dict.insert(key.to_string(), Vec::new());
            }
        }
    }

    Ok(dict)
}
