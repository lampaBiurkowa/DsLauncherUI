import ReactDOM from "react-dom/client";
import "./styles/App.scss";
import TitleBar from "./components/titlebar/TitleBar";
import Router from "./Router.jsx";
import UserContextProvider from "./contexts/UserContextProvider";
import SettingsContextProvider from "./contexts/SettingsContextProvider";
import { DsCoreApiClient } from "./services/DsCoreApiClient.js";

// import PlayingService from "./services/PlayingService";
import { CurrenciesCache, DevelopersCache, ProductsCache, UsersCache } from "./services/CacheService";
import { LocalStorageHandler } from "./services/LocalStorageService.js";
console.log("a");

const authApi = new DsCoreApiClient();
setInterval(async () => {
  const currentUserId = LocalStorageHandler.getUser();
  if (currentUserId != null)
  {
    //NI DZIALA
    // console.log("ustawiacz dla", currentUserId);
    // const t = await authApi.login(currentUserId, btoa(passwordInput));
    // LocalStorageHandler.setToken('token', t);
    // console.log("ustawiacz dal", t);
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

export const publicPath = "https://zzxaltzqtymfxzxphxje.supabase.co/storage/v1/object/public";
export const deafultBucket = "testing2";
export const defaultCurrency = "ruble";

await CurrenciesCache.load();
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
