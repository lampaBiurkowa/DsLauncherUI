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
import { listen } from '@tauri-apps/api/event';

import "./styles/App.scss";


listen("get-credentials", (event) => {
  let args = JSON.parse(event.payload);
  LocalStorageHandler.setToken(args.Token);
  LocalStorageHandler.setUser(args.UserGuid);
});

export const globalUpdateProgress = {
  progress: 0,
};

export const publicPath =
  "https://zzxaltzqtymfxzxphxje.supabase.co/storage/v1/object/public";
export const deafultBucket = "DsLauncher";
export const productsBucket = "DsNdib";
export const usersBucket = "DsCore";
export const launcherBucket = "DsLauncher";
export const developerPublicPathPart = "DsLauncher";
export const defaultCurrency = "ruble";

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
