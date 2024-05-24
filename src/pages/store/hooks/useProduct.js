import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

console.log("hej dziec");
function useProduct(id) {
  console.log("jezeli hcecie");
  let [product, setProduct] = useState();

  console.log("zonzcyc smerfu");
  useEffect(() => {
    console.log("hej", id, ProductsCache.getById(id));
    setProduct(ProductsCache.getById(id));
  }, []);

  console.log("swiwaaAat");
  return product;
}

export default useProduct;
