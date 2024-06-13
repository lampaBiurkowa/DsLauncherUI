import React from "react";
import { useDeveloperProducts } from "./hooks/useDeveloperProducts";
import { useParams } from "react-router-dom";
import InfoBar from "@/components/info-bar/InfoBar";
import DetailedStoreEntry from "../store/components/DetailedStoreEntry";
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
            <DetailedStoreEntry
              key={index}
              id={product?.model.guid}
              name={product?.model.name}
              icon={product?.static?.Icon}
              rating={product?.rates?.avg}
              description={product?.model.description}
              tags={product?.model.tags}
              platform={`${product?.latestVersion?.linuxExePath ? "linux" : ""} 
                         ${product?.latestVersion?.windowsExePath ? "win" : ""} 
                         ${product?.latestVersion?.macExePath ? "macos" : ""}`}
            ></DetailedStoreEntry>
          );
        })}
      </div>
    </div>
  );
}

export default DeveloperGamesPage;
