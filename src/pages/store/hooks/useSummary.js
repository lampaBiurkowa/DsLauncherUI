import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

function useSummary(id) {
  let [summary, setSummary] = useState();

  useEffect(() => {
    setSummary(ProductsCache.getById(id).rates);
  }, []);

  return summary;
}

export default useSummary;
