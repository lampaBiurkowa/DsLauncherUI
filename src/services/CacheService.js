import { invoke } from '@tauri-apps/api/core'

async function getById(itemType, id) {
  return await invoke("get_item", { itemType: itemType, id: id });
}

async function getByIds(itemType, ids) {
  return await invoke("get_items", { itemType: itemType, ids: ids });
}

export async function getDeveloper(id) {
  return await getById("developer", id);
}

export async function getProduct(id) {
  return await getById("product", id);
}

export async function getProducts(ids) {
  return await getByIds("product", ids);
}

export async function getUser(id) {
  return await getById("user", id);
}

export async function getTagGroup(id) {
  return await getById("tagGroup", id);
}

export async function getTags(ids) {
  return await getByIds("tag", ids);
}