import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

console.log("hej dziec");
function useProduct(id) {
  console.log("jezeli hcecie");
  let [product, setProduct] = useState();

  console.log("zonzcyc smerfu");
  
  useEffect(() => {
    async function fetchProduct() {
      const response = await ProductsCache.getById(id);
      setProduct(response);
    }
    fetchProduct();
  }, []);

  console.log("swiwaaAat");
  return product;
}

export default useProduct;
