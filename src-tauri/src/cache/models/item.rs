use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone)]
pub(crate) struct Item {
    pub(crate) expire: u64,
    pub(crate) data: Value,
    // pub(crate) id: String,
}

#[derive(Serialize, Deserialize, Clone, Copy)]
#[serde(rename_all = "camelCase")]
pub(crate) enum Type {
    Developer,
    User,
    Product,
}

#[derive(Serialize, Deserialize)]
pub(crate) struct ItemType {
    pub item_type: Type,
    pub item: Item,
}

impl Type {
    pub(crate) fn as_str(&self) -> &str {
        match self {
            Type::Developer => "Developer",
            Type::User => "User",
            Type::Product => "Product",
        }
    }
}