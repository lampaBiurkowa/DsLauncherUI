import React, { useEffect, useState } from "react";
import LibraryEntry from "@/components/library-entry/LibraryEntry";
import Dropdown from "@/components/dropdown/Dropdown";
import "./InstalledPage.scss";
import { GameActivityApi } from "@/services/api/GameActivityApi";
import getFilesData from "../../services/getFilesData";
import { runList } from "../../services/CLIClient";
import getToken from "../../services/getToken";
import { ProductApi } from "../../services/api/ProductApi";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { runGame } from "../../services/CLIClient";

function InstalledPage() {
  const productApi = new ProductApi();
  const activityApi = new GameActivityApi();
  const { currentUser } = useContext(UserContext);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function getInstalled()
    {
      let appNames = (await runList(false, getToken())).Names;

      let result = [];
      for (let i = 0; i < appNames.length; i++)
      {
        productApi.productGetNameGet(appNames[i], (productError, productData) => {
          if (productError !== null)
            return;

          activityApi.gameActivityTimeSpentUserIdProductIdGet(currentUser.id, productData.id, async (timeError, timeData) => {
            if (timeError !== null)
              return;
  
            let icon = (await getFilesData(productData.name)).Icon;
            const [hours, minutes, seconds] = timeData.split(':').map(Number);
            result.push({icon: icon, game: productData, hours: hours, minutes: minutes});
            if (result.length == appNames.length)
            {
              setApps(result);
            }
          });
        });
      }
    }

    getInstalled();
  }, []);

  function run(appName, appId) {
    console.log(appId);
    runGame(appName, appId, currentUser.id, "C:/test/test 1");
  }

  return (
    <div className="installed-page">
      <h1>Installed Apps</h1>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry
              icon={app.icon}
              title={app.game.name}
              secondary={`${app.hours} hours and ${app.minutes} minutes spent`}
              key={index}
            >
              <button
                className="accent outlined"
                onClick={() => run(app.game.name, app.game.id)}
              >
                Launch
              </button>
              <Dropdown>
                <ul className="dropdown-content">
                  <li>
                    <button className="menuitem small">
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

export default InstalledPage;
