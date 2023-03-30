import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { NavbarContext } from "./Navbar";
import "./NavButton.scss";

function NavButton({ to, end, icon, horizontal, children }) {
  const { isHorizontal } = useContext(NavbarContext);

  function getClassName({ isActive, isPending }) {
    let className = "navlink";

    className += isHorizontal ? " horizontal" : "";
    className += isPending ? " pending" : "";
    className += isActive ? " active" : "";

    return className;
  }

  return (
    <NavLink to={to} className={getClassName} end={end}>
      {icon && <i className={icon} />}
      {children}
      {isHorizontal && <div className="marker" />}
    </NavLink>
  );
}

export default NavButton;
