use std::{fs::{self, OpenOptions}, io::BufReader, path::Path};
use glob::glob;
use tauri::command;
use std::io::Write;
use std::io::BufRead;

use crate::ndib::{error::NdibError, helpers::{consts::NDIB_FOLDER, utils::get_manifest_file_name}};

#[command]
pub(crate) fn remove(patterns: Vec<String>, manifest: &str) -> Result<(), NdibError> {
    let manifest_file = get_manifest_file_name(manifest)?;
    let manifest_path = Path::new(NDIB_FOLDER).join(manifest_file);
    let entries: Vec<String> = BufReader::new(fs::File::open(&manifest_path)?)
        .lines()
        .map_while(Result::ok)
        .collect();

    let mut new_entries = entries.clone();

    for pattern in patterns {
        for entry in glob(&pattern)? {
            let path = entry?;
            if let Some(index) = new_entries.iter().position(|e| *e == path.display().to_string()) {
                new_entries.remove(index);
            }
        }
    }

    let mut file = OpenOptions::new()
        .write(true)
        .truncate(true)
        .open(&manifest_path)
        .expect("Failed to open manifest file");
    
    for entry in new_entries {
        writeln!(file, "{}", entry).expect("Failed to write to manifest file");
    }

    Ok(())
}
