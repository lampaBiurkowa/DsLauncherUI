import React from "react";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <a>MainPage</a>
      <Outlet />
    </div>
  );
}

export default MainPage;
