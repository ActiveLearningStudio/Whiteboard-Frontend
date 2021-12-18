import { Avatar } from 'antd';
import React from 'react';
import TypingAnimation from '../TypingAnimation/TypingAnimation';

import './TypingMessage.scss';

const TypingMessage = ({ user }) => {
	return (
		<div className="message-item">
			<div className="message-avatar-container">
				<Avatar>{user.name}</Avatar>
				{/* <span>{user?.name}</span> */}
				{/* <img src={user.picture} alt={user.name} className={'message-avatar'}></img> */}
			</div>

			<TypingAnimation></TypingAnimation>
		</div>
	);
};

export default TypingMessage;
