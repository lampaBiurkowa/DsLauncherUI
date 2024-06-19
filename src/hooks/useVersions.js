import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useEffect, useState } from "react";

const api = new DsLauncherApiClient();

export function useVersions(productGuid) {
  const [versions, setVersions] = useState();

  useEffect(() => {
    (async () => {
      setVersions(await api.getPackagesByProduct(productGuid));
    })();
  }, [productGuid]);

  return versions;
}
