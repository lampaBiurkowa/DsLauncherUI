use crate::clients::{core_client::DsCoreClient, launcher_client::DsLauncherClient, ndib_client::DsNdibClient};

use super::error::ConfigurationError;

pub(crate) struct RemoteVars {
    core_bucket: String,
    launcher_bucket: String,
    ndib_bucket: String
}

impl RemoteVars {
    pub(crate) async fn load() -> Result<Self, ConfigurationError> {
        let core_client = DsCoreClient::new();
        let launcher_client = DsLauncherClient::new();
        let ndib_client = DsNdibClient::new();

        let (core_bucket, launcher_bucket, ndib_bucket) = tokio::join!(
            core_client.get_bucket_name(),
            launcher_client.get_bucket_name(),
            ndib_client.get_bucket_name()
        );

        Ok(Self { core_bucket: core_bucket?, launcher_bucket: launcher_bucket?, ndib_bucket: ndib_bucket? })
    }
}
