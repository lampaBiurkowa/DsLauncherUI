import { Outlet } from "react-router-dom";
import NavBar from "@/components/navbar/Navbar";
import NavButton from "@/components/navbar/NavButton";

import "./SettingsPage.scss";

function SettingsPage() {
  return (
    <div className="settings-container">
      <div className="settings-nav-container">
        <NavBar horizontal>
          <NavButton to="/settings" end>
            General
          </NavButton>
          <NavButton to="/settings/libraries">Libraries</NavButton>
          <NavButton to="/settings/updates">Updates</NavButton>
          <NavButton to="/settings/notifications">Notifications</NavButton>
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
}

export default SettingsPage;
