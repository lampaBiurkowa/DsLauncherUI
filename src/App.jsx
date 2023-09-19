import "./styles/App.scss";
import TitleBar from "./components/titlebar/TitleBar";
import Router from "./Router.jsx";
import UserContextProvider from "./contexts/UserContextProvider";

function App() {
  return (
    <div className="app">
      <TitleBar />
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </div>
  );
}

export default App;
