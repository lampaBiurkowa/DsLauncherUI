import React from "react";
import { Outlet } from "react-router-dom";

import ProfileButton from "./components/ProfileButton";
import UpdateSummary from "./components/UpdateSummary";
import NavButton from "../../components/navbar/NavButton";
import NavBar from "../../components/navbar/Navbar";
import Logo from "../../components/logo/Logo";

import Guard, { GuardMode } from "@/Guard";
import "./MainPage.scss";

function MainPage() {
  return (
    <div className="container">
      <div className="nav-container">
        <NavBar>
          <div style={{ padding: "8px 8px 0 8px" }}>
            <Logo />
          </div>
          <ProfileButton to="/profile" />
          <NavButton to="/home" icon="las la-home">
            Home
          </NavButton>
          <NavButton to="/store" icon="las la-shopping-cart">
            Store
          </NavButton>
          <Guard mode={GuardMode.HIDE}>
            <NavButton to="/library" icon="las la-th-large">
              Library
            </NavButton>
          </Guard>
          <UpdateSummary navend="true" />
          <NavButton to="/settings" icon="las la-cog" navend="true">
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
