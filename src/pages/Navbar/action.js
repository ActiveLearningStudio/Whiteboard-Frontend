const GET_TASK_LIST = 'GET_TASK_LIST';
const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
const GET_TASK_ERROR = 'GET_TASK_ERROR';
const SAVE_TASK_START = 'SAVE_TASK_START';
const SAVE_TASK_SUCCESS = 'SAVE_TASK_SUCCESS';
const SAVE_TASK_ERROR = 'SAVE_TASK_ERROR';
const UPDATE_TASK_START = 'UPDATE_TASK_START';
const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';

const getTaskListStart = () => {
	return {
		type: GET_TASK_LIST,
		payload: {},
	};
};

const getTaskListSuccess = () => {
	return {
		type: GET_TASK_SUCCESS,
		payload: {},
	};
};

const getTaskListError = () => {
	return {
		type: GET_TASK_ERROR,
		payload: {},
	};
};
const saveTaskStart = (vals) => {
	return {
		type: SAVE_TASK_START,
		payload: {
			vals,
		},
	};
};

const saveTaskSuccess = () => {
	return {
		type: SAVE_TASK_SUCCESS,
		payload: {},
	};
};

const saveTaskError = () => {
	return {
		type: SAVE_TASK_ERROR,
		payload: {},
	};
};
const updateTaskListStart = () => {
	return {
		type: UPDATE_TASK_START,
		payload: {},
	};
};

const updateTaskListSuccess = () => {
	return {
		type: UPDATE_TASK_SUCCESS,
		payload: {},
	};
};

const updateTaskListError = () => {
	return {
		type: UPDATE_TASK_ERROR,
		payload: {},
	};
};

export default {
	types: {
		GET_TASK_LIST,
		GET_TASK_SUCCESS,
		GET_TASK_ERROR,
		SAVE_TASK_START,
		SAVE_TASK_SUCCESS,
		SAVE_TASK_ERROR,
		UPDATE_TASK_START,
		UPDATE_TASK_SUCCESS,
		UPDATE_TASK_ERROR,
	},
	creators: {
		getTaskListStart,
		getTaskListSuccess,
		getTaskListError,
		saveTaskStart,
		saveTaskSuccess,
		saveTaskError,
		updateTaskListError,
		updateTaskListSuccess,
		updateTaskListStart,
	},
};
