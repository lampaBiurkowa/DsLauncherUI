use tauri::ipc::InvokeError;
use thiserror::Error;

#[derive(Error, Debug)]
pub(crate) enum CacheError {
    #[error("Internal cache error: {0}")]
    InternalCacheError(String),
    #[error("Serialization error: {0}")]
    SerializationError(#[from] serde_json::Error),
    #[error("Problem with HTTP: {0}")]
    ProblemWithHttp(#[from] reqwest::Error),
    #[error("Problem with SurrealDB: {0}")]
    ProblemWithSurrealDb(#[from] surrealdb::Error),
    #[error("Error with tauri 😐😐😐 : {0}")]
    TauriError(#[from] tauri::Error)
}

impl From<CacheError> for InvokeError {
    fn from(error: CacheError) -> Self {
        Self::from(error.to_string())
    }
}