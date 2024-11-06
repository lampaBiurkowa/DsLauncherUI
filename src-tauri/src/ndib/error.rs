use tauri::ipc::InvokeError;
use thiserror::Error;
use std::io;
use serde_json;
use std::path::PathBuf;

use crate::session_data::error::SessionDataError;

#[derive(Error, Debug)]
pub(crate) enum NdibError {
    #[error("Failed to create directory: {0}")]
    DirectoryCreationError(String),
    #[error("Failed to create file {0}: {1}")]
    FileCreationError(PathBuf, io::Error),
    #[error("Failed to write data to file: {0}")]
    WriteToFileError(#[from] io::Error),
    #[error("Failed to serialize data: {0}")]
    SerializationError(#[from] serde_json::Error),
    #[error("Failure while trying to glob :D/ : {0}")]
    GlobError(#[from] glob::GlobError),
    #[error("Failure while trying to do sth with pattern 😐 : {0}")]
    PatternError(#[from] glob::PatternError),
    #[error("Problem with HTTP")]
    ProblemWithHttp(#[from] reqwest::Error),
    #[error("Problem with SessionData")]
    ProblemWithSessionData(#[from] SessionDataError),
    #[error("Invalid product type")]
    ValidationError,
}

impl From<NdibError> for InvokeError {
    fn from(error: NdibError) -> Self {
        Self::from(error.to_string())
    }
}