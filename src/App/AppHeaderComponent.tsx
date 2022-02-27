import './AppHeaderComponent.css';
import React from 'react';
import { template_main } from '../templateStrings';

interface IAppHeaderComponent {
  children?: {
    userInfo?: React.ReactChild;
  }
}

function AppHeaderComponent({ children }: IAppHeaderComponent) {
  const titleLetters = Array.from(template_main.appTitle);
  const userInfo = children?.userInfo;
  return (
    <header className="app-header">
      <h1 className="app-header-title">
        {
          titleLetters.map((letter: string) => (
            <span key={letter} className="letter">{letter}</span>
          ))
        }
      </h1>
      {userInfo && (
      <div className="user-info">
        {userInfo}
      </div>
      )}
    </header>
  );
}

AppHeaderComponent.defaultProps = {
  children: undefined
};
export default AppHeaderComponent;
