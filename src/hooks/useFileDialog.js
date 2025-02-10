import { open } from "@tauri-apps/plugin-dialog";
import { homeDir } from "@tauri-apps/api/path";
import { useState } from "react";

function useFileDialog(filter, openDirectory = false, defaultPath = null) {
  const [files, setFiles] = useState([]);

  const showDialog = () => {
    {
      (async () => {
        if (defaultPath == null) defaultPath = await homeDir();
        const selected = await open({
          multiple: true,
          directory: openDirectory,
          filters: filter ?? [],
          defaultPath: defaultPath
        });

        console.log(selected);
        if (selected) {
          setFiles(selected);
        }
      })();
    }
  };

  return { openedFiles: files, showDialog };
}

export default useFileDialog;
