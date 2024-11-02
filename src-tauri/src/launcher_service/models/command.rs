use std::collections::HashMap;

use serde::{Deserialize, Serialize};
use serde_json::Value;

// #[derive(Serialize, Deserialize, Clone, Debug)]
// pub(crate) struct Command {
//     pub(crate) command_name: String,
//     pub(crate) args: CommandArgs,
// }

#[derive(Serialize, Deserialize, Clone, Debug)]
pub(crate) struct Command {
    pub(crate) name: String,
    // pub(crate) head: HashMap<String, Value>,
    pub(crate) args: String,
}