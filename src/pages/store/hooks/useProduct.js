import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

function useProduct(id) {
  let [product, setProduct] = useState();

  useEffect(() => {
    async function fetchProduct() {
      const response = await ProductsCache.getById(id);
      setProduct(response);
    }
    fetchProduct();
  }, []);

  return product;
}

export default useProduct;
