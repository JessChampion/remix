import React, { useState } from "react";

import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isNil } from "ramda";
import SpotifyApiApolloProvider from "./SpotifyApiApolloProvider";
import AppLayoutContainer from "./AppLayoutContainer";
import { config } from "../config";
import AppStateContextProvider from "./AppStateContextProvider";
import LoginComponent from "./Components/LoginComponent";
import AppAuthHandler from "./AppAuthHandler";
import AppHeaderComponent from "./Components/AppHeaderComponent";
import UserInfoContainer from "./UserInfoContainer";
import AppFooterComponent from "./Components/AppFooterComponent";
import CurrentSeedsContainer from "./InputSection/CurrentSeedsContainer";
import SeedSelectionContainer from "./InputSection/SeedSelectionContainer";
import IconComponent from "../Components/IconComponent";
import OutputSectionContainer from "./OutputSection/OutputSectionContainer";

export const HOME_ROUTE = "/";
export const AUTH_ROUTE = "/auth";
export const APP_KEY = "appKey";
export const API_TOKEN_KEY = "spotify_token";
const SCOPES =
  "user-read-private user-top-read user-read-recently-played " +
  "playlist-modify-private playlist-read-private playlist-modify-public";

const getAppKey = () => {
  const existingKey = localStorage.getItem(APP_KEY);
  if (existingKey) {
    return parseInt(existingKey, 10);
  }
  const key = Math.floor(Math.random() * 100000);
  localStorage.setItem(APP_KEY, `${key}`);
  return key;
};

const getTokenDetails = () => {
  const storageToken = localStorage.getItem(API_TOKEN_KEY);
  if (!storageToken) {
    return undefined;
  }
  return JSON.parse(storageToken);
};

function App() {
  const location = window?.location;
  const [appKey, setAppKey] = useState<number>(getAppKey());
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [tokenDetails, setTokenDetails] = useState<ITokenDetails | undefined>(
    getTokenDetails()
  );

  const redirect = `${location.origin}${AUTH_ROUTE}`;

  const doLogin = () => {
    const authURL = `${config.auth}?${new URLSearchParams({
      response_type: "code",
      client_id: config.clientID,
      scope: SCOPES,
      redirect_uri: redirect,
      state: `${appKey}=${Date.now()}`,
    }).toString()}`;

    location.assign(authURL);
  };

  const checkState = (stateValue: string) => {
    const [stateValueAppKey, requestTimestamp] = stateValue.split("=");
    const requestTime = new Date(parseInt(requestTimestamp, 10));
    return {
      valid: appKey === parseInt(stateValueAppKey, 10),
      requestTime,
    };
  };

  const saveTokenDetails = (tokenValue: ITokenDetails) => {
    localStorage.setItem(API_TOKEN_KEY, JSON.stringify(tokenValue));
    setTokenDetails(tokenValue);
  };

  const logout = () => {
    localStorage.clear();
    setTokenDetails(undefined);
    setLoginError(null);
    setAppKey(getAppKey);
  };

  const isLoggedIn = !isNil(tokenDetails);

  return (
    <BrowserRouter>
      <SpotifyApiApolloProvider tokenDetails={tokenDetails}>
        <Routes>
          <Route
            path={HOME_ROUTE}
            element={
              <AppStateContextProvider>
                <AppLayoutContainer isLoggedIn={isLoggedIn}>
                  {{
                    appHeader: (
                      <AppHeaderComponent>
                        {{
                          userInfo: isLoggedIn ? (
                            <UserInfoContainer logout={logout} />
                          ) : null,
                        }}
                      </AppHeaderComponent>
                    ),
                    appFooter: <AppFooterComponent logout={logout} />,
                    loginView: (
                      <LoginComponent
                        loginError={loginError}
                        doLogin={doLogin}
                      />
                    ),
                    sections: [
                      {
                        type: "input" as AppSectionType,
                        toggle: <CurrentSeedsContainer />,
                        content: <SeedSelectionContainer />,
                      },
                      {
                        type: "output" as AppSectionType,
                        toggle: (
                          <>
                            <span>Output</span>
                            <IconComponent type="right" />
                          </>
                        ),
                        content: <OutputSectionContainer />,
                      },
                    ],
                  }}
                </AppLayoutContainer>
              </AppStateContextProvider>
            }
          />
          <Route
            path={AUTH_ROUTE}
            element={
              <AppAuthHandler
                redirect={redirect}
                handleError={setLoginError}
                checkState={checkState}
                setTokenDetails={saveTokenDetails}
              />
            }
          />
        </Routes>
      </SpotifyApiApolloProvider>
    </BrowserRouter>
  );
}

export default App;
