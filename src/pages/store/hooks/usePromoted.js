import { ConfigurationHandler } from "@/services/ConfigurationService";
import { useState, useEffect } from "react";

function usePromoted() {
  const url = `${ConfigurationHandler.getSupabaseUrl()}/${ConfigurationHandler.getLauncherBucketName()}/promoted.json`;
  let [products, setPromoted] = useState();

  useEffect(() => {
    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setPromoted(data);
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  }, []);

  return products;
}

export default usePromoted;
