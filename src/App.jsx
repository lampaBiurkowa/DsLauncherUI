import ReactDOM from "react-dom/client";
import "./styles/App.scss";
import TitleBar from "./components/titlebar/TitleBar";
import Router from "./Router.jsx";
import UserContextProvider from "./contexts/UserContextProvider";
import SettingsContextProvider from "./contexts/SettingsContextProvider";
import { DsIdentityApiClient } from "./services/DsIdentityApiClient.js";
import { DsStorageApiClient } from "./services/DsStorageApiClient.js";

// import PlayingService from "./services/PlayingService";
import { DevelopersCache, ProductsCache, UsersCache } from "./services/CacheService";
console.log("a");

const authApi = new DsIdentityApiClient();
setInterval(async () => {
  const currentUserId = localStorage.getItem('currentUser');
  if (currentUserId != null)
  {
    console.log("ustawiacz dla", currentUserId);
    const t = await authApi.login(currentUserId, btoa(passwordInput));
    localStorage.setItem('token', t);
    console.log("ustawiacz dal", t);
  }
}, 60000 * 3);

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

const storageApi = new DsStorageApiClient();
export const publicPath = await storageApi.getUrl();

await DevelopersCache.load();
await UsersCache.load();
await ProductsCache.load();

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
