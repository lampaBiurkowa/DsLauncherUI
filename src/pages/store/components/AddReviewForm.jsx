import React, { useRef } from "react";
import Rating from "@/components/rating/Rating";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

import "./AddReviewForm.scss";

const apiClient = new DsLauncherApiClient();

function AddReviewForm({ productId, userId, onCancelled, onSubmitted }) {
  if (productId == null) throw new Error("ProductId was null.");
  if (userId == null) throw new Error("UserId was null");

  const textboxRef = useRef();

  async function addReview() {
    try {
      await apiClient.createReview({
        id: 0,
        content: textboxRef.current.value,
        productId: productId,
        userId: userId,
      });
    } catch (error) {
      console.log(`Failed to create a review: ${error}`);
    }
  }

  return (
    <div className="review-form">
      <div className="rating-box">
        <span>Rating</span>
        <Rating />
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
