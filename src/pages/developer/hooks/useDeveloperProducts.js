import { getProduct } from "@/services/CacheService";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useEffect, useState } from "react";

const api = new DsLauncherApiClient();

export function useDeveloperProducts(developerGuid) {
  const [products, setProducts] = useState();
  useEffect(() => {
    (async () => {
      const productGuids = (await api.getProductsByDeveloper(developerGuid)).map(product => product.guid);
      const productDetailsPromises = productGuids.map(guid => getProduct(guid));
      const detailedProducts = await Promise.all(productDetailsPromises);
      setProducts(detailedProducts);
    })();
  }, []);

  return products;
}
