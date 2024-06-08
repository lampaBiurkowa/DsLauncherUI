import React, { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DsCoreApiClient } from "@/services/DsCoreApiClient";
import { LocalStorageHandler } from "@/services/LocalStorageService";
import ProfilePicture from "@/components/profile-picture/ProfilePicture";
import useProfileImage from "@/hooks/useProfileImage";
import Navbar from "@/components/navbar/Navbar";
import NavButton from "@/components/navbar/NavButton";
import useMoney from "./hooks/useMoney";
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
    } else {
      await api.updateUser({
        ...currentUser,
        profileImage: "",
      });
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
            src={profileImage}
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
