import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";
import "./ProfileButton.scss";
import { getProfilePictureBase64 } from "../../../services/Base64Service";
import { useState, useEffect } from "react";

function UserButton({ to }) {
  const { currentUser } = useContext(UserContext);

  function useProfileImage() {
  
    let [profileImage, setProfileImage] = useState([]);
    useEffect(() => {
      setProfileImage(getProfilePictureBase64(currentUser?.id));
    }, []);
  
    return profileImage;
  }
  
  function getUsername() {
    if (currentUser != null) {
      return `${currentUser.name} ${currentUser.surname}`;
    }

    return "Guest";
  }

  function getHandleOrTip() {
    if (currentUser != null) {
      return `${currentUser.money} $`;
    }

    return "Log in";
  }

  function getLink() {
    if (currentUser != null) {
      return to;
    }

    return "/login";
  }

  let profileImage = useProfileImage();
  return (
    <NavLink className="user-button" to={getLink()}>
      <img src={profileImage} alt="Profile Picture" />
      <div>
        <span className="user-name">{getUsername()}</span>
        <span className="user-handle">{getHandleOrTip()}</span>
      </div>
    </NavLink>
  );
}

export default UserButton;
