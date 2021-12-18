// export const baseUrl = 'https://flyerskit-api-d.azurewebsites.net';
export const baseUrl = `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_VERSION}`;

export const notificationStrings = {
	success: 'success',
	info: 'info',
	warning: 'warning',
	error: 'error',
};

export const appVariables = {
	CREATE_INVOICE: 'CREATE_INVOICE',
};

export const LOCAL_STORAGE_VARIABLES = {
	USER_PROFILE: 'USER_PROFILE',
};

export const apiUrl = {
	GET_TASK_API: '/api/Task/get-task',
};

// SOCKET EVENTS
export const SocketEventType = {
	//connection events
	SERVER_USER_CONNECTED: 'SERVER_USER_CONNECTED',
	SERVER_USER_DISCONNECTED: 'SERVER_USER_DISCONNECTED',

	//user status events
	SERVER_ACTIVE_USERS: 'SERVER_ACTIVE_USERS', // self listening event
	SERVER_UPDATE_USER_STATUS: 'SERVER_UPDATE_USER_STATUS',
	CLIENT_USER_STATUS: 'CLIENT_USER_STATUS',

	// content events
	CLIENT_UPDATE_BOARD: 'CLIENT_UPDATE_BOARD',
	SERVER_UPDATED_BOARD: 'SERVER_UPDATED_BOARD',

	// cursor events
	CLIENT_UPDATE_CURSOR: 'CLIENT_UPDATE_CURSOR',
	SERVER_UPDATED_CURSOR: 'SERVER_UPDATED_CURSOR',

	//chat events

	CLIENT_SEND_MESSAGE: 'CLIENT_SEND_MESSAGE',
	SERVER_UPDATE_MESSAGE: 'SERVER_UPDATE_MESSAGE',

	CLIENT_TYPING_MESSAGE: 'CLIENT_TYPING_MESSAGE',
	SERVER_UPDATE_CLIENT_MESSAGE_STATUS: 'SERVER_UPDATE_CLIENT_MESSAGE_STATUS',

	CLIENT_STOP_TYPING_MESSAGE: 'CLIENT_STOP_TYPING_MESSAGE',
	SERVER_UPDATE_CLIENT_STOP_TYPING_MESSAGE: 'SERVER_UPDATE_CLIENT_STOP_TYPING_MESSAGE',

	CLIENT_UPLOAD_IMAGE: 'CLIENT_UPLOAD_IMAGE',
	SERVER_UPDATE_IMAGE_STATUS: 'SERVER_UPDATE_IMAGE_STATUS',
};

//
// ─── EMITTER KEYS ───────────────────────────────────────────────────────────────
//
export const EMITTER_KEYS = {
	DOWNLOAD_CANVAS: 'DOWNLOAD_CANVAS',
	IMPORT_JSON: 'IMPORT_JSON',
};
export const MENU_KEYS = [
	{
		value: 'png',
		name: 'PNG',
	},
	{
		value: 'jpg',
		name: 'JPG',
	},
	{
		value: 'pdf',
		name: 'PDF',
	},
	// {
	// 	value: 'json',
	// 	name: 'JSON',
	// },
];

export const ALLOW_ARRAY_OF_FILES = ['.png', '.jpg', '.xlsx', '.ppt', '.pdf'];
export const ARRAY_OF_FILES = ['.xlsx', '.ppt', '.pdf'];
export const ARRAY_OF_IMAGE_FILES = ['.png', '.jpg'];
