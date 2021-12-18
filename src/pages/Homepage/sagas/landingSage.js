import { baseUrl } from '@constants/app-constants';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import Actions from '../action';

export function* getAllWhiteboardSaga(action) {
	try {
		const uri = `${baseUrl}/whiteboard/all`;
		let {
			data: { data = [] },
		} = yield call(axios.get, uri);
		data = data.filter((board) => board.boardName);

		// console.log('data...data', data);
		yield put(Actions.creators.getAllBoardsSuccess(data));
	} catch (err) {
		// message.error('some thing Went Wrong');
		yield put(Actions.creators.getAllBoardsError());
	}
}
export function* createWhiteboardSaga({ request, history }) {
	try {
		console.log('create saga', request);
		const uri = `${baseUrl}/whiteboard/add`;

		const res = yield call(axios.post, uri, request);
		// console.log('RES APPOINTM ::', res?.data?.data[0]?.id);
		const boardId = res?.data?.data[0]?.id;
		yield put(Actions.creators.createWhiteboardSuccess());
		// yield put(Actions.creators.getAllBoards());
		history.push({ pathname: `/whiteboard/${boardId}`, state: { newBoard: true } });
		// history.push(`${request.boardName}`);
	} catch (err) {
		yield put(Actions.creators.createWhiteboardError());
	}
}
export function* deleteWhiteboardSaga({ boardId }) {
	try {
		console.log('delete saga', boardId);
		const uri = `${baseUrl}/whiteboard/remove/${boardId}`;
		const res = yield call(axios.delete, uri);
		console.log('RES APPOINTM ::', res);
		yield put(Actions.creators.deleteBoardsSuccess());
		yield put(Actions.creators.getAllBoards());
	} catch (err) {
		yield put(Actions.creators.deleteBoardsError());
	}
}
export default function* watchIncrement() {
	yield takeEvery(Actions.types.GET_ALL_BOARDS, getAllWhiteboardSaga);
	yield takeEvery(Actions.types.CREATE_WHITEBOARD, createWhiteboardSaga);
	yield takeEvery(Actions.types.DELETE_WHITEBOARD, deleteWhiteboardSaga);
}
