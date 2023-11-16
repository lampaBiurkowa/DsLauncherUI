import React, { useContext, useState } from "react";
import "./ProfileDetailsPage.scss";
import { UserImagesApi } from "../../services/api/UserImagesApi";
import { UsersCache } from "../../services/CacheService";
import { UserContext } from "../../contexts/UserContextProvider";
import { UserApi } from "../../services/api/UserApi";

function ProfileDetailsPage() {
  let { currentUser } = useContext(UserContext);
  const userApi = new UserApi();
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
  const [newEmail, setNewEmail] = useState(currentUser.email);
  const [newPassword, setNewPassword] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setNewSurname(e.target.value);
  };

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleExistingPasswordChange = (e) => {
    setExistingPassword(e.target.value);
  };

  const changeUserInfo = () => {
    currentUser.name = newName;
    currentUser.surname = newSurname;
    currentUser.email = newEmail;
    userApi.userPut({body: currentUser}, (error, data) =>
    {
      if (error === null) {
      }
    });
  };

  const changeUserPassword = () => {
    if (existingPassword !== currentUser.password) {
      setPasswordError(true);
      return;
    }

    if (newPassword) {
      setNewPassword(newPassword);
    }

    currentUser.password = newPassword;
    userApi.userPut({body: currentUser}, (error, data) =>
    {
      if (error !== null) {
        setPasswordError(false); //zla wiadomosc wypisze :D/
      }
      else {
        setPasswordError(false);
      }
    });
  };

  return (
    <div className="profile-details-page">
      <section className="section-info">
        <h2>Basic information</h2>
        <form>
          {/*E-Mail*/}
          <div>
            <label htmlFor="email" hidden>
              E-Mail
            </label>
            <span className="label">E-Mail</span>
            <input
              type="email"
              name="email"
              id="email"
              value={newEmail}
              onChange={handleEmailChange}
              placeholder="E-Mail"
            ></input>
          </div>
          {/*Login*/}
          <div>
            <label htmlFor="login" hidden>
              Login
            </label>
            <span className="label">Login</span>
            <input
              type="text"
              name="login"
              id="login"
              placeholder="Login"
            ></input>
          </div>
          {/*Name*/}
          <div>
            <label htmlFor="name" hidden>
              Name
            </label>
            <span className="label">Name</span>
            <input
              type="text"
              name="name"
              id="name"
              value={newName}
              onChange={handleNameChange}
              placeholder="Name"
            ></input>
          </div>
          {/*Surname*/}
          <div>
            <label htmlFor="surname" hidden>
              Surname
            </label>
            <span className="label">Surname</span>
            <input
              type="text"
              name="surname"
              id="surname"
              value={newSurname}
              onChange={handleSurnameChange}
              placeholder="Surname"
            ></input>
          </div>
        </form>
        <button className="save-btn accent" onClick={changeUserInfo}>Save</button>
      </section>
      <section className="section-info">
        <h2>Password</h2>
        <form>
          {/*Password1*/}
          <div>
            <label htmlFor="password1" hidden>
              Existing password
            </label>
            <span className="label">Existing pxassword</span>
            <input
              type="password"
              name="password1"
              id="password1"
              value={existingPassword}
              onChange={handleExistingPasswordChange}
              placeholder="Password"
            ></input>
          </div>
          {/*Password2*/}
          <div>
            <label htmlFor="password2" hidden>
              New password
            </label>
            <span className="label">New password</span>
            <input
              type="password"
              name="password2"
              id="password2"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Repeat Password"
            ></input>
          </div>
          {passwordError && (
              <p style={{ color: "darkRed" }}>Incorrect existing password</p>
            )}
        </form>
        <button className="save-btn accent" onClick={changeUserPassword}>Save</button>
      </section>
    </div>
  );
}

export default ProfileDetailsPage;
