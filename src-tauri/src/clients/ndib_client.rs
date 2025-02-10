use reqwest::{Error, Client};
use reqwest::multipart;
use zip::ZipArchive;
use std::fs::File;
use std::path::Path;
use std::io::{Cursor, Read};
use crate::configuration::env_var::EnvVar;
use super::error::ClientError;
use super::utils::{get_as_text, read_file_to_buffer};

pub struct DsNdibClient {
    base_url: String,
    client: Client,
}

impl DsNdibClient {
    pub(crate) fn new() -> Self {
        Self {
            base_url: EnvVar::NdibApiUrl.get_value().expect("Error getting ndib api url"),
            client: Client::new(),
        }
    }
    
    pub(crate) async fn get_bucket_name(&self) -> Result<String, Error> {
        let url = format!("{}/Configuration/bucket-name", self.base_url);
        get_as_text(&self.client, &url).await
    }

    pub(crate) async fn get_icon_id(&self) -> Result<String, reqwest::Error> {
        let url = format!("{}/Configuration/icon-id", self.base_url);
        get_as_text(&self.client, &url).await
    }

    pub(crate) async fn get_background_id(&self) -> Result<String, reqwest::Error> {
        let url = format!("{}/Configuration/background-id", self.base_url);
        get_as_text(&self.client, &url).await
    }

    pub async fn upload(&self, token: &str, product_guid: &str, core_path: &Path, win_path: &Path, mac_path: &Path, linux_path: &Path, metadata_path: &Path) -> Result<(), ClientError> {
        let url = format!("{}/Upload/{}", self.base_url, product_guid);

        let (core_file_name, core_buffer) = read_file_to_buffer(core_path)?;
        let (linux_file_name, linux_buffer) = read_file_to_buffer(linux_path)?;
        let (win_file_name, win_buffer) = read_file_to_buffer(win_path)?;
        let (mac_file_name, mac_buffer) = read_file_to_buffer(mac_path)?;
        let (metadata_file_name, metadata_buffer) = read_file_to_buffer(metadata_path)?;

        let form = multipart::Form::new()
            .part("coreFile", multipart::Part::bytes(core_buffer).file_name(core_file_name.to_string()))
            .part("linuxFile", multipart::Part::bytes(linux_buffer).file_name(linux_file_name.to_string()))
            .part("winFile", multipart::Part::bytes(win_buffer).file_name(win_file_name.to_string()))
            .part("macFile", multipart::Part::bytes(mac_buffer).file_name(mac_file_name.to_string()))
            .part("metadataFile", multipart::Part::bytes(metadata_buffer).file_name(metadata_file_name.to_string()));

        let response = self.client
            .post(&url)
            .bearer_auth(token)
            .multipart(form)
            .send()
            .await;

        match response {
            Ok(resp) => {
                if resp.status().is_success() {
                    println!("Upload successful");
                    Ok(())
                } else {
                    let status = resp.status();
                    let text = resp.text().await.unwrap_or_default();
                    println!("Upload failed with status: {} and message: {}", status, text);
                    Ok(()) // :D/
                }
            }
            Err(e) => {
                eprintln!("Failed to send request: {}", e);
                Err(ClientError::Http(e))
            }
        }
    }

    pub async fn update_metadata(&self, token: &str, product_id: &str, metadata_path: &Path) -> Result<(), ClientError> {
        let url = format!("{}/Upload/update-metadata/{}", self.base_url, product_id);

        let metadata_file_name = metadata_path
            .file_name()
            .and_then(|name| name.to_str())
            .unwrap();

        let mut metadata_file = File::open(metadata_path)?;
        let mut metadata_buffer = Vec::new();
        metadata_file.read_to_end(&mut metadata_buffer)?;

        let form = multipart::Form::new()
            .part("metadataFile", multipart::Part::bytes(metadata_buffer).file_name(metadata_file_name.to_string()));

        self.client
            .post(&url)
            .bearer_auth(token)
            .multipart(form)
            .send()
            .await?;

        Ok(())
    }

    pub async fn pull(&self, token: &str, product_id: &str, target_dir: &Path) -> Result<(), ClientError> {
        let url = format!("{}/Download/pull/{}", self.base_url, product_id);
        let response = reqwest::Client::new()
            .get(&url)
            .bearer_auth(token)
            .send().await?;
        let bytes = response.bytes().await?;
        let mut zip = match ZipArchive::new(Cursor::new(bytes)) {
            Ok(x) => x,
            Err(e) => {println!("{e}");return Err(ClientError::Zip(e));}
        };

        for i in 0..zip.len() {
            let mut file = zip.by_index(i)?;
            let out_path = target_dir.join(file.name());

            if file.is_dir() {
                std::fs::create_dir_all(&out_path)?;
            } else {
                if let Some(parent) = out_path.parent() {
                    std::fs::create_dir_all(parent)?;
                }
                let mut outfile = File::create(&out_path)?;
                std::io::copy(&mut file, &mut outfile)?;
            }
        }

        Ok(())
    }
}
