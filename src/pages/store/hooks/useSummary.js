import { getProduct } from "@/services/CacheService";
import { useState, useEffect } from "react";

function useSummary(id, refresh) {
  let [summary, setSummary] = useState();

  useEffect(() => {
    async function fetchSummary() {
      setSummary((await getProduct(id)).rates);
    }
    
    if (refresh) {
      fetchSummary();
    }
  }, [refresh]);

  return summary;
}

export default useSummary;
