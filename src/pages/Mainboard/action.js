const GET_WHITEBOARD_BY_ID = 'GET_WHITEBOARD_BY_ID';
const GET_WHITEBOARD_BY_ID_SUCCESS = 'GET_WHITEBOARD_BY_ID_SUCCESS';
const GET_WHITEBOARD_BY_ID_ERROR = 'GET_WHITEBOARD_BY_ID_ERROR';
const GET_WHITEBOARD_BY_ID_RESET = 'GET_WHITEBOARD_BY_ID_RESET';
const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const GET_SEARCH_RESULTS_SUCCESS = 'GET_SEARCH_RESULTS_SUCCESS';
const GET_SEARCH_RESULTS_ERROR = 'GET_SEARCH_RESULTS_ERROR';
const GET_SEARCH_RESULTS_RESET = 'GET_SEARCH_RESULTS_RESET';
const GET_WHITEBOARD_CHAT_HISTORY = 'GET_WHITEBOARD_CHAT_HISTORY';
const GET_WHITEBOARD_CHAT_HISTORY_SUCCESS = 'GET_WHITEBOARD_CHAT_HISTORY_SUCCESS';
const GET_WHITEBOARD_CHAT_HISTORY_ERROR = 'GET_WHITEBOARD_CHAT_HISTORY_ERROR';
const GET_WHITEBOARD_CHAT_HISTORY_RESET = 'GET_WHITEBOARD_CHAT_HISTORY_RESET';
const SAVE_WHITEBOARD_IMAGE = 'SAVE_WHITEBOARD_IMAGE';
const SAVE_WHITEBOARD_IMAGE_SUCCESS = 'SAVE_WHITEBOARD_IMAGE_SUCCESS';
const SAVE_WHITEBOARD_IMAGE_ERROR = 'SAVE_WHITEBOARD_IMAGE_ERROR';
const SAVE_WHITEBOARD_IMAGE_RESET = 'SAVE_WHITEBOARD_IMAGE_RESET';
const GET_WHITEBOARD_CONTENT_BY_ID = 'GET_WHITEBOARD_CONTENT_BY_ID';
const GET_WHITEBOARD_CONTENT_BY_ID_SUCCESS = 'GET_WHITEBOARD_CONTENT_BY_ID_SUCCESS';
const GET_WHITEBOARD_CONTENT_BY_ID_ERROR = 'GET_WHITEBOARD_CONTENT_BY_ID_ERROR';
const GET_WHITEBOARD_CONTENT_BY_ID_RESET = 'GET_WHITEBOARD_CONTENT_BY_ID_RESET';
const EDIT_WHITEBOARD_NAME = 'EDIT_WHITEBOARD_NAME';
const EDIT_WHITEBOARD_NAME_SUCCESS = 'EDIT_WHITEBOARD_NAME_SUCCESS';
const EDIT_WHITEBOARD_NAME_ERROR = 'EDIT_WHITEBOARD_NAME_ERROR';
const SET_SHAPES = 'SET_SHAPES';
const ADD_CONTENT = 'ADD_CONTENT';
const ADD_CONTENT_SUCCESS = 'ADD_CONTENT_SUCCESS';
const ADD_CONTENT_ERROR = 'ADD_CONTENT_ERROR';
const CLEAR_CONTENT = 'CLEAR_CONTENT';
const CLEAR_CONTENT_SUCCESS = 'CLEAR_CONTENT_SUCCESS';
const CLEAR_CONTENT_ERROR = 'CLEAR_CONTENT_ERROR';

const setShape = (elements) => {
	return {
		type: SET_SHAPES,
		elements,
	};
};

const getWhiteboardById = (boardId) => {
	return {
		type: GET_WHITEBOARD_BY_ID,
		boardId,
	};
};

const getWhiteboardByIdSuccess = (boardData) => {
	return {
		type: GET_WHITEBOARD_BY_ID_SUCCESS,
		boardData,
	};
};

const getWhiteboardByIdError = () => {
	return {
		type: GET_WHITEBOARD_BY_ID_ERROR,
	};
};

const getWhiteboardByIdReset = () => {
	return {
		type: GET_WHITEBOARD_BY_ID_RESET,
	};
};
const getSearchResults = (boardId, searchKey) => {
	return {
		type: GET_SEARCH_RESULTS,
		boardId,
		searchKey,
	};
};

const getSearchResultsSuccess = (chatSearchData) => {
	return {
		type: GET_SEARCH_RESULTS_SUCCESS,
		chatSearchData,
	};
};

const getSearchResultsError = () => {
	return {
		type: GET_SEARCH_RESULTS_ERROR,
	};
};

const getSearchResultsReset = () => {
	return {
		type: GET_SEARCH_RESULTS_RESET,
	};
};

const getWhiteboardChatHistory = (boardId) => {
	return {
		type: GET_WHITEBOARD_CHAT_HISTORY,
		boardId,
	};
};

const getWhiteboardChatHistorySuccess = (reduxMessages) => {
	return {
		type: GET_WHITEBOARD_CHAT_HISTORY_SUCCESS,
		reduxMessages,
	};
};

const getWhiteboardChatHistoryError = () => {
	return {
		type: GET_WHITEBOARD_CHAT_HISTORY_ERROR,
	};
};

