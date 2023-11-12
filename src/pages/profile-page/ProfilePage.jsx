import React, { useContext, useEffect, useState } from "react";
import ProfilePicture from "./components/ProfilePicture";

import "./ProfilePage.scss";
import { UserContext } from "../../contexts/UserContextProvider";
import { getProfilePictureBase64 } from "@/services/Base64Service";
import Navbar from "../../components/navbar/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import NavButton from "../../components/navbar/NavButton";

function ProfilePage() {
  const { currentUser } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    setProfileImage(getProfilePictureBase64(currentUser?.id));
  }, []);

  return (
    <div className="profile-page">
      <section className="profile-summary">
        <div className="profile-basic">
          <ProfilePicture src={profileImage}></ProfilePicture>
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
