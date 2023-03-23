import React from "react";
import AspectRatio from "../components/AspectRatio";
import SliderContainer from "../components/SliderContainer";
import "../styles/layouts/DiscoverPage.scss";
import { promoted, topFree } from "../data";
import DiscoverSliderContent from "../components/DiscoverSliderContent";
import StoreEntry from "../components/StoreEntry";

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
