import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { assocPath, Path, pathOr } from "ramda";
import { GET_ME } from "../Queries/userDetailsQuery";

interface IContextState {
  loading: boolean;
  appState: IAppState;
  getPathValueFromState: Function;
  setValueAtPathInState: Function;
}

const DEFAULT_STATE = {
  uiState: {
    currentSection: null,
    currentInputSubSection: null,
  },
  userInfo: null,
};

const DEFAULT_STATE_CONTEXT = {
  loading: false,
  appState: DEFAULT_STATE,
  getPathValueFromState: () => undefined,
  setValueAtPathInState: () => undefined,
};

export const AppStateContext = React.createContext<IContextState>(
  DEFAULT_STATE_CONTEXT
);

const updateStateUserInfo = (
  setState: Function,
  state: IAppState,
  data: { me: IUserInfo }
) => {
  const value = pathOr<IUserInfo | null>(null, ["me"], data);
  setState(assocPath(["userInfo"], value, state));
};

const getStateAccessFunction = (appState: IAppState) => (path: Path) =>
  pathOr(undefined, path)(appState);

const setValueAtPathInState = (appState: IAppState) => (path: Path) =>
  assocPath(path, appState);

function AppStateContextProvider({ children }: { children: React.ReactChild }) {
  const [appState, setAppState] = useState<IAppState>({ ...DEFAULT_STATE });
  const [contextState, setContextState] = useState<IContextState>({
    loading: false,
    appState,
    getPathValueFromState: getStateAccessFunction(appState),
    setValueAtPathInState: setValueAtPathInState(appState),
  });

  const { loading, data, error } = useQuery(GET_ME);

  useEffect(() => {
    setContextState({
      ...contextState,
      appState,
      getPathValueFromState: getStateAccessFunction(appState),
    });
  }, [appState]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading !== contextState.loading) {
      setContextState({
        ...contextState,
        loading,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && data) {
      updateStateUserInfo(setAppState, appState, data);
    }
  }, [data]);

  return (
    <AppStateContext.Provider value={contextState}>
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateContextProvider;
