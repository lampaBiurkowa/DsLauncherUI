import React, { createContext } from "react";
import Spacer from "../spacer/Spacer";
import "./Navbar.scss";

export const NavbarContext = createContext(null);

function Navbar({ horizontal = false, children }) {
  function getClassName() {
    let className = "navbar";
    className += horizontal ? " horizontal" : "";
    return className;
  }

  return (
    <NavbarContext.Provider value={{ isHorizontal: horizontal }}>
      <nav className={getClassName()}>
        {React.Children.map(children, (child) => {
          if (!child?.props?.navend) {
            return child;
          }
        })}
        <Spacer />
        {React.Children.map(children, (child) => {
          if (child?.props?.navend) {
            return child;
          }
        })}
      </nav>
    </NavbarContext.Provider>
  );
}

export default Navbar;
