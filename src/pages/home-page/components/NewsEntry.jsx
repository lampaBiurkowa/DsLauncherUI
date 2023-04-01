import React from "react";
import { Link } from "react-router-dom";
import "./NewsEntry.scss";

function NewsEntry({ id, title, image, date, summary, target }) {
  return (
    <Link className="news-entry" to={`/home/article/${id}`}>
      <div className="cover" style={{ backgroundImage: `url(${image})` }} />
      <h2>{title}</h2>
      <span className="date">{new Date(date).toDateString()}</span>
      <p>{summary}</p>
      {target ? <span className="target">{target}</span> : ""}
    </Link>
  );
}

export default NewsEntry;
