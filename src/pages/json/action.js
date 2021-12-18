const GET_ALL_APPOINMENT_LIST = 'GET_ALL_APPOINMENT_LIST';
const GET_ALL_APPOINMENT_LIST_SUCCESS = 'GET_ALL_APPOINMENT_LIST_SUCCESS';
const GET_ALL_APPOINMENT_LIST_ERROR = 'GET_ALL_APPOINMENT_LIST_ERROR';

const getAllAppoinmentListStart = () => {
	console.log('COMMING::');
	return {
		type: GET_ALL_APPOINMENT_LIST,
		payload: {},
	};
};

const getAllAppoinmentListSuccess = (res) => {
	return {
		type: GET_ALL_APPOINMENT_LIST_SUCCESS,
		res,
	};
};

const getAllAppoinmentListError = (err) => {
	return {
		type: GET_ALL_APPOINMENT_LIST_ERROR,
		err,
	};
};
export default {
	types: {
		GET_ALL_APPOINMENT_LIST,
		GET_ALL_APPOINMENT_LIST_SUCCESS,
		GET_ALL_APPOINMENT_LIST_ERROR
	},
	creators: {
		getAllAppoinmentListStart,
		getAllAppoinmentListSuccess,
		getAllAppoinmentListError
	},
};
