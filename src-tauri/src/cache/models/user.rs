use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize)]
pub(crate) struct User {
    pub(crate) model: Value,
    pub(crate) is_developer: bool
}