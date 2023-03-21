import React from "react";
import "../styles/components/AspectRatio.scss";

function AspectRatio({ children, aspectRatio }) {
  return (
    <div
      className="aspect-ratio-controller"
      style={{
        paddingBottom: `calc(100% * ${1 / aspectRatio})`,
      }}
    >
      <div className="aspect-ratio-container">
        {React.Children.only(children)}
      </div>
    </div>
  );
}

export default AspectRatio;
