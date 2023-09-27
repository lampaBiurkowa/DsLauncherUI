import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";
import getFilesData from "../../../services/getFilesData";

const productApi = new ProductApi();

function useProduct(id) {
  let [product, setProduct] = useState();

  useEffect(() => {
    productApi.productIdGet(id, async (error, data) => {
      if (error === null) {
        let imagesData = await getFilesData(data.name);
        setProduct({product: data, images: imagesData});
      }
    });
  }, []);

  return product;
}

export default useProduct;
