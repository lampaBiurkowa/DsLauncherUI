import React from "react";
import "./Separator.scss";

function Separator({ children }) {
  return (
    <div className="separator">
      <span>{children}</span>
    </div>
  );
}

export default Separator;
