import React from 'react';
import PropTypes from 'prop-types';

import './select.css';

const Select = ({ handleChange, options, value }) => (
  <div className="selectWrapper">
    <select onChange={handleChange} value={value}>
      {options.map(({ value, label }) =>
        <option key={value} value={value}>{label}</option>
      )}
    </select>
    <span className="selectText"></span>
  </div>
);


export default Select;
