use std::collections::HashMap;
use std::sync::Mutex;
use once_cell::sync::Lazy;

pub(crate) static CACHE: Lazy<Mutex<HashMap<String, String>>> = Lazy::new(|| Mutex::new(HashMap::new()));
pub(crate) const TOKEN_KEY: &str = "token";
pub(crate) const USER_GUID_KEY: &str = "user-guid";

pub(crate) fn set_cache(key: &str, value: &str) {
    let mut cache = CACHE.lock().unwrap();
    cache.insert(key.to_string(), value.to_string());
}

pub(crate) fn get_cache(key: &str) -> Option<String> {
    let cache = CACHE.lock().unwrap();
    cache.get(key).cloned()
}
