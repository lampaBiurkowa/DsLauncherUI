import React, { useEffect, useState } from "react";
import LibraryEntry from "./components/LibraryEntry";
import Dropdown from "@/components/dropdown/Dropdown";

import "./UpdatesPage.scss";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContextProvider";
import useSettings from "../../hooks/useSettings";

function UpdatesPage() {
  const [settings, applySettings] = useSettings();
  const { currentUser } = useContext(UserContext);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function getUpdatable() {
      let appNames = (await runList(true, getToken(), currentUser.login)).Names;
      let result = [];
      for (let i = 0; i < appNames.length; i++) {
        // TODO APPNAMES SHOULD BE APPIDS
        // var product = ProductsCache.getAll().find((x) => x.name == appNames[i]);
        // if (product === null) return;
        // let icon = (await getFilesData(product.data.name)).Icon;
        // let desc = (await runStatus(product.data.name, currentUser.login))
        //   .VersionDescription;
        // result.push({ icon: icon, title: product.data.name, desc: desc });
        // if (result.length == appNames.length) {
        //   setApps(result);
        // }
      }
    }

    getUpdatable();
  }, []);

  async function update(appName) {
    await runInstall(
      appName,
      settings.games[appName],
      getToken(),
      currentUser.login
    );
  }

  return (
    <div className="updates-page">
      <div className="header">
        <h1>Updates</h1>
        <div>
          <button className="small">
            <i className="las la-sync" />
          </button>
        </div>
      </div>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry
              icon={app.icon}
              title={app.title}
              secondary={app.desc}
              key={index}
            >
              <button
                className="accent outlined"
                onClick={async () => await update(app.title)}
              >
                Update
              </button>
              <Dropdown>
                <ul className="dropdown-content">
                  <li>
                    <button
                      className="menuitem small"
                    >
                      <i className="las la-trash" />
                      <span>Uninstall</span>
                    </button>
                    <button className="menuitem small">
                      <i className="las la-wrench" />
                      <span>Properties</span>
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </LibraryEntry>
          );
        })}
      </div>
    </div>
  );
}

export default UpdatesPage;
