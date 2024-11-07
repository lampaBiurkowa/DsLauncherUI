import React, { useState } from "react";
import { useScrolledToEnd } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import DetailedStoreEntry from "./components/DetailedStoreEntry";
import "./MusicPage.scss";
import { getProduct } from "@/services/CacheService";

const api = new DsLauncherApiClient();

function MusicPage() {
  const [items, setItems] = useState([]);

  const scrollViewRef = useScrolledToEnd(async () => {
    const newItems = await api.getMusicIds(items.length, 10);
    const updatedItems = await Promise.all(newItems.map(async (guid) => {
      return await getProduct(guid);
    }));
    setItems([...items, ...updatedItems]);
  });


  return (
    <div className="music-container">
      <h2>Music</h2>
      <ul ref={scrollViewRef}>
        {items?.map((item, index) => {
          return (
            <DetailedStoreEntry
              key={index}
              id={item?.model?.guid}
              name={item?.model?.name}
              icon={item?.filesData?.Icon}
              rating={item?.rates?.avg}
              description={item?.model?.description}
              tags={item?.model?.tags}
            ></DetailedStoreEntry>
          );
        })}
      </ul>
    </div>
  );
}

export default MusicPage;
