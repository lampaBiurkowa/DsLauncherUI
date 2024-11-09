import { invoke } from '@tauri-apps/api/core'

async function getSessionData(key) {
  return await invoke("get_session_value", { key });
}

async function setSessionData(key, value) {
  await invoke("set_session_value", { key, value });
}

const TOKEN_KEY = 'token';
const CURRENT_USER_KEY = 'currentUser';

class SessionDataHandlerSingleton {
    async getToken() {
        return await getSessionData(TOKEN_KEY);
    }

    async setToken(token) {
        await setSessionData(TOKEN_KEY, token);
    }

    async getUser() {
        return await getSessionData(CURRENT_USER_KEY);
    }

    async setUser(user) {
        await setSessionData(CURRENT_USER_KEY, user);
    }
}

export const SessionDataHandler = new SessionDataHandlerSingleton();