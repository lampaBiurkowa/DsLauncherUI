import React from "react";
import "./LoginPage.scss";
import Logo from "@/components/logo/Logo";
import Spacer from "../../components/spacer/Spacer";
import { NavLink } from "react-router-dom";
import Separator from "../../components/separator/Separator";
import { DsCoreApiClient } from "../../services/DsCoreApiClient";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SessionDataHandler } from "../../services/SessionDataService";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";
import Dialog from "@/components/dialog/Dialog";
import VerifyAccount from "./components/VerifyAccount";
import { executeCommand } from "@/services/DsLauncherServiceClient";

const api = new DsCoreApiClient();

function LoginPage() {
  const [error, setError] = useState(null);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [verifyDialogOpen, setVerifyDialogOpen] = useState();

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
            <button
              type="button"
              className="outlined accent"
              onClick={async () => {
                const loginInput = document.querySelector(
                  'input[name="login"]'
                ).value;
                const passwordInput = document.querySelector(
                  'input[name="password"]'
                ).value;

                try {
                  console.log("2222");
                  const userId = await api.getIdByAlias(loginInput);
                  console.log("111");
                  const passwordBase64 = btoa(passwordInput);

                  console.log("0000");

                  executeCommand(
                    "login",
                    {
                      userId: userId,
                      passwordBase64: passwordBase64,
                    },
                    {
                      workerRepetitions: -1,
                      workerInterval: 1000 * 60 * 3,
                    }
                  );

                  console.log("AAA");

                  while (!SessionDataHandler.getToken()) {}
                  console.log("BBB");
                  SessionDataHandler.setUser(userId);
                  console.log("CCC");

                  api.getUserById(userId).then((user) => {
                    console.log("DDD");
                    setCurrentUser(user);
                    navigate("/home");
                  });
                } catch {
                  setError("Please check your credentials.");
                }
              }}
            >
              Log in
            </button>
          </div>
          {error && (
            <InfoBar
              type={InfoBarType.Error}
              header="Login failed"
              text={error}
            ></InfoBar>
          )}
        </form>
        <div className="sign-up">
          <Separator>Create Dibrysoft Account</Separator>
          <NavLink className="button outlined" to="/register">
            Sign up
          </NavLink>
        </div>
        <a className="password-help" onClick={() => setVerifyDialogOpen(true)}>Verify an existing accont</a>
      </div>

      <Dialog
          open={verifyDialogOpen}
          onClosed={() => setVerifyDialogOpen(false)}
          header="Verify account"
        >
        <VerifyAccount
          enableLoginInput={true}
        ></VerifyAccount>
      </Dialog>
    </div>
  );
}

export default LoginPage;
