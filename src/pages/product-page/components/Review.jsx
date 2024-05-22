import React from "react";
import "./Review.scss";
import Spacer from "../../../components/spacer/Spacer";
import Rating from "../../../components/rating/Rating";
import { getProfilePictureBase64 } from "../../../services/Base64Service";
import { DevelopersCache, UsersCache } from "../../../services/CacheService";

function Review({ review }) {
  return (
    <div className="review-container">
      <div className="header">
        <img
          src={getProfilePictureBase64(review.userGuid)}
          alt="Profile picture"
          className="profile-picture"
        />
        <span className="username">{UsersCache.getById(review.userGuid)?.data.name}</span>
        {DevelopersCache.getAll().filter(x => x.userGuid == review.userGuid).length > 0 ? (
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
