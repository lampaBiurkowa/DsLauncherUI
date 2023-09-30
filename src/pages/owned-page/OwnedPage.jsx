import React, { useEffect, useState } from "react";
import LibraryEntry from "@/components/library-entry/LibraryEntry";

import "./OwnedPage.scss";
import { UserApi } from "@/services/api/UserApi";
import { GameActivityApi } from "@/services/api/GameActivityApi";
import getFilesData from "../../services/getFilesData";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { runInstall } from "../../services/CLIClient";
import getToken from "../../services/getToken";
import { runList } from "../../services/CLIClient";

function OwnedPage() {
  const { currentUser } = useContext(UserContext);
  const userApi = new UserApi();
  const activityApi = new GameActivityApi();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    userApi.userGetNameProductsGet(currentUser.login, async (productsError, productsData) => {
      if (productsError !== null)
        return;

      let installedAppNames = (await runList(false, getToken())).Names;
      let result = [];
      for (let i = 0; i < productsData.length; i++)
      {
        activityApi.gameActivityTimeSpentUserIdProductIdGet(currentUser.id, productsData[i].id, async (timeError, timeData) => {
          if (timeError !== null)
            return;

          let icon = (await getFilesData(productsData[i].name)).Icon;
          let isInstalled = installedAppNames.includes(productsData[i].name);
          result.push({icon: icon, title: productsData[i].name, hours: timeData.totalSeconds, isInstalled: isInstalled});
          if (i == productsData.length - 1)
            setApps(result);
        });
      }
    });
  }, []);

  async function install(appName) {
    await runInstall(appName, "C:/test/test 1", getToken());
  }

  return (
    <div className="owned-page">
      <h1>Your Apps</h1>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry icon={app.icon} title={app.title} key={index}>
              <button
                className="accent outlined"
                onClick={async () => await install(app.title)}
              >
                Install
              </button>
            </LibraryEntry>
          );
        })}
      </div>
    </div>
  );
}

export default OwnedPage;
