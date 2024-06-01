import React from "react";
import "./SettingsEntry.scss";

function SettingsEntry({ name, desc, children }) {
  return (
    <div className="settings-entry">
      <div className="header">
        <span className="name">{name}</span>
        {desc ? <span className="desc">{desc}</span> : <></>}
      </div>
      <div className="setting-content">{children}</div>
    </div>
  );
}

export default SettingsEntry;
