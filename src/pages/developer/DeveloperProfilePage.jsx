import React, { useContext, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useDeveloper } from "./hooks/useDeveloper";
import { deafultBucket, publicPath } from "@/App";
import { UserContext } from "@/contexts/UserContextProvider";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import ProfilePicture from "../../components/profile-picture/ProfilePicture";
import Navbar from "@/components/navbar/Navbar";
import NavButton from "@/components/navbar/NavButton";
import * as fs from "@tauri-apps/plugin-fs";

import "./DeveloperProfilePage.scss";
import { useSubscriptions } from "./hooks/useSubscriptions";
import useMoney from "../profile/hooks/useMoney";
import useUserSubscribed from "../store/hooks/useUserSubscribed";

const api = new DsLauncherApiClient();

function DeveloperProfilePage() {
  const { id: devId } = useParams();
  const { currentUser } = useContext(UserContext);
  const [developer, setDeveloper] = useDeveloper(devId);
  const subscriptions = useSubscriptions(devId);
  const userSubscribed = useUserSubscribed(developer);
  const money = useMoney();

  const isMember = useMemo(() => {
    return developer?.userGuids.includes(currentUser?.guid);
  }, [developer, currentUser]);

  const logo = useMemo(() => {
    if (developer?.profileImage?.length > 0) {
      return `${publicPath}/${deafultBucket}/${developer?.profileImage}`;
    }
    return undefined;
  }, [developer]);

  async function uploadProfileImage(file) {
    let publicFileName = "";

    if (file.path) {
      const bytes = (await fs.readFile(file.path)).buffer;
      const blob = new Blob([bytes], { type: "image/jpeg" });
      publicFileName = await api.uploadDeveloperLogo(devId, blob, file.name);
    } else {
      await api.updateDeveloper({
        ...developer,
        profileImage: "",
      });
    }

    setDeveloper({ ...developer, profileImage: publicFileName });
  }

  async function subscribe() {
    try {
      await api.subscribeDeveloper(developer.guid);
    }
    catch {
      console.log("Error subscribing dev");
    }
  }

  return (
    <div className="developer-page">
      <section className="developer-summary">
        <div className="developer-basic">
          <ProfilePicture
            readonly={!isMember}
            src={logo}
            onSelected={uploadProfileImage}
          ></ProfilePicture>
          <span className="developer-name">{developer?.name}</span>
          <div className="developer-actions">
            <span>{subscriptions} subscriptions</span>
          </div>
        </div>
        {(!isMember && !userSubscribed) ? (
          <button className="accent outlined" onClick={() => subscribe()} disabled={money < developer?.subscriptionPrice}>
            Subscribe for {developer?.subscriptionPrice}₽
          </button>
        ) : (
          <></>
        )}
      </section>
      <div className="developer-details">
        <div className="developer-nav-container">
          <Navbar horizontal>
            <NavButton to={`/developer/${devId}`} end>
              News
            </NavButton>
            <NavButton to={`/developer/${devId}/games`}>Games</NavButton>
          </Navbar>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default DeveloperProfilePage;
