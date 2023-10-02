import React, { useEffect, useState } from "react";
import LibraryEntry from "@/components/library-entry/LibraryEntry";
import Dropdown from "@/components/dropdown/Dropdown";

import "./UpdatesPage.scss";

import { GameActivityApi } from "@/services/api/GameActivityApi";
import getFilesData from "../../services/getFilesData";
import { runList } from "../../services/CLIClient";
import getToken from "../../services/getToken";
import { ProductApi } from "../../services/api/ProductApi";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { runInstall } from "../../services/CLIClient";
import { runStatus } from "../../services/CLIClient";

function UpdatesPage() {
  const productApi = new ProductApi();
  const activityApi = new GameActivityApi();
  const { currentUser } = useContext(UserContext);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function getUpdatable()
    {
      let appNames = (await runList(true, getToken(), currentUser.login)).Names;

      let result = [];
      for (let i = 0; i < appNames.length; i++)
      {
        productApi.productGetNameGet(appNames[i], async (productError, productData) => {
          if (productError !== null)
            return;
  
          let icon = (await getFilesData(productData.name)).Icon;
          let desc = (await runStatus(productData.name, currentUser.login)).VersionDescription;
          console.log(desc);
          result.push({icon: icon, title: productData.name, desc: desc});
          if (result.length == appNames.length)
          {
            setApps(result);
          }
        });
      }
    }

    getUpdatable();
  }, []);

  async function update(appName) {
    await runInstall(appName, "C:/test/test 1", getToken(),currentUser.login);
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
            <LibraryEntry icon={app.icon} title={app.title} secondary={app.desc} key={index}>
              <button
                className="accent outlined"
                onClick={async () => await update(app.title)}
              >
                Update
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

export default UpdatesPage;
