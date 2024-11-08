import { useEffect } from "react";
import { useState } from "react";
import { listen } from '@tauri-apps/api/event';


export function useServiceListener(command) {
  const [response, setResponse] = useState();

  useEffect(() => {
    listen(command, (event) => {
      setResponse(JSON.parse(event.payload));
    });

  }, []);

  return response;
}
  