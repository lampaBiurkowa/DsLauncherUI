import React, { useEffect, useState } from "react";
import { useServiceListener } from "@/hooks/useServiceListener";
import { NavLink } from "react-router-dom";
import "./UpdateSummary.scss";

function UpdateSummary() {
  const [updateProgress, setUpdateProgress] = useState();
  const operations = useServiceListener("get-downloads");

  useEffect(() => {
    if (Object.keys(operations?.Downloads ?? {}).length > 0) {
      const values = Object.values(operations?.Downloads);
      const sum = values.reduce((acc, val) => acc + val.Percentage, 0);
      setUpdateProgress(sum / values.length);
    } else {
      setUpdateProgress(undefined);
    }
  }, [operations]);

  return (
    <NavLink className="update-summary" to="/downloads">
      <i className="las la-download" />
      <span className="header">Downloads</span>
      {updateProgress != undefined ? (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${updateProgress ?? 0}%` }}
          />
        </div>
      ) : (
        <span className="no-downloads-info">No download operations</span>
      )}
    </NavLink>
  );
}

export default UpdateSummary;
