import Actions from './action';
export const initState = {
	whiteBoardDetails: [],
	boardList: [],
	boardListLoading: false,
	status: false,
	apiLoaded: false,
	boardSaving: false,
	deletingBoard: false,
};

const counterReducer = (state = initState, action) => {
	switch (action.type) {
		case Actions.types.CREATE_WHITEBOARD: {
			return {
				...state,
				boardSaving: true,
			};
		}
		case Actions.types.CREATE_WHITEBOARD_SUCCESS: {
			return {
				...state,
				boardSaving: false,
			};
		}
		case Actions.types.CREATE_WHITEBOARD_ERROR: {
			return {
				...state,
				boardSaving: false,
			};
		}

		case Actions.types.DELETE_WHITEBOARD: {
			return {
				...state,
				deletingBoard: true,
			};
		}
		case Actions.types.DELETE_WHITEBOARD_SUCCESS: {
			return {
				...state,
				deletingBoard: false,
			};
		}
		case Actions.types.DELETE_WHITEBOARD_ERROR: {
			return {
				...state,
				deletingBoard: false,
			};
		}

		case Actions.types.GET_ALL_BOARDS: {
			return {
				...state,
				boardListLoading: true,
			};
		}
		case Actions.types.GET_ALL_BOARDS_SUCCESS: {
			return {
				...state,
				boardList: action.res,
				boardListLoading: false,
			};
		}
		case Actions.types.GET_ALL_BOARDS_ERROR: {
			return {
				...state,
				boardListLoading: false,
			};
		}
		case Actions.types.SAVE_TASK_START: {
			return {
				...state,
				//currentVal: action.payload.currentVal,
			};
		}

		case Actions.types.GET_WHITEBOARD_BY_ID_SUCCESS: {
			return {
				...state,
				whiteBoardDetails: action.res,
			};
		}

		default:
			return state;
	}
};

export default counterReducer;
