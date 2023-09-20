import React from "react";
import "./ReviewCounter.scss";

function ReviewCounter({ rate, count, totalCount }) {
  return (
    <div className="rate-counter">
      <span className="rate">{rate}</span>
      <span className="count">({count})</span>
      <div className="bar">
        <div
          className="fill bar"
          style={{ width: `${(count / totalCount) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ReviewCounter;
