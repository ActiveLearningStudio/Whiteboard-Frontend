import React, { Fragment } from 'react';
// import { Button } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';
// import { appVariables } from '@constants/app-constants';
import './button.scss';

const ButtonComponent = ({
	btnType,
	type = 'primary',
	children,
	onPress,
	onClick,
	disabled = false,
	loading = false,
	icon = null,
	style = {},
	noShadow = false,
	className = '',
}) => {
	const renderButton = () => (
		<button
			type={btnType}
			onClick={onClick}
			className={`${className} flyers_button ${type} ${loading ? 'loading disablebutton' : ''} ${noShadow ? 'noShadow' : ''}`}
			disabled={disabled}
			style={style}>
			{!loading ? (
				<>
					{icon ? <div style={{ marginRight: 5 }}> {icon} </div> : null}
					{children}
				</>
			) : (
				<span className="loader" />
			)}
		</button>
	);

	return <Fragment>{renderButton()}</Fragment>;
};

export default ButtonComponent;
