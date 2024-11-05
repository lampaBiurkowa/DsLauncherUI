use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize)]
pub(crate) struct Item {
    pub(crate) expire: u64,
    pub(crate) data: Value,
}

#[derive(Serialize, Deserialize, Clone, Copy)]
pub(crate) enum Type {
    Developer,
    User,
    Product,
    Currency,
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
            Type::Currency => "Currency",
        }
    }
}