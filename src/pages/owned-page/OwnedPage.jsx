import React, { useEffect, useState } from "react";
import LibraryEntry from "@/components/library-entry/LibraryEntry";

import "./OwnedPage.scss";

function OwnedPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    //Load apps
    setApps(
      Array.from({ length: 10 }).map((_, i) => {
        return {
          icon: "/test/product_icon.png",
          title: `MOCNA  H R A  ${i + 1}`,
          hours: "813 hours",
        };
      })
    );
  }, []);

  function install(appName) {
    console.log(appName);
  }

  return (
    <div className="owned-page">
      <h1>Your Apps</h1>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry icon={app.icon} title={app.title} key={index}>
              <button
                className="accent outlined"
                onClick={() => install(app.title)}
              >
                Install
              </button>
            </LibraryEntry>
          );
        })}
      </div>
    </div>
  );
}

export default OwnedPage;
