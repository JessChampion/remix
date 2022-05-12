import React, { useContext, useState } from "react";

import "./AppLayoutContainer.scss";
import { AppStateContext } from "./AppStateContextProvider";
import LoadingComponent from "../Components/LoadingComponent";
import AppSectionComponent from "./Components/AppSectionComponent";

interface IAppLayoutContainerProps {
  isLoggedIn: boolean;
  children: {
    appHeader: React.ReactChild | null;
    appFooter: React.ReactChild | null;
    loginView: React.ReactChild | null;
    sections: Array<IAppSection>;
  };
}

function AppLayoutContainer({
  isLoggedIn,
  children,
}: IAppLayoutContainerProps) {
  const { appHeader, appFooter, loginView, sections } = children;
  const { loading, getCurrentSection, setCurrentSection } =
    useContext(AppStateContext);

  const [activeSection, setActiveSection] = useState<AppSectionType | null>(
    getCurrentSection()
  );

  const toggleActiveSection = (newValue: AppSectionType | null = null) => {
    if (newValue !== activeSection) {
      setActiveSection(newValue);
      setCurrentSection(newValue);
    }
  };

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <div className="app-layout">
      {appHeader}
      {!isLoggedIn ? (
        loginView
      ) : (
        <div className="app-layout-main">
          {sections.map(({ type, toggle, content }) => (
            <AppSectionComponent
              key={type}
              type={type}
              active={activeSection === type}
              toggleActive={toggleActiveSection}
            >
              {{
                toggle,
                content,
              }}
            </AppSectionComponent>
          ))}
        </div>
      )}
      {appFooter}
    </div>
  );
}

export default AppLayoutContainer;
