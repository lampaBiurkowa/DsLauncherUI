use reqwest::Client;
use reqwest::multipart;
use serde_json::Value;
use uuid::Uuid;
use std::path::Path;
use crate::configuration::env_var::EnvVar;
use super::error::ClientError;
use super::utils::get_as_json;
use super::utils::get_as_text;
use super::utils::read_file_to_buffer;

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
    
    pub(crate) async fn get_bucket_name(&self) -> Result<String, reqwest::Error> {
        let url = format!("{}/Configuration/bucket-name", self.base_url);
        get_as_text(&self.client, &url).await
    }

    pub(crate) async fn upload(&self, token: &str, developer_guid: &Uuid, metadata_path: &Path) -> Result<String, ClientError> {
        let url = format!("{}/Ndib/upload/{}", self.base_url, developer_guid);
        
        let (metadata_file_name, metadata_buffer) = read_file_to_buffer(metadata_path)?;

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
                    Ok(resp.text().await?)
                } else {
                    let status = resp.status();
                    let text = resp.text().await.unwrap_or_default();
                    println!("Upload failed with status: {} and message: {}", status, text);
                    Ok(String::default()) // :D/
                }
            }
            Err(e) => {
                eprintln!("Failed to send request: {}", e);
                Err(ClientError::ProblemWithHttp(e))
            }
        }
    }

    pub async fn get_product_guid(&self, product_name: &str) -> Result<String, ClientError> {
        let url = format!("{}/Product/get-id/{}", self.base_url, product_name);
        Ok(get_as_text(&self.client, &url).await?)
    }

    pub(crate) async fn get_developer(&self, id: &str) -> Result<Value, ClientError> {
        let url = format!("{}/Developer/{}", self.base_url, id);
        get_as_json(&self.client, &url).await
    }

    pub(crate) async fn get_developer_by_user(&self, id: &str) -> Result<Value, ClientError> {
        let url = format!("{}/Developer/user/{}", self.base_url, id);
        get_as_json(&self.client, &url).await
    }

    pub(crate) async fn get_product(&self, id: &str) -> Result<Value, ClientError> {
        let url = format!("{}/Product/{}", self.base_url, id);
        get_as_json(&self.client, &url).await
    }

    pub(crate) async fn get_latest_product_package(&self, id: &str) -> Result<Value, ClientError> {
        let url = format!("{}/Package/latest/{}", self.base_url, id);
        get_as_json(&self.client, &url).await
    }

    pub(crate) async fn get_review_breakdown(&self, id: &str) -> Result<Value, ClientError> {
        let url = format!("{}/Review/product/{}/breakdown", self.base_url, id);
        get_as_json(&self.client, &url).await
    }
}
