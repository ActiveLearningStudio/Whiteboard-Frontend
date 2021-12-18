import React from 'react';
import { TimelineLite, gsap, Power3 } from 'gsap';
import { Col, Row } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, DiffOutlined, DownOutlined } from '@ant-design/icons';
import Calendar from 'react-awesome-calendar';
import moment from 'moment';
import './style.scss';
// import { images } from 'src/assets/img';

const Presentational = (props) => {
	return (
		<Row>
			<Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ backgroundColor: '#fff', padding: '15px' }}>
				<h1 style={{ fontSize: '14px', color: '#1D2A31' }}>JSON</h1>
				{JSON.stringify(props.allAppointmentList)}
				{/* {JSON.stringify(JSON.parse(props.allAppointmentList), null, 2)} */}
				{/* {JSON.parse(props.allAppointmentList)} */}
			</Col>
		</Row>
	);
};

export default Presentational;
