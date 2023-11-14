import { convertFileSrc } from "@tauri-apps/api/tauri";
import React, { useContext, useEffect, useState } from "react";
import ProfilePicture from "./components/ProfilePicture";

import "./ProfilePage.scss";
import { UserContext } from "@/contexts/UserContextProvider";
import { getProfilePictureBase64 } from "@/services/Base64Service";
import Navbar from "@/components/navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import NavButton from "@/components/navbar/NavButton";
import { UserImagesApi } from "@/services/api/UserImagesApi";
import { UsersCache } from "@/services/CacheService";

function ProfilePage() {
  const { currentUser } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    setProfileImage(getProfilePictureBase64(currentUser?.id));
  }, []);

  function onPictureSelected(path) {
    const api = new UserImagesApi();

    //MOCARNE
    fetch(convertFileSrc(path))
      .then((response) => response.blob())
      .then((blob) => {
        let reader = new FileReader();
        reader.onloadend = () => {
          api.userImagesPut(
            { body: { id: currentUser.id, profileImageBase64: reader.result } },
            (error, data) => {
              if (error === null) {
                UsersCache.load();
                console.log("profile uploaded");
              }
            }
          );
        };
        reader.readAsDataURL(blob);
      });
  }

  return (
    <div className="profile-page">
      <section className="profile-summary">
        <div className="profile-basic">
          <ProfilePicture
            src={profileImage}
            onSelected={onPictureSelected}
          ></ProfilePicture>
          <span className="profile-name">{`${currentUser?.name} ${currentUser?.surname}`}</span>
          <div className="profile-actions">
            <button className="small">Log out</button>
          </div>
        </div>
        <NavLink className="profile-currency" to="/profile/payment">
          <i class="las la-ruble-sign"></i>
          <span className="currency-name">Ruble</span>
          <span className="currency-amount">{`$${currentUser?.money}`}</span>
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
