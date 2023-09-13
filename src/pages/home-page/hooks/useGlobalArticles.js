import { useState, useEffect } from "react";
import { NewsApi } from "../../../services/api/NewsApi";
import { ProductApi } from "../../../services/api/ProductApi";
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

export function useGlobalArticles2() {

  const productApi = new ProductApi();

  let [content, setContent] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setContent(await productApi.productGetGet());
      } catch (error) {
        console.log(error)
        setContent([]);
      }
    };

    getArticles();
  }, []);

  return content;
}

