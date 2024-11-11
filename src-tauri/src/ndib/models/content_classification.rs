use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default)]
#[serde(rename_all = "PascalCase")]
pub(crate) enum ContentClassification {
    #[default]
    #[serde(rename = "3")]
    Age3,
    #[serde(rename = "7")]
    Age7,
    #[serde(rename = "12")]
    Age12,
    #[serde(rename = "16")]
    Age16,
    #[serde(rename = "18")]
    Age18,
}