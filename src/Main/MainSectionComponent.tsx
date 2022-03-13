import React from "react";

import "./MainSectionComponent.scss";

interface IMainSectionComponentProps {
  type: AppSectionType;
  active: boolean;
  toggleActive: Function;
  children: {
    toggle: React.ReactChild;
    content: React.ReactChild;
  };
}

function MainSectionComponent({
  active,
  children,
  toggleActive,
  type,
}: IMainSectionComponentProps) {
  const { toggle, content } = children;
  return (
    <div className={`main-section ${active ? "active" : ""}`}>
      <button
        type="button"
        className="main-section-toggle"
        onClick={() => toggleActive(type)}
      >
        {toggle}
      </button>
      <div className="main-section-content">{content}</div>
    </div>
  );
}

export default MainSectionComponent;
