const GET_USER_BY_ID = 'GET_USER_BY_ID';
const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
const GET_USER_BY_ID_ERROR = 'GET_USER_BY_ID_ERROR';

const getUserById = (userId) => {
	return {
		type: GET_USER_BY_ID,
		userId,
	};
};

const getUserByIdSuccess = (userDetails) => {
	return {
		type: GET_USER_BY_ID_SUCCESS,
		userDetails,
	};
};

const getUserByIdError = () => {
	return {
		type: GET_USER_BY_ID_ERROR,
		payload: {},
	};
};

export default {
	types: {
		GET_USER_BY_ID,
		GET_USER_BY_ID_SUCCESS,
		GET_USER_BY_ID_ERROR,
	},
	creators: {
		getUserById,
		getUserByIdSuccess,
		getUserByIdError,
	},
};
