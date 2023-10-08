import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import NavButton from "../../components/navbar/NavButton";
import "./StorePage.scss";
import { cachedProducts } from '../../App';

function StorePage() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    var text = event.target.value;
    setSearchValue(text);
    var seachedApps = cachedProducts.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
    console.log(seachedApps);
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
          <input
            navend="true"
            placeholder="Search"
            type="search"
            style={{ alignSelf: "center" }}
            onChange={handleSearchChange}
          />
        </NavBar>
      </div>
      <Outlet />
    </div>
  );
}

export default StorePage;
