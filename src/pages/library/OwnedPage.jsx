import React, { useEffect, useState } from "react";
import { useOwnedProducts } from "@/hooks/useOwnedProducts";
import LibraryEntry from "./components/library-entry/LibraryEntry";
import "./OwnedPage.scss";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import getFilesData from "@/services/getFilesData";

const api = new DsLauncherApiClient();

function OwnedPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    (async () => {
      const owned = await api.getProductsByUser();
      setApps(
        (await api.getProductsByIds(owned)).map((product) => {
          product.static = getFilesData(product);
          return product;
        })
      );
    })();
  }, []);

  return (
    <div className="owned-page">
      <h1>Your Apps</h1>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry icon={app.static.Icon} title={app.name} key={index}>
              <button className="accent outlined">Install</button>
            </LibraryEntry>
          );
        })}
      </div>
    </div>
  );
}

export default OwnedPage;
