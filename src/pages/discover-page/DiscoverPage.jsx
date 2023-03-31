import React from "react";

import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import Carousel from "@/components/carousel/Carousel";
import StoreEntry from "@/components/store-entry/StoreEntry";
import DiscoverSliderContent from "./components/DiscoverCarouselContent";
import Shelf from "@/components/shelf/Shelf";

import "./DiscoverPage.scss";
import { promoted, topFree } from "@/assets/data.js";

function DiscoverPage() {
  return (
    <div className="discover-container">
      <AspectRatio aspectRatio={12 / 5}>
        <Carousel interval={5000}>
          {promoted.map((child, index) => {
            return (
              <DiscoverSliderContent
                key={index}
                name={child.name}
                desc={child.desc}
                link={child.link}
                background={child.background}
              />
            );
          })}
        </Carousel>
      </AspectRatio>
      <Shelf title="New & updated">
        {topFree.map((child, index) => {
          return (
            <StoreEntry
              key={index}
              id={child.id}
              name={child.name}
              icon={child.icon}
              rating={child.rating}
              platform={child.platform}
            ></StoreEntry>
          );
        })}
      </Shelf>
      <Shelf title="Top free apps">
        {topFree.map((child, index) => {
          return (
            <StoreEntry
              key={index}
              id={child.id}
              name={child.name}
              icon={child.icon}
              rating={child.rating}
              platform={child.platform}
            ></StoreEntry>
          );
        })}
      </Shelf>
    </div>
  );
}

export default DiscoverPage;
