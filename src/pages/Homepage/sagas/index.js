import { all } from 'redux-saga/effects';
import landingSage from './landingSage';

export default function* rootSaga(action) {
	yield all([landingSage(action)]);
}
