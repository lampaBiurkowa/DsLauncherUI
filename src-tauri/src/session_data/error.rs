use tauri::ipc::InvokeError;
use thiserror::Error;

#[derive(Error, Debug)]
pub(crate) enum SessionDataError {
    #[error("Session data store error {0}")]
    StoreError(String),
}

impl From<SessionDataError> for InvokeError {
    fn from(error: SessionDataError) -> Self {
        Self::from(error.to_string())
    }
}