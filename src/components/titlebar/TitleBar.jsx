import React, { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import "./TitleBar.scss";

let prevMaximized = false;

function TitleBar() {
  const [maximized, setMaximized] = useState(false);

  window.addEventListener("resize", async () => {
    let isMaximized = await appWindow.isMaximized();

    if (prevMaximized != isMaximized) {
      setMaximized(isMaximized);
      prevMaximized = isMaximized;
    }
  });

  const handleOnMinimize = () => {
    appWindow.minimize();
  };

  const handleOnMaximizeToggled = () => {
    appWindow.toggleMaximize();
  };

  const handleOnClose = () => {
    appWindow.close();
  };

  return (
    <div className="title-bar" data-tauri-drag-region>
      <button className="control-btn" onClick={handleOnMinimize}>
        <svg width="10px" height="10px">
          <path d="M0 5.5 l10 0" />
        </svg>
      </button>
      <button className="control-btn" onClick={handleOnMaximizeToggled}>
        <svg width="10px" height="10px">
          {!maximized && <path d="M0.5 0.5 l9 0 l0 9 l-9 0 l0 -9 Z" />}
          {maximized && (
            <path d="M0.5 2.5 l7 0 l0 7 l-7 0 l0 -7 M2.5 2.5 l0 -2 l7 0 l0 7 l-2 0" />
          )}
        </svg>
      </button>
      <button className="control-btn close-btn" onClick={handleOnClose}>
        <svg width="10px" height="10px">
          <path d="M0 0 l10 10 M0 10 l10 -10" />
        </svg>
      </button>
    </div>
  );
}

export default TitleBar;
