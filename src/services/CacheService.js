import { ProductApi, UserApi, UserImagesApi } from "../pages";
import getFilesData from "@/services/getFilesData";

class CachedObjects {
  constructor() {
    this.data = {};
  }

  getById(id) {
    return this.data[id.toString()];
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
    return new Promise((resolve, reject) => {
      const uesrApi = new UserApi();
      uesrApi.userGetPublicGet((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  async load() {
    var users = await this.fetchUsers();
    
    const uesrImagesApi = new UserImagesApi();
    for (var i = 0; i < users.length; i++) {
      this.data[users[i].id] = {data: users[i], images: {
        id: users[i].id,
        profileImageBase64: "data:image/png;base64,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",
        bckgroundImageBase64: ""
      }};
      uesrImagesApi.userImagesIdGet(users[i].id, (error, json) => {
        if (error === null && json !== null) {
          this.data[json.id].images = json ;
        }
      });
    }
  }
}

class ProductssCacheSingleton extends CachedObjects {
  constructor() {
    super();
  }

  async fetchProducts()  {
    return new Promise((resolve, reject) => {
      const productApi = new ProductApi();
      productApi.productGet({skip:0,take:1000}, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };

  async getRates(productId) {
    return new Promise((resolve, reject) => {
      const productApi = new ProductApi();
      productApi.productIdRatesGet(productId, (ratesError, ratesData) => {
        if (ratesError !== null) {
          reject(ratesError);
        } else {
          resolve(ratesData);
        }
      });
    });
  }

  async load() {
    console.log("malpa");
    var products = await this.fetchProducts();
    var result = [];
    for (var i = 0; i < products.length; i++) {
      console.log(i);
      this.data[products[i].id] = { data: products[i], static: await getFilesData(products[i].name), rates: await this.getRates(products[i].id) };
    }
    return result;
  };
}

export const ProductsCache = new ProductssCacheSingleton();
export const UsersCache = new UsersCacheSingleton();