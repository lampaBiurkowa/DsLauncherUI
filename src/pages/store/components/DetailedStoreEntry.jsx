import React from "react";
import { NavLink } from "react-router-dom";
import "./DetailedStoreEntry.scss";
import CollapsedArea from "@/components/collapsed-area/CollapsedArea";

function DetailedStoreEntry({
  id,
  name,
  icon,
  rating,
  platform,
  tags,
  description,
}) {
  return (
    <NavLink to={`/store/product/${id}`} className="detailed-store-entry">
      <div className="icon-container">
        <div
          className="icon-shadow"
          style={{ backgroundImage: `url("${icon}")` }}
        />
        <img src={icon} className="icon" alt="Application icon" />
      </div>
      <div className="app-info">
        <div className="header">
          <span className="app-name">{name}</span>
          <div className="app-rating">
            {rating}
            <i className="las la-star"></i>
          </div>
          <div className="platforms">
            {platform?.includes("win") ? <i className="lab la-windows" /> : ""}
            {platform?.includes("linux") ? <i className="lab la-linux" /> : ""}
            {platform?.includes("macos") ? <i className="lab la-apple" /> : ""}
          </div>
        </div>
        <div className="content">
          <span>{description}</span>
        </div>
        <div className="footer">
          {tags?.split(",")?.map((tag, key) => {
            return (
              <span className="tag" key={key}>
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </NavLink>
  );
}

export default DetailedStoreEntry;
