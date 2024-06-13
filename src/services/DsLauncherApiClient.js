import { LocalStorageHandler } from "./LocalStorageService";

const API_BASE_URL = "http://localhost:5216";

export class DsLauncherApiClient {
  constructor() {
    this.authToken = null;
    this.baseUrl = API_BASE_URL;
  }

  async request(url, options = {}) {
    options.headers = options.headers || {};
    options.headers[
      "Authorization"
    ] = `Bearer ${LocalStorageHandler.getToken()}`;
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, ${error}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType) {
      return null;
    }

    if (contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text();
    }
  }

  //Product
  async getProducts(skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Product?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async createProduct(product) {
    const url = `${this.baseUrl}/Product`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    return this.request(url, options);
  }

  async getProductById(id) {
    const url = `${this.baseUrl}/Product/${id}`;
    return this.request(url);
  }

  async updateProduct(product) {
    const url = `${this.baseUrl}/Product`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    return this.request(url, options);
  }

  async deleteProduct(id) {
    const url = `${this.baseUrl}/Product/${id}`;
    const options = {
      method: "DELETE",
    };
    return this.request(url, options);
  }

  async getProductsByIds(ids) {
    const url = `${this.baseUrl}/Product/ids`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    };
    return this.request(url, options);
  }

  async getProductsByDeveloper(developerId, skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Product/developer/${developerId}?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async getProductsByUser() {
    const url = `${this.baseUrl}/Product/user`;
    return this.request(url);
  }

  async searchProducts(query, skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Product/search/?query=${query}&skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async purchaseProduct(guid) {
    const url = `${this.baseUrl}/Purchase/Product/${guid}`;
    const options = {
      method: "POST",
    };
    return this.request(url, options);
  }

  async purchaseDeveloperAccount(developer) {
    const url = `${this.baseUrl}/Purchase/developer-access/new`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(developer),
    };
    return this.request(url, options);
  }

  async joinDeveloperAccount(developerKey) {
    const url = `${this.baseUrl}/Purchase/developer-access?developerKey=${developerKey}`;
    const options = {
      method: "POST",
    };
    return this.request(url, options);
  }

  //Game
  async getGames(skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Game?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async getGameById(id) {
    const url = `${this.baseUrl}/Game/${id}`;
    return this.request(url);
  }

  //App
  async getApps(skip = 0, take = 1000) {
    const url = `${this.baseUrl}/App?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  //News
  async getNews(skip = 0, take = 1000) {
    const url = `${this.baseUrl}/News?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async createNews(news) {
    const url = `${this.baseUrl}/News`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(news),
    };
    return this.request(url, options);
  }

  async getNewsById(id) {
    const url = `${this.baseUrl}/News/${id}`;
    return this.request(url);
  }

  async updateNews(news) {
    const url = `${this.baseUrl}/News`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(news),
    };
    return this.request(url, options);
  }

  async deleteNews(id) {
    const url = `${this.baseUrl}/News/${id}`;
    const options = {
      method: "DELETE",
    };
    return this.request(url, options);
  }

  async getNewsByIds(ids) {
    const url = `${this.baseUrl}/News/ids`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    };
    return this.request(url, options);
  }

  async getNewsByDeveloper(developerGuid) {
    const url = `${this.baseUrl}/News/developer/${developerGuid}`;
    return this.request(url);
  }

  //DEVELOPER
  async getDevelopers(skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Developer?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async createDeveloper(developer) {
    const url = `${this.baseUrl}/Developer`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(developer),
    };
    return this.request(url, options);
  }

  async getDeveloperById(id) {
    const url = `${this.baseUrl}/Developer/${id}`;
    return this.request(url);
  }

  async updateDeveloper(developer) {
    const url = `${this.baseUrl}/Developer`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(developer),
    };
    return this.request(url, options);
  }

  async deleteDeveloper(id) {
    const url = `${this.baseUrl}/Developer/${id}`;
    const options = {
      method: "DELETE",
    };
    return this.request(url, options);
  }

  async getDevelopersByIds(ids) {
    const url = `${this.baseUrl}/Developer/ids`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    };
    return this.request(url, options);
  }

  async getDeveloperByUser(userGuid) {
    const url = `${this.baseUrl}/Developer/user/${userGuid}`;
    return this.request(url);
  }

  async uploadDeveloperLogo(developerGuid, file, fileName) {
    const url = `${this.baseUrl}/Developer/${developerGuid}/UploadProfileImage`;
    const formData = new FormData();
    formData.append("file", file, fileName);

    const options = {
      method: "POST",
      body: formData,
    };
    return this.request(url, options);
  }

  async hasUserSubscribed(developerGuid) {
    const url = `${this.baseUrl}/Developer/${developerGuid}/user-subscribed`;
    return this.request(url);
  }

  async getSubscriptions(developerGuid) {
    const url = `${this.baseUrl}/Developer/${developerGuid}/subscriptions`;
    return this.request(url);
  }

  //Review
  async getReviews(skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Review?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async createReview(review) {
    const url = `${this.baseUrl}/Review`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    };
    return this.request(url, options);
  }

  async getReviewById(id) {
    const url = `${this.baseUrl}/Review/${id}`;
    return this.request(url);
  }

  async updateReview(review) {
    const url = `${this.baseUrl}/Review`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    };
    return this.request(url, options);
  }

  async deleteReview(id) {
    const url = `${this.baseUrl}/Review/${id}`;
    const options = {
      method: "DELETE",
    };
    return this.request(url, options);
  }

  async getReviewsByIds(ids) {
    const url = `${this.baseUrl}/Review/ids`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    };
    return this.request(url, options);
  }

  async getReviewsByProduct(productId, skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Review/product/${productId}?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async getReviewBreakdown(productId) {
    const url = `${this.baseUrl}/Review/product/${productId}/breakdown`;
    return this.request(url);
  }

  //Package
  async getPackages(skip = 0, take = 1000) {
    const url = `${this.baseUrl}/Package?skip=${skip}&take=${take}`;
    return this.request(url);
  }

  async createPackage(dsPackage) {
    const url = `${this.baseUrl}/Package`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dsPackage),
    };
    return this.request(url, options);
  }

  async getPackageById(id) {
    const url = `${this.baseUrl}/Package/${id}`;
    return this.request(url);
  }

  async updatePackage(dsPackage) {
    const url = `${this.baseUrl}/Package`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dsPackage),
    };
    return this.request(url, options);
  }

  async deletePackage(id) {
    const url = `${this.baseUrl}/Package/${id}`;
    const options = {
      method: "DELETE",
    };
    return this.request(url, options);
  }

  async getPackagesByIds(ids) {
    const url = `${this.baseUrl}/Package/ids`;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ids),
    };
    return this.request(url, options);
  }

  async getLatestProductPackage(productId) {
    const url = `${this.baseUrl}/Package/latest/${productId}`;
    return this.request(url);
  }
}
