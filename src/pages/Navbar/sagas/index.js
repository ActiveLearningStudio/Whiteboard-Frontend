import { all } from 'redux-saga/effects';
import incrementSaga from './incrementSaga';

export default function* rootSaga(action) {
	yield all([incrementSaga(action)]);
}
