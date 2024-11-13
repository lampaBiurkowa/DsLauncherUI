import React, { useState } from "react";
import { useLibraries } from "./hooks/useLibraries";
import { useDeveloperLibraries } from "./hooks/useDeveloperLibraries";
import LibrarySection from "./components/LibrarySection";
import "./LibrariesSettingsPage.scss";
import { useServiceListener } from "@/hooks/useServiceListener";
import LibraryEntry from "../library/components/LibraryEntry";
import { useLibraryProducts } from "./hooks/useLibraryProducts";

function LibrariesPage() {
  const libraries = useLibraries();
  const developerLibraries = useDeveloperLibraries();
  const [selectedLibraryDetails, setSelectedLibraryDetails] = useState(null);
  const libraryDetails = useServiceListener("get-library-details");
  const currentLibraryProducts = useLibraryProducts(libraryDetails?.Installed);

  const handleLibrarySelected = () => {
    setSelectedLibraryDetails(libraryDetails);
  };

  return (
    <div className="libraries-page">
      <div className="libraries-sections">
        <LibrarySection
          title="Libraries"
          libraries={libraries}
          onLibrarySelected={handleLibrarySelected}
          isDeveloper={false}
        />
        <LibrarySection
          title="Developer Libraries"
          libraries={developerLibraries}
          onLibrarySelected={handleLibrarySelected}
          isDeveloper={true}
        />
      </div>
      {selectedLibraryDetails && (
        <aside className="library-details">
          <h3>{selectedLibraryDetails.Name}</h3>
          <div>Path: {selectedLibraryDetails.Path}</div>
          <div>Total size: {(selectedLibraryDetails.SizeBytes / (1024 * 1024)).toFixed(2)} MiB</div>
          <ul className="product-list">
            {
              currentLibraryProducts.map((product, index) => {
                return <LibraryEntry product={product} key={index}></LibraryEntry>;
              })
            }
          </ul>
        </aside>
      )}
    </div>
  );
}

export default LibrariesPage;
