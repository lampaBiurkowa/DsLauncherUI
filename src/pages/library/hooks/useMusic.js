import { useState, useEffect } from "react";
import { ProductsCache } from "@/services/CacheService";

function useMusic(id) {
  let [music, setMusic] = useState();

  useEffect(() => {
    async function fetchMusic() {
      const response = await ProductsCache.getById(id);
      setMusic(response);
    }
    
    fetchMusic();
  }, []);

  return music;
}

export default useMusic;
