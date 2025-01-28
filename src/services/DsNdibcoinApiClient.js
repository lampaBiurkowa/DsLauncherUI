import { ConfigurationHandler } from "./ConfigurationService";
import { SessionDataHandler } from "./SessionDataService";

export class DsNdibcoinApiClient {
    constructor() {
        this.authToken = null;
        this.baseUrl = ConfigurationHandler.getNdibcoinApiUrl();
    }
    
    async request(url, options = {}, isText = false) {
        options.headers = options.headers || {};
        options.headers['Authorization'] = `Bearer ${await SessionDataHandler.getToken()}`;
        const response = await fetch(url, options);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, ${error}`);
        }

        if (isText) return response.text();
        
        return response.json();
    }

    // async createUser(user) {
    //     const url = `${this.baseUrl}/User`;
    //     const options = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(user)
    //     };
    //     return this.request(url, options);
    // }

    async getMoney() {
        const url = `${this.baseUrl}/Transaction/money`;
        return this.request(url);
    }
}