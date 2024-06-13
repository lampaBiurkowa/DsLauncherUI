import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function useDeveloperAccessPrice() {
  const [developerAccessPrice, setDeveloperAccessPrice] = useState([]);

  useEffect(() => {
    async function fetchDeveloperAccessPrice() {
      const response = await api.getDeveloperAccountPrice();
      setDeveloperAccessPrice(response);
    }
    fetchDeveloperAccessPrice();
  }, []);

  return developerAccessPrice;
}

export default useDeveloperAccessPrice;
