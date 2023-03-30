import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/nav-bar/NavBar";
import NavButton from "../../components/nav-bar/NavButton";
import "./styles/StorePage.scss";

function StorePage() {
  return (
    <div className="store-container">
      <div className="store-nav-container">
        <NavBar horizontal>
          <NavButton to="/store" end>
            Discover
          </NavButton>
          <NavButton to="/store/games">Games</NavButton>
          <NavButton to="/store/apps">Apps</NavButton>
          <input navend placeholder="Search" style={{ alignSelf: "center" }} />
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
}

export default StorePage;
