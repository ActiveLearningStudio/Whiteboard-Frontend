import React from 'react';
import { Col } from 'antd';

import './card.scss';

const Card = () => {
	return (
		<Col xl={6} sm={24} xs={24} className="card_container">
			<Col className="card" />
		</Col>
	);
};

export default Card;
