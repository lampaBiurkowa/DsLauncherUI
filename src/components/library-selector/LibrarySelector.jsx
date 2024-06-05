import React, { useState } from "react";
import { useLibraries } from "@/pages/settings/hooks/useLibraries";
import { NavLink } from "react-router-dom";
import ComboBox from "../combo-box/ComboBox";
import InfoBar, { InfoBarType } from "../info-bar/InfoBar";
import "./LibrarySelector.scss";

function LibrarySelector() {
  const [selectedLib, setSelectedLib] = useState(undefined);
  const libraries = useLibraries();

  return (
    <div className="library-selector">
      {libraries?.length == 0 ? (
        <InfoBar
          type={InfoBarType.Warning}
          header="No libraries"
          text="You must create a library."
        >
          <NavLink className="button" to="/settings/libraries">
            Go to settings
          </NavLink>
        </InfoBar>
      ) : (
        <>
          <h2>Select library</h2>
          <ComboBox
            onItemSelected={(idx) => {
              setSelectedLib(idx);
            }}
          >
            {libraries?.map((lib, key) => {
              return (
                <div className="library" key={key}>
                  <i class="las la-hdd"></i>
                  <span className="header">{lib.Name}</span>
                  <span className="path">{lib.Path}</span>
                </div>
              );
            })}
          </ComboBox>
          <button
            className="install-btn accent"
            disabled={selectedLib === undefined}
            onClick={() => {
              console.log(`INSTOL LIB: ${libraries[selectedLib].Path}`);
            }}
          >
            Install
          </button>
        </>
      )}
    </div>
  );
}

export default LibrarySelector;
