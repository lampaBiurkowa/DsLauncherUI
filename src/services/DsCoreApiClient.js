const API_BASE_URL = "http://localhost:5218";  // Replace with your API base URL

export class User {
    constructor() {
        this.id = null;
        this.guid = null;
        this.alias = null;
        this.email = null;
        this.name = null;
        this.surname = null;
        this.profileImage = null;
        this.backgroundImage = null;
        this.lastOnline = null;
        this.createdAt = null;
        this.updatedAt = null;
        this.isDeleted = null;
    }
}

export class UserProfile {
    constructor() {
        this.id = null;
        this.guid = null;
        this.profileImage = null;
        this.backgroundImage = null;
    }
}

export class DsCoreApiClient {
    constructor() {
        this.authToken = null;
        this.baseUrl = API_BASE_URL;
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

    async getUserA() {
        const url = `${this.baseUrl}/User/a`;
        return this.request(url);
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
        const url = `${this.baseUrl}/User/${id}`;
        const options = {
            method: 'DELETE'
        };
        return this.request(url, options);
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
}

// // Example usage:
// const client = new DsCoreApiClient();

// async function exampleUsage() {
//     try {
//         const userA = await client.getUserA();
//         console.log('User A:', userA);

//         const userId = 'some-uuid';  // Replace with actual UUID
//         const onlineStatus = await client.isOnline(userId);
//         console.log(`Is user ${userId} online?`, onlineStatus);

//         const followers = await client.getFollowers(userId);
//         console.log(`Followers of user ${userId}:`, followers);

//         const newUser = {
//             alias: 'newAlias',
//             email: 'newEmail@example.com',
//             name: 'New',
//             surname: 'User'
//             // Add other fields as necessary
//         };
//         const createdUserId = await client.createUser(newUser);
//         console.log('Created User ID:', createdUserId);

//         // More API calls as needed
//     } catch (error) {
//         console.error('API call failed:', error);
//     }
// }

// exampleUsage();
