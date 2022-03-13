import { isEmpty } from "ramda";
import React, { forwardRef, useState } from "react";

import "./TextFilterComponent.scss";
import IconComponent from "./IconComponent";
import { TEMPLATE_APP } from "../templateStrings";

interface ITextFilterComponentProps {
  currentValue: string;
  doFilter: Function;
  doClear: Function;
  id: string;
  className?: string;
  children: {
    label: React.ReactChild;
  };
}

const TextFilterComponent = forwardRef<
  HTMLInputElement,
  ITextFilterComponentProps
>(({ className, currentValue, doFilter, doClear, id, children }, ref) => {
  const { label } = children;
  const [hasText, setHasText] = useState(!isEmpty(currentValue));

  const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    doFilter(value);
    setHasText(!isEmpty(value));
  };

  const onClear = () => {
    doClear();
    setHasText(false);
  };

  return (
    <div className={`text-filter ${className}`}>
      <label className="text-filter-text-box" htmlFor={id}>
        {label}
        <input
          type="text"
          id={id}
          defaultValue={currentValue}
          onChange={onFilterChange}
          ref={ref}
        />
        {hasText && (
          <button onClick={onClear} className="text-filter-clear" type="button">
            <IconComponent type="close" alt={TEMPLATE_APP.clearFilter} />
          </button>
        )}
      </label>
    </div>
  );
});

TextFilterComponent.defaultProps = {
  className: "",
};

export default TextFilterComponent;
