import React, { useEffect, useState } from "react";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import { useOwnedProducts } from "../hooks/useOwnedProducts";
import { useServiceListener } from "@/hooks/useServiceListener";
import { DsLauncherServiceClient } from "@/services/DsLauncherServiceClient";
import "./ProductActionButton.scss";

const api = new DsLauncherApiClient();
const service = new DsLauncherServiceClient();

function ProductActionButton({ product }) {
  const [owned, setOwned] = useState(false);
  const [installed, setInstalled] = useState(false);

  const ownedProducts = useOwnedProducts();
  const installedProducts = useServiceListener("get-installed");

  useEffect(() => {
    setOwned(ownedProducts?.includes(product?.model.guid));
    setInstalled(installedProducts?.products?.includes(product?.model.guid));
  }, [product, ownedProducts, installedProducts]);

  async function handleClick() {
    if (!owned) {
      try {
        if (await api.purchaseProduct(product?.model.guid)) {
          setOwned(true);
        }
      } catch {}
    } else {
      if (installed) {
        service.execute(product?.model.guid);
      }
    }
  }

  return (
    <button
      className="action-button accent outlined large"
      onClick={() => handleClick()}
    >
      {owned && installed ? "Run" : <></>}
      {owned && !installed ? "Install" : <></>}
      {!owned ? `Buy for ${product?.model.price}₽` : <></>}
    </button>
  );
}

export default ProductActionButton;
