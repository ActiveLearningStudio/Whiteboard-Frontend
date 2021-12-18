import { connect } from 'react-redux';
import moment from 'moment';
import Selectors from '../selectors';
import Actions from '../action';
import Presentational from './presentational';

import React, { useEffect } from 'react';
import { useState } from 'react';

const FunctionalComponent = ({ counterVal, allAppointmentList, getAllAppoinmentListStarted, getTaskListSuccessed, getTaskListError, saveTaskStarted }) => {
	const [events, setEvents] = useState([])
	useEffect(() => {
		getAllAppoinmentListStarted();
	}, []);
	useEffect(() => {
		if (allAppointmentList) {
			let events = allAppointmentList.entry.map((aa, i) => {
				return {
					id: i + 1,
					color: '#fd3153',
					from: moment(aa.resource.start).format(),
					to: aa.resource.end,
					title: 'This is an event'
				}
			})
			setEvents(events);
		}
	}, [allAppointmentList]);
	console.log('INDEX ::', allAppointmentList);
	return <Presentational allAppointmentList={allAppointmentList} events={events} />;
};

const mapStateToProps = (state) => {
	return {
		allAppointmentList: Selectors.allAppointmentList(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllAppoinmentListStarted: () => dispatch(Actions.creators.getAllAppoinmentListStart())
	};
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(FunctionalComponent);

export default Connected;
