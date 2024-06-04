import React, { useContext, useEffect, useState } from "react";
import "./ProfileDetailsPage.scss";
import { UserContext } from "../../contexts/UserContextProvider";
import { DsCoreApiClient } from "../../services/DsCoreApiClient";
import SettingsEntry from "@/components/settings-entry/SettingsEntry";
import CredentialsEditor from "./components/CredentialsEditor";
import { LocalStorageHandler } from "@/services/LocalStorageService";

const api = new DsCoreApiClient();

function ProfileDetailsPage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState(currentUser.email);
  const [login, setLogin] = useState(currentUser.alias);
  const [firstName, setFirstName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.surname);

  async function deleteAccount(currentUser) {
    await api.deleteUser(currentUser.guid);
    logout();
  }

  function logout() {
    LocalStorageHandler.setToken("");
    LocalStorageHandler.setUser("");
    setCurrentUser(undefined);
    navigate("/home", { replace: true });
  }

  useEffect(() => {
    (async () => {
      try {
        const newUser = {
          ...currentUser,
          email: email,
          alias: login,
          name: firstName,
          surname: lastName,
        };

        await api.updateUser(newUser);
        setCurrentUser(newUser);
      } catch {}
    })();
  }, [email, login, firstName, lastName]);

  return (
    <div className="profile-details-page">
      <section>
        <h2>Account information</h2>
        <SettingsEntry
          name="E-Mail"
          desc="Notifications will be delivered to this email address"
        >
          <CredentialsEditor
            type="email"
            label="E-Mail"
            value={email}
            setValue={setEmail}
            validator={validateEmail}
          ></CredentialsEditor>
        </SettingsEntry>
        <SettingsEntry name="Login">
          <CredentialsEditor
            type="text"
            label="Login"
            value={login}
            setValue={setLogin}
            validator={validateLogin}
          ></CredentialsEditor>
        </SettingsEntry>
        <SettingsEntry name="First name">
          <CredentialsEditor
            type="text"
            label="First name"
            value={firstName}
            setValue={setFirstName}
            validator={validateName}
          ></CredentialsEditor>
        </SettingsEntry>
        <SettingsEntry name="Last name">
          <CredentialsEditor
            type="text"
            label="Last name"
            value={lastName}
            setValue={setLastName}
            validator={validateName}
          ></CredentialsEditor>
        </SettingsEntry>
      </section>
      <section>
        <h2>Security</h2>
        <div className="change-password-section">
          <div className="password-form">
            <h3>Current password</h3>
            <div>
              <label htmlFor="current-password" hidden>
                Current password
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                placeholder="Current password"
              ></input>
            </div>
            <div></div>
            <h3>New password</h3>
            <div>
              <label htmlFor="new-password-1" hidden>
                Current password
              </label>
              <input
                type="password"
                name="new-password-1"
                id="new-password-1"
                placeholder="New password"
              ></input>
            </div>
            <div>
              <label htmlFor="new-password-2" hidden>
                Current password
              </label>
              <input
                type="password"
                name="new-password-2"
                id="new-password-2"
                placeholder="Retype new password"
              ></input>
            </div>
            <button className="accent">Save changes</button>
          </div>
          <div className="password-tip">
            <h3>Password requirements</h3>
            <ul>
              <li>Avoid using any of your last 5 passwords</li>
              <li>Use 8+ characters</li>
              <li>Use at least 1 letter</li>
              <li>Use at least 1 number</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <h2>Danger zone</h2>
        <SettingsEntry
          name="Delete account"
          desc="Click request account deletion to start the process of permanently deleting your Dibrysoft Account including all personal information and purchases."
        >
          <button style={{ background: "red", textTransform: "uppercase" }} onClick={() => deleteAccount(currentUser)}>
            Request account deletion
          </button>
        </SettingsEntry>
      </section>
    </div>
  );
}

function validateEmail(email) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email?.match(emailRegex)) {
    return "Invalid e-mail";
  }
}

function validateLogin(login) {
  login = login.toLowerCase();

  if (login.length < 3) {
    return "Too short";
  }
  if (login.length > 32) {
    return "Too long";
  }
  if (
    login.includes("soczek") ||
    login.includes("socheck") ||
    login.includes("behemot2000pl")
  ) {
    return "caps)";
  }

  return undefined;
}

function validateName(name) {
  if (name.length == 0) {
    return "Too short";
  }

  if (name.match(/\d/) !== null) {
    return "Numbers are not allowed";
  }
}

export default ProfileDetailsPage;
