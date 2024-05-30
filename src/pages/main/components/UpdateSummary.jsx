import React, { useState } from "react";
import "./UpdateSummary.scss";
import { globalUpdateProgress } from "../../../App";

function UpdateSummary() {
  // const [updateProgress, setUpdateProgress] = useState(0);
  // setInterval(async () => {
  //   setUpdateProgress(globalUpdateProgress?.progress);
  // }, 100);
  let updateProgress = 0;

  return (
    <button className="update-summary">
      <i className="las la-download" />
      <span>Updating</span>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${updateProgress}%` }} />
      </div>
    </button>
  );
}

export default UpdateSummary;
