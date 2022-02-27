import React from 'react';
import './InputSectionContainer.css';

function InputSectionContainer() {
  const isActive = true;

  return (
    <div className={`input-section ${isActive ? 'active' : ''}`}>
      input
    </div>
  );
}

export default InputSectionContainer;
