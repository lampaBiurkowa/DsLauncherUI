import React, { createContext, useCallback, useEffect, useState } from "react";
import SliderControls from "./SliderControls";
import "../styles/components/SliderContainer.scss";
import SliderPage from "./SliderPage";

export const SliderContext = createContext();

function SliderContainer({
  auto = true,
  interval = 3000,
  controls = true,
  children,
}) {
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
    <div className="slider-container">
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

export default SliderContainer;
