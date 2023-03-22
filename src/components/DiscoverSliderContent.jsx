import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/components/DiscoverSliderContent.scss";

function DiscoverSliderContent({ name, desc, button, link, background }) {
  return (
    <div
      className="discover-slider"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="content-overlay">
        <div className="slide-content">
          <a className="head">{name}</a>
          <a className="desc">{desc}</a>
          <NavLink className="link" to={link}>
            {button}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default DiscoverSliderContent;
