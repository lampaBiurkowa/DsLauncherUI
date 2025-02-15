import React from "react";
import { Link } from "react-router-dom";
import "./NewsEntry.scss";
import { ConfigurationHandler } from "@/services/ConfigurationService";

function NewsEntry({ id, title, date, summary, target }) {
  return (
    <Link className="news-entry" to={`/home/article/${id}`}>
      <div className="cover" style={{ backgroundImage: `url(${ConfigurationHandler.getSupabaseUrl()}/${ConfigurationHandler.getLauncherBucketName()}/news/${id}/cover.png)` }}>
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
