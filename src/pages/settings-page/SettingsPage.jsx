import React, { useContext, useState } from "react";
import "./SettingsPage.scss";
import { UserImagesApi } from "../../services/api/UserImagesApi";
import { UsersCache } from "../../services/CacheService";
import { UserContext } from "../../contexts/UserContextProvider";
import { UserApi } from "../../services/api/UserApi";
import useSettings from "../../hooks/useSettings";

const userApi = new UserApi();

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

  function encodeImageFileAsURL(event) {
    const api = new UserImagesApi();
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      api.userImagesPut({ body: { id: currentUser.id, profileImageBase64: reader.result } }, (error, data) => {
        if (error === null) {
          UsersCache.load();
          console.log("profile uploaded");
        }
      });
    }
    reader.readAsDataURL(file);
  }
  
  const [newName, setNewName] = useState(currentUser.name);
  const [newSurname, setNewSurname] = useState(currentUser.surname);
  const [newPassword, setNewPassword] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setNewSurname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleExistingPasswordChange = (e) => {
    setExistingPassword(e.target.value);
  };

  const changeUserInfo = () => {
    if (existingPassword !== currentUser.password) {
      setPasswordError(true);
      return;
    }

    if (newName) {
      setName(newName);
    }
    if (newSurname) {
      setSurname(newSurname);
    }
    if (newPassword) {
      setPassword(newPassword);
    }

    currentUser.name = newName;
    currentUser.surname = newSurname;
    currentUser.password = newPassword;
    userApi.userPut({body: currentUser}, (error, data) =>
    {
      if (error !== null) {
        setPasswordError(false); //zla wiadomosc wypisze :D/
      }
      else {
        // Reset the form fields
        setNewName("");
        setNewSurname("");
        setNewPassword("");
        setExistingPassword("");
        setPasswordError(false);
      }
    });
  };

  return (
    <div className="settings-container">
      <h2>Settings Page</h2>
      <div className="main-content">
        <div className="settings-form">
          <h3>Profile image</h3>
          <label className="custom-file-input">
            Upload
            <input type="file" onChange={encodeImageFileAsURL} />
          </label>
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
          <h3>User data</h3>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={newName}
                onChange={handleNameChange}
                placeholder="Enter new name"
              />
            </label>

            <label>
              Surname:
              <input
                type="text"
                value={newSurname}
                onChange={handleSurnameChange}
                placeholder="Enter new surname"
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </label>

            <label>
              Enter Existing Password:
              <input
                type="password"
                value={existingPassword}
                onChange={handleExistingPasswordChange}
              />
            </label>

            {passwordError && (
              <p style={{ color: "red" }}>Incorrect existing password</p>
            )}

            <button className="save-button" onClick={changeUserInfo}>Change User Info</button>
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
                {console.log(isPathRemovable(path))}
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