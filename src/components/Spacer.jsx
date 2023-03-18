import React from "react";

function Spacer({ grow = 1, shrink = 0 }) {
  return <div style={{ flexGrow: grow }} />;
}

export default Spacer;
