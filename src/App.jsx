import ReactDOM from "react-dom/client";
import TitleBar from "./components/titlebar/TitleBar";
import Router from "./Router.jsx";
import UserContextProvider from "./contexts/UserContextProvider";
import SettingsContextProvider from "./contexts/SettingsContextProvider";
import {
  CurrenciesCache,
  DevelopersCache,
  ProductsCache,
  UsersCache,
} from "./services/CacheService";
import { LocalStorageHandler } from "./services/LocalStorageService.js";
import { addListener } from "./services/DsLauncherService";
import "./styles/App.scss";

addListener("get-credentials", (args) => {
  console.log(args);
  LocalStorageHandler.setToken(args.Token);
  LocalStorageHandler.setUser(args.UserGuid);
});

export const globalUpdateProgress = {
  progress: 0,
};

export const publicPath =
  "https://zzxaltzqtymfxzxphxje.supabase.co/storage/v1/object/public";
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
