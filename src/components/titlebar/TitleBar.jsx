import React, { useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import "./TitleBar.scss";

let prevMaximized = false;

function TitleBar() {
  const [maximized, setMaximized] = useState(false);

  getCurrentWindow().onResized(async ({ payload: size }) => {
    let isMaximized = await getCurrentWindow().isMaximized();

    if (prevMaximized != isMaximized) {
      setMaximized(isMaximized);
      prevMaximized = isMaximized;
    }
  });

  const handleOnMinimize = () => {
    getCurrentWindow().minimize();
  };

  const handleOnMaximizeToggled = () => {
    getCurrentWindow().toggleMaximize();
  };

  const handleOnClose = () => {
    getCurrentWindow().close();
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
