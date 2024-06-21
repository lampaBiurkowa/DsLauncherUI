import { useEffect, useState } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

export function useDeveloper(guid) {
  const [developer, setDeveloper] = useState();

  useEffect(() => {
    (async () => {
      try {
        setDeveloper(await api.getDeveloperById(guid));
      } catch {}
    })();
  }, [guid]);

  return [developer, setDeveloper];
}
