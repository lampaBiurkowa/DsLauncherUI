import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserButton from "../components/UserButton";
import Spacer from "../components/Spacer";
import UpdateSummary from "../components/UpdateSummary";
import "../styles/layouts/MainPage.scss";

function MainPage() {
  function getNavLinkClassName({ isActive, isPending }) {
    let className = "navlink";

    if (isPending) {
      className += " navlink-pending";
    }

    if (isActive) {
      className += " navlink-active";
    }

    return className;
  }

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
            <NavLink to={"/"} className={getNavLinkClassName}>
              <i className="las la-home"></i>
              <span>Home</span>
            </NavLink>
            <NavLink to={"/store"} className={getNavLinkClassName}>
              <i className="las la-shopping-cart"></i>
              <span>Store</span>
            </NavLink>
            <NavLink to={"/library"} className={getNavLinkClassName}>
              <i className="las la-th-large"></i>
              <span>Library</span>
            </NavLink>
          </li>
        </ul>
        <Spacer grow={1} />
        <UpdateSummary />
        <NavLink to={"/settings"} className={getNavLinkClassName}>
          <i className="las la-cog"></i>
          <span>Settings</span>
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;
