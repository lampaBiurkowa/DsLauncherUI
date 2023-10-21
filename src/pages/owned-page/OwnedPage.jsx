import React, { useEffect, useState } from "react";
import LibraryEntry from "@/components/library-entry/LibraryEntry";

import "./OwnedPage.scss";
import { UserApi } from "@/services/api/UserApi";
import getFilesData from "../../services/getFilesData";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { runInstall } from "../../services/CLIClient";
import getToken from "../../services/getToken";
import { runList } from "../../services/CLIClient";
import { readOrDefault } from "../../services/SettingsService";
import useSettings from "../../hooks/useSettings";


function Popup({ app, onCancel, onAccept }) {
  const [settings, applySettings] = useSettings();
  const [selectedOption, setSelectedOption] = useState('');

  const handleAccept = () => {
    if (selectedOption) {
      onAccept(app, selectedOption);
    }
  };
  
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Install {app.title}</h2>
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          <option value="">Select an option</option>
          {
            settings.libraries.map((library) => {
              return (
                <option value={library}>{library}</option>
              );
            })
          }
        </select>
        <div className="popup-buttons">
          <button onClick={handleAccept}>Accept</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

function OwnedPage() {
  const { currentUser } = useContext(UserContext);
  const userApi = new UserApi();
  const [apps, setApps] = useState([]);
  const [settings, applySettings] = useSettings();

  useEffect(() => {
    userApi.userGetNameProductsGet(currentUser.login, async (productsError, productsData) => {
      if (productsError !== null)
        return;

      let installedAppNames = (await runList(false, getToken(), currentUser.login)).Names;
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

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const showPopup = (app) => {
    setSelectedApp(app);
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setSelectedApp(null);
    setPopupVisible(false);
  };

  const handleAccept = async (app, selectedOption) => {
    console.log(`Installing ${app.title} with ${selectedOption}`);
    await install(app.title, selectedOption);
    hidePopup();
  };
  async function install(appName, library) {
    settings.games[appName] = library;
    applySettings((s) => {s.games[appName] = library;});

    await runInstall(appName, library, getToken(),currentUser.login);
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
                onClick={() => showPopup(app)}
                // onClick={async () => await install(app.title)  }
              >
                Install
              </button>
            </LibraryEntry>
          );
        })}
      </div>{popupVisible && (
        <Popup app={selectedApp} onCancel={hidePopup} onAccept={handleAccept} />
      )}
    </div>
  );
}

export default OwnedPage;
