import React from "react";
import "./LoginPage.scss";
import Logo from "@/components/logo/Logo";
import Spacer from "../../components/spacer/Spacer";
import { Link, NavLink } from "react-router-dom";
import Separator from "../../components/separator/Separator";
import { AuthApi } from "../../services/api/AuthApi";
import { ApiClient } from "../../services/ApiClient";
import { UserApi } from "../../services/api/UserApi";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const authApi = new AuthApi(new ApiClient());
const userApi = new UserApi();

function LoginPage() {
  let { currentUser } = useContext(UserContext);
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
            <button type="button" className="outlined" onClick={ () =>
            {
              const loginInput = document.querySelector('input[name="login"]').value;
              const passwordInput = document.querySelector('input[name="password"]').value;
              ApiClient.authentications.password = crypto.randomUUID();
              authApi.authLoginLoginPasswordIdGet(loginInput, passwordInput, ApiClient.authentications.password, async (error, data) => {
                if (error !== null || data === false)
                  return;
                
                console.log(`lohhed in with token ${ApiClient.authentications.password}`);
                userApi.userGetAliasGet(loginInput, (userError, userData) => {
                  if (userError !== null)
                    return;

                  currentUser = userData;
                  navigate("/home");
                })
              });
            }}>Log in</button>
          </div>
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
