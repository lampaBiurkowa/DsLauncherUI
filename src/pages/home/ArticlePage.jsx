import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSingleArticle from "./hooks/useSingleArticle";
import ReactMarkdown from "react-markdown";

import "./ArticlePage.scss";
import ArticleImage from "./components/ArticleImage";

function ArticlePage() {
  const { id: articleId } = useParams();
  const article = useSingleArticle(articleId);

  return (
    <div className="article-page">
      <Link to="../">
        <i className="las la-angle-left" />
      </Link>
      {article ? (
        <article>
          <h1>{article?.title}</h1>
          <span className="date">
            {new Date(article?.createdAt).toLocaleDateString()}
          </span>
          <p>{article?.summary}</p>
          <ArticleImage url={article?.image} caption={article?.image_caption} />
          <ReactMarkdown>{article?.content}</ReactMarkdown>
        </article>
      ) : (
        ""
      )}
    </div>
  );
}

export default ArticlePage;
