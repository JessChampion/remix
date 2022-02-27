import React from 'react';
import './OuputSectionContainer.css';

function OutputSectionContainer() {
  const isActive = true;

  return (
    <div className={`output-section ${isActive ? 'active' : ''}`}>
      output
    </div>
  );
}

export default OutputSectionContainer;
