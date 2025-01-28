use reqwest::{Error, Client};
use serde_json::Value;

use crate::configuration::env_var::EnvVar;

use super::{error::ClientError, utils::{get_as_json, get_as_text}};

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
        get_as_text(&self.client, &url).await
    }

    pub(crate) async fn get_user_profile_id(&self) -> Result<String, Error> {
        let url = format!("{}/Configuration/user-profile-id", self.base_url);
        get_as_text(&self.client, &url).await
    }

    pub(crate) async fn get_user_background_id(&self) -> Result<String, Error> {
        let url = format!("{}/Configuration/user-background-id", self.base_url);
        get_as_text(&self.client, &url).await
    }

    pub(crate) async fn get_user_storage_folder(&self) -> Result<String, Error> {
        let url = format!("{}/Configuration/user-storage-folder", self.base_url);
        get_as_text(&self.client, &url).await
    }
    
    pub(crate) async fn get_user(&self, id: &str) -> Result<Value, ClientError> {
        let url = format!("{}/User/{}", self.base_url, id);
        get_as_json(&self.client, &url).await
    }
}
