import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useEffect, useState } from "react";

const api = new DsLauncherApiClient();

export function useDeveloperNews(developerGuid) {
  const [news, setNews] = useState();

  useEffect(() => {
    (async () => {
      try {
        setNews(await api.getNewsByDeveloper(developerGuid));
      } catch {}
    })();
  }, []);

  return news;
}
