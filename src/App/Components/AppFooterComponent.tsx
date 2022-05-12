import React from "react";
import "./AppFooterComponent.scss";
import { TEMPLATE_APP } from "../../templateStrings";

function AppFooterComponent({ logout }: { logout: Function }) {
  return (
    <div className="app-footer">
      <button
        type="button"
        onClick={() => logout()}
        className="app-footer-reset"
      >
        {TEMPLATE_APP.reset}
      </button>
      <div className="app-footer-copy">{TEMPLATE_APP.copy}</div>
    </div>
  );
}

export default AppFooterComponent;
