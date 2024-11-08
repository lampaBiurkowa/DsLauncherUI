use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub(crate) struct Command {
    pub(crate) name: String,
    pub(crate) args: String,
}