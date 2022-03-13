import React from "react";

import "./LoadingComponent.scss";
import { TEMPLATE_APP } from "../templateStrings";

interface ILoadingComponentProps {
  className?: string;
}

function LoadingComponent({ className }: ILoadingComponentProps) {
  return (
    <div
      className={`loading-spinner ${className}`}
      title={TEMPLATE_APP.loading}
      aria-label={TEMPLATE_APP.loading}
    >
      <div className="graphic">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </div>
  );
}

LoadingComponent.defaultProps = {
  className: "",
};

export default LoadingComponent;
