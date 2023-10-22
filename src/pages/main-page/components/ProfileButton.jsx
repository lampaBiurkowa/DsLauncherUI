import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";
import "./ProfileButton.scss";
import { UsersCache } from "../../../services/CacheService";

function UserButton({ to }) {
  const { currentUser } = useContext(UserContext);

  function getProfilePictureBase64() {
    if (currentUser != null) {
      return UsersCache.getById(currentUser.id).images.profileImageBase64;
    }
  }

  function getUsername() {
    if (currentUser != null) {
      return `${currentUser.name} ${currentUser.surname}`;
    }

    return "Guest";
  }

  function getHandleOrTip() {
    if (currentUser != null) {
      return currentUser.handle;
    }

    return "Log in";
  }

  function getLink() {
    if (currentUser != null) {
      return to;
    }

    return "/login";
  }

  return (
    <NavLink className="user-button" to={getLink()}>
      <img src={getProfilePictureBase64()} alt="Profile Picture" />
      <div>
        <span className="user-name">{getUsername()}</span>
        <span className="user-handle">{getHandleOrTip()}</span>
      </div>
    </NavLink>
  );
}

export default UserButton;
