import React from 'react';

import './LoadingComponent.css';
import { template_main } from '../templateStrings';

interface ILoadingComponentProps {
  className?: string
}

function LoadingComponent({ className }: ILoadingComponentProps) {
  return (
    <div
      className={`loading-spinner ${className}`}
      title={template_main.loading}
      aria-label={template_main.loading}
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
  className: ''
};

export default LoadingComponent;
