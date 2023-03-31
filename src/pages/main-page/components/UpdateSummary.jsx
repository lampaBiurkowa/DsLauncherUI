import React from "react";
import "./UpdateSummary.scss";

function UpdateSummary() {
  return (
    <button className="update-summary">
      <i className="las la-download" />
      <a>Updating</a>
      <div className="progress-bar">
        <div className="progress" />
      </div>
    </button>
  );
}

export default UpdateSummary;
