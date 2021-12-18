import {  put, takeEvery } from 'redux-saga/effects';
import Actions from '../action';

export function* incrementCounter(action) {
	const currentVal = action.payload.currentVal;
	const incremtedVal = currentVal + 1;
	yield put(Actions.creators.incrementCompleted(incremtedVal));
}

export default function* watchIncrement(actions) {
	yield takeEvery(Actions.types.INCREMENT_COUNTER, incrementCounter);
}
