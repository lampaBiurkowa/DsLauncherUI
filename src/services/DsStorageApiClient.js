export class DsStorageApiClient {
    constructor() {
        this.baseUrl = "http://localhost:5219";
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

    async getUrl() {
        const url = `${this.baseUrl}/Storage`;
        const options = {
            method: 'GET'
        };
        
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Failed to login');
        }
    
        return response.text();
    }
}