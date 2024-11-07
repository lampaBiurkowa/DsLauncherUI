use reqwest::{Error, Client};
use reqwest::multipart;
use serde::Deserialize;
use serde_json::Value;
use uuid::Uuid;
use std::fs::File;
use std::path::Path;
use std::io::Read;

use crate::configuration::env_var::EnvVar;

pub(crate) struct DsLauncherClient {
    base_url: String,
    client: Client,
}

impl DsLauncherClient {
    pub(crate) fn new() -> Self {
        Self {
            base_url: EnvVar::LauncherApiUrl.get_value().expect("Error getting launcher api url"),
            client: Client::new(),
        }
    }
    
    pub(crate) async fn get_bucket_name(&self) -> Result<String, Error> {
        let url = format!("{}/Configuration/bucket-name", self.base_url);

        let response = self.client.get(&url)
            .send()
            .await.unwrap();

        let bucket = response.text().await.unwrap().trim_matches('"').to_string();
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

    pub(crate) async fn upload(&self, token: &str, developer_guid: &Uuid, metadata_path: &Path) -> Result<String, Error> {
        let url = format!("{}/Ndib/upload/{}", self.base_url, developer_guid);
        
        let (metadata_file_name, metadata_buffer) = Self::read_file_to_buffer(metadata_path);

        let form = multipart::Form::new()
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
                    Ok(resp.text().await.unwrap())
                } else {
                    let status = resp.status();
                    let text = resp.text().await.unwrap_or_default();
                    println!("Upload failed with status: {} and message: {}", status, text);
                    Ok(String::default()) // :D/
                }
            }
            Err(e) => {
                eprintln!("Failed to send request: {}", e);
                Err(e)
            }
        }
    }

    pub async fn get_product_guid(&self, product_name: &str) -> Result<String, Error> {
        let url = format!("{}/Product/get-id/{}", self.base_url, product_name);

        let response = self.client.get(&url)
            .send()
            .await.unwrap();

        let id = response.text().await.unwrap().trim_matches('"').to_string();
        Ok(id)
    }

    pub(crate) async fn get_developer(&self, id: &str) -> Result<Value, Error> {
        let url = format!("{}/Developer/{}", self.base_url, id);

        let response = self.client.get(&url)
            .send()
            .await.unwrap();

        Ok(response.json().await.unwrap())
    }

    pub(crate) async fn get_developer_by_user(&self, id: &str) -> Result<Value, Error> {
        let url = format!("{}/Developer/user/{}", self.base_url, id);

        let response = self.client.get(&url)
            .send()
            .await.unwrap();

        Ok(response.json().await.unwrap())
    }

    pub(crate) async fn get_product(&self, id: &str) -> Result<Value, Error> {
        let url = format!("{}/Product/{}", self.base_url, id);

        let response = self.client.get(&url)
            .send()
            .await.unwrap();

        Ok(response.json().await.unwrap())
    }

    pub(crate) async fn get_latest_product_package(&self, id: &str) -> Result<Value, Error> {
        let url = format!("{}/Package/latest/{}", self.base_url, id);

        let response = self.client.get(&url)
            .send()
            .await.unwrap();

        Ok(response.json().await.unwrap())
    }

    pub(crate) async fn get_review_breakdown(&self, id: &str) -> Result<Value, Error> {
        let url = format!("{}/Review/product/{}/breakdown", self.base_url, id);

        let response = self.client.get(&url)
            .send()
            .await.unwrap();

        Ok(response.json().await.unwrap())
    }
}
