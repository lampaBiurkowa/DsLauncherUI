import React from "react";
import "./LibraryPath.scss";

function LibraryPath({ path, name, onRemoved }) {
  return (
    <div className="library-path">
      <i class="las la-hdd"></i>
      <span className="header">{name}</span>
      <span className="path">{path}</span>
      <button onClick={() => onRemoved?.(path)}>Remove</button>
    </div>
  );
}

export default LibraryPath;
