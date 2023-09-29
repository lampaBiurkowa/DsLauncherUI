import React, { useEffect, useState } from "react";
import LibraryEntry from "@/components/library-entry/LibraryEntry";
import Dropdown from "@/components/dropdown/Dropdown";

import "./UpdatesPage.scss";

function UpdatesPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    //Load apps
    setApps(
      Array.from({ length: 2 }).map((_, i) => {
        return {
          icon: "/test/product_icon.png",
          title: `MOCNA  H R A  ${i + 1}`,
          hours: "813 hours",
        };
      })
    );
  }, []);

  function update(appName) {
    console.log(appName);
  }

  return (
    <div className="updates-page">
      <div className="header">
        <h1>Updates</h1>
        <div>
          <button className="small">
            <i className="las la-sync" />
          </button>
        </div>
      </div>
      <div className="apps-list">
        {apps.map((app, index) => {
          return (
            <LibraryEntry icon={app.icon} title={app.title} key={index}>
              <button
                className="accent outlined"
                onClick={() => update(app.title)}
              >
                Update
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

export default UpdatesPage;
