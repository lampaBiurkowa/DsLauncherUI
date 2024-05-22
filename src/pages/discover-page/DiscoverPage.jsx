import React from "react";

import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import Carousel from "@/components/carousel/Carousel";
import StoreEntry from "@/components/store-entry/StoreEntry";
import DiscoverSliderContent from "./components/DiscoverCarouselContent";
import Shelf from "@/components/shelf/Shelf";
import useStaticProducts from "../product-page/hooks/useStaticProducts";
import usePromoted from "../product-page/hooks/usePromoted";

import "./DiscoverPage.scss";

function DiscoverPage() {
  let promoted = usePromoted();
  let sections = useStaticProducts();

  return (
    <div className="discover-container">
      <AspectRatio aspectRatio={12 / 5}>
        <Carousel interval={5000}>
          {promoted?.map((child, index) => {
            return (
              <DiscoverSliderContent
                key={index}
                name={child.name}
                desc={child.desc}
                link={child.link}
                background={child.Background}
              />
            );
          })}
        </Carousel>
      </AspectRatio>
      {sections?.map((section, sectionIndex) => {
        return (
          <Shelf title={section.name} key={sectionIndex}>
            {section?.items.map((child, index) => {
              console.log(section?.items);
              console.log(index);
              console.log(child);
              return (
                <StoreEntry
                  key={index}
                  id={child.data.guid}
                  name={child.data.name}
                  icon={child.static.Icon}
                  rating={child.rates.avg}
                  platform={`${child.static.Linux ? 'linux' : ''} ${child.static.Win ? 'win' : ''} ${child.static.Mac ? 'macos' : ''}`}
                ></StoreEntry>
              );
            })}
          </Shelf>
        );
      })}
    </div>
  );
}

export default DiscoverPage;
