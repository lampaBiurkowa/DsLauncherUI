import React from "react";
import "./LibraryPath.scss";

function LibraryPath({ path, name, onRemoved, onSelected }) {
  return (
    <div className="library-path">
      <i class="las la-hdd"></i>
      <span onClick={() => onSelected?.(path)} className="header">{name}</span>
      <span className="path">{path}</span>
      <button onClick={() => onRemoved?.(path)}>Remove</button>
    </div>
  );
}

export default LibraryPath;
