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
            result.push({icon: icon, title: productData.name, hours: timeData.totalSeconds});
            if (i == appNames.length - 1)
            {
              setApps(result);
            }
          });
        });
      }
    }

    getInstalled();
  }, []);

  function run(appName) {
    console.log(appName);
  }

  return (
    <div className="installed-page">
      <h1>Installed Apps</h1>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry
              icon={app.icon}
              title={app.title}
              secondary={app.hours}
              key={index}
            >
              <button
                className="accent outlined"
                onClick={() => run(app.title)}
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
