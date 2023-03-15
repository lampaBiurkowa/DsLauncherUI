import "../styles/TitleBar.scss";
import React from "react";
import { appWindow } from "@tauri-apps/api/window";

function TitleBar() {
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
      <div className="title-area">
        <img src="/img/icon.png" alt="App icon" className="app-icon" />
        <a className="app-title">Dibrysoft Launcher</a>
      </div>
      <div className="control-area">
        <button className="control-btn" onClick={handleOnMinimize}>
          <svg width="10px" height="10px">
            <path d="M0 5.5 l10 0 Z" />
          </svg>
        </button>
        <button className="control-btn" onClick={handleOnMaximizeToggled}>
          <svg width="10px" height="10px">
            <path d="M0.5 0.5 l9 0 l0 9 l-9 0 l0 -9 Z" />
          </svg>
        </button>
        <button className="control-btn close-btn" onClick={handleOnClose}>
          <svg width="10px" height="10px">
            <path d="M0 0 l10 10 M0 10 l10 -10 Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TitleBar;
