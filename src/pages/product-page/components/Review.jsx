import React from "react";
import "./Review.scss";
import Spacer from "../../../components/spacer/Spacer";
import Rating from "../../../components/rating/Rating";
import { UsersCache } from "../../../services/CacheService";

function getProfilePictureBase64(userId) {
  return UsersCache.getById(userId).images.profileImageBase64;
}

function Review({ review }) {
  return (
    <div className="review-container">
      <div className="header">
        <img
          src={"data:image/png;base64," + getProfilePictureBase64(review.user.id)}
          alt="Profile picture"
          className="profile-picture"
        />
        <span className="username">{review.user.name}</span>
        {review.user.developer != undefined ? (
          <i className="developer-badge las la-certificate" title="Developer" />
        ) : (
          ""
        )}
        <Spacer />
        <p className="published">
          {new Date(review._date).toLocaleDateString()}
        </p>
        <Rating value={review.rate + 1} isReadOnly={true} />
      </div>

      <span className="content">{review.content}</span>
    </div>
  );
}

export default Review;
