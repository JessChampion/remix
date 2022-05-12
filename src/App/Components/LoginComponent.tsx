import React from "react";

import "./LoginComponent.scss";
import { TEMPLATE_LOGIN } from "../../templateStrings";
import ButtonComponent from "../../Components/ButtonComponent";
import IconComponent from "../../Components/IconComponent";

interface ILoginComponentProps {
  loginError: Error | null;
  doLogin: Function;
}

function LoginComponent({ loginError, doLogin }: ILoginComponentProps) {
  return (
    <div className="login">
      <p className="login-blurb">{TEMPLATE_LOGIN.blurb}</p>
      {loginError && <p className="login-error">{TEMPLATE_LOGIN.error}</p>}
      <ButtonComponent onClick={doLogin} className="login-action icon-right">
        <>
          {TEMPLATE_LOGIN.action}
          <IconComponent type="spotify" />
        </>
      </ButtonComponent>
      <div className="login-disclaimer">
        <IconComponent type="info" />
        <div>
          <p>{TEMPLATE_LOGIN.disclaimer}</p>
          <p>{TEMPLATE_LOGIN.disclaimer2}</p>
          <p>{TEMPLATE_LOGIN.disclaimer3}</p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
