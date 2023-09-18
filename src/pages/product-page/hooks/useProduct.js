import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";

const productApi = new ProductApi();

function useProduct(id) {
  let [product, setProduct] = useState();

  useEffect(() => {
    productApi.productGetIdGet(id, (error, data) => {
      if (error === null) {
        setProduct(data);
      }
    });
  }, []);

  return product;
}

export default useProduct;
