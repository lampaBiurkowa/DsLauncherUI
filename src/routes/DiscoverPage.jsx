import React from "react";
import AspectRatio from "../components/AspectRatio";
import SliderContainer from "../components/SliderContainer";
import "../styles/layouts/DiscoverPage.scss";
import { promoted } from "../data";
import DiscoverSliderContent from "../components/DiscoverSliderContent";

function DiscoverPage() {
  return (
    <div className="discover-container">
      {/* <h2>Discover</h2> */}
      <AspectRatio aspectRatio={12 / 5}>
        <SliderContainer interval={5000}>
          {promoted.map((child, index) => {
            return (
              <DiscoverSliderContent
                key={index}
                name={child.name}
                desc={child.desc}
                link={child.link}
                button={child.button}
                background={child.background}
              />
            );
          })}
        </SliderContainer>
      </AspectRatio>
    </div>
  );
}

export default DiscoverPage;
