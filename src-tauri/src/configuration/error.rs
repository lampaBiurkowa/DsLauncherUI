use tauri::ipc::InvokeError;
use thiserror::Error;
use std::env::VarError;

#[derive(Error, Debug)]
pub(crate) enum ConfigurationError {
    #[error("Failed to read environment variable: {0}")]
    FailedToReadEnvironmentVariable(#[from] VarError),
    #[error("Problem with http: {0}")]
    ProblemWithHttp(#[from] reqwest::Error),
    #[error("Error with tauri 😐😐😐 : {0}")]
    TauriError(#[from] tauri::Error)
}

impl From<ConfigurationError> for InvokeError {
    fn from(error: ConfigurationError) -> Self {
        Self::from(error.to_string())
    }
}