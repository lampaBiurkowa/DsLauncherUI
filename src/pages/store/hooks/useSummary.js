import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

function useSummary(id) {
  let [summary, setSummary] = useState();

  useEffect(() => {
    async function fetchSummary() {
      setSummary((await ProductsCache.getById(id)).rates);
    }
    fetchSummary();
  }, []);

  return summary;
}

export default useSummary;
