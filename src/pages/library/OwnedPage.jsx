import React, { useEffect, useState } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import LibraryEntry from "./components/library-entry/LibraryEntry";
import getFilesData from "@/services/getFilesData";
import Dialog from "@/components/dialog/Dialog";
import Installer from "@/components/installer/Installer";
import "./OwnedPage.scss";

const api = new DsLauncherApiClient();

function OwnedPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const owned = await api.getProductsByUser();
      setProducts(
        (await api.getProductsByIds(owned)).map((product) => {
          product.static = getFilesData(product);
          return product;
        })
      );
    })();
  }, []);

  return (
    <div className="owned-page">
      <h1>Your Apps</h1>
      <div className="apps-list">
        {products.map((product, index) => {
          return (
            <LibraryEntry
              icon={product.static.Icon}
              title={product.name}
              key={index}
            >
              <button
                className="accent outlined"
                onClick={() => {
                  setSelectedProduct(product);
                  setDialogOpen(true);
                }}
              >
                Install
              </button>
            </LibraryEntry>
          );
        })}
      </div>
      <Dialog
        open={dialogOpen}
        onClosed={() => setDialogOpen(false)}
        header={`Install - ${selectedProduct?.name}`}
      >
        <Installer
          onCancelled={() => setDialogOpen(false)}
          onConfirmed={(lib) => {
            console.log(lib); // <------ INSTOL TUTAJ MLOTY Z CARDBOARD
          }}
        ></Installer>
      </Dialog>
    </div>
  );
}

export default OwnedPage;
