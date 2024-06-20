import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

function useSummary(id, refresh) {
  let [summary, setSummary] = useState();

  useEffect(() => {
    async function fetchSummary() {
      setSummary((await ProductsCache.getById(id)).rates);
    }
    
    if (refresh) {
      fetchSummary();
    }
  }, [refresh]);

  return summary;
}

export default useSummary;
