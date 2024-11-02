use reqwest::{Error, Client};
use reqwest::multipart;
use serde::Deserialize;
use uuid::Uuid;
use std::fs::File;
use std::path::Path;
use std::io::Read;

pub struct DsLauncherClient {
    base_url: String,
    client: Client,
}

#[derive(Deserialize)]
pub struct Developer {
    pub name: String,
    pub guid: String
}

impl DsLauncherClient {
    pub fn new(base_url: &str) -> Self {
        Self {
            base_url: base_url.to_string(),
            client: Client::new(),
        }
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

    pub async fn upload(&self, token: &str, developer_guid: &Uuid, metadata_path: &Path) -> Result<String, Error> {
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
            .await?;

        let id = response.text().await?.trim_matches('"').to_string();
        Ok(id)
    }
}
