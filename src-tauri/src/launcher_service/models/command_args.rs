use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, Debug, Clone)]
pub(crate) struct CommandArgs {
    pub(crate) head: HashMap<String, Option<usize>>,
    pub(crate) args: HashMap<String, String>,
}

pub(crate) struct ParsedArgument {
    pub(crate) name: String,
    pub(crate) value: String,
}