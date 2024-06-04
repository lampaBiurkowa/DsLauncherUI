const TOKEN_KEY = 'token';
const CURRENT_USER_KEY = 'currentUser';

class LocalStorageHandlerSingleton {
    getToken() {
        return localStorage.getItem(TOKEN_KEY);
    }

    setToken(token) {
        localStorage.setItem(TOKEN_KEY, token);
    }

    getUser() {
        return localStorage.getItem(CURRENT_USER_KEY);
    }

    setUser(user) {
        localStorage.setItem(CURRENT_USER_KEY, user);
    }
}

export const LocalStorageHandler = new LocalStorageHandlerSingleton();