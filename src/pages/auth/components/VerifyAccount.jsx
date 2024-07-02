import React, { useState } from "react";
import "./VerifyAccount.scss";
import { Form, useNavigate } from "react-router-dom";
import { DsCoreApiClient } from "@/services/DsCoreApiClient";
import InfoBar, { InfoBarType } from "@/components/info-bar/InfoBar";

function VerifyAccount({ userGuid, enableLoginInput }) {

    const coreApi = new DsCoreApiClient();
    const [alreadyVerifiedVisible, setAlreadyVerifiedVisible] = useState(false);
    const [verifyErrorVisible, setVerifyErrorVisible] = useState(false);

    let navigate = useNavigate();
    return (
        <div className="code-dialog">
            <span className="notice">
                Verify your DibrySoft account.
            </span>
            <Form className="form2">
                {enableLoginInput && (
                    <div style={{ gridArea: "code-login" }}>
                        <label htmlFor="code-login" hidden>
                            Enter login you want to verify
                        </label>
                        <input
                            type="text"
                            name="code-login"
                            id="code-login"
                            placeholder="Your login"
                        ></input>
                    </div>
                )}
                <div style={{ gridArea: "code" }}>
                    <label htmlFor="code" hidden>
                        Verification code
                    </label>
                    <input
                        type="text"
                        name="code"
                        id="code"
                        placeholder="Enter your code"
                    ></input>
                </div>
                <div style={{ gridArea: "submit" }} className="submit-area">
                    <button type="button" className="accent outlined verify" onClick={async () => {
                        const code = document.querySelector('input[name="code"]').value;
                        if (enableLoginInput) {
                            const login = document.querySelector('input[name="code-login"]').value;
                            userGuid = await coreApi.getIdByAlias(login);
                        }

                        const isActivated = await coreApi.isActivated(userGuid);
                        if (isActivated) {
                            setAlreadyVerifiedVisible(true);
                            return;
                        }
                        
                        try {
                            await coreApi.activate(userGuid, btoa(code));
                        } catch {
                            setVerifyErrorVisible(true);
                        }
                        navigate("/login");
                    }
                    }>
                        Verify
                    </button>
                </div>
                <button
                    className="accent"
                    onClick={async () => {
                        if (enableLoginInput) {
                            const login = document.querySelector('input[name="code-login"]').value;
                            userGuid = await coreApi.getIdByAlias(login);
                        }
                        await coreApi.regenerateActivationCode(userGuid);
                    }
                    }
                >
                    Regenerate
                </button>
            </Form>
            <InfoBar
                type={InfoBarType.Info}
                header="Account verified"
                text="Account is already verified"
                open={alreadyVerifiedVisible}
                setOpen={setAlreadyVerifiedVisible}
                dismissable
            ></InfoBar>
            <InfoBar
                type={InfoBarType.Error}
                header="Error"
                text="Verification failed - try regenrating the code"
                open={verifyErrorVisible}
                setOpen={setVerifyErrorVisible}
                dismissable
            ></InfoBar>
        </div>
    );
}

export default VerifyAccount;
