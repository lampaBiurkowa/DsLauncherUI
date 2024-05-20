import ReactDOM from "react-dom/client";
import "./styles/App.scss";
import TitleBar from "./components/titlebar/TitleBar";
import Router from "./Router.jsx";
import UserContextProvider from "./contexts/UserContextProvider";
import SettingsContextProvider from "./contexts/SettingsContextProvider";

//import { UserApi } from "./pages";
//import PlayingService from "./services/PlayingService";
//import { ProductsCache, UsersCache } from "./services/CacheService";

// //report online loop
// const userApi = new UserApi();
// setInterval(() => {
//   userApi.userReportOnlineLoginGet("d", (error, data) => { });
// }, 60000);

// //recover unsent game activities data
// const playingService = new PlayingService();
// await playingService.trySendSavedGameActivities();

// //monitor game activity loop
// setInterval(async () => {
//   if (PlayingService.currentlyPlayedGameId != null) {
//     await playingService.tryPingGameActivity();
//   }
// }, 10000);

export const globalUpdateProgress = {
  progress: 0,
};

// await UsersCache.load();
// await ProductsCache.load();

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="app">
    <TitleBar />
    <SettingsContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </SettingsContextProvider>
  </div>
);
