import { useState, useEffect } from "react";
import { DevelopersCache, ProductsCache } from "../../../services/CacheService";

function useDeveloperForProduct(productGuid) {
  let [developer, setDeveloper] = useState();

  useEffect(() => {
    async function fetchDeveloper() {
      const product = await ProductsCache.getById(productGuid);
      const developer = await DevelopersCache.getById(product.model.developerGuid);
      setDeveloper(developer);
    }
    fetchDeveloper();
  }, []);

  return developer;
}

export default useDeveloperForProduct;
