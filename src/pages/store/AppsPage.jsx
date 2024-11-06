import React, { useState } from "react";
import { useScrolledToEnd } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import DetailedStoreEntry from "./components/DetailedStoreEntry";
import "./AppsPage.scss";
import { getProduct } from "@/services/CacheService";

const api = new DsLauncherApiClient();

function AppsPage() {
  const [apps, setApps] = useState([]);

  const scrollViewRef = useScrolledToEnd(async () => {
    const newApps = await api.getAppsIds(apps.length, 10);
    const updatedApps = await Promise.all(newApps.map(async (guid) => {
      return await getProduct(guid);
    }));
    setApps([...apps, ...updatedApps]);
  });


  return (
    <div className="games-container">
      <h2>Applications</h2>
      <ul ref={scrollViewRef}>
        {apps?.map((app, index) => {
          return (
            <DetailedStoreEntry
              key={index}
              id={app?.model?.guid}
              name={app?.model?.name}
              icon={app?.static?.Icon}
              rating={app?.rates?.avg}
              description={app?.model?.description}
              tags={app?.model?.tags}
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
