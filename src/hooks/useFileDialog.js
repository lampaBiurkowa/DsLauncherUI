import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";

function useFileDialog(filter, openDirectory = false) {
  const [files, setFiles] = useState([]);

  const showDialog = () => {
    {
      (async () => {
        const selected = await open({
          multiple: true,
          directory: openDirectory,
          filters: filter ?? [],
        });

        if (selected) {
          setFiles(selected);
        }
      })();
    }
  };

  return { openedFiles: files, showDialog };
}

export default useFileDialog;
