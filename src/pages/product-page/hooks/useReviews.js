import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function useReviews(id) {
  let [reviews, setReviews] = useState();

  useEffect(() => {
    async function fetchReviews() {
      const response = await api.getReviewsByProduct(id);
      setReviews(response);
    }
    fetchReviews();
  }, []);

  return reviews;
}

export default useReviews;
