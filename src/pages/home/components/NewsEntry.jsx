import React from "react";
import { Link } from "react-router-dom";
import "./NewsEntry.scss";

function NewsEntry({ id, title, image, date, summary, target }) {
  return (
    <Link className="news-entry" to={`/home/article/${id}`}>
      <div className="cover" style={{ backgroundImage: `url(${image})` }}>
        {target ? (
          <img
            src={getAppIconUrl(target)}
            alt="target application icon"
            className="target-icon"
          />
        ) : (
          ""
        )}
      </div>
      <h2>{title}</h2>
      <span className="date">{new Date(date).toLocaleDateString()}</span>
      <p>{summary}</p>
    </Link>
  );
}

export default NewsEntry;
