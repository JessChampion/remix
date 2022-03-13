import React from "react";

import "./MainSectionComponent.scss";
import ButtonComponent from "../Components/ButtonComponent";

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
      <ButtonComponent
        className="main-section-toggle"
        onClick={() => toggleActive(type)}
      >
        {toggle}
      </ButtonComponent>
      <div className="main-section-content">{content}</div>
    </div>
  );
}

export default MainSectionComponent;
