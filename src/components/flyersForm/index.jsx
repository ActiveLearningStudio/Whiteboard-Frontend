import React from 'react';
import './flyers-form.scss';

const FlyersForm = ({ children, onSubmit, className }) => {
	const onFormFinish = (evt) => {
		evt.preventDefault();
		const formObj = {};
		for (let eleNum = 0; eleNum < evt.target.length; eleNum++) {
			if (evt.target[eleNum].name) {
				formObj[evt.target[eleNum].name] = evt.target[eleNum].value;
			}
		}
		onSubmit(formObj);
	}
	return (
		<form onSubmit={(evt) => onFormFinish(evt)} className={className ? className : 'flyers-default-form'}>
			{children}
		</form>
	);
};

export default FlyersForm;
