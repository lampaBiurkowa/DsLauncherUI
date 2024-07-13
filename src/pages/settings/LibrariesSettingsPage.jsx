import React, { useEffect, useState } from "react";
import { executeCommand } from "@/services/DsLauncherService";
import { useLibraries } from "./hooks/useLibraries";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";
import useFileDialog from "@/hooks/useFileDialog";
import LibraryPath from "./components/LibraryPath";
import "./LibrariesSettingsPage.scss";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import { useServiceListener } from "@/hooks/useServiceListener";
import { useLibraryProducts } from "./hooks/useLibraryProducts";
import LibraryEntry from "../library/components/LibraryEntry";

function LibrariesPage() {
  const libraries = useLibraries();
  const { openedFiles, showDialog } = useFileDialog([], true);
  const libraryDetails = useServiceListener("get-library-details");
  const [currentLibraryPath, setCurrentLibraryPath] = useState();
  const currentLibraryProducts = useLibraryProducts(libraryDetails?.Installed);
  const service = new DsLauncherServiceClient();

  useEffect(() => {
    if (openedFiles?.length == 1) {
      executeCommand("add-library", {
        library: openedFiles[0],
        name: "Dibrysoft library",
      });
    }
  }, [openedFiles]);

  return (
    <div className="libraries-page">
      <h2>Libraries</h2>
      {(() => {
        if (libraries === undefined) return <></>;
        if (libraries.length === 0)
          return (
            <InfoBar
              type={InfoBarType.Warning}
              header="No libraries"
              text="You must have at least one library to install applications."
            >
              <button onClick={() => showDialog()}>Add library</button>
            </InfoBar>
          );

        return (
          <div className="libraries-container">
            <section className="libraries">
              {libraries?.map((lib, key) => {
                return (
                  <LibraryPath
                    key={key}
                    path={lib.Path}
                    name={lib.Name}
                    onRemoved={(path) => {
                      service.removeLibrary(path);
                    }}
                    onSelected={(path) => {
                      service.getLibraryDetails(path);
                      setCurrentLibraryPath(path);
                    }}
                  ></LibraryPath>
                );
              })}
              <button className="accent" onClick={() => showDialog()}>
                Add library
              </button>
            </section>
            <section className="library-content">
              {libraryDetails ? (
                <div className="library-details-container">
                  <h2 className="title">{libraries.find(x => x.Path == currentLibraryPath).Name}</h2>
                  <div className="section">Path: {currentLibraryPath}</div>
                  <div className="section">Total size: {(libraryDetails.SizeBytes / (1024 * 1024)).toFixed(2)} MiB</div>
                  
                  <div className="section">
                    <ul className="product-list">
                      {
                        currentLibraryProducts.map((product, index) => {
                          return <LibraryEntry product={product} key={index}></LibraryEntry>;
                        })
                      }
                    </ul>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </section>
          </div>
        );
      })()}
    </div>
  );
}

export default LibrariesPage;
