import React, { useEffect, useState } from "react";
import Spacer from "@/components/spacer/Spacer";
import Rating from "@/components/rating/Rating";
import CollapsedArea from "@/components/collapsed-area/CollapsedArea";
import "./Review.scss";
import { getUser } from "@/services/CacheService";
import { getProfilePath } from "@/services/PathResolver";

function useUser(id) {
  const [user, setUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      setUser(await getUser(id));
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
      getProfilePath(user?.model.guid)
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
        <Rating value={review.rate} isReadOnly={true} />
      </div>

      <CollapsedArea collapsedMaxHeight={75}>
        <span className="content">{review.content}</span>
      </CollapsedArea>
    </div>
  );
}

export default Review;
