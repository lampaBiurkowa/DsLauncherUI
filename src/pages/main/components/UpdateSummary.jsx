import React, { useEffect, useState } from "react";
import { useServiceListener } from "@/hooks/useServiceListener";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import "./UpdateSummary.scss";

const service = new DsLauncherServiceClient();

function UpdateSummary() {
  const [updateProgress, setUpdateProgress] = useState();
  const operations = useServiceListener("get-downloads");

  useEffect(() => {
    if (updateProgress === undefined) {
      service.getInstallOperations();
    }
    if (Object.keys(operations?.Downloads ?? {}).length > 0) {
      const values = Object.values(operations?.Downloads);
      const sum = values.reduce((acc, val) => acc + val.Percentage, 0);
      setUpdateProgress(sum / values.length);
    } else {
      setUpdateProgress(undefined);
    }
  }, [operations]);

  return (
    <>
      {updateProgress ? (
        <button className="update-summary">
          <i className="las la-download" />
          <span>Downloading</span>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${updateProgress ?? 0}%` }}
            />
          </div>
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

export default UpdateSummary;
