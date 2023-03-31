import React from "react";
import "./NewsEntry.scss";

function NewsEntry({ title, image, date, summary, target }) {
  return (
    <button className="news-entry">
      <div className="cover" style={{ backgroundImage: `url(${image})` }} />
      <h2>{title}</h2>
      <a className="date">{new Date(date).toDateString()}</a>
      <p>{summary}</p>
      {target ? <span className="target">{target}</span> : ""}
    </button>
  );
}

export default NewsEntry;
