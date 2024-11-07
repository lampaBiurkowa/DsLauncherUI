import { useServiceListener } from "@/hooks/useServiceListener";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import { useEffect, useState } from "react";

export function useLibraries() {
  const response = useServiceListener("get-libraries");
  const service = new DsLauncherServiceClient();
  const [libraries, setLibraries] = useState();

  useEffect(() => {
    service.getLibraries();
  }, []);

  useEffect(() => {
    if (response) {
      setLibraries(response.Libraries);
    }
  }, [response]);

  return libraries;
}
