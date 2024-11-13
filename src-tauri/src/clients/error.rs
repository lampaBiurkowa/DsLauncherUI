use tauri::ipc::InvokeError;
use thiserror::Error;
use zip::result::ZipError;

use crate::configuration::error::ConfigurationError;

#[derive(Error, Debug)]
pub(crate) enum ClientError {
    #[error("Problem with configuration: {0}")]
    ProblemWithConfiguration(#[from] ConfigurationError),
    #[error("Error with tauri 😐😐😐 : {0}")]
    TauriError(#[from] tauri::Error),
    #[error("Problem with http: {0}")]
    ProblemWithHttp(#[from] reqwest::Error),
    #[error("Problem with IO: {0}")]
    ProblemWithIO(#[from] std::io::Error),
    #[error("Problem with zip: {0}")]
    ProblemWithZip(#[from] ZipError),
}

impl From<ClientError> for InvokeError {
    fn from(error: ClientError) -> Self {
        Self::from(error.to_string())
    }
}