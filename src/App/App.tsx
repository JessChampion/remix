import React, { useState } from 'react';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { isNil } from 'ramda';
import SpotifyApiApolloProvider from './SpotifyApiApolloProvider';
import MainContainer from '../MainView/MainContainer';
import AppAuthHandler from './AppAuthHandler';
import { config } from '../config';

export const HOME_ROUTE = '/';
export const AUTH_ROUTE = '/auth';
export const APP_KEY = 'appKey';
export const API_TOKEN_KEY = 'spotify_token';
const SCOPES = 'user-read-private user-top-read user-read-recently-played '
  + 'playlist-modify-private playlist-read-private playlist-modify-public';

const getAppKey = () => {
  const existingKey = localStorage.getItem(APP_KEY);
  if (existingKey) {
    return parseInt(existingKey, 10);
  }
  const key = Math.floor(Math.random() * 100000);
  localStorage.setItem(APP_KEY, `${key}`);
  return key;
};

const getToken = () => {
  const storageToken = localStorage.getItem(API_TOKEN_KEY);
  if (!storageToken) {
    return undefined;
  }
  const parsed = JSON.parse(storageToken);
  return parsed?.access_token;
};

function App() {
  const location = window?.location;
  const [appKey] = useState<number>(getAppKey());
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [token, setToken] = useState(getToken());
  const isLoggedIn = !isNil(token);

  const redirect = `${location.origin}${AUTH_ROUTE}`;

  const authURL = `${config.auth}?${
    new URLSearchParams(
      {
        response_type: 'code',
        client_id: config.clientID,
        scope: SCOPES,
        redirect_uri: redirect,
        state: `${appKey}`
      }
    ).toString()
  }`;

  const doLogin = () => {
    location.assign(authURL);
  };

  const checkState = (stateValue: string) => appKey === parseInt(stateValue, 10);

  const saveToken = (tokenValue: string) => {
    console.log({ tokenValue });
    localStorage.setItem(API_TOKEN_KEY, tokenValue);
    setToken(tokenValue);
  };

  return (
    <BrowserRouter>
      <SpotifyApiApolloProvider token={token}>
        <Routes>
          <Route
            path={HOME_ROUTE}
            element={
              <MainContainer loginError={loginError} doLogin={doLogin} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path={AUTH_ROUTE}
            element={(
              <AppAuthHandler
                redirect={redirect}
                handleError={setLoginError}
                checkState={checkState}
                setToken={saveToken}
              />
            )}
          />
        </Routes>
      </SpotifyApiApolloProvider>
    </BrowserRouter>
  );
}

export default App;
