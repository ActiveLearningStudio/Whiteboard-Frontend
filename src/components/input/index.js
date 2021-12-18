import React from 'react';
import './input.scss';

const InputComponent = ({ placeholder = '', ...rest }) => {
	return <input className="flyers_input" {...{ placeholder, ...rest }} />;
};

export default InputComponent;
