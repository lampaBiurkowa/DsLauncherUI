use std::{fs::{self, remove_file}, io::{BufRead, BufReader}, path::Path};
use tauri::{async_runtime::Runtime, command};
use tauri::async_runtime::TokioRuntime;
use uuid::Uuid;

use crate::{cache::{get_cache, TOKEN_KEY}, clients::{launcher_client::DsLauncherClient, ndib_client::DsNdibClient}, ndib::{error::NdibError, helpers::{consts::{MANIFEST_CORE, MANIFEST_LINUX, MANIFEST_MAC, MANIFEST_WIN, METADATA_FILE, METADATA_NAME, NDIB_FOLDER}, utils::{create_zip, read_serialized_object}, vec_extensions::VecStringExt}, models::ndib_data::NdibData}};

#[command]
pub(crate) fn publish(developer: Uuid) -> Result<(), NdibError>{
    let ndib_data: NdibData = read_serialized_object(&Path::new(NDIB_FOLDER).join(METADATA_FILE))?;
    let mut extra_paths: Vec<String> = Vec::new();
    extra_paths.add_if_non_empty(ndib_data.icon);
    extra_paths.add_if_non_empty(ndib_data.background);
    for img in ndib_data.images {
        extra_paths.add_if_non_empty(img);
    }
    extra_paths.push(Path::new(NDIB_FOLDER).join(METADATA_FILE).to_string_lossy().into_owned());

    let manifest_files = [
        MANIFEST_CORE,
        MANIFEST_WIN,
        MANIFEST_LINUX,
        MANIFEST_MAC,
    ];

    for &manifest_file in &manifest_files {
        let manifest_path = Path::new(NDIB_FOLDER).join(manifest_file);

        let file = fs::File::open(&manifest_path).expect("Failed to open manifest file");
        let reader = BufReader::new(file);
        let all_lines = reader.lines();
        create_zip(all_lines, format!("{}.zip", manifest_file));
    }
    create_zip(extra_paths.into_iter().map(Ok), METADATA_NAME.to_string());

    let rt = Runtime::Tokio(TokioRuntime::new()?);
    rt.block_on(async {
        let launcher_api = DsLauncherClient::new();
        let product_guid = launcher_api.upload(&get_cache(TOKEN_KEY).unwrap(), &developer, Path::new(METADATA_NAME)).await.unwrap();
        let ndib_api = DsNdibClient::new();
        ndib_api.upload(&get_cache(TOKEN_KEY).unwrap(), &product_guid.replace("\"", ""),
            Path::new(&format!("{}.zip", MANIFEST_CORE)),
            Path::new(&format!("{}.zip", MANIFEST_WIN)),
            Path::new(&format!("{}.zip", MANIFEST_MAC)),
            Path::new(&format!("{}.zip", MANIFEST_LINUX)),
            Path::new(METADATA_NAME)).await.unwrap();
    });

    for &manifest_file in &manifest_files {
        remove_file(format!("{}.zip", manifest_file))?;
    }
    remove_file(METADATA_NAME)?;

    Ok(())
}