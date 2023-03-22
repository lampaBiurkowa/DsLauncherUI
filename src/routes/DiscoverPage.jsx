import React, { useLayoutEffect } from "react";
import AspectRatio from "../components/AspectRatio";
import SliderContainer from "../components/SliderContainer";
import "../styles/layouts/DiscoverPage.scss";

function DiscoverPage() {
  return (
    <div className="discover-container">
      <h2>Discover</h2>
      <AspectRatio aspectRatio={12 / 5}>
        <SliderContainer></SliderContainer>
      </AspectRatio>
    </div>
  );
}

export default DiscoverPage;
