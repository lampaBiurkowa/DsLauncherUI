import getFilesData from "@/services/getFilesData";
import { DsCoreApiClient } from "../services/DsCoreApiClient";
import { DsLauncherApiClient } from "../services/DsLauncherApiClient";

class CachedObjects {
  constructor() {
    this.data = {};
  }

  async getById(id) {
    if (this.data.hasOwnProperty(id) && this.data[id].expire > Date.now()) {
      return this.data[id];
    } else {
      return await this.loadItem(id);
    }
  }

  async getByIds(ids) {
    const results = [];
    const idsToLoad = [];

    for (const id of ids) {
      if (this.data.hasOwnProperty(id) && this.data[id].expire > Date.now()) {
        results.push(this.data[id]);
      } else {
        idsToLoad.push(id);
      }
    }

    if (idsToLoad.length > 0) {
      const loadedItems = await Promise.all(idsToLoad.map(id => this.loadItem(id)));
      results.push(...loadedItems);
    }

    return results;
  }

  setById(id, item) {
    return (this.data[id] = item);
  }

  getExpirationTimestamp(minsAhead) {
    return new Date(Date.now() + minsAhead * 60000);
  }
}

class UsersCacheSingleton extends CachedObjects {
  constructor() {
    super();
    this.userApi = new DsCoreApiClient();
    this.launcherApi = new DsLauncherApiClient();
  }

  async loadItem(id) {
    var model = await this.userApi.getUserById(id);
    var isDeveloper = !model.isDeleted && (await this.launcherApi.getDeveloperByUser(id)).length > 0;
    this.data[id] = { model: model, isDeveloper: isDeveloper, expire: this.getExpirationTimestamp(30) }

    return this.data[id];
  }
}

class ProductsCacheSingleton extends CachedObjects {
  constructor() {
    super();
    this.launcherApi = new DsLauncherApiClient();
  }
  
  async getRates(productId) {
    const data = await this.launcherApi.getReviewBreakdown(productId);
    return {
      rateCounts: data,
      avg:
        (data.reduce((sum, count, index) => sum + count * (index + 1), 0) /
        data.reduce((sum, count) => sum + count, 0)).toFixed(1)
    };
  }

  async loadItem(productGuid) {
    const [model, rates, latestVersion] = await Promise.all([
      this.launcherApi.getProductById(productGuid),
      this.getRates(productGuid),
      this.launcherApi.getLatestProductPackage(productGuid),
    ]);

    this.data[productGuid] = {
      model: model,
      static: getFilesData(model),
      rates: rates,
      latestVersion: latestVersion,
      expire: this.getExpirationTimestamp(30)
    };

    return this.data[productGuid];
  }

  async refreshRates(productGuid) {
    this.data[productGuid].rates = await this.getRates(productGuid);
  }
}

class DevelopersCacheSingleton extends CachedObjects {
  constructor() {
    super();
    this.launcherApi = new DsLauncherApiClient();
  }

  async loadItem(developerGuid) {
    var model = await this.launcherApi.getDeveloperById(developerGuid);
    this.data[developerGuid] = { model: model, expire: this.getExpirationTimestamp(30) };
    
    return this.data[developerGuid];
  }
}

class CurrenciesCacheSingleton extends CachedObjects {
  constructor() {
    super();
    this.coreApi = new DsCoreApiClient();
  }

  async loadItem(name) {
    var model = await this.coreApi.getCurrencyByName(name);
    this.data[name] = { model: model, expire: this.getExpirationTimestamp(30) };
    
    return this.data[name];
  }
}

export const CurrenciesCache = new CurrenciesCacheSingleton();
export const DevelopersCache = new DevelopersCacheSingleton();
export const ProductsCache = new ProductsCacheSingleton();
export const UsersCache = new UsersCacheSingleton();
