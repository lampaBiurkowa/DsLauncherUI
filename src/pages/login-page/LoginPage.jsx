import React from "react";
import "./LoginPage.scss";
import Logo from "@/components/logo/Logo";
import Spacer from "../../components/spacer/Spacer";
import { Link, NavLink } from "react-router-dom";
import Separator from "../../components/separator/Separator";
import { DsAuthApiClient } from "../../services/DsAuthApiClient";
import { DsCoreApiClient } from "../../services/DsCoreApiClient";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const authApi = new DsAuthApiClient();
const userApi = new DsCoreApiClient();

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
              var userId= null;

              const x = await userApi.getIdByAlias(loginInput);
              userId = x;
              console.log("userid:", x);
              try {
                const t = await authApi.login(userId, btoa(passwordInput));
                localStorage.setItem('token', t);
                console.log("lohhed in with token:", t);
              }
              catch {
                console.error("Error checking if user is online:", error);
                setError("Login failed. Please check your credentials.");
              }

              localStorage.setItem('currentUser', userId);
              context.currentUser = await userApi.getUserById(userId);
              navigate("/home");
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
