import { useState, useEffect } from "react";
import { NewsApi } from "../../../services/api/NewsApi";

const newsApi = new NewsApi();

function useArticles() {
  let [articles, setArticles] = useState([]);

  useEffect(() => {
    newsApi.newsGetGet((error, data) => {
      if (error === null) {
        setArticles(data);
      }
    });
  }, []);

  return articles;
}

export default useArticles;
