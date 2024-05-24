import getFilesData from "@/services/getFilesData";
import { DsIdentityApiClient } from "../services/DsIdentityApiClient"
import { DsLauncherApiClient } from "../services/DsLauncherApiClient"
class CachedObjects {
  constructor() {
    this.data = {};
  }

  getById(id) {
    return this.data[id];
  }

  setById(id, item) {
    return this.data[id] = item;
  }

  getAll() {
    var result = [];
    for (var key in this.data) {
      result.push(this.data[key]);
    }

    return result;
  }
}

class UsersCacheSingleton extends CachedObjects {
  constructor() {
    super();
  }

  async fetchUsers() {
    const userApi = new DsIdentityApiClient();
    return await userApi.getUsers();
  };

  async load() {
    var users = await this.fetchUsers();
    
    for (var i = 0; i < users.length; i++) {
      this.data[users[i].guid] = users[i]
    }
  }
}

class ProductsCacheSingleton extends CachedObjects {
  constructor() {
    super();
  }

  async fetchProducts()  {
      const api = new DsLauncherApiClient();
      return await api.getProducts();
  };

  async getRates(productId) {
    const api = new DsLauncherApiClient();
    const data = await api.getReviewBreakdown(productId);
    return {
      rateCounts: data,
      avg: data.reduce((sum, count, index) => sum + count * (index + 1), 0) / data.reduce((sum, count) => sum + count, 0)
    };
  }

  async load() {
    var products = await this.fetchProducts();
    var result = [];
    for (var i = 0; i < products.length; i++) {
      console.log(products[i]);
      this.data[products[i].guid] = { data: products[i], static: await getFilesData(products[i].name), rates: await this.getRates(products[i].guid) };
    }
    return result;
  };
}

class DevelopersCacheSingleton extends CachedObjects {
  constructor() {
    super();
  }

  async fetchDevelopers() {
    const api = new DsLauncherApiClient();
    return await api.getDevelopers();
  };

  async load() {
    var developers = await this.fetchDevelopers();
    for (var i = 0; i < developers.length; i++) {
      this.data[developers[i].guid] = developers[i];
    }
  }
}

export const DevelopersCache = new DevelopersCacheSingleton();
export const ProductsCache = new ProductsCacheSingleton();
export const UsersCache = new UsersCacheSingleton();