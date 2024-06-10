import React, { useState } from "react";
import { useScrolledToEnd } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import DetailedStoreEntry from "./components/DetailedStoreEntry";
import getFilesData from "@/services/getFilesData";
import "./AppsPage.scss";

const api = new DsLauncherApiClient();

function AppsPage() {
  const [apps, setApps] = useState([]);

  const scrollViewRef = useScrolledToEnd(async () => {
    setApps([
      ...apps,
      ...(await api.getApps(apps.length, 10))?.map((app) => {
        return {
          model: app,
          static: getFilesData(app),
        };
      }),
    ]);
  });

  return (
    <div className="games-container">
      <h2>Applications</h2>
      <ul ref={scrollViewRef}>
        {apps?.map((app, index) => {
          return (
            <DetailedStoreEntry
              key={index}
              id={app?.model.guid}
              name={app?.model.name}
              icon={app?.static?.Icon}
              rating={app?.rates?.avg}
              description={app?.model.description}
              tags={app?.model.tags}
              platform={`${app?.latestVersion?.linuxExePath ? "linux" : ""} 
                         ${app?.latestVersion?.windowsExePath ? "win" : ""} 
                         ${app?.latestVersion?.macExePath ? "macos" : ""}`}
            ></DetailedStoreEntry>
          );
        })}
      </ul>
    </div>
  );
}

export default AppsPage;
