import React, { useState } from "react";
import { useScrolledToEnd } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import DetailedStoreEntry from "./components/DetailedStoreEntry";
import "./GamesPage.scss";
import { ProductsCache } from "@/services/CacheService";

const api = new DsLauncherApiClient();

function GamesPage() {
  const [games, setGames] = useState([]);

  const scrollViewRef = useScrolledToEnd(async () => {
    const newGames = await api.getGamesIds(games.length, 10);
    const updatedGames = await Promise.all(newGames.map(async (guid) => {
      return await ProductsCache.getById(guid);
    }));
    setGames([...games, ...updatedGames]);
  });

  return (
    <div className="games-container">
      <h2>Games</h2>
      <ul ref={scrollViewRef}>
        {games?.map((game, index) => {
          console.log('zzz', game);
          return (
            <DetailedStoreEntry
              key={index}
              id={game?.model?.guid}
              name={game?.model?.name}
              icon={game?.static?.Icon}
              rating={game?.rates?.avg}
              description={game?.model?.description}
              tags={game?.model?.tags}
              platform={`${game?.latestVersion?.linuxExePath ? "linux" : ""} 
                         ${game?.latestVersion?.windowsExePath ? "win" : ""} 
                         ${game?.latestVersion?.macExePath ? "macos" : ""}`}
            ></DetailedStoreEntry>
          );
        })}
      </ul>
    </div>
  );
}

export default GamesPage;
