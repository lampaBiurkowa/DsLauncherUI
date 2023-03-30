import React from "react";
import { NavLink } from "react-router-dom";
import "./StoreEntry.scss";

function StoreEntry({ id, name, icon, rating }) {
  return (
    <NavLink to={`/store/app/${id}`} className="store-entry">
      <div className="icon-container">
        <div
          className="icon-shadow"
          style={{ backgroundImage: `url(${icon})` }}
        />
        <img src={icon} className="icon" alt="Application icon" />
      </div>
      <div className="app-info">
        <a className="app-name">{name}</a>
        <div className="app-rating">
          {rating.toPrecision(2)}
          <i class="las la-star"></i>
        </div>
      </div>
    </NavLink>
  );
}

export default StoreEntry;
