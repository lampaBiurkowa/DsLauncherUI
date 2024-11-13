import ReactDOM from "react-dom/client";
import TitleBar from "./components/titlebar/TitleBar";
import Router from "./Router.jsx";
import UserContextProvider from "./contexts/UserContextProvider";
import SettingsContextProvider from "./contexts/SettingsContextProvider";
import { SessionDataHandler } from "./services/SessionDataService.js";
import { listen } from '@tauri-apps/api/event';

import "./styles/App.scss";

listen("get-credentials", (event) => {
  let args = JSON.parse(event.payload);
  SessionDataHandler.setToken(args.Token);
  SessionDataHandler.setUser(args.UserGuid);
});

export const globalUpdateProgress = {
  progress: 0,
};

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
