import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import UserButton from "../components/UserButton";
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
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainPage;
