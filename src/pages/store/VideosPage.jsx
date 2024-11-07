import React, { useState } from "react";
import { useScrolledToEnd } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import DetailedStoreEntry from "./components/DetailedStoreEntry";
import "./VideosPage.scss";
import { getProduct } from "@/services/CacheService";

const api = new DsLauncherApiClient();

function VideosPage() {
  const [videos, setVideos] = useState([]);

  const scrollViewRef = useScrolledToEnd(async () => {
    const newVideos = await api.getVideosIds(videos.length, 10);
    const updatedVideos = await Promise.all(newVideos.map(async (guid) => {
      return await getProduct(guid);
    }));
    setVideos([...videos, ...updatedVideos]);
  });


  return (
    <div className="videos-container">
      <h2>Movies</h2>
      <ul ref={scrollViewRef}>
        {videos?.map((item, index) => {
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

export default VideosPage;
