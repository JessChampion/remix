import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import { assocPath, Path, pathOr } from "ramda";
import { GET_ME } from "../Queries/userDetailsQuery";

interface IStateAccessors {
  loading: boolean;
  getUserInfo: () => IUserInfo | null;
  getCurrentSection: () => AppSectionType | null;
  setCurrentSection: (section: AppSectionType | null) => void;
  getInputSeeds: () => ISeedState;
  getInputSeedsCount: () => number;
  setInputSeeds: (seeds: ISeedState) => void;
}

const DEFAULT_STATE = {
  input: {
    seeds: {
      tracks: [],
      artists: [],
      genres: [],
    },
  },
  uiState: {
    currentSection: null,
    currentInputSubSection: null,
  },
  userInfo: null,
};

const DEFAULT_STATE_ACCESSORS = {
  loading: false,
  getUserInfo: () => DEFAULT_STATE.userInfo,
  getCurrentSection: () => DEFAULT_STATE.uiState.currentSection,
  setCurrentSection: () => {},
  getInputSeeds: () => DEFAULT_STATE.input.seeds,
  getInputSeedsCount: () => 0,
  setInputSeeds: () => {},
};

export const MAX_SEEDS = 5;

export const AppStateContext = React.createContext<IStateAccessors>(
  DEFAULT_STATE_ACCESSORS
);

const updateStateUserInfo = (
  setState: Function,
  state: IAppState,
  data: { me: IUserInfo }
) => {
  const value = pathOr<IUserInfo | null>(null, ["me"], data);
  setState(assocPath(["userInfo"], value, state));
};

function AppStateContextProvider({ children }: { children: React.ReactChild }) {
  const [appState, setAppState] = useState<IAppState>({ ...DEFAULT_STATE });

  // private app state
  const getStateAccessor = (path: Path) => pathOr(null, path)(appState);

  const setStateAccessor = (path: Path, value: any) => {
    const updatedState = assocPath(path, value, appState);
    setAppState(updatedState);
  };

  // Global accessors
  const getUserInfo = (): IUserInfo | null => getStateAccessor(["userInfo"]);

  // UI accessors
  const getCurrentSection = (): AppSectionType | null =>
    getStateAccessor(["uiState", "currentSection"]);
  const setCurrentSection = (currentSection: AppSectionType | null) =>
    setStateAccessor(["uiState", "currentSection"], currentSection);

  // Input accessors
  const getInputSeeds = (): ISeedState =>
    getStateAccessor(["input", "seeds"]) || DEFAULT_STATE.input.seeds;
  const getInputSeedsCount = () => {
    const { tracks, artists, genres } = getInputSeeds();
    return tracks.length + artists.length + genres.length;
  };
  const setInputSeeds = (updatedSeeds: ISeedState) => {
    setStateAccessor(["input", "seeds"], updatedSeeds);
  };

  const { loading, data, error } = useQuery(GET_ME);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && data) {
      updateStateUserInfo(setAppState, appState, data);
    }
  }, [data]);

  return (
    <AppStateContext.Provider
      value={{
        loading,
        getUserInfo,
        getCurrentSection,
        setCurrentSection,
        getInputSeeds,
        getInputSeedsCount,
        setInputSeeds,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateContextProvider;
