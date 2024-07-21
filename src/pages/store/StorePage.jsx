import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { NavLink } from "react-router-dom";
import NavBar from "@/components/navbar/Navbar";
import NavButton from "@/components/navbar/NavButton";
import Popup from "@/components/popup/Popup";
import getFilesData from "@/services/getFilesData";
import "./StorePage.scss";

const api = new DsLauncherApiClient();

function StorePage() {
  const [searchResults, setSearchResults] = useState();
  const [searchPopupOpen, setSearchPopupOpen] = useState();
  const inputRef = useRef();

  useEffect(() => {
    const debouncedSearch = debounce(async (e) => {
      const results = await api.searchProducts(e.target.value);

      if (results?.length > 0) {
        setSearchResults(results);
        setSearchPopupOpen(true);
      }
    }, 500);

    inputRef.current?.addEventListener("input", debouncedSearch);
    return () => {
      inputRef.current?.removeEventListener("input", debouncedSearch);
    };
  }, []);

  return (
    <div className="store-container">
      <div className="store-nav-container">
        <NavBar horizontal>
          <NavButton to="/store" end>
            Discover
          </NavButton>
          <NavButton to="/store/games">Games</NavButton>
          <NavButton to="/store/apps">Apps</NavButton>
          <NavButton to="/store/music">Music</NavButton>
          <NavButton to="/store/videos">Video</NavButton>
          <div className="search-container">
            <input
              ref={inputRef}
              placeholder="Search"
              type="search"
              onChange={() => setSearchPopupOpen(false)}
            />
            <Popup
              targetRef={inputRef}
              open={searchPopupOpen}
              setOpen={setSearchPopupOpen}
            >
              <ul
                className="results-container"
                onClick={() => {
                  setSearchPopupOpen(false);
                }}
              >
                {searchResults?.map((result, key) => {
                  return (
                    <NavLink
                      key={key}
                      className="search-result"
                      to={`/store/product/${result.guid}`}
                    >
                      <img src={getFilesData(result).Icon} alt="App Icon" />
                      <span>{result.name}</span>
                    </NavLink>
                  );
                })}
              </ul>
            </Popup>
          </div>
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

export default StorePage;
