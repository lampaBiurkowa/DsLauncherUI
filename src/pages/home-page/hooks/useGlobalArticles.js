import { useState, useEffect } from "react";
import { NewsApi } from "../../../services/api/NewsApi";
export function useGlobalArticles() {

  const newsApi = new NewsApi();

  let [content, setContent] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setContent(await newsApi.newsGetGet());
      } catch (error) {
        setContent([]);
      }
    };

    getArticles();
  }, []);

  return content;
}

