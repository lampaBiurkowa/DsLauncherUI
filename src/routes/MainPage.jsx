import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserButton from "../components/UserButton";
import Spacer from "../components/Spacer";
import UpdateSummary from "../components/UpdateSummary";
import "../styles/layouts/MainPage.scss";
import NavButton from "../components/NavButton";

function MainPage() {
  return (
    <div className="container">
      <nav>
        <div className="brand">
          <img src="/img/icon.png" alt="Dibrysoft logo" />
          <a>Dibrysoft</a>
        </div>
        <UserButton to="/profile" />
        <ul>
          <li>
            <NavButton to="/" icon="las la-home">
              Home
            </NavButton>
            <NavButton to="/store" icon="las la-shopping-cart">
              Store
            </NavButton>
            <NavButton to="/library" icon="las la-th-large">
              Library
            </NavButton>
          </li>
        </ul>
        <Spacer grow={1} />
        <UpdateSummary />
        <NavButton to="/settings" icon="las la-cog">
          Settings
        </NavButton>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;
