import React from "react";
import "./NewsEntry.scss";

function NewsEntry({ title, coverUrl, date }) {
  return (
    <button className="news-entry">
      <div className="cover" style={{ backgroundImage: `url(${coverUrl})` }} />
      <h2>{title}</h2>
      <a className="date">{new Date(date).toDateString()}</a>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
        aspernatur fugit sunt repudiandae, quo id.
      </p>
    </button>
  );
}

export default NewsEntry;
