import React, { useEffect, useRef, useState } from "react";
import "./AllReviewsView.scss";
import Review from "./Review";
import { useScrolledToBottom } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function AllReviewsView({ productId }) {
  const [reviews, setReviews] = useState();

  const scrollViewRef = useRef();
  const scrolledToBottom = useScrolledToBottom(scrollViewRef);

  useEffect(() => {
    if (scrolledToBottom || reviews == undefined) {
      (async () => {
        try {
          let nextReviews = await api.getReviewsByProduct(
            productId,
            reviews?.length ?? 0,
            10
          );
          setReviews([...(reviews ?? []), ...nextReviews]);
        } catch (error) {}
      })();
    }
  }, [scrolledToBottom]);

  return (
    <div className="reviews-container" ref={scrollViewRef}>
      {reviews?.map((review, key) => {
        return <Review review={review} key={key}></Review>;
      })}
    </div>
  );
}

export default AllReviewsView;
