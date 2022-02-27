import React from 'react';
import './AppFooterComponent.css';
import { template_main } from '../templateStrings';

function AppFooterComponent() {
  return (
    <div className="app-footer">
      <div className="app-footer-copy">
        {template_main.copy}
      </div>
    </div>
  );
}

export default AppFooterComponent;
