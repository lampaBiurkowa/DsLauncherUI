use std::io::Write;
use std::{fs, io};
use std::{fs::File, io::BufReader, path::Path};

use serde::Serialize;
use walkdir::WalkDir;
use zip::write::FileOptions;
use zip::ZipWriter;

use crate::ndib::error::NdibError;
use crate::ndib::models::ndib_data::NdibData;

use super::consts::NDIB_FOLDER;

pub(crate) fn save_serialized_ndib_object<T: Serialize>(
    object: &T,
    file_name: &str,
    path: &Path,
) -> Result<(), NdibError> {
    let json = serde_json::to_string_pretty(object)?;
    let mut file = File::create(path.join(file_name))?;
    file.write_all(json.as_bytes())?;
    Ok(())
}

pub(crate) fn read_serialized_ndib_object(
    file_name: &str,
    repo_path: &str,
) -> Result<NdibData, NdibError> {
    let file = File::open(Path::new(repo_path).join(NDIB_FOLDER).join(file_name))?;
    let reader = BufReader::new(file);
    let data: NdibData = serde_json::from_reader(reader)?;
    Ok(data)
}

pub(crate) fn create_zip<I>(all_lines: I, zip_name: String) -> Result<(), NdibError>
where
    I: IntoIterator<Item = String>,
{
    let zip_file = fs::File::create(zip_name)?;
    let mut zip = ZipWriter::new(zip_file);

    for line in all_lines.into_iter() {
        let path = Path::new(&line);
        if path.exists() {
            if let Err(e) = add_path_to_zip(&mut zip, path, Path::new("")) {
                eprintln!("Failed to add {}: {}", path.display(), e);
            }
        } else {
            eprintln!("Path does not exist: {}", path.display());
        }
    }

    zip.finish()?;
    Ok(())
}

fn add_path_to_zip<W: Write + io::Seek>(
    zip: &mut ZipWriter<W>,
    path: &Path,
    base_path: &Path,
) -> zip::result::ZipResult<()> {
    let options = FileOptions::<'_, ()>::default().compression_method(zip::CompressionMethod::Stored);

    let relative_path = path.strip_prefix(base_path).unwrap_or(path);
    let name = relative_path.to_string_lossy().replace("\\", "/");

    if path.is_file() {
        zip.start_file(name.clone(), options)?;
        let mut f = fs::File::open(path)?;
        io::copy(&mut f, zip)?;
    } else if path.is_dir() {
        if !name.is_empty() {
            zip.add_directory(name.clone() + "/", options)?;
        }

        for entry in WalkDir::new(path).into_iter().filter_map(|e| e.ok()) {
            let entry_path = entry.path();
            let relative_entry_path = entry_path.strip_prefix(base_path).unwrap_or(entry_path);
            let entry_name = relative_entry_path.to_string_lossy().replace("\\", "/");

            if entry_path.is_file() {
                zip.start_file(entry_name.clone(), options)?;
                let mut f = fs::File::open(entry_path)?;
                io::copy(&mut f, zip)?;
            } else if entry_path.is_dir() && !entry_name.is_empty() {
                zip.add_directory(entry_name.clone() + "/", options)?;
            }
        }
    }
    Ok(())
}
