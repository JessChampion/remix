import React from 'react';

import './MainContainer.css';
import AppHeaderComponent from '../App/AppHeaderComponent';
import AppFooterComponent from '../App/AppFooterComponent';
import InputSectionContainer from './InputSection/InputSectionContainer';
import OutputSectionContainer from './OutputSection/OutputSectionContainer';
import { template_login } from '../templateStrings';
import MainLayout from './MainLayout';
import ButtonComponent from '../Components/ButtonComponent';
import IconComponent from '../Components/IconComponent';

interface IMainContainerProps {
  loginError: Error | null,
  isLoggedIn: boolean,
  doLogin: Function
}

function MainContainer({
  loginError,
  isLoggedIn,
  doLogin
}: IMainContainerProps) {
  console.log({ isLoggedIn });
  return (
    <div className="main">
      <AppHeaderComponent />
      {!isLoggedIn ? (
        <div className="login">
          <p className="login-blurb">
            {template_login.blurb}
          </p>
          {loginError && (
            <p className="login-error">
              {template_login.error}
            </p>
          )}
          <ButtonComponent onClick={doLogin} className="login-action icon-right">
            <>
              {template_login.action}
              <IconComponent type="spotify" />
            </>
          </ButtonComponent>
          <div className="login-disclaimer">
            <IconComponent type="info" />
            <p>{template_login.disclaimer}</p>
          </div>
        </div>
      ) : (
        <MainLayout>
          {{
            input: <InputSectionContainer />,
            output: <OutputSectionContainer />
          }}
        </MainLayout>
      )}
      <AppFooterComponent />
    </div>
  );
}

export default MainContainer;
