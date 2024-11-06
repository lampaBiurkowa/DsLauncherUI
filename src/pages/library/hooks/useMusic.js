import { getProduct } from "@/services/CacheService";
import { useState, useEffect } from "react";

function useMusic(id) {
  let [music, setMusic] = useState();

  useEffect(() => {
    async function fetchMusic() {
      const response = await getProduct(id);
      setMusic(response);
    }
    
    fetchMusic();
  }, []);

  return music;
}

export default useMusic;
