import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import NavButton from "../../components/navbar/NavButton";
import "./StorePage.scss";
import { DsLauncherApiClient } from '../../services/DsLauncherApiClient';
import getFilesData from '../../services/getFilesData';

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

function StorePage() {
  const api = new DsLauncherApiClient();
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearch = debounce(async (text) => {
    if (text?.trim() === '') {
      setSearchResults([]);
      return;
    }
    const searchedApps = await api.searchProducts(text);
    setSearchResults(searchedApps);
  }, 250);
  
  const handleSearchChange = (event) => {
    var text = event.target.value;
    debouncedSearch(text);
  };

  return (
    <div className="store-container">
      <div className="store-nav-container">
        <NavBar horizontal>
          <NavButton to="/store" end>
            Discover
          </NavButton>
          <NavButton to="/store/games">Games</NavButton>
          <NavButton to="/store/apps">Apps</NavButton>
          <div className="search-container-wrapper">
            <div className="search-container">
              <input
                navend="true"
                className="search-input"
                placeholder="Search"
                type="search"
                style={{ alignSelf: "center" }}
                onChange={handleSearchChange}
              />
              {(
                <div className="search-results-dropdown">
                  {searchResults.map((result) => (
                    <div className="search-result-item">
                      <img
                        src={getFilesData(result).Icon}
                        alt={result.name}
                        className="product-image"
                      />
                      <a href={`/store/product/${result.guid}`}>{result.name}</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
}

export default StorePage;
