import React, { useState } from "react";
import { useScrolledToEnd } from "@/hooks/useScrolledToEnd";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import DetailedStoreEntry from "./components/DetailedStoreEntry";
import getFilesData from "@/services/getFilesData";
import "./GamesPage.scss";

const api = new DsLauncherApiClient();

function GamesPage() {
  const [games, setGames] = useState([]);

  const scrollViewRef = useScrolledToEnd(async () => {
    setGames([
      ...games,
      ...(await api.getGames(games.length, 10))?.map((game) => {
        return {
          model: game,
          static: getFilesData(game),
        };
      }),
    ]);
  });

  return (
    <div className="games-container">
      <h2>Games</h2>
      <ul ref={scrollViewRef}>
        {games?.map((game, index) => {
          return (
            <DetailedStoreEntry
              key={index}
              id={game?.model.guid}
              name={game?.model.name}
              icon={game?.static?.Icon}
              rating={game?.rates?.avg}
              description={game?.model.description}
              tags={game?.model.tags}
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
