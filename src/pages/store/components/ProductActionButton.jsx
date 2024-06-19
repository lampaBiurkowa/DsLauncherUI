import React, { useEffect, useState } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useOwnedProducts } from "../../../hooks/useOwnedProducts";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import { useInstalledProducts } from "@/pages/library/hooks/useInstalledProducts";
import Dialog from "@/components/dialog/Dialog";
import Installer from "@/components/installer/Installer";
import "./ProductActionButton.scss";

const api = new DsLauncherApiClient();
const service = new DsLauncherServiceClient();

function ProductActionButton({ product }) {
  const [owned, setOwned] = useState(false);
  const [installed, setInstalled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const ownedProducts = useOwnedProducts();
  const installedProducts = useInstalledProducts();

  useEffect(() => {
    setOwned(ownedProducts?.includes(product?.model?.guid));
    setInstalled(
      installedProducts?.some((p) => p.model.guid == product?.model?.guid)
    );
  }, [product, ownedProducts, installedProducts]);

  async function handleClick() {
    if (!owned) {
      try {
        if (await api.purchaseProduct(product?.model?.guid)) {
          setOwned(true);
        }
      } catch {}
    } else {
      if (installed) {
        service.execute(product?.model?.guid);
      } else {
        setDialogOpen(true);
      }
    }
  }

  return (
    <>
      <button
        className="action-button accent outlined large"
        onClick={() => handleClick()}
      >
        {owned && installed ? "Run" : <></>}
        {owned && !installed ? "Install" : <></>}
        {!owned ? `Buy for ${product?.model?.price}₽` : <></>}
      </button>
      <Dialog
        open={dialogOpen}
        onClosed={() => setDialogOpen(false)}
        header={`Install - ${product?.model?.name}`}
      >
        <Installer
          productGuid={product?.model?.guid}
          onCancelled={() => setDialogOpen(false)}
          onConfirmed={(lib) => {
            service.install(product?.model.guid, lib.Path);
            setDialogOpen(false);
          }}
        ></Installer>
      </Dialog>
    </>
  );
}

export default ProductActionButton;
