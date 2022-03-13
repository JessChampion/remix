import React, { useContext, useState } from "react";

import "./MainContainer.scss";
import AppHeaderComponent from "../App/AppHeaderComponent";
import AppFooterComponent from "../App/AppFooterComponent";
import SeedSelectionContainer from "./InputSection/SeedSelectionContainer";
import OutputSectionContainer from "./OutputSection/OutputSectionContainer";
import { TEMPLATE_LOGIN } from "../templateStrings";
import MainLayout from "./MainLayout";
import ButtonComponent from "../Components/ButtonComponent";
import IconComponent from "../Components/IconComponent";
import UserInfoContainer from "./UserInfoContainer";
import { AppStateContext } from "../App/AppStateContextProvider";
import LoadingComponent from "../Components/LoadingComponent";
import MainSectionComponent from "./MainSectionComponent";

interface IMainContainerProps {
  loginError: Error | null;
  isLoggedIn: boolean;
  doLogin: Function;
  doLogout: Function;
}

function MainContainer({
  loginError,
  isLoggedIn,
  doLogin,
  doLogout,
}: IMainContainerProps) {
  const { loading, getPathValueFromState, setValueAtPathInState } =
    useContext(AppStateContext);

  const [activeSection, setActiveSection] = useState<AppSectionType | null>(
    getPathValueFromState(["uiState", "currentSection"])
  );

  const toggleActiveSection = (newValue: AppSectionType | null = null) => {
    setActiveSection(newValue);
    setValueAtPathInState(["uiState", "currentSection"], newValue);
  };

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div className="main">
      <AppHeaderComponent>
        {{
          userInfo: isLoggedIn ? <UserInfoContainer logout={doLogout} /> : null,
        }}
      </AppHeaderComponent>
      {!isLoggedIn ? (
        <div className="login">
          <p className="login-blurb">{TEMPLATE_LOGIN.blurb}</p>
          {loginError && <p className="login-error">{TEMPLATE_LOGIN.error}</p>}
          <ButtonComponent
            onClick={doLogin}
            className="login-action icon-right"
          >
            <>
              {TEMPLATE_LOGIN.action}
              <IconComponent type="spotify" />
            </>
          </ButtonComponent>
          <div className="login-disclaimer">
            <IconComponent type="info" />
            <p>{TEMPLATE_LOGIN.disclaimer}</p>
          </div>
        </div>
      ) : (
        <MainLayout>
          {{
            input: (
              <MainSectionComponent
                type="input"
                active={activeSection === "input"}
                toggleActive={toggleActiveSection}
              >
                {{
                  toggle: (
                    <>
                      <span>Input</span>
                      <IconComponent type="right" />
                    </>
                  ),
                  content: <SeedSelectionContainer />,
                }}
              </MainSectionComponent>
            ),
            output: (
              <MainSectionComponent
                type="output"
                active={activeSection === "output"}
                toggleActive={toggleActiveSection}
              >
                {{
                  toggle: (
                    <>
                      <span>Output</span>
                      <IconComponent type="right" />
                    </>
                  ),
                  content: <OutputSectionContainer />,
                }}
              </MainSectionComponent>
            ),
          }}
        </MainLayout>
      )}
      <AppFooterComponent logout={doLogout} />
    </div>
  );
}

export default MainContainer;
