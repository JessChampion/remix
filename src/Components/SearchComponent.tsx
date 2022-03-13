import { isEmpty } from "ramda";
import React, { forwardRef, useState } from "react";

import "./SearchComponent.scss";
import IconComponent from "./IconComponent";
import { handleKeyboardEvent, KEYS } from "../helpers";
import { TEMPLATE_APP } from "../templateStrings";

interface ISearchComponentProps {
  currentValue: string;
  doSearch: Function;
  doClear: Function;
  id: string;
  label: string;
  className?: string;
  inputRef: HTMLInputElement | null;
}

const SearchComponent = forwardRef<HTMLInputElement, ISearchComponentProps>(
  (
    { className, currentValue, doSearch, doClear, id, label, inputRef },
    ref
  ) => {
    const [hasText, setHasText] = useState(!isEmpty(currentValue));
    const handleSearch = () => {
      doSearch(inputRef?.value || "");
    };

    const onSearchOnEnter = handleKeyboardEvent(handleSearch, [KEYS.enter]);
    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasText(!isEmpty(event?.target?.value));
    };
    const onClear = () => {
      doClear();
      setHasText(false);
    };

    return (
      <div className={`search-form ${className}`}>
        <label className="search-form-search-box" htmlFor={id}>
          <span className="label">{label}</span>
          <input
            type="text"
            id={id}
            defaultValue={currentValue}
            onChange={onSearchChange}
            ref={ref}
            onKeyUp={onSearchOnEnter}
          />
          {hasText && (
            <button
              onClick={onClear}
              className="search-form-clear"
              type="button"
            >
              <IconComponent type="close" alt={TEMPLATE_APP.clearSearch} />
            </button>
          )}
        </label>
        <button
          type="submit"
          className="search-form-search"
          onClick={handleSearch}
        >
          <IconComponent type="search" alt={TEMPLATE_APP.search} />
        </button>
      </div>
    );
  }
);

SearchComponent.defaultProps = {
  className: "",
};

export default SearchComponent;
