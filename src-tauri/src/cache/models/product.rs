use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize)]
pub(crate) struct Product {
    pub(crate) model: Value,
    pub(crate) is_developer: bool,
    pub(crate) rates: RatesCount,
    pub(crate) latest_version: Value,
    pub(crate) files_data: FilesData,
}

#[derive(Serialize, Deserialize)]
pub(crate) struct RatesCount {
    pub(crate) avg: f32,
    pub(crate) rate_counts: HashMap<u8, u32>
}

#[derive(Serialize, Deserialize)]
pub(crate) struct FilesData {
    pub(crate) icon: String,
    pub(crate) background: String,
    pub(crate) images: Vec<String>
}

// function getFilesData(product) {
//     let data = {};
//     data.Icon = `${publicPath}/${productsBucket}/${product.guid}/icon.png`;
//     data.Background = `${publicPath}/${productsBucket}/${product.guid}/bg.png`;
//     data.Images = [];
//     for (let i = 0; i < product.imageCount; i++)
//         data.Images[i] = `${publicPath}/${productsBucket}/${product.guid}/${i + 1}.png`;

//     return data;
// }