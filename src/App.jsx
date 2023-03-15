import "./styles/App.scss";
import TitleBar from "./components/TitleBar";
import Router from "./Router.jsx";

function App() {
  return (
    <div className="app">
      <TitleBar />
      <Router />
    </div>
  );
}

export default App;
