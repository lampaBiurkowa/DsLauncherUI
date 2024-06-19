import React from "react";
import { useInstalledProducts } from "./hooks/useInstalledProducts";
import LibraryEntry from "./components/LibraryEntry";
import "./InstalledPage.scss";
import useActivityTime from "./hooks/useActivityTime";

function getTimeSpent(minutes) {
  if (minutes > 59) {
    return `${minutes / 60} hours and ${minutes % 60} minutes`;
  } else {
    return `${minutes} minutes`;
  }
}

function InstalledPage() {
  const products = useInstalledProducts();
  const activityTime = useActivityTime(products);

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
              secondary={product.model.guid in activityTime ? getTimeSpent(activityTime[product.model.guid]) : ""}
            ></LibraryEntry>
          );
        })}
      </div>
    </div>
  );
}

export default InstalledPage;
