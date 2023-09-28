import React from "react";
import "./RegisterPage.scss";
import Logo from "@/components/logo/Logo";
import { Form, NavLink } from "react-router-dom";
import Separator from "../../components/separator/Separator";
import { ApiClient } from "../../services/ApiClient";
import { AuthApi } from "../../services/api/AuthApi";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const authApi = new AuthApi(new ApiClient());

function RegisterPage() {
  let { currentUser } = useContext(UserContext);
  let navigate = useNavigate();
  return (
    <div className="register-page">
      <div className="register-container">
        <Logo text="Dibrysoft — Welcome!" />
        <Form className="form">
          {/*E-Mail*/}
          <div style={{ gridArea: "email" }}>
            <label htmlFor="email" hidden>
              E-Mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-Mail"
            ></input>
          </div>
          {/*Login*/}
          <div style={{ gridArea: "login" }}>
            <label htmlFor="login" hidden>
              Login
            </label>
            <input
              type="text"
              name="login"
              id="login"
              placeholder="Login"
            ></input>
          </div>
          {/*Name*/}
          <div style={{ gridArea: "name" }}>
            <label htmlFor="name" hidden>
              Name
            </label>
            <input type="text" name="name" id="name" placeholder="Name"></input>
          </div>
          {/*Surname*/}
          <div style={{ gridArea: "surname" }}>
            <label htmlFor="surname" hidden>
              Surname
            </label>
            <input
              type="text"
              name="surname"
              id="surname"
              placeholder="Surname"
            ></input>
          </div>
          {/*Password1*/}
          <div style={{ gridArea: "password1" }}>
            <label htmlFor="password1" hidden>
              Password
            </label>
            <input
              type="password"
              name="password1"
              id="password1"
              placeholder="Password"
            ></input>
          </div>
          {/*Password2*/}
          <div style={{ gridArea: "password2" }}>
            <label htmlFor="password2" hidden>
              Repeat Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              placeholder="Repeat Password"
            ></input>
          </div>
          {/*Submit*/}
          <div style={{ gridArea: "submit" }} className="submit-area">
            <button type="button" className="accent outlined sign-up" onClick={ () =>
            {
              const emailInput = document.querySelector('input[name="email"]').value;
              const nameInput = document.querySelector('input[name="name"]').value;
              const surnameInput = document.querySelector('input[name="surname"]').value;
              const loginInput = document.querySelector('input[name="login"]').value;
              const password1Input = document.querySelector('input[name="password1"]').value;
              const password2Input = document.querySelector('input[name="password2"]').value;
              
              if (password1Input !== password2Input)
              {
                //do cos
                return;
              }

              authApi.authRegisterLoginPasswordEmailNameSurnameGet(loginInput, password1Input, emailInput, nameInput, surnameInput, async (error, data) => {
                if (error !== null || data === false)
                  return;

                  navigate("/login");
              });
            }}>Sign up</button>
          </div>
        </Form>
        <div className="log-in">
          <Separator>Already have an account?</Separator>
          <NavLink className="button outlined" to="/login">
            Log in
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
