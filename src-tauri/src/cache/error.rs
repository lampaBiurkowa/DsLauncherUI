use tauri::ipc::InvokeError;
use thiserror::Error;
use std::io;
use serde_json;

#[derive(Error, Debug)]
pub(crate) enum CacheError {
    #[error("Failed to write data to file: {0}")]
    WriteToFileError(#[from] io::Error),
    #[error("Failed to serialize data: {0}")]
    SerializationError(#[from] serde_json::Error),
    #[error("Failure while trying to glob :D/ : {0}")]
    GlobError(#[from] glob::GlobError),
    #[error("Error with websocket 😐 : {0}")]
    WebsocketError(#[from] tungstenite::Error),
    #[error("Error with tauri 😐😐😐 : {0}")]
    TauriError(#[from] tauri::Error)
}

impl From<CacheError> for InvokeError {
    fn from(error: CacheError) -> Self {
        Self::from(error.to_string())
    }
}