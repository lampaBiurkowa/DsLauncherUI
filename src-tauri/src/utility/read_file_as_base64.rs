use tauri::command;
use std::fs;
use std::io::Read;
use base64::encode;

#[command]
pub(crate) async fn read_file_as_base64(file_path: String) -> Result<String, String> {
    match fs::File::open(&file_path) {
        Ok(mut file) => {
            let mut contents = Vec::new();
            if let Err(e) = file.read_to_end(&mut contents) {
                return Err(format!("Failed to read file: {}", e));
            }
            let base64_data = encode(&contents);
            Ok(base64_data)
        }
        Err(e) => Err(format!("Failed to open file: {}", e)),
    }
}
