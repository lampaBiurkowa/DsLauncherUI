import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useEffect, useState } from "react";

const api = new DsLauncherApiClient();

export function useOwnedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      setProducts(await api.getProductsByUser());
    })();
  }, []);

  return products;
}
