use std::fs::create_dir;
use std::path::Path;

use tauri::command;
use crate::ndib::error::NdibError;
use crate::ndib::helpers::consts::{MANIFEST_CORE, MANIFEST_LINUX, MANIFEST_MAC, MANIFEST_WIN, METADATA_FILE, NDIB_FOLDER};
use crate::ndib::helpers::utils::save_serialized_ndib_object;
use crate::ndib::models::{ndib_data::NdibData, product_type::ProductType, content_classification::ContentClassification};
use crate::File;

#[command]
pub(crate) fn init(
    name: &str,
    description: &str,
    product_type: ProductType,
    content_classification: Option<ContentClassification>,
    price: f32,
    tags: &str,
    path: &str
) -> Result<(), NdibError> {
    create_dir(Path::new(path).join(name))?;
    create_dir(Path::new(path).join(name).join(NDIB_FOLDER))?;

    let manifest_files = [
        MANIFEST_CORE,
        MANIFEST_WIN,
        MANIFEST_LINUX,
        MANIFEST_MAC,
    ];

    for &manifest_file in &manifest_files {
        let manifest_path = Path::new(path).join(name).join(NDIB_FOLDER).join(manifest_file);
        if let Err(e) = File::create(&manifest_path) {
            return Err(NdibError::FileCreationError(manifest_path, e));
        }
    }
    
    if (product_type == ProductType::Music || product_type == ProductType::App) && content_classification.is_some() {
        return Err(NdibError::ValidationError);
    }

    let product = NdibData {
        name: name.to_owned(),
        description: description.to_owned(),
        tags: vec![tags.to_owned()],
        price,
        product_type,
        content_classification,
        ..Default::default()
    };
    save_serialized_ndib_object(&product, METADATA_FILE, path)?;
    Ok(())
}