import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { LocalStorageHandler } from "@/services/LocalStorageService";

const api = new DsLauncherApiClient();

function useAlreadyReviewed(productGuid, refresh) {
  let [alreadyReviewed, setAlreadyReviewed] = useState(true);

  useEffect(() => {
    async function fetchAlreadyReviewed() {
      setAlreadyReviewed((await api.getReviewsByProductAndUser(productGuid, LocalStorageHandler.getUser())) != null);
    }
    
    if (refresh) {
      fetchAlreadyReviewed();
    }
  }, [refresh]);

  return alreadyReviewed;
}

export default useAlreadyReviewed;
