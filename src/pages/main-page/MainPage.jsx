import React from "react";
import { Outlet } from "react-router-dom";

import ProfileButton from "./components/ProfileButton";
import UpdateSummary from "./components/UpdateSummary";
import NavButton from "../../components/navbar/NavButton";
import NavBar from "../../components/navbar/Navbar";
import Logo from "./components/Logo";

import "./MainPage.scss";

function MainPage() {
  return (
    <div className="container">
      <div className="nav-container">
        <NavBar>
          <Logo />
          <ProfileButton to="/profile" />
          <NavButton to="/" icon="las la-home">
            Home
          </NavButton>
          <NavButton to="/store" icon="las la-shopping-cart">
            Store
          </NavButton>
          <NavButton to="/library" icon="las la-th-large">
            Library
          </NavButton>
          <UpdateSummary navend />
          <NavButton to="/settings" icon="las la-cog" navend>
            Settings
          </NavButton>
        </NavBar>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;
