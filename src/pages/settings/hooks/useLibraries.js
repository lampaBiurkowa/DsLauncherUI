import { useServiceListener } from "@/hooks/useServiceListener";
import { executeCommand } from "@/services/DsLauncherService";
import { useEffect, useState } from "react";

export function useLibraries() {
  const response = useServiceListener("get-libraries");
  const [libraries, setLibraries] = useState();

  useEffect(() => {
    executeCommand("get-libraries");
  }, []);

  useEffect(() => {
    if (response) {
      console.log(response);
      setLibraries(
        Array.from({ length: response.count }, (_, i) => {
          return {
            path: response.paths[i],
            name: response.names[i],
          };
        })
      );
    }
  }, [response]);

  return libraries;
}
