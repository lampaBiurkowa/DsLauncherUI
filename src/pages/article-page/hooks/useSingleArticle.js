import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function useSingleArticle(id) {
  let [article, setArticle] = useState();

  useEffect(() => {
    async function fetchArticle() {
      const response = await api.getNewsById(id);
      setArticle(response);
    }
    fetchArticle();
  }, []);

  return article;
}

export default useSingleArticle;
