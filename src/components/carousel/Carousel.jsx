import React, { createContext, useEffect, useState } from "react";
import SliderControls from "./CarouselControls";
import SliderPage from "./CarouselItem";
import "./Carousel.scss";

export const CarouselContext = createContext();

function Carousel({ auto = true, interval = 3000, controls = true, children }) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (auto) {
      const nextSlideTimeout = setTimeout(() => {
        if (slideIndex < children?.length - 1) {
          setSlideIndex(slideIndex + 1);
        } else {
          setSlideIndex(0);
        }
      }, interval);

      return () => {
        clearTimeout(nextSlideTimeout);
      };
    }
  }, [slideIndex]);

  return (
    <div className="carousel">
      {React.Children.map(children, (child, index) => {
        return (
          <SliderPage key={index} active={index === slideIndex}>
            {child}
          </SliderPage>
        );
      })}
      {controls && (
        <SliderControls
          slideCount={children?.length}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
        />
      )}
    </div>
  );
}

export default Carousel;
