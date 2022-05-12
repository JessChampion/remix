import React from "react";

import "./AppSectionComponent.scss";
import { handleKeyboardEvent, KEY_CONFIG } from "../../helpers";

interface IMainSectionComponentProps {
  type: AppSectionType;
  active: boolean;
  toggleActive: Function;
  children: {
    toggle: React.ReactChild;
    content: React.ReactChild;
  };
}

function AppSectionComponent({
  active,
  children,
  toggleActive,
  type,
}: IMainSectionComponentProps) {
  const { toggle, content } = children;
  const id = `MainSectionContent${type}`;
  return (
    <div className={`main-section ${type} ${active ? "active" : ""}`}>
      <div
        className="main-section-toggle"
        onClick={() => toggleActive(type)}
        onKeyUp={handleKeyboardEvent(
          () => toggleActive(type),
          KEY_CONFIG.selectKeyCodes
        )}
        role="button"
        tabIndex={0}
        aria-haspopup
        aria-expanded={active}
        aria-controls={id}
      >
        {toggle}
      </div>
      <div className="main-section-content" id={id}>
        {content}
      </div>
    </div>
  );
}

export default AppSectionComponent;
