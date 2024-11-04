use tauri::ipc::InvokeError;
use thiserror::Error;

use crate::configuration::error::ConfigurationError;

#[derive(Error, Debug)]
pub(crate) enum ClientError {
    #[error("Problem with configuration: {0}")]
    ProblemWithConfiguration(#[from] ConfigurationError),
    #[error("Error with tauri 😐😐😐 : {0}")]
    TauriError(#[from] tauri::Error)
}

impl From<ClientError> for InvokeError {
    fn from(error: ClientError) -> Self {
        Self::from(error.to_string())
    }
}