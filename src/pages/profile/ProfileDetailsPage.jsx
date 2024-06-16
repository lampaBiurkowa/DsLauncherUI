import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { DsCoreApiClient } from "../../services/DsCoreApiClient";
import { LocalStorageHandler } from "@/services/LocalStorageService";
import SettingsEntry from "@/components/settings-entry/SettingsEntry";
import CredentialsEditor from "./components/CredentialsEditor";
import "./ProfileDetailsPage.scss";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";

const api = new DsCoreApiClient();

function ProfileDetailsPage() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [email, setEmail] = useState(currentUser.email);
  const [login, setLogin] = useState(currentUser.alias);
  const [firstName, setFirstName] = useState(currentUser.name);
  const [lastName, setLastName] = useState(currentUser.surname);

  const oldPassRef = useRef();
  const newPass1Ref = useRef();
  const newPass2Ref = useRef();
  const [passwordError, setPasswordError] = useState();

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

  async function handlePasswordChange() {
    const oldPass = oldPassRef.current.value;
    const newPass1 = newPass1Ref.current.value;
    const newPass2 = newPass2Ref.current.value;

    const validationResult = validatePassword(newPass1);
    if (validationResult) {
      setPasswordError(validationResult);
      return;
    }
    if (newPass1 !== newPass2) {
      return;
    }

    try {
      await api.changePassword(currentUser.guid, btoa(oldPass), btoa(newPass1));
    } catch (error) {
      setPasswordError(error.message);
    }
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
                ref={oldPassRef}
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
                ref={newPass1Ref}
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
                ref={newPass2Ref}
              ></input>
            </div>
            <InfoBar
              type={InfoBarType.Error}
              header="Error"
              text={passwordError}
              open={passwordError?.length > 0}
            ></InfoBar>
            <button className="accent" onClick={() => handlePasswordChange()}>
              Save changes
            </button>
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
          <button
            style={{ background: "red", textTransform: "uppercase" }}
            onClick={() => deleteAccount(currentUser)}
          >
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

function validatePassword(password) {
  if (password.length == 0) {
    return "Too short";
  }
}

export default ProfileDetailsPage;
