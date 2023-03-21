import React from "react";
import AspectRatio from "../components/AspectRatio";
import "../styles/layouts/DiscoverPage.scss";

function DiscoverPage() {
  return (
    <div className="discover-container">
      <h2>Discover</h2>
      <AspectRatio aspectRatio={12 / 5}>
        <section className="promo-slider"></section>
      </AspectRatio>
    </div>
  );
}

export default DiscoverPage;
