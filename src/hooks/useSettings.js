import { useContext } from "react";
import { SettingsContext } from "@/contexts/SettingsContextProvider";
import { writeSettings } from "@/services/SettingsService";

function useSettings() {
  let settings = useContext(SettingsContext);

  function apply(editCallback) {
    editCallback(settings);

    (async () => {
      await writeSettings(settings);
    })();
  }

  return [structuredClone(settings), apply];
}

export default useSettings;
