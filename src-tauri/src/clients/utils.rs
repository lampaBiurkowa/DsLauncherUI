use std::{fs::File, io::Read, path::Path};

use super::error::ClientError;

pub(crate) fn read_file_to_buffer(file_path: &Path) -> Result<(String, Vec<u8>), ClientError> {
    let file_name = file_path
        .file_name()
        .and_then(|name| name.to_str())
        .unwrap()
        .to_string();

    let mut file = File::open(file_path)?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)?;

    Ok((file_name, buffer))
}