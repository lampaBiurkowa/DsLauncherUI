export class DsAuthApiClient {
    constructor() {
        this.baseUrl = "http://localhost:5217";
    }

    async request(url, options = {}) {
        options.headers = options.headers || {};
        options.headers['Authorization'] = `Bearer ${localStorage.getItem('token', )}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, ${error}`);
        }
        return response.json();
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
}