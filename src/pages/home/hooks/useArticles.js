import { useState, useEffect } from "react";
import { DsLauncherApiClient } from "../../../services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function useArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      const response = await api.getNews(0, 10);
      setArticles(response);
    }
    fetchArticles();
  }, []);

  return articles;
}

export default useArticles;
