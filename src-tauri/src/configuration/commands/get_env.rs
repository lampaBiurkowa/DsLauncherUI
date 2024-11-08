use std::env;

use tauri::command;

use crate::configuration::error::ConfigurationError;

#[command]
pub(crate) fn get_env(name: &str) -> Result<String, ConfigurationError> {
    Ok(env::var(String::from(name))?)
}