import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/UserButton.scss";
import { UserContext } from "../contexts/UserContextProvider";

function UserButton({ to }) {
  const { currentUser } = useContext(UserContext);

  function getProfilePictureUrl() {
    if (currentUser != null) {
      return currentUser.pictureUrl;
    }

    return "/img/user.png";
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

    return "Press to log in";
  }

  function getLink() {
    if (currentUser != null) {
      return to;
    }

    return "/login";
  }

  return (
    <NavLink className="user-button" to={getLink()}>
      <img src={getProfilePictureUrl()} alt="Profile Picture" />
      <div>
        <a className="user-name">{getUsername()}</a>
        <a className="user-handle">{getHandleOrTip()}</a>
      </div>
    </NavLink>
  );
}

export default UserButton;
