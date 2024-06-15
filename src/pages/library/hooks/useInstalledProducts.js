import { useServiceListener } from "@/hooks/useServiceListener";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import { useEffect, useState } from "react";
import getFilesData from "@/services/getFilesData";

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
        const ownedProducts = await api.getProductsByIds(
          Object.keys(installed.Installed)
        );

        setProducts(
          ownedProducts.map((product) => {
            return {
              model: product,
              static: getFilesData(product),
            };
          })
        );
      })();
    }
  }, [installed]);

  return products;
}
