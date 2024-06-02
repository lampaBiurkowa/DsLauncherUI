import React from "react";
import "./LibraryPath.scss";

function LibraryPath({ path, onRemoved }) {
  return (
    <div className="library-path">
      <i class="las la-hdd"></i>
      <span className="header">Dibrysoft Library</span>
      <span className="path">{path}</span>
      <button onClick={() => onRemoved?.(path)}>Remove</button>
    </div>
  );
}

export default LibraryPath;
