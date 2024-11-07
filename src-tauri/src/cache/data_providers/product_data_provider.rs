use std::collections::HashMap;

use serde_json::Value;

use crate::{cache::{error::CacheError, models::product::{FilesData, Product, RatesBreakdown}}, clients::launcher_client::DsLauncherClient, configuration::{env_var::EnvVar, remote_var}};

use self::remote_var::RemoteVars;

use super::data_provider::DataProvider;

pub(crate) struct ProductDataProvider {
    launcher_client: DsLauncherClient,
    remote_vars: RemoteVars
}

impl ProductDataProvider {
    pub(crate) fn new(remote_vars: RemoteVars) -> Self {
        Self {
            launcher_client: DsLauncherClient::new(),
            remote_vars
        }
    }

    async fn get_rates(&self, id: &str) -> Result<RatesBreakdown, CacheError> {
        let data = self.launcher_client.get_review_breakdown(id).await.unwrap();
        match data {
            Value::Array(x) => {
                let mut rate_counts = HashMap::new();
                for (index, value) in x.iter().enumerate() {
                    if let Some(count) = value.as_u64() {
                        rate_counts.insert(index as u8 + 1, count as u32);
                    }
                }
                
                Ok(RatesBreakdown {
                    avg: ProductDataProvider::calculate_avg(&rate_counts),
                    rate_counts
                })
            },
            _ => Err(CacheError::InternalCacheError("Failed to get rates breakdown, expected collection got something else".to_owned()))
        }
        
    }

    fn get_files_data(&self, id: &str, image_count: i64) -> FilesData {
        let path = EnvVar::SupabaseUrl.get_value().expect("Error getting supabase url");
        let icon = format!("{path}/{}/{id}/{}", self.remote_vars.launcher_bucket, self.remote_vars.ndib_icon_id);
        let background = format!("{path}/{}/{id}/{}", self.remote_vars.launcher_bucket, self.remote_vars.ndib_bg_id);
        let images = (0..image_count).map(|x| format!("{path}/{}/{id}/{}", self.remote_vars.launcher_bucket, x + 1)).collect();
    
        FilesData { icon, background, images }
    }

    fn calculate_avg(rate_counts: &HashMap<u8, u32>) -> f32 {
        let (weighted_sum, total_count) = rate_counts.iter()
            .fold((0.0, 0), |(sum, count), (&rating, &qty)| {
                (sum + (rating as f32 * qty as f32), count + qty)
            });
        if total_count > 0 {
            weighted_sum / total_count as f32
        } else {
            0.0
        }
    }
}

impl DataProvider<Product> for ProductDataProvider {
    async fn fetch_data(&self, id: &str) -> Result<Product, CacheError> {

        let (model, latest_version, rates) = tokio::join!(
            self.launcher_client.get_product(id),
            self.launcher_client.get_latest_product_package(id),
            self.get_rates(id)
        );

        let model = model.unwrap();
        let images_count = match model.get("imageCount").and_then(|x| x.as_i64()) {
            Some(x) => x,
            None => 0
        };
    
        let files_data = self.get_files_data(id, images_count);    
        Ok(Product { model, rates: rates.unwrap(), latest_version: latest_version.unwrap(), files_data })
    }
}