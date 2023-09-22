import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserApi } from "./pages";
import PlayingService from "./services/PlayingService";

//report online loop
const userApi = new UserApi();
setInterval(() => {
    userApi.userReportOnlineLoginGet("d", ((error, data) => {}));
}, 60000); 

//recover unsent game activities data
const playingService = new PlayingService();
await playingService.trySendSavedGameActivities();

//monitor game activity loop
setInterval(async () => {
    if (PlayingService.currentlyPlayedGameId != null)
    {
        console.log("saving");
        await playingService.tryPingGameActivity();
    }
}, 10000); 

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
