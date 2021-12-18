import Actions from './action';
export const initState = {
	counterVal: 0,
	currentVal: 0,
};

const counterReducer = (state = initState, action) => {
	switch (action.type) {
		case Actions.types.SAVE_TASK_START: {
			return {
				...state,
				//currentVal: action.payload.currentVal,
			};
		}

		case Actions.types.INCREMENT_COUNTER_COMPLETED: {
			return {
				...state,
				counterVal: action.payload.incrementedVal,
			};
		}

		default:
			return state;
	}
};

export default counterReducer;
