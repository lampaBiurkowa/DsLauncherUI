use crate::{cache::{error::CacheError, models::tag_group::TagGroup}, clients::launcher_client::DsLauncherClient};

use super::data_provider::DataProvider;

#[derive(Clone)]
pub(crate) struct TagGroupDataProvider {
    client: DsLauncherClient
}

impl TagGroupDataProvider {
    pub(crate) fn new() -> Self {
        Self { client: DsLauncherClient::new() }
    }
}

impl DataProvider<TagGroup> for TagGroupDataProvider {
    async fn fetch_data(&self, id: &str) -> Result<TagGroup, CacheError> {
        let model = self.client.get_tag_group(id).await?;let tags_value = self.client.get_tags_from_group(id).await?;
        let tag_ids = tags_value.as_array()
            .map(|arr| arr.iter()
                .filter_map(|tag| tag.get("guid")?.as_str().map(String::from))
                .collect())
            .unwrap_or_else(Vec::new);
        Ok(TagGroup { model, tag_ids })
    }
}