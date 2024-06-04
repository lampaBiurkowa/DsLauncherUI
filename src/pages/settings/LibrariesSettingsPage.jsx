import React, { useEffect, useState } from "react";
import { useServiceListener } from "@/hooks/useServiceListener";
import { executeCommand } from "@/services/DsLauncherService";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";
import useFileDialog from "@/hooks/useFileDialog";
import LibraryPath from "./components/LibraryPath";
import "./LibrariesSettingsPage.scss";

function LibrariesPage() {
  const response = useServiceListener("get-libraries");
  const [libraries, setLibraries] = useState();
  const { openedFiles, showDialog } = useFileDialog([], true);

  useEffect(() => {
    executeCommand("get-libraries");
  }, []);

  useEffect(() => {
    if (response) {
      setLibraries(response.libraries ?? []);
    }
  }, [response]);

  useEffect(() => {
    if (openedFiles?.length == 1) {
      executeCommand("add-library", {
        library: openedFiles[0],
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
                    path={lib}
                    onRemoved={(path) => {
                      executeCommand("remove-library", { library: path });
                    }}
                  ></LibraryPath>
                );
              })}
              <button className="accent" onClick={() => showDialog()}>
                Add library
              </button>
            </section>
            <section className="library-content">H R Y w libie :D\</section>
          </div>
        );
      })()}
    </div>
  );
}

export default LibrariesPage;
