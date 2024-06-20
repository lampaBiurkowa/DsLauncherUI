import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useState, useEffect } from "react";

const api = new DsLauncherApiClient();

function useUserSubscribed(developer) {
  let [userSubscribed, setUserSubscribed] = useState();

  useEffect(() => {
    async function fetchUserSubscribed() {
      var developerGuid = developer?.model?.guid;
      if (developerGuid) {
        console.log("no iks de", await api.hasUserSubscribed(developerGuid));
        setUserSubscribed(await api.hasUserSubscribed(developerGuid));
      }
    }
    fetchUserSubscribed();
  }, [developer]);

  return userSubscribed;
}

export default useUserSubscribed;