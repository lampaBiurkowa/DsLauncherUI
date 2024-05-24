import React, { useContext, useState } from "react";
import "./SettingsPage.scss";
import { UserContext } from "../../contexts/UserContextProvider";
import { DsIdentityApiClient } from "../../services/DsIdentityApiClient";
import useSettings from "../../hooks/useSettings";

const userApi = new DsIdentityApiClient();

function SettingsPage() {
  let { currentUser } = useContext(UserContext);
  const [settings, applySettings] = useSettings();
  const [libraryPaths, setLibraryPaths] = useState(settings.libraries);
  const [newPath, setNewPath] = useState("");
  const [theme, setTheme] = useState(settings.theme);

  const handleLibraryPathChange = (e) => {
    setNewPath(e.target.value);
  };

  const addPath = () => {
    if (newPath.trim() !== "" && !libraryPaths.includes(newPath)) {
      const updatedPaths = [...libraryPaths, newPath];
      setLibraryPaths(updatedPaths);
      applySettings((s) => {s.libraries = updatedPaths;});
      setNewPath("");
    }
  };

  const deletePath = (index) => {
    const updatedPaths = [...libraryPaths];
    updatedPaths.splice(index, 1);
    setLibraryPaths(updatedPaths);
    applySettings((s) => {s.libraries = updatedPaths;});
  };

  function isPathRemovable(path) {
    return !Object.values(settings.games).includes(path);
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = [
    { value: "Light", label: "Light" },
    { value: "Dark", label: "Dark" },
  ];

  const handleThemeChange = (selectedOption) => {
    setTheme(selectedOption.value);
    applySettings((s) => {s.theme = selectedOption.value;});
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="settings-container">
      <h2>Settings Page</h2>
      <div className="main-content">
        <div className="settings-form">
          <h3>Theme</h3>
          <div className="dropdown-container">
            <div className={`dropdown-toggle ${isDropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
              {theme}
              <i className="las la-angle-down dropdown-arrow"></i>
            </div>
            {isDropdownOpen && (
              <ul className="dropdown-options">
                {options.map((option) => (
                  <li key={option.value} onClick={() => handleThemeChange(option)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <h3>Libraries</h3>
          <div>
            <label>
              <div className="input-container">
                <input
                  type="text"
                  value={newPath}
                  onChange={handleLibraryPathChange}
                  placeholder="Enter a new path"
                />
                <button onClick={addPath}>Add Path</button>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="library-paths-aside">
        <label>
          <h3>Library Paths</h3>
          <ul>
            {libraryPaths.map((path, index) => (
              <div className="library-path-item" key={index}>
                <span>{path}</span>
                <button disabled={!isPathRemovable(path)} onClick={() => deletePath(index)}>Delete</button>
              </div>
            ))}
          </ul>
        </label>
      </div>
    </div>
  );
}

export default SettingsPage;