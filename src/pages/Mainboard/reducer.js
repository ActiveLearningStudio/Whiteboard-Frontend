import Actions from './action';

export const initState = {
	boardLoading: true,
	boardData: {},
	boardNameUpdating: false,
	shapes: [],
	boardContentLoading: true,
	boardContentAdding: false,
	saveWhiteboardImage: {
		saveWhiteboardImageLoading: false,
	},
	reduxMessages: [],
	reduxMessagesLoading: false,
	chatSearchData: { results: [], loading: true },
};

const boardReducer = (state = initState, action) => {
	switch (action.type) {
		case Actions.types.GET_WHITEBOARD_BY_ID: {
			return {
				...state,
				boardLoading: true,
			};
		}
		case Actions.types.GET_WHITEBOARD_BY_ID_SUCCESS: {
			return {
				...state,
				boardData: action.boardData,
				boardLoading: false,
			};
		}
		case Actions.types.GET_WHITEBOARD_BY_ID_ERROR: {
			return {
				...state,
				boardData: {},
				boardLoading: false,
			};
		}
		case Actions.types.GET_WHITEBOARD_BY_ID_RESET: {
			return {
				...state,
				boardData: {},
				boardLoading: true,
			};
		}
		case Actions.types.GET_SEARCH_RESULTS: {
			return {
				...state,
				chatSearchData: {
					...state.chatSearchData,
					loading: true,
				},
			};
		}
		case Actions.types.GET_SEARCH_RESULTS_SUCCESS: {
			return {
				...state,
				chatSearchData: {
					...state.chatSearchData,
					loading: false,
					results: action.chatSearchData,
				},
			};
		}
		case Actions.types.GET_SEARCH_RESULTS_ERROR: {
			return {
				...state,
				chatSearchData: {
					loading: false,
					results: [],
				},
			};
		}
		case Actions.types.GET_SEARCH_RESULTS_RESET: {
			return {
				...state,
				chatSearchData: {
					loading: false,
					results: [],
				},
			};
		}
		case Actions.types.GET_WHITEBOARD_CHAT_HISTORY: {
			return {
				...state,
				reduxMessagesLoading: true,
			};
		}
		case Actions.types.GET_WHITEBOARD_CHAT_HISTORY_SUCCESS: {
			return {
				...state,
				reduxMessages: action.reduxMessages,
				reduxMessagesLoading: false,
			};
		}
		case Actions.types.GET_WHITEBOARD_CHAT_HISTORY_ERROR: {
			return {
				...state,
				reduxMessages: [],
				reduxMessagesLoading: false,
			};
		}
		case Actions.types.GET_WHITEBOARD_CHAT_HISTORY_RESET: {
			return {
				...state,
				reduxMessages: [],
				reduxMessagesLoading: false,
			};
		}

		case Actions.types.SAVE_WHITEBOARD_IMAGE: {
			return {
				...state,
				saveWhiteboardImage: {
					...state.saveWhiteboardImage,
					saveWhiteboardImageLoading: true,
				},
			};
		}
		case Actions.types.SAVE_WHITEBOARD_IMAGE_SUCCESS: {
			return {
				...state,
				saveWhiteboardImage: {
					...state.saveWhiteboardImage,
					saveWhiteboardImageLoading: false,
				},
			};
		}
		case Actions.types.SAVE_WHITEBOARD_IMAGE_ERROR: {
			return {
				...state,
				saveWhiteboardImage: {
					...state.saveWhiteboardImage,
					saveWhiteboardImageLoading: false,
				},
			};
		}
		case Actions.types.SAVE_WHITEBOARD_IMAGE_RESET: {
			return {
				...state,
				saveWhiteboardImage: {
					...state.saveWhiteboardImage,
					saveWhiteboardImageLoading: false,
				},
			};
		}

		case Actions.types.GET_WHITEBOARD_CONTENT_BY_ID: {
			return {
				...state,
				boardContentLoading: true,
			};
		}
		case Actions.types.GET_WHITEBOARD_CONTENT_BY_ID_SUCCESS: {
			return {
				...state,
				boardContentLoading: false,
				shapes: action.content,
			};
		}
		case Actions.types.GET_WHITEBOARD_CONTENT_BY_ID_ERROR: {
			return {
				...state,
				boardContentLoading: false,
				shapes: [],
			};
		}
		case Actions.types.GET_WHITEBOARD_CONTENT_BY_ID_RESET: {
			return {
				...state,
				boardContentLoading: true,
				shapes: [],
			};
		}
		case Actions.types.ADD_CONTENT: {
			return {
				...state,
				boardContentAdding: true,
			};
		}
		case Actions.types.ADD_CONTENT_SUCCESS: {
			return {
				...state,
				boardContentAdding: false,
			};
		}
		case Actions.types.ADD_CONTENT_ERROR: {
			return {
				...state,
				boardContentAdding: false,
				shapes: [],
			};
		}
		case Actions.types.CLEAR_CONTENT: {
			return {
				...state,
				boardContentAdding: true,
			};
		}
		case Actions.types.CLEAR_CONTENT_SUCCESS: {
			return {
				...state,
				boardContentAdding: false,
				shapes: [],
			};
		}
		case Actions.types.CLEAR_CONTENT_ERROR: {
			return {
				...state,
				boardContentAdding: false,
			};
		}

		case Actions.types.EDIT_WHITEBOARD_NAME: {
			return {
				...state,
				boardNameUpdating: true,
			};
		}
		case Actions.types.EDIT_WHITEBOARD_NAME_SUCCESS: {
			return {
				...state,
				boardData: {
					...state.boardData,
					boardName: action.boardName,
				},
				boardNameUpdating: false,
			};
		}
		case Actions.types.EDIT_WHITEBOARD_NAME_ERROR: {
			return {
				...state,
				boardNameUpdating: false,
			};
		}

		default:
			return state;
	}
};

export default boardReducer;
