import React, { useEffect, useState } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import LibraryEntry from "./components/LibraryEntry";
import getFilesData from "@/services/getFilesData";
import "./OwnedPage.scss";

const api = new DsLauncherApiClient();

function OwnedPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const owned = await api.getProductsByUser();
      setProducts(
        (await api.getProductsByIds(owned)).map((product) => {
          return {
            model: product,
            static: getFilesData(product),
          };
        })
      );
    })();
  }, []);

  return (
    <div className="owned-page">
      <h1>Your Apps</h1>
      <div className="apps-list">
        {products.map((product, index) => {
          return <LibraryEntry product={product} key={index}></LibraryEntry>;
        })}
      </div>
    </div>
  );
}

export default OwnedPage;
