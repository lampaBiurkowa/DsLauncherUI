import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import NavButton from "../components/NavButton";
import "../styles/layouts/StorePage.scss";

function StorePage() {
  return (
    <div className="store-container">
      <div className="store-nav-container">
        <NavBar horizontal>
          <NavButton to="/store" icon="las la-compass" end>
            Discover
          </NavButton>
          <NavButton to="/store/games" icon="las la-gamepad">
            Games
          </NavButton>
          <NavButton to="/store/apps" icon="las la-toolbox">
            Apps
          </NavButton>
          <input navend />
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
}

export default StorePage;
