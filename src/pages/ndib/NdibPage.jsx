import React, { useEffect } from "react";
import "./NdibPage.scss";
import { useDeveloperLibraries } from "../settings/hooks/useDeveloperLibraries";
import { useRepositories } from "./hooks/useRepositories";
import { NavLink } from "react-router-dom";

function NdibPage() {
  const developerLibraries = useDeveloperLibraries();
  const repos = useRepositories(developerLibraries);

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
    </div>
  );
}

export default NdibPage;