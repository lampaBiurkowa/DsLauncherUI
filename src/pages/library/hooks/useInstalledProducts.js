import { useServiceListener } from "@/hooks/useServiceListener";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/CacheService";
const api = new DsLauncherApiClient();
const service = new DsLauncherServiceClient();

export function useInstalledProducts() {
  const installed = useServiceListener("get-installed");
  const [products, setProducts] = useState();

  useEffect(() => {
    service.getInstalled();
  }, []);

  useEffect(() => {
    if (installed) {
      (async () => {
        const ownedProducts = await getProducts(
          Object.keys(installed.Installed)
        );
        console.log(ownedProducts);
        setProducts(ownedProducts);
      })();
    }
  }, [installed]);

  return products;
}
