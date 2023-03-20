import React from "react";
import Spacer from "./Spacer";
import "../styles/components/NavBar.scss";

function NavBar({ horizontal = false, style, children }) {
  function getClassName() {
    let className = "navbar";
    className += horizontal ? " horizontal" : "";
    return className;
  }

  return (
    <nav className={getClassName()} style={style}>
      {children.map((child, index) => {
        if (!child?.props?.navend) {
          return child;
        }
      })}
      <Spacer />
      {children.map((child, index) => {
        if (child?.props?.navend) {
          return child;
        }
      })}
    </nav>
  );
}

export default NavBar;
