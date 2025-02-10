use std::{env, fs::{self, remove_file}, io::{BufRead, BufReader}, path::Path};
use tauri::command;

use crate::{clients::{launcher_client::DsLauncherClient, ndib_client::DsNdibClient}, ndib::{error::NdibError, helpers::{consts::{MANIFEST_CORE, MANIFEST_LINUX, MANIFEST_MAC, MANIFEST_WIN, METADATA_FILE, METADATA_NAME, NDIB_FOLDER}, utils::{create_zip, read_serialized_ndib_object}, vec_extensions::VecStringExt}, models::ndib_data::NdibData}, session_data::{keys::TOKEN_KEY, store::Store}};

const MANIFEST_FILES: [&str; 4] = [
    MANIFEST_CORE,
    MANIFEST_WIN,
    MANIFEST_LINUX,
    MANIFEST_MAC,
];

#[command]
pub(crate) async fn publish(store: tauri::State<'_, Store>, developer: &str, path: &str) -> Result<(), NdibError>{
    let ndib_data: NdibData = read_serialized_ndib_object(METADATA_FILE, path)?;
    let mut extra_paths: Vec<String> = Vec::new();
    extra_paths.add_if_non_empty(ndib_data.icon);
    extra_paths.add_if_non_empty(ndib_data.background);
    for img in ndib_data.images {
        extra_paths.add_if_non_empty(img);
    }
    extra_paths.push(Path::new(NDIB_FOLDER).join(METADATA_FILE).to_string_lossy().into_owned());

    let token = store.get(TOKEN_KEY)?;
    let original_dir = env::current_dir()?; 
    env::set_current_dir(path)?;
    let result = build_and_send_zip(extra_paths, &token, developer, path).await;
    env::set_current_dir(original_dir)?;

    result
}

async fn build_and_send_zip(extra_paths: Vec<String>, token: &str, developer: &str, current_dir: &str) -> Result<(), NdibError> {
    build_zip(extra_paths, current_dir)?;
    upload(token, developer).await?;
    clean_upload_files()?;
    
    Ok(())
}

fn build_zip(extra_paths: Vec<String>, current_dir: &str) -> Result<(), NdibError> {
    for &manifest_file in &MANIFEST_FILES {
        let manifest_path = Path::new(NDIB_FOLDER).join(manifest_file);

        let file = fs::File::open(&manifest_path).expect("Failed to open manifest file");
        let reader = BufReader::new(file);
        let all_lines = reader.lines()
            .filter_map(Result::ok)
            .map(|line| {
                let trimmed = line.strip_prefix(current_dir).map_or(line.clone(), |s| s.to_string());
                trimmed.trim_start_matches('/').trim_start_matches('\\').to_string()
            });
        create_zip(all_lines, format!("{}.zip", manifest_file))?;
    }
    create_zip(extra_paths.into_iter(), METADATA_NAME.to_string())?;
    Ok(())
}

async fn upload(token: &str, developer: &str) -> Result<(), NdibError> {
    let launcher_api = DsLauncherClient::new();
    let product_guid = launcher_api.upload(token, developer, Path::new(METADATA_NAME)).await?;
    let ndib_api = DsNdibClient::new();
    ndib_api.upload(token, &product_guid.replace("\"", ""),
        Path::new(&format!("{}.zip", MANIFEST_CORE)),
        Path::new(&format!("{}.zip", MANIFEST_WIN)),
        Path::new(&format!("{}.zip", MANIFEST_MAC)),
        Path::new(&format!("{}.zip", MANIFEST_LINUX)),
        Path::new(METADATA_NAME)).await?;
    
    Ok(())
}

fn clean_upload_files() -> Result<(), NdibError> {
    for &manifest_file in &MANIFEST_FILES {
        remove_file(format!("{}.zip", manifest_file))?;
    }
    remove_file(METADATA_NAME)?;
    Ok(())
}