const getWhiteboardChatHistoryReset = () => {
	return {
		type: GET_WHITEBOARD_CHAT_HISTORY_RESET,
	};
};

const saveWhiteboardImage = ({ boardId, image }) => {
	return {
		type: SAVE_WHITEBOARD_IMAGE,
		boardId,
		image,
	};
};
const saveWhiteboardImageSuccess = (boardData) => {
	return {
		type: SAVE_WHITEBOARD_IMAGE_SUCCESS,
		boardData,
	};
};
const saveWhiteboardImageError = () => {
	return {
		type: SAVE_WHITEBOARD_IMAGE_ERROR,
	};
};
const saveWhiteboardImageReset = () => {
	return {
		type: SAVE_WHITEBOARD_IMAGE_RESET,
	};
};

const getWhiteboardContentById = (boardId) => {
	return {
		type: GET_WHITEBOARD_CONTENT_BY_ID,
		boardId,
	};
};

const getWhiteboardContentByIdSuccess = (content) => {
	return {
		type: GET_WHITEBOARD_CONTENT_BY_ID_SUCCESS,
		content,
	};
};

const getWhiteboardContentByIdError = () => {
	return {
		type: GET_WHITEBOARD_CONTENT_BY_ID_ERROR,
	};
};

const getWhiteboardContentByIdReset = () => {
	return {
		type: GET_WHITEBOARD_CONTENT_BY_ID_RESET,
	};
};

const editWhiteboardName = (boardId, boardName) => {
	return {
		type: EDIT_WHITEBOARD_NAME,
		boardId,
		boardName,
	};
};

const editWhiteboardNameSuccess = (boardName) => {
	return {
		type: EDIT_WHITEBOARD_NAME_SUCCESS,
		boardName,
	};
};

const editWhiteboardNameError = () => {
	return {
		type: EDIT_WHITEBOARD_NAME_ERROR,
	};
};
const addContent = (request) => {
	return {
		type: ADD_CONTENT,
		request,
	};
};
const addContentSuccess = (request) => {
	return {
		type: ADD_CONTENT_SUCCESS,
	};
};
const addContentError = (request) => {
	return {
		type: ADD_CONTENT_ERROR,
	};
};
const clearContent = (request) => {
	return {
		type: CLEAR_CONTENT,
		request,
	};
};
const clearContentSuccess = (request) => {
	return {
		type: CLEAR_CONTENT_SUCCESS,
	};
};
const clearContentError = (request) => {
	return {
		type: CLEAR_CONTENT_ERROR,
	};
};
export default {
	types: {
		GET_WHITEBOARD_BY_ID,
		GET_WHITEBOARD_BY_ID_SUCCESS,
		GET_WHITEBOARD_BY_ID_ERROR,
		GET_WHITEBOARD_BY_ID_RESET,
		GET_SEARCH_RESULTS,
		GET_SEARCH_RESULTS_SUCCESS,
		GET_SEARCH_RESULTS_ERROR,
		GET_SEARCH_RESULTS_RESET,
		GET_WHITEBOARD_CHAT_HISTORY,
		GET_WHITEBOARD_CHAT_HISTORY_SUCCESS,
		GET_WHITEBOARD_CHAT_HISTORY_ERROR,
		GET_WHITEBOARD_CHAT_HISTORY_RESET,
		EDIT_WHITEBOARD_NAME,
		EDIT_WHITEBOARD_NAME_SUCCESS,
		EDIT_WHITEBOARD_NAME_ERROR,
		SET_SHAPES,
		ADD_CONTENT,
		ADD_CONTENT_SUCCESS,
		ADD_CONTENT_ERROR,
		GET_WHITEBOARD_CONTENT_BY_ID,
		GET_WHITEBOARD_CONTENT_BY_ID_SUCCESS,
		GET_WHITEBOARD_CONTENT_BY_ID_ERROR,
		GET_WHITEBOARD_CONTENT_BY_ID_RESET,
		SAVE_WHITEBOARD_IMAGE,
		SAVE_WHITEBOARD_IMAGE_SUCCESS,
		SAVE_WHITEBOARD_IMAGE_ERROR,
		SAVE_WHITEBOARD_IMAGE_RESET,
		CLEAR_CONTENT,
		CLEAR_CONTENT_ERROR,
		CLEAR_CONTENT_SUCCESS,
	},
	creators: {
		getWhiteboardById,
		getWhiteboardByIdSuccess,
		getWhiteboardByIdError,
		getWhiteboardByIdReset,
		getSearchResults,
		getSearchResultsSuccess,
		getSearchResultsError,
		getSearchResultsReset,
		getWhiteboardChatHistory,
		getWhiteboardChatHistorySuccess,
		getWhiteboardChatHistoryError,
		getWhiteboardChatHistoryReset,
		editWhiteboardName,
		editWhiteboardNameSuccess,
		editWhiteboardNameError,
		setShape,
		addContent,
		addContentSuccess,
		addContentError,
		clearContent,
		clearContentSuccess,
		clearContentError,
		getWhiteboardContentById,
		getWhiteboardContentByIdSuccess,
		getWhiteboardContentByIdError,
		getWhiteboardContentByIdReset,
		saveWhiteboardImage,
		saveWhiteboardImageSuccess,
		saveWhiteboardImageError,
		saveWhiteboardImageReset,
	},
};
