import React from "react";
import "./Logo.scss";

function Logo({ className }) {
  return (
    <div className={`${className ?? ""} logo`}>
      <img src="/img/icon.png" alt="Dibrysoft logo" />
      <a>Dibrysoft</a>
    </div>
  );
}

export default Logo;
