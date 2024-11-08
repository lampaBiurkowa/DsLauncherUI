use std::{collections::HashMap, sync::Mutex};

use super::error::SessionDataError;

pub(crate) struct Store(Mutex<HashMap<String, String>>);

impl Store {
    pub(crate) fn new() -> Self {
        Self(Mutex::new(HashMap::new()))
    }

    pub(crate) fn set(&self, key: &str, value: &str) -> Result<Option<String>, SessionDataError> {
        Ok(self.0.lock().map_err(|e| SessionDataError::StoreError(e.to_string()))?.insert(key.to_string(), value.to_string()))
    }

    pub(crate) fn get(&self, key: &str) -> Result<String, SessionDataError> {
        Ok(self.0.lock().map_err(|e| SessionDataError::StoreError(e.to_string()))?.get(key).cloned().unwrap_or_default())
    }
}