use serde::Serialize;

use crate::clients::{core_client::DsCoreClient, launcher_client::DsLauncherClient, ndib_client::DsNdibClient};

use super::error::ConfigurationError;

#[derive(Serialize, Clone)]
pub(crate) struct RemoteVars {
    pub(crate) core_bucket: String,
    pub(crate) launcher_bucket: String,
    pub(crate) ndib_bucket: String,
    pub(crate) ndib_icon_id: String,
    pub(crate) ndib_bg_id: String
}

impl RemoteVars {
    pub(crate) async fn load() -> Result<Self, ConfigurationError> {
        let core_client = DsCoreClient::new();
        let launcher_client = DsLauncherClient::new();
        let ndib_client = DsNdibClient::new();

        let (core_bucket, launcher_bucket, ndib_bucket, ndib_bg_id, ndib_icon_id) = tokio::join!(
            core_client.get_bucket_name(),
            launcher_client.get_bucket_name(),
            ndib_client.get_bucket_name(),
            ndib_client.get_background_id(),
            ndib_client.get_icon_id()
        );

        Ok(Self { core_bucket: core_bucket?, launcher_bucket: launcher_bucket?, ndib_bucket: ndib_bucket?, ndib_bg_id: ndib_bg_id?, ndib_icon_id: ndib_icon_id? })
    }
}
