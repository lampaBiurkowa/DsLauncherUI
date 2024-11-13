import React, { useEffect, useState } from "react";
import "./NdibPage.scss";
import { useDeveloperLibraries } from "../settings/hooks/useDeveloperLibraries";
import { useRepositories } from "./hooks/useRepositories";
import { NavLink } from "react-router-dom";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import Dialog from "@/components/dialog/Dialog";
import Installer from "@/components/installer/Installer";
import { pullProduct } from "@/services/NdibService";

function NdibPage() {
  const developerLibraries = useDeveloperLibraries();
  const repos = useRepositories(developerLibraries);
  const [inputText, setInputText] = useState('');
  const [productGuid, setProductGuid] = useState(null);
  const [pullDialogOpen, setPullDialogOpen] = useState(false);
  const api = new DsLauncherApiClient();

  const handleButtonClick = async () => {
    setProductGuid(await api.getProductId(inputText));
    setPullDialogOpen(true);
  };

  return (
    <div className="ndib-page">
      <h1>Ndib repositories</h1>
      <div className="apps-list">
        {repos?.map((repo) => {
          return (
            <NavLink
                className="button small menuitem"
                to={`/ndib/repo?path=${encodeURIComponent(repo)}`}
              >
                <span>{repo.split(/[/\\]/).filter(Boolean).pop()}</span>
            </NavLink>
          );
        })}
      </div>
      {/*TUTAJ MLOTY Z YSS IMPLEMENTUJA SERCZ BAR*/}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="product name"
      />
      <button onClick={handleButtonClick}>Pull</button>

<Dialog
  open={pullDialogOpen}
  onClosed={() => setPullDialogOpen(false)}
  header={`Pull - ${inputText}`}
>
  <Installer
    productGuid={productGuid}
    onCancelled={() => setPullDialogOpen(false)}
    onConfirmed={async (lib, ver) => {
      await pullProduct(productGuid, `${lib.Path}/${inputText}`);
    }}
    isPull={true}
  ></Installer>
</Dialog>
    
      <button>New</button>
    </div>
  );
}

export default NdibPage;