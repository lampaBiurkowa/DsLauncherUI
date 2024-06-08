import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useEffect, useState } from "react";

const api = new DsLauncherApiClient();

export function useSubscriptions(developerGuid) {
  const [subscriptions, setSubscriptions] = useState();

  useEffect(() => {
    (async () => {
      try {
        setSubscriptions(await api.getSubscriptions(developerGuid));
      } catch {}
    })();
  }, []);

  return subscriptions;
}
