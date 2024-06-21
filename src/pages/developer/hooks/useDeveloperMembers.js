import { DsCoreApiClient } from "@/services/DsCoreApiClient";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useEffect, useState } from "react";

const launcherApi = new DsLauncherApiClient();
const coreApi = new DsCoreApiClient();

export function useDeveloperMembers(developerGuid) {
  const [members, setMembers] = useState();

  useEffect(() => {
    (async () => {
      try {
        const developer = await launcherApi.getDeveloperById(developerGuid);
        const users = await coreApi.getUsersByIds(developer.userGuids);
        setMembers(users);
      } catch {}
    })();
  }, [developerGuid]);

  return members;
}
