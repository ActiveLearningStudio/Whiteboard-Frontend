import { all } from 'redux-saga/effects';
import mainBoardSaga from './mainboardSaga';

export default function* rootSaga(action) {
	yield all([mainBoardSaga(action)]);
}
