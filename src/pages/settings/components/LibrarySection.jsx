import React, { useEffect } from "react";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";
import LibraryPath from "./LibraryPath";
import useFileDialog from "@/hooks/useFileDialog";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import "./LibrarySection.scss";

function LibrarySection({ title, libraries, onLibrarySelected, isDeveloper }) {
  const { openedFiles, showDialog } = useFileDialog([], true);
  const service = new DsLauncherServiceClient();

  useEffect(() => {
    if (openedFiles?.length === 1) {
      service.addLibrary(openedFiles[0], `Dibrysoft library`, isDeveloper);
    }
  }, [openedFiles]);

  const handleLibrarySelected = (path) => {
    service.getLibraryDetails(path);
    onLibrarySelected();
  };

  return (
    <div className="library-section">
      <h2>{title}</h2>
      {libraries?.length === 0 ? (
        <InfoBar
          type={InfoBarType.Warning}
          header={`No ${title}`}
          text={`You must have at least one${isDeveloper ? " developer" : ""} library to ${isDeveloper ? "publish" : "install"} applications.`}
        >
          <button onClick={() => showDialog()}>Add{isDeveloper ? " developer" : ""} library</button>
        </InfoBar>
      ) : (
        <div className="libraries">
          {libraries?.map((lib, key) => (
            <LibraryPath
              key={key}
              path={lib.Path}
              name={lib.Name}
              onRemoved={(path) => service.removeLibrary(path)}
              onSelected={() => handleLibrarySelected(lib.Path)}
            />
          ))}
          <button className="accent" onClick={() => showDialog()}>
            Add {title.toLowerCase()}
          </button>
        </div>
      )}
    </div>
  );
}

export default LibrarySection;
