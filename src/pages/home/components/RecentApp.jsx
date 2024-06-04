import React from "react";
import "./RecentApp.scss";

function RecentApp({ children, coverUrl, id }) {
  const bgStyle = {
    backgroundImage: `url("${coverUrl}")`,
  };

  return (
    <button className="recent-app" style={bgStyle}>
      <a href={`/store/product/${id}`}>{children}</a>
    </button>
  );
}

export default RecentApp;
