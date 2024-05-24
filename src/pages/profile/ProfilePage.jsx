import { convertFileSrc } from "@tauri-apps/api/core";
import React, { useContext, useEffect, useState } from "react";
import ProfilePicture from "./components/ProfilePicture";

import "./ProfilePage.scss";
import { UserContext } from "@/contexts/UserContextProvider";
import { getProfilePictureUrl } from "@/services/ProfileImageService";
import Navbar from "@/components/navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavButton from "@/components/navbar/NavButton";
import { UsersCache } from "@/services/CacheService";
import { DsIdentityApiClient } from "../../services/DsIdentityApiClient";
import * as fs from "@tauri-apps/plugin-fs";

function ProfilePage() {
  let context = useContext(UserContext);
  let navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(
    getProfilePictureUrl(context.currentUser?.guid)
  );
  useEffect(() => {
    setProfileImage(getProfilePictureUrl(context.currentUser?.guid));
  }, []);

  async function onPictureSelected(path) {
    const api = new DsIdentityApiClient();
    const bytes = (await fs.readFile(path.path)).buffer;
    const blob = new Blob([bytes], { type: "image/jpeg" });
    var publicFileName = await api.uploadProfileImage(blob, path.path);
    console.log(publicFileName);
    UsersCache.setById(context.currentUser.guid, publicFileName);
    setProfileImage();
    //MOCARNE - NI DZIALA BO COS Z CSP NWM JAK W TAURI.CONF TEN
    // fetch(convertFileSrc(path.path))
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     console.log(blob);

    //DO WYFSLENIA:
    // let reader = new FileReader();
    // reader.onloadend = () => {
    //   api.userImagesPut(
    //     {
    //       body: {
    //         id: context.currentUser.id,
    //         profileImageBase64: reader.result,
    //       },
    //     },
    //     (error, data) => {
    //       if (error === null) {
    //         UsersCache.load();
    //         setProfileImage(reader.result);
    //       }
    //     }
    //   );
    // };
    // reader.readAsDataURL(blob);
    // });
  }

  return (
    <div className="profile-page">
      <section className="profile-summary">
        <div className="profile-basic">
          <ProfilePicture
            src={`${profileImage}`}
            onSelected={onPictureSelected}
          ></ProfilePicture>
          <span className="profile-name">{`${context.currentUser?.name} ${context.currentUser?.surname}`}</span>
          <div className="profile-actions">
            <button
              className="small"
              onClick={() => {
                localStorage.setItem("token", "");
                localStorage.setItem("currentUser", "");
                context.currentUser = null;
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
          <span className="currency-amount">{`$${context.currentUser?.money}`}</span>
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
