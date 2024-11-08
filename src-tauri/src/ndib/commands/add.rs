use std::{fs::OpenOptions, path::Path};
use std::io::Write;
use tauri::command;
use glob::glob;

use crate::{ndib::error::NdibError, ndib::helpers::{consts::NDIB_FOLDER, utils::get_manifest_file_name}};

#[command]
pub(crate) fn add(patterns: Vec<String>, manifest: &str) -> Result<(), NdibError>{
    let manifest_file = get_manifest_file_name(manifest)?;
    let manifest_path = Path::new(NDIB_FOLDER).join(manifest_file);
    let mut manifest = OpenOptions::new().append(true).open(&manifest_path)?;

    for pattern in patterns {
        for entry in glob(&pattern)? {
            writeln!(manifest, "{}", entry?.display())?;
        }
    }

    Ok(())
}
