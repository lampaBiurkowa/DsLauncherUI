import getFilesData from "@/services/getFilesData";
import { DsCoreApiClient } from "../services/DsCoreApiClient";
import { DsLauncherApiClient } from "../services/DsLauncherApiClient";
import * as fs from "@tauri-apps/plugin-fs";

const CACHE_PATH = 'cache.json';

class CachedObjects {
  constructor() {
    this.data = {};
    this.cachePath = `${this.constructor.name}-${CACHE_PATH}`;
  }

  async getById(id) {
    if (this.data.hasOwnProperty(id) && this.data[id].expire > Date.now()) {
      console.log(this.data, 'curren');
      return this.data[id];
    } else {
      return await this.loadItem(id);
    }
  }

  setById(id, item) {
    return (this.data[id] = item);
  }

  getExpirationTimestamp(minsAhead) {
    return new Date(Date.now() + minsAhead * 60000);
  }

  async dump() {
    await fs.writeFile(this.cachePath, JSON.stringify(this.data));
  }

  async load() {
    if (await fs.exists(this.cachePath))
      this.data = JSON.parse(await fs.readFile(this.cachePath));
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
    var isDeveloper = await this.launcherApi.getDeveloperByUser(id);
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
    var result = [];
    this.data[productGuid] = {
      model: model,
      static: getFilesData(model),
      rates: rates,
      latestVersion: latestVersion,
      expire: this.getExpirationTimestamp(30)
    };

    return result;
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
    
    console.log(this.data[name], 'curren');
    return this.data[name];
  }
}

export const CurrenciesCache = new CurrenciesCacheSingleton();
export const DevelopersCache = new DevelopersCacheSingleton();
export const ProductsCache = new ProductsCacheSingleton();
export const UsersCache = new UsersCacheSingleton();
