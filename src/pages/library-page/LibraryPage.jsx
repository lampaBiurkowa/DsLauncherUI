import React, { useState } from "react";
import "./LibraryPage.scss";
import Navbar from "../../components/navbar/Navbar";
import NavButton from "../../components/navbar/NavButton";
import { Outlet } from "react-router-dom";

function LibraryPage() {
  return (
    <div className="library-page">
      <div className="library-nav-container">
        <Navbar horizontal>
          <NavButton to="/library" end>
            Installed
          </NavButton>
          <NavButton to="/library/updates">Updates</NavButton>
          <NavButton to="/library/owned">Owned</NavButton>
        </Navbar>
      </div>
      <Outlet />
    </div>
  );
}

export default LibraryPage;
