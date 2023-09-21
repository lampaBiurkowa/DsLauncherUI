import React from "react";
import "./Logo.scss";

function Logo({ text, className }) {
  return (
    <div className={`${className ?? ""} logo`}>
      <img src="/img/icon.png" alt="Dibrysoft logo" />
      <a>{text ?? "Dibrysoft"}</a>
    </div>
  );
}

export default Logo;
