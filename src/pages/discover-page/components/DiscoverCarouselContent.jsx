import React from "react";
import { NavLink } from "react-router-dom";
import "./DiscoverCarouselContent.scss";

function DiscoverSliderContent({ name, desc, link, background }) {
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
            Zobacz szczegóły
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default DiscoverSliderContent;
