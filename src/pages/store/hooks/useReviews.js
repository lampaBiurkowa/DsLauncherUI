import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function useReviews(id, skip = 0, take = 1000) {
  let [reviews, setReviews] = useState();

  useEffect(() => {
    async function fetchReviews() {
      const response = await api.getReviewsByProduct(id, skip, take);
      setReviews(response);
    }
    fetchReviews();
  }, []);

  return reviews;
}

export default useReviews;
