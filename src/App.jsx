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
import { addListener } from "./services/DsLauncherService";
import { UpdateMonitorService } from "./services/UpdateMonitorService";
console.log("a");

const authApi = new DsCoreApiClient();

addListener("credentials", (args) => {
  console.log(args);
  LocalStorageHandler.setToken(args.token);
  LocalStorageHandler.setUser(args.userguid);
});

var service = new UpdateMonitorService();
console.log("Aaa");
service.startMonitoring();
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
export const productsBucket = "products";
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
