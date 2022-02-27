import React from 'react';
import './MainLayout.css';

interface IAppMainLayoutProps {
  children: {
    input: React.ReactElement
    output: React.ReactElement
  }
}

function MainLayout({ children }: IAppMainLayoutProps) {
  const { input, output } = children;
  return (
    <main className="app-main">
      <div>
        {input}
      </div>
      {output}
    </main>
  );
}

export default MainLayout;
