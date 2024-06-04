import React, { useState } from "react";
import "./LibraryEntry.scss";

function LibraryEntry({
  icon = "/img/icon.png",
  title = "Application",
  secondary = "",
  children,
}) {
  return (
    <div className="library-entry">
      <img src={icon} alt="App Icon" />
      <span className="title">{title}</span>
      <span className="secondary">{secondary}</span>
      <div className="actions">{children}</div>
    </div>
  );
}

export default LibraryEntry;
