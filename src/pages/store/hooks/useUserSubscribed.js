import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useState, useEffect } from "react";

const api = new DsLauncherApiClient();

function useUserSubscribed(developer) {
  let [UserSubscribed, setUserSubscribed] = useState();

  useEffect(() => {
    async function fetchUserSubscribed() {
      var developerGuid = developer?.model?.guid;
      if (developerGuid) {
        setUserSubscribed(await api.hasUserSubscribed(developerGuid));
      }
    }
    fetchUserSubscribed();
  }, [developer]);

  return UserSubscribed;
}

export default useUserSubscribed;
