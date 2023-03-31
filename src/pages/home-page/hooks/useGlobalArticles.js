import { useState, useEffect } from "react";
import { getGlobalArticles } from "@/services/supabase";

export function useGlobalArticles() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setContent(await getGlobalArticles());
      } catch (error) {
        setContent([]);
      }
    };

    getArticles();
  }, []);

  return content;
}
