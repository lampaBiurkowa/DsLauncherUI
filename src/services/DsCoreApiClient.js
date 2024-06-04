import { LocalStorageHandler } from "./LocalStorageService";

const API_BASE_URL = "http://localhost:5218";

export class DsCoreApiClient {
    constructor() {
        this.authToken = null;
        this.baseUrl = API_BASE_URL;
    }
    
    async request(url, options = {}, isText = false) {
        options.headers = options.headers || {};
        options.headers['Authorization'] = `Bearer ${LocalStorageHandler.getToken()}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, ${error}`);
        }

        if (isText) return response.text();
        
        return response.json();
    }

    async reportOnline(id) {
        const url = `${this.baseUrl}/User/ReportOnline/${id}`;
        return this.request(url);
    }

    async isOnline(id) {
        const url = `${this.baseUrl}/User/IsOnline/${id}`;
        return this.request(url);
    }

    async getFollowers(id) {
        const url = `${this.baseUrl}/User/Followers/${id}`;
        return this.request(url);
    }

    async getFollowing(id) {
        const url = `${this.baseUrl}/User/Following/${id}`;
        return this.request(url);
    }

    async getIdByAlias(alias) {
        const url = `${this.baseUrl}/User/GetId/${alias}`;
        return this.request(url);
    }

    async getUsers(skip = 0, take = 1000) {
        const url = `${this.baseUrl}/User?skip=${skip}&take=${take}`;
        return this.request(url);
    }

    async createUser(user) {
        const url = `${this.baseUrl}/User`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return this.request(url, options);
    }

    async getUserById(id) {
        const url = `${this.baseUrl}/User/${id}`;
        return this.request(url);
    }

    async updateUser(user) {
        const url = `${this.baseUrl}/User`;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return this.request(url, options);
    }

    async deleteUser(id) {
        const url = `${this.baseUrl}/User?id=${id}`;
        const options = {
            method: 'DELETE'
        };
        return this.request(url, options, true);
    }

    async getUsersByIds(ids) {
        const url = `${this.baseUrl}/User/ids`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ids)
        };
        return this.request(url, options);
    }

    async uploadProfileImage(file, fileName) {
        const url = `${this.baseUrl}/User/UploadProfileImage`;
        const formData = new FormData();
        formData.append('file', file, fileName);

        const options = {
            method: 'POST',
            body: formData
        };
        return this.request(url, options, true);
    }

    async login(userId, passwordBase64) {
        const url = `${this.baseUrl}/Auth/login/${userId}?passwordBase64=${encodeURIComponent(passwordBase64)}`;
        const options = {
            method: 'POST'
        };
        
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to login');
        }
    
        return response.text();
    }

    async register(user, passwordBase64) {
        const url = `${this.baseUrl}/Auth/register?passwordBase64=${encodeURIComponent(passwordBase64)}`;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return this.request(url, options);
    }

    async activate(userId, verificationCodeBase64) {
        const url = `${this.baseUrl}/Auth/activate/${userId}?verificationCodeBase64=${encodeURIComponent(verificationCodeBase64)}`;
        const options = {
            method: 'POST'
        };
        return this.request(url, options);
    }

    async changePassword(userId, oldPasswordBase64, newPasswordBase64) {
        const url = `${this.baseUrl}/Auth/changePassword/${userId}?oldPasswordBase64=${encodeURIComponent(oldPasswordBase64)}&newPasswordBase64=${encodeURIComponent(newPasswordBase64)}`;
        const options = {
            method: 'POST'
        };
        return this.request(url, options);
    }
    
    async getCurrencyById(id) {
        const url = `${this.baseUrl}/Currency/${id}`;
        return this.request(url);
    }
    
    async getCurrencyByName(name) {
        const url = `${this.baseUrl}/Currency/name/${name}`;
        return this.request(url);
    }

    async getCurrencies() {
        const url = `${this.baseUrl}/Currency`;
        return this.request(url);
    }

    async getMoney(currencyGuid) {
        const url = `${this.baseUrl}/Billing/money/${currencyGuid}`;
        return this.request(url);
    }
}