use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct TagGroup {
    pub(crate) model: Value,
    pub(crate) tag_ids: Vec<String>,
}