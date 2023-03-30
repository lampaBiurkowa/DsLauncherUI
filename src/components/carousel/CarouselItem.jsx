import React from "react";

function CarouselItem({ active, children }) {
  return (
    <div className={`item ${active ? " active" : ""}`}>
      {React.Children.only(children)}
    </div>
  );
}

export default CarouselItem;
