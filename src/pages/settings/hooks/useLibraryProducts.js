import { ProductsCache } from "@/services/CacheService";
import { useEffect, useState } from "react";

export function useLibraryProducts(productGuids) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      if (productGuids) {
        setProducts(await ProductsCache.getByIds(productGuids));
      }
    })();
  }, [productGuids]);

  return products;
}
