use reqwest::{Error, Client};
use serde_json::Value;

use crate::configuration::env_var::EnvVar;

pub struct DsCoreClient {
    base_url: String,
    client: Client,
}

impl DsCoreClient {
    pub(crate) fn new() -> Self {
        Self {
            base_url: EnvVar::CoreApiUrl.get_value().expect("Error getting core api url"),
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

    pub(crate) async fn get_currency(&self, id: &str) -> Result<Value, Error> {
        let url = format!("{}/Currency/{}", self.base_url, id);

        let response = self.client.get(&url)
            .send()
            .await?;

        Ok(response.json().await?)
    }

    pub(crate) async fn get_user(&self, id: &str) -> Result<Value, Error> {
        let url = format!("{}/User/{}", self.base_url, id);

        let response = self.client.get(&url)
            .send()
            .await?;

        Ok(response.json().await?)
    }

    pub async fn login(&self, user_id: &str, password_base64: &str) -> Result<String, Error> {
        let url = format!("{}/Auth/login/{}", self.base_url, user_id);

        let response = self.client.post(&url)
            .query(&[("passwordBase64", password_base64)])
            .send()
            .await?;

        let token = response.text().await?;
        Ok(token)
    }

    pub async fn get_user_guid(&self, user_login: &str) -> Result<String, Error> {
        let url = format!("{}/User/GetId/{}", self.base_url, user_login);

        let response = self.client.get(&url)
            .send()
            .await?;

        let id = response.text().await?.trim_matches('"').to_string();
        Ok(id)
    }
}
