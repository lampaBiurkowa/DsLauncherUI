import { deafultBucket, publicPath } from "@/App";
import React, { useEffect, useState } from "react";
import Spacer from "@/components/spacer/Spacer";
import Rating from "@/components/rating/Rating";
import { UsersCache } from "@/services/CacheService";
import CollapsedArea from "@/components/collapsed-area/CollapsedArea";
import "./Review.scss";

function useUser(id) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      setUser(await UsersCache.getById(id));
    }
    fetchUser();
  }, []);

  return user;
}

function Review({ review }) {
  const user = useUser(review.userGuid);
  const [profileImage, setProfileImage] = useState("/img/user.png");

  useEffect(() => {
    setProfileImage(
      `${publicPath}/${deafultBucket}/${user?.model.profileImage}`
    );
  }, [user]);

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
