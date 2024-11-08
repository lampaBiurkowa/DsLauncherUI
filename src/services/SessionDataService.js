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
    getToken() {
        console.log("ASDASDSAD");
        return getSessionData(TOKEN_KEY);
    }

    setToken(token) {
        console.log("424324234");
        setSessionData(TOKEN_KEY, token);
    }

    getUser() {
        return getSessionData(CURRENT_USER_KEY);
    }

    setUser(user) {
        setSessionData(CURRENT_USER_KEY, user);
    }
}

export const SessionDataHandler = new SessionDataHandlerSingleton();