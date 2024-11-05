use crate::{cache::{error::CacheError, models::developer::Developer}, clients::launcher_client::DsLauncherClient};

use super::data_provider::DataProvider;

pub(crate) struct DeveloperDataProvider {
    client: DsLauncherClient
}

impl DeveloperDataProvider {
    pub(crate) fn new() -> Self {
        Self { client: DsLauncherClient::new() }
    }
}

impl DataProvider<Developer> for DeveloperDataProvider {
    async fn fetch_data(&self, id: &str) -> Result<Developer, CacheError> {
        let model = self.client.get_developer(id).await?;
        Ok(Developer { model })
    }
}