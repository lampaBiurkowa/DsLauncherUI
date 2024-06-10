import React, { useEffect, useRef, useState } from "react";
import { useScrolledToEnd } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import Review from "./Review";
import "./AllReviewsView.scss";

const api = new DsLauncherApiClient();

function AllReviewsView({ productId }) {
  const [reviews, setReviews] = useState([]);

  const scrollViewRef = useScrolledToEnd(async () => {
    try {
      let nextReviews = await api.getReviewsByProduct(
        productId,
        reviews?.length ?? 0,
        10
      );
      if (nextReviews?.length > 0) {
        setReviews([...(reviews ?? []), ...nextReviews]);
      }
    } catch (error) {}
  });

  return (
    <div className="reviews-container" ref={scrollViewRef}>
      {reviews?.map((review, key) => {
        return <Review review={review} key={key}></Review>;
      })}
    </div>
  );
}

export default AllReviewsView;
