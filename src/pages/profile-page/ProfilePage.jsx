import { convertFileSrc } from "@tauri-apps/api/tauri";
import React, { useContext, useEffect, useState } from "react";
import ProfilePicture from "./components/ProfilePicture";

import "./ProfilePage.scss";
import { UserContext } from "@/contexts/UserContextProvider";
import { getProfilePictureBase64 } from "@/services/Base64Service";
import Navbar from "@/components/navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { AuthApi } from "../../services/api/AuthApi";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "../../services/ApiClient";
import NavButton from "@/components/navbar/NavButton";
import { UserImagesApi } from "@/services/api/UserImagesApi";
import { UsersCache } from "@/services/CacheService";

function ProfilePage() {
  let context = useContext(UserContext);
  console.log(context.currentUser);
  const authApi = new AuthApi(new ApiClient());
  let navigate = useNavigate();

  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    setProfileImage(getProfilePictureBase64(context.currentUser?.id));
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
            { body: { id: context.currentUser.id, profileImageBase64: reader.result } },
            (error, data) => {
              if (error === null) {
                UsersCache.load();
                setProfileImage(reader.result);
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
          <span className="profile-name">{`${context.currentUser?.name} ${context.currentUser?.surname}`}</span>
          <div className="profile-actions">
            <button className="small"
             onClick={() => {
              authApi.authLogoutLoginGet(context.currentUser.login, (error, data) => 
              {
                context.currentUser = null;
                console.log(context.currentUser);
                navigate("/home", { replace: true });
                navigate(0);
              })
              }}
              >Log out</button>
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
