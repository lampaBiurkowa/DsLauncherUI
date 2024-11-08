import { getProduct } from "@/services/CacheService";
import { useState, useEffect } from "react";

function useProduct(id) {
  let [product, setProduct] = useState();

  useEffect(() => {
    async function fetchProduct() {
      const response = await getProduct(id);
      setProduct(response);
    }
    
    fetchProduct();
  }, []);

  return product;
}

export default useProduct;
