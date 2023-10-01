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
  const [apps, setApps] = useState([]);

  useEffect(() => {
    userApi.userGetNameProductsGet(currentUser.login, async (productsError, productsData) => {
      if (productsError !== null)
        return;

      let installedAppNames = (await runList(false, getToken())).Names;
      userApi.userGetNamePurchasesGet(currentUser.login, async (purchaseError, purchaseData) => {
        if (purchaseError !== null)
          return;

        let result = [];
        for (let i = 0; i < productsData.length; i++)
        {
            let icon = (await getFilesData(productsData[i].name)).Icon;
            const purchase = purchaseData.find(p => p.product.id === productsData[i].id);
            let boughtOn = purchase._date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ');
            let isInstalled = installedAppNames.includes(productsData[i].name);
            result.push({icon: icon, title: productsData[i].name, boughtOn: boughtOn, isInstalled: isInstalled});
            if (result.length == productsData.length)
              setApps(result);
        }
      });
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
            <LibraryEntry icon={app.icon} title={app.title} secondary={`Bought on ${app.boughtOn}`} key={index}>
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
