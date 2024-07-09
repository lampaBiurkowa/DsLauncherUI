import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function useOwnsProduct(productGuid) {
  let [ownsProduct, setOwnsProduct] = useState();

  useEffect(() => {
    async function fetchOwnsProduct() {
      setOwnsProduct((await api.getProductsByUser()).filter(x => x == productGuid).length > 0);
    }
    
    fetchOwnsProduct();
  }, []);

  return ownsProduct;
}

export default useOwnsProduct;
