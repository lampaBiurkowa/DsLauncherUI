use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Default, PartialEq)]
pub(crate) enum ProductType {
    #[default]
    App,
    Game,
    Music,
    Video,
}