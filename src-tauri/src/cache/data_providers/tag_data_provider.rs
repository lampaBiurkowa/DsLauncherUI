use crate::{cache::{error::CacheError, models::tag::Tag}, clients::launcher_client::DsLauncherClient};

use super::data_provider::DataProvider;

pub(crate) struct TagDataProvider {
    client: DsLauncherClient
}

impl TagDataProvider {
    pub(crate) fn new() -> Self {
        Self { client: DsLauncherClient::new() }
    }
}

impl DataProvider<Tag> for TagDataProvider {
    async fn fetch_data(&self, id: &str) -> Result<Tag, CacheError> {
        let model = self.client.get_tag(id).await?;
        Ok(Tag { model })
    }
}