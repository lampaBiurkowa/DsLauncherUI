import React from "react";
import "./LoginPage.scss";
import Logo from "@/components/logo/Logo";
import Spacer from "../../components/spacer/Spacer";
import { Link, NavLink } from "react-router-dom";
import Separator from "../../components/separator/Separator";

function LoginPage() {
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
            <button className="outlined">Log in</button>
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
