import { invoke } from '@tauri-apps/api/core'

export async function getBase64FromFile(filePath) {
  try {
    return await invoke('read_file_as_base64', { filePath });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}
