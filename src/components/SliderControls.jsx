import React from "react";
import "../styles/components/SliderControls.scss";

function SliderControls({ slideCount, slideIndex, setSlideIndex }) {
  function next() {
    if (slideIndex < slideCount - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(0);
    }
  }

  function prev() {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideCount - 1);
    }
  }

  return (
    <div className="slider-controls">
      <button onClick={() => prev()} className="control-button">
        <i className="las la-angle-left"></i>
      </button>
      <div className="pagination-container">
        {Array.from({ length: slideCount }).map((_, key) => {
          return (
            <button
              key={key}
              onClick={() => setSlideIndex(key)}
              className={`pagination-dot ${
                slideIndex === key ? " active" : ""
              }`}
            />
          );
        })}
      </div>
      <button onClick={() => next()} className="control-button">
        <i className="las la-angle-right"></i>
      </button>
    </div>
  );
}

export default SliderControls;
