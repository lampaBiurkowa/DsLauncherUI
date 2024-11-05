use reqwest::{Error, Client};
use reqwest::multipart;
use std::fs::File;
use std::path::Path;
use std::io::Read;

use crate::configuration::env_var::EnvVar;

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

        let response = self.client.get(&url)
            .send()
            .await?;

        let bucket = response.text().await?.trim_matches('"').to_string();
        Ok(bucket)
    }

    pub(crate) async fn get_icon_id(&self) -> Result<String, Error> {
        let url = format!("{}/Configuration/icon-id", self.base_url);

        let response = self.client.get(&url)
            .send()
            .await?;

        let bucket = response.text().await?.trim_matches('"').to_string();
        Ok(bucket)
    }

    pub(crate) async fn get_background_id(&self) -> Result<String, Error> {
        let url = format!("{}/Configuration/background-id", self.base_url);

        let response = self.client.get(&url)
            .send()
            .await?;

        let bucket = response.text().await?.trim_matches('"').to_string();
        Ok(bucket)
    }

    fn read_file_to_buffer(file_path: &Path) -> (String, Vec<u8>) {
        let file_name = file_path
            .file_name()
            .and_then(|name| name.to_str())
            .unwrap()
            .to_string();

        let mut file = File::open(file_path).unwrap();
        let mut buffer = Vec::new();
        file.read_to_end(&mut buffer).unwrap();

        (file_name, buffer)
    }

    pub async fn upload(&self, token: &str, product_guid: &str, core_path: &Path, win_path: &Path, mac_path: &Path, linux_path: &Path, metadata_path: &Path) -> Result<(), Error> {
        let url = format!("{}/Upload/{}", self.base_url, product_guid);

        let (core_file_name, core_buffer) = Self::read_file_to_buffer(core_path);
        let (linux_file_name, linux_buffer) = Self::read_file_to_buffer(linux_path);
        let (win_file_name, win_buffer) = Self::read_file_to_buffer(win_path);
        let (mac_file_name, mac_buffer) = Self::read_file_to_buffer(mac_path);
        let (metadata_file_name, metadata_buffer) = Self::read_file_to_buffer(metadata_path);

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
                Err(e)
            }
        }
    }

    pub async fn update_metadata(&self, token: &str, product_id: &str, metadata_path: &Path) -> Result<(), Error> {
        let url = format!("{}/Upload/update-metadata/{}", self.base_url, product_id);

        let metadata_file_name = metadata_path
            .file_name()
            .and_then(|name| name.to_str())
            .unwrap();

        let mut metadata_file = File::open(metadata_path).unwrap();
        let mut metadata_buffer = Vec::new();
        metadata_file.read_to_end(&mut metadata_buffer).unwrap();

        let form = multipart::Form::new()
            .part("metadataFile", multipart::Part::bytes(metadata_buffer).file_name(metadata_file_name.to_string()));

        self.client
            .post(&url)
            .bearer_auth(token)
            .multipart(form)
            .send()
            .await
            .unwrap();

        return Ok(());
    }
}
