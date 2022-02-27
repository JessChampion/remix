import React from 'react';

import './ButtonComponent.css';

interface IButtonComponentProps {
  onClick: Function
  className?: string
  children: React.ReactChild
}

function ButtonComponent({ onClick, className, children, ...restProps }: IButtonComponentProps) {
  return (
    <button
      className={`button ${className}`}
      onClick={() => onClick()}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...{ type: 'button', ...restProps }}
    >
      {children}
    </button>
  );
}

ButtonComponent.defaultProps = {
  className: ''
};

export default ButtonComponent;
