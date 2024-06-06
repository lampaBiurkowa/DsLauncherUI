import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { ProductsCache } from "@/services/CacheService";

const api = new DsLauncherApiClient();

const classificationToImage = {
  "AGE_3": "pegi3.jpg",
  "AGE_7": "pegi7.jpg",
  "AGE_12": "pegi12.jpg",
  "AGE_16": "pegi16.jpg",
  "AGE_18": "pegi18.jpg"
};

function usePegi(productGuid) {
  let [pegi, setPegi] = useState();

  useEffect(() => {
    async function fetchPegi() {
      var product = await ProductsCache.getById(productGuid);
      if (product.model.productType != "Game") return null;

      const game = await api.getGameById(productGuid);
      setPegi(`/img/${classificationToImage[game.contentClassification]}`);
    }
    fetchPegi();
  }, []);

  return pegi;
}

export default usePegi;
