import Actions from './action';
export const initState = {
	userLoading: true,
	userDetails: null,
	apiStatus: false,
	apiLoaded: false,
};

const appReducer = (state = initState, action) => {
	switch (action.type) {
		case Actions.types.GET_USER_BY_ID: {
			return {
				...state,
				userLoading: true,
			};
		}
		case Actions.types.GET_USER_BY_ID_SUCCESS: {
			return {
				...state,
				userLoading: false,
				userDetails: action.userDetails,
				apiStatus: true,
			};
		}
		case Actions.types.GET_USER_BY_ID_ERROR: {
			return {
				...state,
				userLoading: false,
				apiStatus: false,
			};
		}

		default:
			return state;
	}
};

export default appReducer;
