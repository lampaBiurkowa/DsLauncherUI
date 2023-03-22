import React from "react";
import "../styles/components/SliderPage.scss";

function SliderPage({ active, children }) {
  return (
    <div className={`slider-page ${active ? " active" : ""}`}>
      {React.Children.only(children)}
    </div>
  );
}

export default SliderPage;
