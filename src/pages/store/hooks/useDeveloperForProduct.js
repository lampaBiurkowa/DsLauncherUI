import { getDeveloper, getProduct } from "@/services/CacheService";
import { useState, useEffect } from "react";

function useDeveloperForProduct(productGuid) {
  let [developer, setDeveloper] = useState();

  useEffect(() => {
    async function fetchDeveloper() {
      const product = await getProduct(productGuid);
      const developer = await getDeveloper(
        product.model.developerGuid
      );
      setDeveloper(developer);
    }
    fetchDeveloper();
  }, []);

  return developer;
}

export default useDeveloperForProduct;
