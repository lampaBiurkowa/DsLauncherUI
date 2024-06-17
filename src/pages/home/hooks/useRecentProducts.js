import { useServiceListener } from "@/hooks/useServiceListener";
import { ProductsCache } from "@/services/CacheService";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import { useEffect, useState } from "react";

const service = new DsLauncherServiceClient();

export function useRecentProducts() {
  const recent = useServiceListener("get-recent");
  const [products, setProducts] = useState();

  useEffect(() => {
    service.getRecent();
  }, []);

  useEffect(() => {
    if (recent) {
      console.log(recent);
      (async () => {
        const productDetailsPromises = recent.Recents.map(guid => ProductsCache.getById(guid));
        const detailedProducts = await Promise.all(productDetailsPromises);

        setProducts(detailedProducts);
      })();
    }
  }, [recent]);

  return products;
}
