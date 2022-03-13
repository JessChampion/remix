import React from "react";
import "./MainLayout.scss";

interface IAppMainLayoutProps {
  children: {
    input: React.ReactElement;
    output: React.ReactElement;
  };
}

function MainLayout({ children }: IAppMainLayoutProps) {
  const { input, output } = children;
  return (
    <main className="app-main">
      {input}
      {output}
    </main>
  );
}

export default MainLayout;
