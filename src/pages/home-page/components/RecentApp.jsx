import React from "react";
import "./RecentApp.scss";

function RecentApp({ children, coverUrl }) {
  const bgStyle = {
    backgroundImage: `url(${coverUrl})`,
  };

  return (
    <button className="recent-app" style={bgStyle}>
      <a>{children}</a>
    </button>
  );
}

export default RecentApp;
