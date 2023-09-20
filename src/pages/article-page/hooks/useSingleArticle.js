import { useState, useEffect } from "react";
import { NewsApi } from "@/services/api/NewsApi";

const newsApi = new NewsApi();

function useSingleArticle(id) {
  let [article, setArticle] = useState();

  useEffect(() => {
    newsApi.newsIdGet(id, (error, data) => {
      if (error === null) {
        setArticle(data);
      }
    });
  }, []);

  return article;
}

export default useSingleArticle;
