import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { LocalStorageHandler } from "@/services/LocalStorageService";

const api = new DsLauncherApiClient();

function useActivityTime(products) {
  const [activityTime, setActivityTime] = useState([]);

  useEffect(() => {
    async function fetchActivityTime() {
      const user = LocalStorageHandler.getUser();
      const promises = products.map(async p => [p.model.guid, await api.getMinutesInGame(p.model.guid, user)]);
      const result = Object.fromEntries(await Promise.all(promises));
      setActivityTime(result);
    }

    if (products) {
      fetchActivityTime();
    }
  }, [products]);

  return activityTime;
}

export default useActivityTime;
