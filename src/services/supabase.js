import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export async function getGlobalArticles() {
  let { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, published, image, summary")
    .is("target", null)
    .order("published", { ascending: false });

  if (error) {
    throw error;
  }

  return articles;
}

export async function getArticle(id) {
  let { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id);

  if (error) {
    throw error;
  }

  return article;
}
