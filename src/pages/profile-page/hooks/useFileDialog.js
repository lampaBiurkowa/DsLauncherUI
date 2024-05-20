import { open } from "@tauri-apps/plugin-dialog";
import { useState } from "react";

function useFileDialog(filter) {
  const [files, setFiles] = useState([]);

  const showDialog = () => {
    {
      (async () => {
        const selected = await open({
          multiple: true,
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
