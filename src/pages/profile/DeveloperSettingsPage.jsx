import React, { useContext, useEffect, useRef, useState } from "react";
import { deafultBucket, publicPath } from "@/App";
import { UserContext } from "@/contexts/UserContextProvider";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { NavLink } from "react-router-dom";
import SettingsEntry from "@/components/settings-entry/SettingsEntry";
import "./DeveloperSettingsPage.scss";
import Dialog from "@/components/dialog/Dialog";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";
import { subscribe } from "superagent";

const api = new DsLauncherApiClient();

function DeveloperSettingsPage() {
  const { currentUser } = useContext(UserContext);
  const [devs, setDevs] = useState();

  const [createDevDialogOpen, setCreateDevDialogOpen] = useState();
  const [creationErrorVisible, setCreationErrorVisible] = useState(false);
  const [joinErrorVisible, setJoinErrorVisible] = useState(false);

  const developerNameRef = useRef();
  const developerDescRef = useRef();
  const developerKeyRef = useRef();

  useEffect(() => {
    (async () => {
      setDevs(await api.getDeveloperByUser(currentUser.guid));
      console.log(devs);
    })();
  }, []);

  async function createDeveloper(e) {
    e.preventDefault();

    const developer = {
      name: developerNameRef.current?.value,
      description: developerDescRef.current?.value,
      profileImage: "",
      subscriptionPrice: 9.99,
    };

    try {
      await api.purchaseDeveloperAccount(developer);
      setCreationErrorVisible(false);
    } catch (error) {
      setCreationErrorVisible(true);
    }
  }

  async function joinDeveloper(e) {
    e.preventDefault();

    try {
      await api.joinDeveloperAccount(":D\\", developerKeyRef.current?.value);
      setJoinErrorVisible(false);
    } catch (error) {
      setJoinErrorVisible(true);
    }
  }

  return (
    <div className="developer-settings-page">
      <section>
        <h2>Become a developer</h2>
        <SettingsEntry
          name="Create developer account"
          desc="Create your own developer account"
        >
          <button
            className="accent"
            onClick={() => setCreateDevDialogOpen(true)}
          >
            Create
          </button>
          <Dialog
            open={createDevDialogOpen}
            onClosed={() => {
              setCreateDevDialogOpen(false);
            }}
            header="Create developer account"
          >
            <form className="create-developer" onSubmit={createDeveloper}>
              <span>Developer name</span>
              <input type="text" ref={developerNameRef}></input>
              <span>Description</span>
              <textarea ref={developerDescRef}></textarea>
              <InfoBar
                type={InfoBarType.Error}
                header="Error"
                text="Caps)"
                open={creationErrorVisible}
                setOpen={setCreationErrorVisible}
                dismissable
              ></InfoBar>
              <div>
                <button className="accent" type="submit">
                  Create
                </button>
                <button
                  className="plain"
                  onClick={() => setCreateDevDialogOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Dialog>
        </SettingsEntry>
        <SettingsEntry
          name="Join developer"
          desc="Join an existing developer account"
        >
          <form onSubmit={joinDeveloper}>
            <input
              type="text"
              placeholder="Invitation code"
              ref={developerKeyRef}
            />
            <button type="submit">Join</button>
          </form>
        </SettingsEntry>
        <InfoBar
          type={InfoBarType.Error}
          header="Error"
          text="Invalid code"
          dismissable
          open={joinErrorVisible}
          setOpen={setJoinErrorVisible}
        ></InfoBar>
      </section>
      <section>
        <h2>Your teams</h2>
        {devs?.map((dev, key) => {
          return (
            <div className="developer" key={key}>
              <div>
                <img
                  src={`${publicPath}/${deafultBucket}/${dev?.profileImage}`}
                  alt="Developer logo"
                />
                <span>{dev.name}</span>
              </div>
              <NavLink to={`/developer/${dev.guid}`} className="button">
                Manage
              </NavLink>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default DeveloperSettingsPage;
