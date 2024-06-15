import React from "react";
import { useInstalledProducts } from "./hooks/useInstalledProducts";
import LibraryEntry from "./components/LibraryEntry";
import "./InstalledPage.scss";

function InstalledPage() {
  const products = useInstalledProducts();

  return (
    <div className="installed-page">
      <h1>Installed</h1>
      <div className="apps-list">
        {products?.map((product, index) => {
          return (
            <LibraryEntry
              product={product}
              key={index}
              isInstalled
            ></LibraryEntry>
          );
        })}
      </div>
    </div>
  );
}

export default InstalledPage;
