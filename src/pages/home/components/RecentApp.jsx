import React from "react";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import "./RecentApp.scss";

const service = new DsLauncherServiceClient();

function RecentApp({ children, coverUrl, guid }) {
  return (
    <button
      className="recent-app"
      style={{ backgroundImage: `url("${coverUrl}")` }}
      onClick={() => {
        service.execute(guid);
      }}
    >
      <div>
        <span>{children}</span>
      </div>
    </button>
  );
}

export default RecentApp;
