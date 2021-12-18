import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import Actions from '../action';
import appointmentList from './mockAppointment';

export function* getAllAppointmentListSaga(action) {
	try {
		const uri = `http://18.223.244.19:9101/Epic/Appointment`;
		console.log('SAGA ::', appointmentList);
		const res = yield call(axios.get, uri);
		// console.log('RES APPOINTM ::', res);
		yield put(Actions.creators.getAllAppoinmentListSuccess(res.data));
	} catch (err) {
		// message.error('some thing Went Wrong');
		yield put(Actions.creators.getAllAppoinmentListError(err));
	}
}

export default function* watchIncrement(actions) {
	yield takeEvery(Actions.types.GET_ALL_APPOINMENT_LIST, getAllAppointmentListSaga);
}
