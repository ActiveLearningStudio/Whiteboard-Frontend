import { all } from 'redux-saga/effects';
import allAppoinmentSaga from './allAppoinmentSaga';

export default function* rootSaga(action) {
	yield all([allAppoinmentSaga(action)]);
}
