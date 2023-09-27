import React from "react";

import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import Carousel from "@/components/carousel/Carousel";
import StoreEntry from "@/components/store-entry/StoreEntry";
import DiscoverSliderContent from "./components/DiscoverCarouselContent";
import Shelf from "@/components/shelf/Shelf";
import useStaticProducts from "../product-page/hooks/useStaticProducts";

import "./DiscoverPage.scss";

function DiscoverPage() {
  let promoted = useStaticProducts('promoted');
  let topFree = useStaticProducts('topFree');

  return (
    <div className="discover-container">
      <AspectRatio aspectRatio={12 / 5}>
        <Carousel interval={5000}>
          {promoted?.map((child, index) => {
            return (
              <DiscoverSliderContent
                key={index}
                name={child.product.name}
                desc={child.product.description}
                link={child.product.name}
                background={child.product.name}
              />
            );
          })}
        </Carousel>
      </AspectRatio>
      <Shelf title="New & updated">
        {topFree?.map((child, index) => {
            console.log(child);
            console.log(child.product.name);
          return (
            <StoreEntry
              key={index}
              id={child.product.id}
              name={child.product.name}
              icon={child.product.name}
              rating={child.summary.avg}
            ></StoreEntry>
          );
        })}
      </Shelf>
      <Shelf title="MOCNE">
        {topFree?.map((child, index) => {
          return (
            <StoreEntry
              key={index}
              id={child.product.id}
              name={child.product.name}
              icon={child.product.name}
              rating={child.summary.avg}
            ></StoreEntry>
          );
        })}
      </Shelf>
    </div>
  );
}

export default DiscoverPage;
