import { baseUrl } from '@constants/app-constants';
import { message } from 'antd';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import Actions from '../action';

export function* addContentSaga({ request }) {
	try {
		const uri = `${baseUrl}/boardContent/add`;
		yield call(axios.post, uri, request);
		yield put(Actions.creators.addContentSuccess());
	} catch (err) {
		// message.error('some thing Went Wrong');
		yield put(Actions.creators.addContentError());
	}
}

export function* clearContentSaga({ request }) {
	try {
		const uri = `${baseUrl}/boardContent/clearContent`;
		yield call(axios.post, uri, request);
		yield put(Actions.creators.clearContentSuccess());
	} catch (err) {
		// message.error('some thing Went Wrong');
		yield put(Actions.creators.clearContentError());
	}
}

export function* getBoardContentSaga({ boardId }) {
	try {
		const uri = `${baseUrl}/boardContent/${boardId}`;
		const {
			data: { data: { content = [] } = {} },
		} = yield call(axios.get, uri);
		yield put(Actions.creators.getWhiteboardContentByIdSuccess(content));
	} catch (err) {
		// console.log('getBoardContentSaga', err);
		message.error('some thing Went Wrong');
		yield put(Actions.creators.getWhiteboardContentByIdError());
	}
}

export function* getAllWhiteboardSaga({ boardId }) {
	try {
		const uri = `${baseUrl}/whiteboard/${boardId}`;
		const { data: { data } = {} } = yield call(axios.get, uri);
		yield put(Actions.creators.getWhiteboardByIdSuccess(data));
	} catch (err) {
		// message.error('some thing Went Wrong');
		yield put(Actions.creators.getWhiteboardByIdError());
	}
}

export function* getChatHistorySaga({ boardId }) {
	try {
		const uri = `${baseUrl}/chatHistory/${boardId}`;
		const { data: { data } = {} } = yield call(axios.get, uri);
		yield put(Actions.creators.getWhiteboardChatHistorySuccess(data));
	} catch (err) {
		// message.error('some thing Went Wrong');
		yield put(Actions.creators.getWhiteboardChatHistoryError());
	}
}

export function* getChatSearchResults({ boardId, searchKey }) {
	try {
		const uri = `${baseUrl}/chatHistory/${boardId}/${searchKey}`;
		const {
			data: {
				data: { result = [] },
			},
		} = yield call(axios.get, uri);
		// console.log('🚀 ~ file: mainboardSaga.js ~ line 69 ~ function*getChatSearchResults ~ data', result);

		yield put(Actions.creators.getSearchResultsSuccess(result));
	} catch (err) {
		message.error('some thing Went Wrong');
		yield put(Actions.creators.getSearchResultsError());
	}
}

export function* editWhiteboardSaga({ boardId, boardName }) {
	try {
		const uri = `${baseUrl}/whiteboard/update/${boardId}`;
		yield call(axios.put, uri, { boardName });
		yield put(Actions.creators.editWhiteboardNameSuccess(boardName));
		message.success('Board name successfully updated!!');
	} catch (err) {
		message.error('Some thing went wrong');
		yield put(Actions.creators.editWhiteboardNameError());
	}
}

export function* saveWhiteboardImageSaga({ boardId, image }) {
	try {
		const uri = `${baseUrl}/whiteboard/updateImage/${boardId}`;
		var formData = new FormData();
		formData.append('file', image);
		yield call(axios.put, uri, image);
		yield put(Actions.creators.saveWhiteboardImageSuccess());
	} catch (err) {
		message.error('Some thing went wrong');
		yield put(Actions.creators.saveWhiteboardImageError());
	}
}

export default function* watchIncrement() {
	// yield takeEvery(Actions.types.ADD_CONTENT, addContentSaga);
	yield takeEvery(Actions.types.GET_WHITEBOARD_BY_ID, getAllWhiteboardSaga);
	yield takeEvery(Actions.types.GET_WHITEBOARD_CHAT_HISTORY, getChatHistorySaga);
	yield takeEvery(Actions.types.GET_WHITEBOARD_CONTENT_BY_ID, getBoardContentSaga);
	yield takeEvery(Actions.types.EDIT_WHITEBOARD_NAME, editWhiteboardSaga);
	yield takeEvery(Actions.types.ADD_CONTENT, addContentSaga);
	yield takeEvery(Actions.types.CLEAR_CONTENT, clearContentSaga);
	yield takeEvery(Actions.types.SAVE_WHITEBOARD_IMAGE, saveWhiteboardImageSaga);
	yield takeEvery(Actions.types.GET_SEARCH_RESULTS, getChatSearchResults);
}
