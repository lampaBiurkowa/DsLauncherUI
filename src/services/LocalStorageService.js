import { invoke } from '@tauri-apps/api/core'

async function getSessionData(key) {
  return await invoke("execute_command", { key });
}

async function setSessionData(key, value) {
  await invoke("execute_command", { key, value});
}

const TOKEN_KEY = 'token';
const CURRENT_USER_KEY = 'currentUser';

class LocalStorageHandlerSingleton {
    getToken() {
        return getSessionData(TOKEN_KEY);
    }

    setToken(token) {
        setSessionData(TOKEN_KEY, token);
    }

    getUser() {
        return getSessionData(CURRENT_USER_KEY);
    }

    setUser(user) {
        setSessionData(CURRENT_USER_KEY, user);
    }
}

export const LocalStorageHandler = new LocalStorageHandlerSingleton();