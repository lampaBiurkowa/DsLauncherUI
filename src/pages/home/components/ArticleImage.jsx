import React from "react";
import "./ArticleImage.scss";

function ArticleImage({ url, caption }) {
  return (
    <div className="article-image">
      <img src={url} alt={caption} />
      <a>{caption}</a>
    </div>
  );
}

export default ArticleImage;
