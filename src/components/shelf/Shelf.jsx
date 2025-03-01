import React, { useRef } from "react";
import "./Shelf.scss";

function Shelf({ title, scrollAmount = 300, className, children }) {
  const shelfRef = useRef();

  const scrollLeft = () => {
    shelfRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    shelfRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`${className} shelf`}>
      <div className="shelf-head">
        <h2>{title}</h2>
        <div className="shelf-controls">
          <button
            className="outlined small capsule"
            onClick={() => scrollLeft()}
          >
            <i className="las la-angle-left"></i>
          </button>
          <button
            className="outlined small capsule"
            onClick={() => scrollRight()}
          >
            <i className="las la-angle-right"></i>
          </button>
        </div>
      </div>
      <div className="shelf-items" ref={shelfRef}>
        {children}
      </div>
    </div>
  );
}

export default Shelf;
