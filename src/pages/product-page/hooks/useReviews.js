import { useState, useEffect } from "react";
import { ReviewApi } from "@/services/api/ReviewApi";

const reviewsApi = new ReviewApi();

function useReviews(id) {
  let [reviews, setReviews] = useState();

  useEffect(() => {
    reviewsApi.reviewProductsIdGet(id, (error, data) => {
      if (error === null) {
        setReviews(data);
      }
    });
  }, []);

  return reviews;
}

export default useReviews;
