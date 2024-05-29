import React, { useContext, useEffect, useState } from "react";
import "./Review.scss";
import Spacer from "@/components/spacer/Spacer";
import Rating from "@/components/rating/Rating";
import useProfileImage from "@/services/ProfileImageService";
import { DevelopersCache, UsersCache } from "@/services/CacheService";
import CollapsedArea from "@/components/collapsed-area/CollapsedArea";

function useUser(id) {
  let [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      setUser(await UsersCache.getById(id));
    }
    fetchUser();
  }, []);

  return user;
}

function Review({ review }) {
  let user = useUser(review.userGuid);
  console.log("wyt", review.userGuid);
  let profileImage = useProfileImage(review.userGuid);
  return (
    <div className="review-container">
      <div className="header">
        <img
          src={profileImage}
          alt="Profile picture"
          className="profile-picture"
        />
        <span className="username">
          {user?.model.name} {user?.model.surname}
        </span>
        {user?.isDeveloper ? (
          <i className="developer-badge las la-certificate" title="Developer" />
        ) : (
          ""
        )}
        <Spacer />
        <p className="published">
          {new Date(review.createdAt).toLocaleDateString()}
        </p>
        <Rating value={review.rate + 1} isReadOnly={true} />
      </div>

      <CollapsedArea collapsedMaxHeight={75}>
        <span className="content">{review.content}</span>
      </CollapsedArea>
    </div>
  );
}

export default Review;
