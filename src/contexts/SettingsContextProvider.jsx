import React, { createContext, useEffect, useState } from "react";
import { readOrDefault } from "@/services/SettingsService";

export const SettingsContext = createContext();

function SettingsContextProvider({ children }) {
  const [settings, setSettings] = useState();

  useEffect(() => {
    (async () => {
      setSettings(await readOrDefault());
    })();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {settings ? children : <></>}
    </SettingsContext.Provider>
  );
}

export default SettingsContextProvider;
