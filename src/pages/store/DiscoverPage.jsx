import React from "react";

import AspectRatio from "@/components/aspect-ratio/AspectRatio";
import Carousel from "@/components/carousel/Carousel";
import Shelf from "@/components/shelf/Shelf";
import StoreEntry from "./components/StoreEntry";
import DiscoverSliderContent from "./components/DiscoverCarouselContent";
import useStaticProducts from "./hooks/useStaticProducts";
import usePromoted from "./hooks/usePromoted";

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
              return (
                <StoreEntry
                  key={index}
                  id={child.data.guid}
                  name={child.data.name}
                  icon={child.static.Icon}
                  rating={child.rates.avg}
                  platform={`${child.latestVersion?.isLinux ? "linux" : ""} ${
                    child.latestVersion?.isWin ? "win" : ""
                  } ${child.latestVersion?.isMac ? "macos" : ""}`}
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
