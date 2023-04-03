import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import "./ArticlePage.scss";
import { getArticle } from "@/services/supabase";
import ArticleImage from "./components/ArticleImage";

function ArticlePage() {
  const { id: articleId } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const [article] = await getArticle(articleId);
        setContent(article);
      } catch (error) {
        setContent({});
      }
    };

    fetchArticle();
  }, []);

  return (
    <div className="article-page">
      <Link to="../">
        <i className="las la-angle-left" />
      </Link>
      {content ? (
        <article>
          <h1>{content?.title}</h1>
          <span className="date">
            {new Date(content?.published).toDateString()}
          </span>
          <p>{content?.summary}</p>
          <ArticleImage url={content?.image} caption={content?.image_caption} />
          <ReactMarkdown>{content?.content}</ReactMarkdown>
        </article>
      ) : (
        ""
      )}
    </div>
  );
}

export default ArticlePage;
