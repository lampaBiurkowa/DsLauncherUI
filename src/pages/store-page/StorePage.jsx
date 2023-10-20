import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import NavButton from "../../components/navbar/NavButton";
import "./StorePage.scss";
import { cachedProducts } from '../../App';

function StorePage() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (event) => {
    var text = event.target.value;
    setSearchValue(text);
    var searchedApps = cachedProducts.filter(item => item.data.name.toLowerCase().includes(text.toLowerCase()));
    console.log(searchedApps);
    setSearchResults(searchedApps);
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
                    src={result.image?.Icon}
                    alt={result.data.name}
                    className="product-image"
                  />
                  <a href={`/store/product/${result.data.id}`}>{result.data.name}</a>
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
