import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import NavButton from "../../components/navbar/NavButton";
import "./StorePage.scss";

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
          <input
            navend="true"
            placeholder="Search"
            type="search"
            style={{ alignSelf: "center" }}
          />
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
}

export default StorePage;
