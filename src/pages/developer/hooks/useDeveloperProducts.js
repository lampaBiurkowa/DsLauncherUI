import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import getFilesData from "@/services/getFilesData";
import { useEffect, useState } from "react";

const api = new DsLauncherApiClient();

export function useDeveloperProducts(developerGuid) {
  const [products, setProducts] = useState();

  useEffect(() => {
    (async () => {
      try {
        // setProducts(await api.getProductsByDeveloper(developerGuid));
        setProducts(
          (await api.getProductsByDeveloper(developerGuid))?.map((p) => {
            return { ...p, static: getFilesData(p) };
          })
        );
      } catch {}
    })();
  }, []);

  return products;
}
