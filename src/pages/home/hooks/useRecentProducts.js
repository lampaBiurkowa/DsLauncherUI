import { useState, useEffect } from "react";
import { BaseDirectory, exists, readTextFile } from "@tauri-apps/plugin-fs";
import { DsLauncherApiClient } from "../../../services/DsLauncherApiClient";

const api = new DsLauncherApiClient();

function useRecentProducts(login) {
  const fileName = `${login}.recent.json`;
  let [products, setProducts] = useState();

  useEffect(() => {
    async function setData() {
      //because "write the async function inside your effect"
      if (await exists(fileName, { dir: BaseDirectory.AppData })) {
        let appIds = JSON.parse(
          await readTextFile(fileName, { dir: BaseDirectory.AppData })
        );
        await api.getProductsByIds(appIds);
        var result = [];
        for (let i = 0; i < data.length; i++) {
          let icon = (await getFilesData(data[i].name)).Icon;
          result.push({ product: data[i], icon: icon });
        }
        setProducts(result);
      }
    }
    setData();
  }, []);

  return products;
}

export default useRecentProducts;
