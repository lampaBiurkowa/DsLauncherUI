import React from "react";
import { useDeveloperProducts } from "./hooks/useDeveloperProducts";
import { useParams } from "react-router-dom";
import StoreEntry from "../store/components/StoreEntry";
import "./DeveloperGamesPage.scss";

function DeveloperGamesPage() {
  const { id: devId } = useParams();
  const products = useDeveloperProducts(devId);

  return (
    <div className="developer-products-page">
      <h1>Developer products</h1>
      <div className="products">
        {products?.length == 0 ?? false ? (
          <InfoBar
            header="Nothing to see here"
            text="This developer has not released any content yet."
            dismissable={true}
          ></InfoBar>
        ) : (
          <></>
        )}
        {products?.map((product, index) => {
          return (
            <StoreEntry
              key={index}
              id={product?.guid}
              name={product?.name}
              icon={product?.static?.Icon}
              rating={product?.rates?.avg}
              platform={`${
                product?.latestVersion?.linuxExePath?.trim().length > 0
                  ? "linux"
                  : ""
              }
            ${
              product?.latestVersion?.windowsExePath?.trim().length > 0
                ? "win"
                : ""
            }
            ${
              product?.latestVersion?.maxExePath?.trim().length > 0
                ? "macos"
                : ""
            }`}
            ></StoreEntry>
          );
        })}
      </div>
    </div>
  );
}

export default DeveloperGamesPage;
