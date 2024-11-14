import { invoke } from '@tauri-apps/api/core'

export async function getRepositories(paths) {
  return await invoke("get_repositories", { paths });
}

export async function getRepositoryMetadata(path) {
  return await invoke("get_repository_metadata", { path });
}

export async function getRepositoryFiles(path) {
  return await invoke("get_repository_files", { path });
}

export async function pullProduct(productGuid, libraryPath) {
  return await invoke("pull", { id: productGuid, path: libraryPath });
}

export async function init(name, description, productType, contentClassification, price, path) {
  return await invoke("init", { name, description, productType, contentClassification, price, tags: "", path });
}

export async function save(metadata, paths, repoPath) {
  //hzd :D/
  metadata.price = parseFloat(metadata.price);
  metadata.minRamMib = parseInt(metadata.minRamMib);
  metadata.minDiskMib = parseInt(metadata.minDiskMib);
  return await invoke("save", { metadata, paths, path: repoPath });
}
