import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useState, useEffect } from "react";

const api = new DsLauncherApiClient();

function useTracks(id) {
  let [tracks, setTracks] = useState();

  useEffect(() => {
    async function fetchTracks() {
      const response = await api.getTracks(id);
      setTracks(response);
    }
    
    fetchTracks();
  }, []);

  return tracks;
}

export default useTracks;
