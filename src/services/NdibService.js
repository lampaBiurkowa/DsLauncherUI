import { invoke } from '@tauri-apps/api/core'

export async function getRepositories(paths) {
  return await invoke("get_repositories", { paths });
}

export async function getRepositoryMetadata(path) {
  return await invoke("get_repository_metadata", { path });
}