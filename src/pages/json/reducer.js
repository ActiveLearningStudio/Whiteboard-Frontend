import Actions from './action';
export const initState = {
	appointmentList: [],
	allAppointmentListLoader: false
};

const counterReducer = (state = initState, action) => {
	switch (action.type) {
		case Actions.types.GET_ALL_APPOINMENT_LIST: {
			return {
				...state,
				allAppointmentListLoader: true,
			};
		}

		case Actions.types.GET_ALL_APPOINMENT_LIST_SUCCESS: {
			return {
				...state,
				allAppointmentList: action.res,
				allAppointmentListLoader: false,
			};
		}

		case Actions.types.GET_ALL_APPOINMENT_LIST_ERROR: {
			return {
				...state,
				allAppointmentListLoader: false,
			};
		}

		default:
			return state;
	}
};

export default counterReducer;
