use serde_json::{json, Value};

use crate::{cache::{error::CacheError, models::user::User}, clients::{core_client::DsCoreClient, error::ClientError, launcher_client::DsLauncherClient}};

use super::data_provider::DataProvider;

pub(crate) struct UserDataProvider {
    launcher_client: DsLauncherClient,
    core_client: DsCoreClient,
}

impl UserDataProvider {
    pub(crate) fn new() -> Self {
        Self {
            launcher_client: DsLauncherClient::new(),
            core_client: DsCoreClient::new()
        }
    }
}

impl DataProvider<User> for UserDataProvider {
    async fn fetch_data(&self, id: &str) -> Result<User, CacheError> {
        let model = match self.core_client.get_user(id).await {
            Ok(x) => x,
            Err(ClientError::HttpStatus(_)) => return Ok(deleted_user_model(id)),
            Err(e) => return Err(CacheError::InternalError(e.to_string()))
        };
        let mut is_developer = false;
        if let Ok(developers) = self.launcher_client.get_developer_by_user(id).await {
            if let Value::Array(x) = developers {
                is_developer = !x.is_empty();
            }
        }
        
        Ok(User { model, is_developer })
    }
}

fn deleted_user_model(id: &str) -> User {
    User {
        model: json!({"name":"Deleted","surname":"User","guid":id}),
        is_developer: false
    }
}