import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";

const productApi = new ProductApi();

function useSummary(id) {
  let [summary, setSummary] = useState();

  useEffect(() => {
    productApi.productIdRatesGet(id, (error, data) => {
      if (error === null) {
        setSummary(data);
      }
    });
  }, []);

  return summary;
}

export default useSummary;
