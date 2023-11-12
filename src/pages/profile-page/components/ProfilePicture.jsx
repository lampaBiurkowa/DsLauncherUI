import React from "react";
import "./ProfilePicture.scss";

function ProfilePicture({ src, readonly }) {
  return (
    <div className={`profile-picture`}>
      <div style={{ backgroundImage: `url(${src})` }} className="image" />
      {!readonly ? (
        <button className="select-btn">
          <i class="las la-camera"></i>
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfilePicture;
