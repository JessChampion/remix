import "./AppHeaderComponent.scss";
import React from "react";
import { TEMPLATE_APP } from "../templateStrings";

interface IAppHeaderComponent {
  children: {
    userInfo: React.ReactChild | null;
  };
}

function AppHeaderComponent({ children }: IAppHeaderComponent) {
  const titleLetters = Array.from(TEMPLATE_APP.appTitle);
  const userInfo = children?.userInfo;
  return (
    <header className="app-header">
      <div className="app-header-wrap">
        <h1 className="app-header-title">
          {titleLetters.map((letter: string) => (
            <span key={letter} className="letter">
              {letter}
            </span>
          ))}
        </h1>
        {userInfo && <div className="user-info">{userInfo}</div>}
      </div>
    </header>
  );
}

export default AppHeaderComponent;
