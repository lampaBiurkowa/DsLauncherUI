import React, { useEffect, useState } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import LibraryEntry from "./components/LibraryEntry";
import "./OwnedPage.scss";
import { getProducts } from "@/services/CacheService";

const api = new DsLauncherApiClient();

function OwnedPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const owned = await api.getProductsByUser();
      setProducts(
        (await getProducts(owned))
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
