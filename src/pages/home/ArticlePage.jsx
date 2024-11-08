import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSingleArticle from "./hooks/useSingleArticle";
import ReactMarkdown from "react-markdown";

import "./ArticlePage.scss";
import ArticleImage from "./components/ArticleImage";
import { ConfigurationHandler } from "@/services/ConfigurationService";

function ArticlePage() {
  const { id: articleId } = useParams();
  const navigate = useNavigate();
  const article = useSingleArticle(articleId);

  return (
    <div className="article-page">
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <i className="las la-angle-left" />
      </button>
      {article ? (
        <article>
          <h1>{article?.title}</h1>
          <span className="date">
            {new Date(article?.createdAt).toLocaleDateString()}
          </span>
          <p>{article?.summary}</p>
          <ArticleImage url={`${ConfigurationHandler.getSupabaseUrl()}/${ConfigurationHandler.getLauncherBucketName()}/news/${articleId}/cover.png`} caption={article?.image_caption} />
          <ReactMarkdown>{article?.content}</ReactMarkdown>
        </article>
      ) : (
        ""
      )}
    </div>
  );
}

export default ArticlePage;
