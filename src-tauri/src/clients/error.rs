use tauri::ipc::InvokeError;
use thiserror::Error;
use zip::result::ZipError;

use crate::configuration::error::ConfigurationError;

#[derive(Error, Debug)]
pub(crate) enum ClientError {
    #[error("Problem with configuration: {0}")]
    Configuration(#[from] ConfigurationError),
    #[error("Error with tauri 😐😐😐 : {0}")]
    Tauri(#[from] tauri::Error),
    #[error("Problem with http: {0}")]
    Http(#[from] reqwest::Error),
    #[error("Error http response: {0}")]
    HttpStatus(String),
    #[error("Wrong status: {0}")]
    IO(#[from] std::io::Error),
    #[error("Problem with zip: {0}")]
    Zip(#[from] ZipError),
}

impl From<ClientError> for InvokeError {
    fn from(error: ClientError) -> Self {
        Self::from(error.to_string())
    }
}