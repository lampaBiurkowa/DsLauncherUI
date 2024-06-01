import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContextProvider";
import "./ProfileButton.scss";
import useProfileImage from "../../../services/ProfileImageService";

function UserButton({ to }) {
  const { currentUser, _ } = useContext(UserContext);

  function getUsername() {
    if (currentUser != null) {
      return `${currentUser.name} ${currentUser.surname}`;
    }

    return "Guest";
  }

  function getHandleOrTip() {
    if (currentUser != null) {
      return currentUser.alias;
    }

    return "Log in";
  }

  function getLink() {
    if (currentUser != null) {
      return to;
    }

    return "/login";
  }

  let profileImage = useProfileImage(currentUser?.guid);
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
