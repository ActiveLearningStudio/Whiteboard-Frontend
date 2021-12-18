import React from 'react';
import { Col } from 'antd';

import './content-header.scss';
import Button from '@sharedComponent/button';
import { appVariables } from '@constants/app-constants';

const ContentHeader = ({ title }) => {
	return (
		<Col xl={24} sm={24} xs={24} className="content_header_container">
			<span className="title">{title}</span>
			<Button type={appVariables.CREATE_INVOICE}>Create Invoice</Button>
		</Col>
	);
};

export default ContentHeader;
