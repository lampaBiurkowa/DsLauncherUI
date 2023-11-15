import "./Rating.scss";

import React, { useEffect, useState } from "react";

const MAX_RATING = 5;

function Rating({ value, isReadOnly, onValueChanged, className }) {
  let [rating, setRating] = useState(value ?? -1);
  let [ratingPreview, setRatingPreview] = useState(-1);

  function isIndexEnabled(index) {
    return ratingPreview >= 0 ? index < ratingPreview : index < rating;
  }

  function onMouseEnterStar(index) {
    if (!isReadOnly) setRatingPreview(index + 1);
  }

  function onMouseLeaveStar() {
    if (!isReadOnly) setRatingPreview(-1);
  }

  function onMouseClickStar(index) {
    if (!isReadOnly) setRating(index + 1);
  }

  useEffect(() => {
    onValueChanged?.(rating);
  }, [rating]);

  return (
    <div className={`${className ?? ""} rating`}>
      {Array.from({ length: MAX_RATING }).map((_, index) => {
        return (
          <i
            className={`${
              isIndexEnabled(index) ? "star-enabled" : "star-disabled"
            } las la-star`}
            onMouseEnter={() => onMouseEnterStar(index)}
            onMouseLeave={() => onMouseLeaveStar()}
            onClick={() => onMouseClickStar(index)}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default Rating;
