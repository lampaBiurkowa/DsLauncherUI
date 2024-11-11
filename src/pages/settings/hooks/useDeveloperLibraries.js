import { useServiceListener } from "@/hooks/useServiceListener";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import { useEffect, useState } from "react";

export function useDeveloperLibraries() {
  const response = useServiceListener("get-developer-libraries");
  const service = new DsLauncherServiceClient();
  const [libraries, setLibraries] = useState();

  useEffect(() => {
    service.getDeveloperLibraries();
  }, []);

  useEffect(() => {
    if (response) {
      setLibraries(response.Libraries);
    }
  }, [response]);

  return libraries;
}
