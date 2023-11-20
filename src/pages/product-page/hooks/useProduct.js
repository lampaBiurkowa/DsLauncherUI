import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";
import { ProductsCache } from "../../../services/CacheService";

const productApi = new ProductApi();

function useProduct(id) {
  let [product, setProduct] = useState();

  useEffect(() => {
    setProduct(ProductsCache.getById(id));
  }, []);

  return product;
}

export default useProduct;
