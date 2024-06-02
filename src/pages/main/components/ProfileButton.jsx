import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "@/contexts/UserContextProvider";
import useProfileImage from "@/hooks/useProfileImage";
import "./ProfileButton.scss";

function UserButton({ to }) {
  const { currentUser } = useContext(UserContext);
  const profileImage = useProfileImage();

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
