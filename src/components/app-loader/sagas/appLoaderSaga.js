import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import { baseUrl } from '@constants/app-constants';
import Actions from '../action';

export function* getUserByIdSaga({ userId }) {
	try {
		const uri = `${baseUrl}/user/get-user/${userId}`;
		let {
			data: { data = {} },
		} = yield call(axios.get, uri);

		yield put(Actions.creators.getUserByIdSuccess(data));
	} catch (err) {
		message.error('some thing Went Wrong');
		yield put(Actions.creators.getUserByIdError());
	}
}
export default function* watchIncrement() {
	yield takeEvery(Actions.types.GET_USER_BY_ID, getUserByIdSaga);
}
