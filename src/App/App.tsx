import React, { useState } from "react";

import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isNil } from "ramda";
import SpotifyApiApolloProvider from "./SpotifyApiApolloProvider";
import MainContainer from "../Main/MainContainer";
import AppAuthHandler from "./AppAuthHandler";
import { config } from "../config";
import AppStateContextProvider from "./AppStateContextProvider";

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
                <MainContainer
                  doLogout={logout}
                  loginError={loginError}
                  doLogin={doLogin}
                  isLoggedIn={isLoggedIn}
                />
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
