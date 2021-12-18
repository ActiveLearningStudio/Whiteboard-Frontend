import { all } from 'redux-saga/effects';
import appLoaderSaga from './appLoaderSaga';

export default function* rootSaga(action) {
	yield all([appLoaderSaga(action)]);
}
