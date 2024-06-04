import { useEffect } from "react";
import { useState } from "react";
import { addListener, removeListener } from "@/services/DsLauncherService";

export function useServiceListener(command) {
  const [response, setResponse] = useState();

  useEffect(() => {
    function listener(args) {
      setResponse(args);
    }

    addListener(command, listener);

    return () => {
      removeListener(command, listener);
    };
  }, []);

  return response;
}
