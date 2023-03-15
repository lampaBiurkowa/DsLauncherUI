import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/UserButton.scss";
import { UserContext } from "../contexts/UserContextProvider";

function UserButton({ to }) {
  const user = useContext(UserContext);

  function getProfilePictureUrl() {
    if (user != null) {
      return user.pictureUrl;
    }

    return "/img/user.png";
  }

  function getUsername() {
    if (user != null) {
      return `${user.name} ${user.surname}`;
    }

    return "Gość";
  }

  return (
    <NavLink className="user-button" to={to}>
      <img src={getProfilePictureUrl()} alt="Profile Picture" />
      <div>
        <a className="user-name">{getUsername()}</a>
        <a className="user-handle">{user != null && user.handle}</a>
      </div>
    </NavLink>
  );
}

export default UserButton;
