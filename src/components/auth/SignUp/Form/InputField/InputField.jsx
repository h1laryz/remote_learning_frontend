import React from 'react';
import './InputField.css';

const InputField = ({ label, required, children }) => {
  return (
    <div className="input-field">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
    </div>
  );
};

export default InputField;