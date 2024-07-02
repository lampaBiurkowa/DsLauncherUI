import React, { useState } from "react";
import "./RegisterPage.scss";
import Logo from "@/components/logo/Logo";
import { Form, NavLink } from "react-router-dom";
import Separator from "../../components/separator/Separator";
import { DsCoreApiClient } from "../../services/DsCoreApiClient";
import Dialog from "@/components/dialog/Dialog";
import VerifyAccount from "./components/VerifyAccount";

const coreApi = new DsCoreApiClient();

function RegisterPage() {
  const [verifyDialogOpen, setVerifyDialogOpen] = useState();
  const [userGuid, setUserGuid] = useState();
  // let navigate = useNavigate();
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
            <button type="button" className="accent outlined sign-up" onClick={async () =>
            {
              const emailInput = document.querySelector('input[name="email"]').value;
              const nameInput = document.querySelector('input[name="name"]').value;
              const surnameInput = document.querySelector('input[name="surname"]').value;
              const loginInput = document.querySelector('input[name="login"]').value;
              const password1Input = document.querySelector('input[name="password1"]').value;
              const password2Input = document.querySelector('input[name="password2"]').value;
              
              if (password1Input !== password2Input)
              {
                //todo cos
                return;
              }

              var user = {alias: loginInput, email: emailInput, name:nameInput, surname: surnameInput, id: 0};
              setUserGuid(await coreApi.register(user, btoa(password1Input)));
              console.log(userGuid);
              setVerifyDialogOpen(true);
              // navigate("/login");
            }}>Sign up</button>
          </div>
        </Form>
        <div className="log-in">
          <Separator>Already have an account?</Separator>
          <NavLink className="button outlined" to="/login">
            Log in
          </NavLink>
        </div>
        <Dialog
            open={verifyDialogOpen}
            onClosed={() => setVerifyDialogOpen(false)}
            header="Verify account"
          >
          <VerifyAccount
            userGuid={userGuid}
          ></VerifyAccount>
        </Dialog>
      </div>
    </div>
  );
}

export default RegisterPage;
