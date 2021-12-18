import { createSelector } from 'reselect';
import { initState } from './reducer';

const appointmentListState = (state) => state.appointmentList || initState;
const allAppointmentList = createSelector(appointmentListState, (cnter) => cnter.allAppointmentList);

export default {
	appointmentListState,
	allAppointmentList,
};
