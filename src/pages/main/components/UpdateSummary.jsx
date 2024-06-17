import React, { useEffect, useState } from "react";
import "./UpdateSummary.scss";
import { useServiceListener } from "@/hooks/useServiceListener";

function UpdateSummary() {
  const [updateProgress, setUpdateProgress] = useState(0);
  // setInterval(async () => {
  //   setUpdateProgress(globalUpdateProgress?.progress);
  // }, 100);
  const installedProgress = useServiceListener("get-downloads");

  useEffect(() => {
    console.log(installedProgress?.Downloads, 'adad');
    if (installedProgress?.Downloads && Object.keys(installedProgress?.Downloads)?.length !== 0) {
      const values = Object.values(installedProgress?.Downloads);
      const sum = values.reduce((acc, val) => acc + val, 0);
      const average = sum / values.length;
      setUpdateProgress(average)
    }
    else {
      setUpdateProgress(0);
    }
  }, [installedProgress]);

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
