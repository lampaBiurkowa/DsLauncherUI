import React from "react";

import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import SliderContainer from "@/components/carousel/Carousel";
import StoreEntry from "@/components/store-entry/StoreEntry";
import DiscoverSliderContent from "./components/DiscoverCarouselContent";

import "./styles/DiscoverPage.scss";
import { promoted, topFree } from "@/assets/data.js";

function DiscoverPage() {
  return (
    <div className="discover-container">
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
      <h2>Top free apps</h2>
      <section className="top-free">
        {topFree.map((child, index) => {
          return (
            <StoreEntry
              key={index}
              id={child.id}
              name={child.name}
              icon={child.icon}
              rating={child.rating.toPrecision(2)}
              price={child.price}
            ></StoreEntry>
          );
        })}
      </section>
    </div>
  );
}

export default DiscoverPage;
