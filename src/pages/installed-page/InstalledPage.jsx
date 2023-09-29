import React, { useEffect, useState } from "react";
import LibraryEntry from "@/components/library-entry/LibraryEntry";
import Dropdown from "@/components/dropdown/Dropdown";

import "./InstalledPage.scss";

function InstalledPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    //Load apps
    setApps(
      Array.from({ length: 4 }).map((_, i) => {
        return {
          icon: "/test/product_icon.png",
          title: `MOCNA  H R A  ${i + 1}`,
          hours: "813 hours",
        };
      })
    );
  }, []);

  function run(appName) {
    console.log(appName);
  }

  return (
    <div className="installed-page">
      <h1>Installed Apps</h1>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry
              icon={app.icon}
              title={app.title}
              secondary={app.hours}
              key={index}
            >
              <button
                className="accent outlined"
                onClick={() => run(app.title)}
              >
                Launch
              </button>
              <Dropdown>
                <ul className="dropdown-content">
                  <li>
                    <button className="menuitem small">
                      <i className="las la-trash" />
                      <span>Uninstall</span>
                    </button>
                    <button className="menuitem small">
                      <i className="las la-wrench" />
                      <span>Properties</span>
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </LibraryEntry>
          );
        })}
      </div>
    </div>
  );
}

export default InstalledPage;
