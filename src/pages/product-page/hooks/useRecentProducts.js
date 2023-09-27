import { useState, useEffect } from "react";
import { ProductApi } from "@/services/api/ProductApi";
import { fs } from '@tauri-apps/api';
import { BaseDirectory } from '@tauri-apps/api/fs';

const productApi = new ProductApi();

function useRecentProducts() {
  const fileName = `recent.json`;
  let [products, setProducts] = useState();

  useEffect(() => {
    async function setData() { //because "write the async function inside your effect"
      if (await fs.exists(fileName, { dir: BaseDirectory.AppData }))
      {
      let appIds = await fs.readTextFile(fileName, { dir: BaseDirectory.AppData });
      productApi.productGetSubsetGet({ids: appIds}, (error, data) => {
        if (error === null) {
          setProducts(data);
        }
      });
      }
    }
    setData();
  }, []);

  return products;
}

export default useRecentProducts;
