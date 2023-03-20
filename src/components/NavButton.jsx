import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/NavButton.scss";

function NavButton({ to, icon, children }) {
  function getClassName({ isActive, isPending }) {
    let className = "navlink";

    className += isPending ? " pending" : "";
    className += isActive ? " active" : "";

    return className;
  }

  return (
    <NavLink to={to} className={getClassName}>
      <i className={icon} />
      {children}
    </NavLink>
  );
}

export default NavButton;
