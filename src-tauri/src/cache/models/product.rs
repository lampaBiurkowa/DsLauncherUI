use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct Product {
    pub(crate) model: Value,
    pub(crate) rates: RatesBreakdown,
    pub(crate) latest_version: Value,
    pub(crate) files_data: FilesData,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct RatesBreakdown {
    pub(crate) avg: f32,
    pub(crate) rate_counts: HashMap<u8, u32>
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "PascalCase")]
pub(crate) struct FilesData {
    pub(crate) icon: String,
    pub(crate) background: String,
    pub(crate) images: Vec<String>
}