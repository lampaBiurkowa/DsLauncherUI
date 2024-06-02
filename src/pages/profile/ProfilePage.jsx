import React, { useContext } from "react";
import ProfilePicture from "./components/ProfilePicture";
import { UserContext } from "@/contexts/UserContextProvider";
import useProfileImage from "@/hooks/useProfileImage";
import Navbar from "@/components/navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavButton from "@/components/navbar/NavButton";
import { LocalStorageHandler } from "../../services/LocalStorageService";
import useMoney from "./hooks/useMoney";
import { DsCoreApiClient } from "../../services/DsCoreApiClient";
import * as fs from "@tauri-apps/plugin-fs";
import "./ProfilePage.scss";

const api = new DsCoreApiClient();

function ProfilePage() {
  const profileImage = useProfileImage();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const money = useMoney();

  async function uploadProfileImage(file) {
    let publicFileName = "";

    if (file.path) {
      const bytes = (await fs.readFile(file.path)).buffer;
      const blob = new Blob([bytes], { type: "image/jpeg" });
      publicFileName = await api.uploadProfileImage(blob, file.name);
    }

    setCurrentUser({
      ...currentUser,
      profileImage: publicFileName,
    });
  }

  return (
    <div className="profile-page">
      <section className="profile-summary">
        <div className="profile-basic">
          <ProfilePicture
            src={`${profileImage}`}
            onSelected={uploadProfileImage}
          ></ProfilePicture>
          <span className="profile-name">{`${currentUser?.name} ${currentUser?.surname}`}</span>
          <div className="profile-actions">
            <button
              className="small"
              onClick={() => {
                LocalStorageHandler.setToken("");
                LocalStorageHandler.setUser("");
                setCurrentUser(undefined);
                navigate("/home", { replace: true });
                navigate(0);
              }}
            >
              Log out
            </button>
          </div>
        </div>
        <NavLink className="profile-currency" to="/profile/payment">
          <i class="las la-ruble-sign"></i>
          <span className="currency-name">Ruble</span>
          <span className="currency-amount">{`$${money}`}</span>
        </NavLink>
      </section>
      <div className="profile-details">
        <div className="profile-nav-container">
          <Navbar horizontal>
            <NavButton to="/profile" end>
              Details
            </NavButton>
            <NavButton to="/profile/payment">Payment</NavButton>
          </Navbar>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilePage;
