import React, { useState } from "react";
import { useLibraries } from "@/pages/settings/hooks/useLibraries";
import { useVersions } from "@/hooks/useVersions";
import { NavLink } from "react-router-dom";
import ComboBox from "../combo-box/ComboBox";
import InfoBar, { InfoBarType } from "../info-bar/InfoBar";
import "./Installer.scss";

function Installer({ productGuid, onConfirmed, onCancelled }) {
  const [selectedLib, setSelectedLib] = useState(undefined);
  const [selectedVer, setSelectedVer] = useState(undefined);

  const libraries = useLibraries();
  const versions = useVersions(productGuid);

  return (
    <div className="installer">
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
          <h2>Select version</h2>
          <ComboBox
            onItemSelected={(idx) => {
              setSelectedVer(idx);
            }}
          >
            {versions
              ?.sort((ver1, ver2) => {
                return new Date(ver2.createdAt) - new Date(ver1.createdAt);
              })
              .map((ver, key) => {
                return (
                  <div className="version" key={key}>
                    <span>{ver.version}</span>
                    <span>{new Date(ver.createdAt).toLocaleDateString()}</span>
                  </div>
                );
              })}
          </ComboBox>
          <div className="buttons">
            <button
              className="install-btn accent"
              disabled={selectedLib === undefined}
              onClick={() => {
                onConfirmed?.(libraries[selectedLib], versions[selectedVer]);
              }}
            >
              Install
            </button>
            <button
              className="plain"
              onClick={() => {
                onCancelled?.();
              }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Installer;
