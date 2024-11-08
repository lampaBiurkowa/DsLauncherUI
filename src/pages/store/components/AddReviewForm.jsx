import React, { useRef, useState } from "react";
import Rating from "@/components/rating/Rating";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

import "./AddReviewForm.scss";
import { getProduct } from "@/services/CacheService";

const apiClient = new DsLauncherApiClient();

function AddReviewForm({ productId, userId, onCancelled, onSubmitted }) {
  if (productId == null) throw new Error("ProductId was null.");
  if (userId == null) throw new Error("UserId was null");

  const [rating, setRating] = useState();
  const textboxRef = useRef();

  async function addReview() {
    let success = false;
    try {
      await apiClient.createReview({
        content: textboxRef.current.value,
        rate: rating,
        productGuid: productId,
      });
      success = true;
    } catch (error) {
      console.log(`Failed to create a review: ${error}`);
    }
    if (success) {
      await getProduct(productId);
    }
  }

  return (
    <div className="review-form">
      <div className="rating-box">
        <span>Rating</span>
        <Rating onValueChanged={setRating} />
      </div>
      <div className="details-box">
        <span>Review (optional)</span>
        <textarea ref={textboxRef} />
      </div>
      <div className="submit-area">
        <button
          className="accent outlined disabled"
          onClick={async () => {
            await addReview();
            onSubmitted();
          }}
        >
          Add review
        </button>
        <button onClick={() => onCancelled()}>Cancel</button>
      </div>
    </div>
  );
}

export default AddReviewForm;
