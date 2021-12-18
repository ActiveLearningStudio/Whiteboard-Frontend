const GET_WHITEBOARD_BY_ID = 'GET_WHITEBOARD_BY_ID';
const GET_WHITEBOARD_BY_ID_SUCCESS = 'GET_WHITEBOARD_BY_ID_SUCCESS';
const GET_WHITEBOARD_BY_ID_ERROR = 'GET_WHITEBOARD_BY_ID_ERROR';
const GET_ALL_BOARDS = 'GET_ALL_BOARDS';
const GET_ALL_BOARDS_SUCCESS = 'GET_ALL_BOARDS_SUCCESS';
const GET_ALL_BOARDS_ERROR = 'GET_ALL_BOARDS_ERROR';
const CREATE_WHITEBOARD = 'CREATE_WHITEBOARD';
const CREATE_WHITEBOARD_SUCCESS = 'CREATE_WHITEBOARD_SUCCESS';
const CREATE_WHITEBOARD_ERROR = 'CREATE_WHITEBOARD_ERROR';
const DELETE_WHITEBOARD = 'DELETE_WHITEBOARD';
const DELETE_WHITEBOARD_SUCCESS = 'DELETE_WHITEBOARD_SUCCESS';
const DELETE_WHITEBOARD_ERROR = 'DELETE_WHITEBOARD_ERROR';

const getAllBoards = () => {
	return {
		type: GET_ALL_BOARDS,
	};
};

const getAllBoardsSuccess = (res) => {
	return {
		type: GET_ALL_BOARDS_SUCCESS,
		res,
	};
};

const getAllBoardsError = () => {
	return {
		type: GET_ALL_BOARDS_ERROR,
		payload: {},
	};
};
const deleteBoards = (boardId) => {
	return {
		type: DELETE_WHITEBOARD,
		boardId,
	};
};

const deleteBoardsSuccess = (res) => {
	return {
		type: DELETE_WHITEBOARD_SUCCESS,
		res,
	};
};

const deleteBoardsError = () => {
	return {
		type: DELETE_WHITEBOARD_ERROR,
	};
};
const getWhiteboardById = () => {
	return {
		type: GET_WHITEBOARD_BY_ID,
		payload: {},
	};
};

const getWhiteboardByIdSuccess = (res) => {
	return {
		type: GET_WHITEBOARD_BY_ID_SUCCESS,
		res,
	};
};

const getWhiteboardByIdError = () => {
	return {
		type: GET_WHITEBOARD_BY_ID_ERROR,
		payload: {},
	};
};
const createWhiteboard = (request, history) => {
	return {
		type: CREATE_WHITEBOARD,
		request,
		history,
	};
};
const createWhiteboardSuccess = () => {
	return {
		type: CREATE_WHITEBOARD_SUCCESS,
	};
};
const createWhiteboardError = () => {
	return {
		type: CREATE_WHITEBOARD_ERROR,
		payload: {},
	};
};

export default {
	types: {
		GET_WHITEBOARD_BY_ID,
		GET_WHITEBOARD_BY_ID_SUCCESS,
		GET_WHITEBOARD_BY_ID_ERROR,
		GET_ALL_BOARDS,
		GET_ALL_BOARDS_SUCCESS,
		GET_ALL_BOARDS_ERROR,
		CREATE_WHITEBOARD,
		CREATE_WHITEBOARD_SUCCESS,
		CREATE_WHITEBOARD_ERROR,
		DELETE_WHITEBOARD,
		DELETE_WHITEBOARD_ERROR,
		DELETE_WHITEBOARD_SUCCESS,
	},
	creators: {
		getWhiteboardById,
		getWhiteboardByIdSuccess,
		getWhiteboardByIdError,
		getAllBoards,
		getAllBoardsSuccess,
		getAllBoardsError,
		createWhiteboard,
		createWhiteboardSuccess,
		createWhiteboardError,
		deleteBoards,
		deleteBoardsSuccess,
		deleteBoardsError,
	},
};
