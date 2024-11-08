use crate::{cache::{error::CacheError, models::currency::Currency}, clients::core_client::DsCoreClient};

use super::data_provider::DataProvider;

pub(crate) struct CurrencyDataProvider {
    client: DsCoreClient
}

impl CurrencyDataProvider {
    pub(crate) fn new() -> Self {
        Self { client: DsCoreClient::new() }
    }
}

impl DataProvider<Currency> for CurrencyDataProvider {
    async fn fetch_data(&self, id: &str) -> Result<Currency, CacheError> {
        let model = self.client.get_currency(id).await?;
        Ok(Currency { model })
    }
}