use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default)]
pub(crate) enum ContentClassification {
    #[default]
    Age3,
    Age7,
    Age12,
    Age16,
    Age18
}