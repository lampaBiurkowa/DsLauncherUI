import React from "react";
import "./LoginPage.scss";
import Logo from "@/components/logo/Logo";
import Spacer from "../../components/spacer/Spacer";
import { NavLink } from "react-router-dom";
import Separator from "../../components/separator/Separator";
import { DsIdentityApiClient } from "../../services/DsIdentityApiClient";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { executeCommand } from "@/services/DsLauncherService";
import { LocalStorageHandler } from "../../services/LocalStorageService";

const api = new DsIdentityApiClient();

function LoginPage() {
  const [error, setError] = useState(null);
  let context  = useContext(UserContext);
  let navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-container">
        <Logo />
        <form>
          <div className="textarea-container">
            <i className="la la-user" />
            <input type="text" name="login" id="name" placeholder="Login" />
          </div>
          <div className="textarea-container">
            <i className="la la-lock" />
            <input
              type="password"
              name="password"
              id="name"
              placeholder="Password"
            />
          </div>
          <div className="login-controls">
            <label>
              <input type="checkbox" name="checkbox-checked" />
              Remember me
            </label>
            <Spacer />
            <button type="button" className="outlined" onClick={async () =>
            {
              const loginInput = document.querySelector('input[name="login"]').value;
              const passwordInput = document.querySelector('input[name="password"]').value;
              const userId = await api.getIdByAlias(loginInput);
              try {
                const passwordBase64 = btoa(passwordInput);
                const token = await api.login(userId, passwordBase64);

                api.getUserById(userId).then(user => {
                  context.currentUser = user;
                  navigate("/home");
                });

                console.log('zara wysyleczka');
                executeCommand("login", { 
                  userId: userId,
                  passwordBase64: passwordBase64,
                  token: token
                });

                LocalStorageHandler.setToken(token);
                LocalStorageHandler.setUser(userId);
              }
              catch {
                console.error("Error checking if user is online:", error);
                setError("Login failed. Please check your credentials.");
              }
            }}>Log in</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="sign-up">
          <Separator>Create Dibrysoft Account</Separator>
          <NavLink className="button outlined accent" to="/register">
            Sign up
          </NavLink>
        </div>
        <a className="password-help">Forgot password?</a>
      </div>
    </div>
  );
}

export default LoginPage;
