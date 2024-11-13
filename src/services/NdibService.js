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
