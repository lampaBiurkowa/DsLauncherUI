import React, { useEffect, useState } from "react";
import "./NdibPage.scss";
import { useDeveloperLibraries } from "../settings/hooks/useDeveloperLibraries";
import { useRepositories } from "./hooks/useRepositories";
import { NavLink } from "react-router-dom";
import { DsLauncherApiClient } from "@/services/DsLauncherApiClient";
import Dialog from "@/components/dialog/Dialog";
import Installer from "@/components/installer/Installer";
import { init, pullProduct } from "@/services/NdibService";

function NdibPage() {
  const developerLibraries = useDeveloperLibraries();
  const repos = useRepositories(developerLibraries);
  const [inputText, setInputText] = useState('');
  const [productGuid, setProductGuid] = useState(null);
  const [pullDialogOpen, setPullDialogOpen] = useState(false);
  const api = new DsLauncherApiClient();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState('');
  const [contentClassification, setContentClassification] = useState('');
  const [price, setPrice] = useState('');
  const [library, setLibrary] = useState('');

  const productTypeOptions = ['Game', 'App', 'Music', 'Video'];
  const contentClassificationOptions = ['3', '7', '12', '16', '18'];
  const libraries = useDeveloperLibraries();

  const handleSubmit = (e) => {
    e.preventDefault();
    init(
      name,
      description,
      productType,
      contentClassification || null,
      parseFloat(price),
      library
    );
  };
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
    


<form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Product Type:</label>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          required
        >
          <option value="">Select Product Type</option>
          {productTypeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Library:</label>
        <select
          value={library}
          onChange={(e) => setLibrary(e.target.value)}
          required
        >
          <option value="">Select Library</option>
          {libraries?.map((type) => (
            <option key={type.Path} value={type.Path}>
              {type.Path}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Content Classification:</label>
        <select
          value={contentClassification}
          onChange={(e) => setContentClassification(e.target.value)}
        >
          <option value="">Select Classification (Optional)</option>
          {contentClassificationOptions.map((classification) => (
            <option key={classification} value={classification}>
              {classification}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
      </div>

      <button type="submit">New</button>
    </form>
    </div>
  );
}

export default NdibPage;