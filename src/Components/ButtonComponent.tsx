import React from "react";

import "./ButtonComponent.scss";

type ValidVariant = "standard" | "link" | "tab";

interface IButtonComponentProps {
  onClick: Function;
  variant?: ValidVariant;
  className?: string;
  children: React.ReactChild;
}

function ButtonComponent({
  onClick,
  className,
  children,
  variant,
  ...restProps
}: IButtonComponentProps) {
  return (
    <button
      className={`button button--${variant} ${className}`}
      onClick={() => onClick()}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...{ type: "button", ...restProps }}
    >
      {children}
    </button>
  );
}

ButtonComponent.defaultProps = {
  variant: "standard",
  className: "",
};

export default ButtonComponent;
