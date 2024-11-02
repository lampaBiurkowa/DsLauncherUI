use serde::{Deserialize, Serialize};

use super::{content_classification::ContentClassification, product_type::ProductType};

#[derive(Serialize, Deserialize, Default)]
#[serde(rename_all = "camelCase")]
pub(crate) struct NdibData {
    pub(crate) name: String,
    pub(crate) description: String,
    pub(crate) windows_exe_path: String,
    pub(crate) mac_exe_path: String,
    pub(crate) linux_exe_path: String,
    pub(crate) price: f32,
    pub(crate) tags: Vec<String>,
    pub(crate) version: String,
    pub(crate) icon: String,
    pub(crate) background: String,
    pub(crate) images: Vec<String>,
    pub(crate) min_cpu: String,
    pub(crate) min_ram_mib: u32,
    pub(crate) min_disk_mib: u32,
    pub(crate) product_type: ProductType,
    pub(crate) content_classification: Option<ContentClassification>, //for games and videos
    pub(crate) tracks: Option<Vec<String>> //for music
}