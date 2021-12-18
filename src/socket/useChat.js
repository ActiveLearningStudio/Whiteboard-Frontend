import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { SocketEventType } from '@constants/app-constants';

// const USER_JOIN_CHAT_EVENT = 'USER_JOIN_CHAT_EVENT';
// const USER_LEAVE_CHAT_EVENT = 'USER_LEAVE_CHAT_EVENT';
// const NEW_CHAT_MESSAGE_EVENT = 'NEW_CHAT_MESSAGE_EVENT';

// const START_TYPING_MESSAGE_EVENT = 'START_TYPING_MESSAGE_EVENT';
// const STOP_TYPING_MESSAGE_EVENT = 'STOP_TYPING_MESSAGE_EVENT';
// const SOCKET_SERVER_URL = 'http://localhost:8000';

const useChat = (boardId = '', reduxMessages = [], handleSetState, arrayObjectsLayer = [], userDetails = {}, roomId = '') => {
	const [messages, setMessages] = useState([]);
	const [users] = useState([]);
	const [connectedUsers, setConnectedUsers] = useState({});
	const [cursorPoints, setCursorPoints] = useState({});
	const [typingUsers, setTypingUsers] = useState([]);
	const [user, setUser] = useState();
	const socketRef = useRef();

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get('https://api.randomuser.me/');
			const result = response.data.results[0];
			setUser({
				name: userDetails?.username || '',
				userId: userDetails?.user_id || '',
				picture: result.picture.thumbnail,
			});
		};
		fetchUser();
	}, [setUser, userDetails]);

	useEffect(() => {
		setMessages(reduxMessages);
	}, [reduxMessages]);

	// useEffect(() => {
	// 	const fetchUsers = async () => {
	// 		const response = await axios.get(`${SOCKET_SERVER_URL}/rooms/${roomId}/users`);
	// 		const result = response.data.users;
	// 		setUsers(result);
	// 	};
	// 	fetchUsers();
	// }, [roomId]);

	// useEffect(() => {
	// 	const fetchMessages = async () => {
	// 		const response = await axios.get(`${SOCKET_SERVER_URL}/rooms/${roomId}/messages`);
	// 		const result = response.data.messages;
	// 		setMessages(result);
	// 	};

	// 	fetchMessages();
	// }, [roomId]);

	useEffect(() => {
		if (!user) {
			return;
		}
		// socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
		// 	query: { roomId, name: user.name, picture: user.picture },
		// });
		socketRef.current = socketIOClient.connect(`${process.env.REACT_APP_API_URL}/?boardId=${boardId}`, {
			transports: ['websocket'],
		});

		socketRef.current.on('connect', () => {
			console.log('socket connected', socketRef.current);
		});
		socketRef.current.on('disconnect', () => {
			console.log('socket disconnected', socketRef.current);
		});

		// socketRef.current.on(USER_JOIN_CHAT_EVENT, (user) => {
		// 	if (user.id === socketRef.current.id) return;
		// 	setUsers((users) => [...users, user]);
		// });

		// socketRef.current.on(USER_LEAVE_CHAT_EVENT, (user) => {
		// 	setUsers((users) => users.filter((u) => u.id !== user.id));
		// });

		socketRef.current.on(
			`${SocketEventType.SERVER_UPDATE_MESSAGE}-${boardId}`,
			({ name, message, picture, messageTime, file = null, messageId }) => {
				// console.log('messageId', name, message, picture, messageTime, (file = null), messageId);
				const incomingMessage = { name, message, picture, messageTime, messageId, ...(file && { file }) };
				// console.log('name, message, picture, messageTime, file', name, message, picture, messageTime, file);
				setMessages((messages) => [...messages, { message: incomingMessage }]);
			}
		);

		socketRef.current.on(`${SocketEventType.SERVER_UPDATE_CLIENT_MESSAGE_STATUS}-${boardId}`, (typingInfo) => {
			if (typingInfo.senderId !== socketRef.current.id) {
				const user = typingInfo.user;
				setTypingUsers((users) => [...users, user]);
			}
		});

		socketRef.current.on(`${SocketEventType.SERVER_UPDATED_BOARD}-${boardId}`, ({ senderId, data }) => {
			// console.log('data updated board', data);
			if (senderId !== socketRef.current.id) {
				// let tArrayObjectsLayer = arrayObjectsLayer;
				// tArrayObjectsLayer.push(data);
				handleSetState({
					arrayObjectsLayer: data,
				});
			}
		});

		socketRef.current.on(`${SocketEventType.SERVER_UPDATE_CLIENT_STOP_TYPING_MESSAGE}-${boardId}`, (typingInfo) => {
			if (typingInfo.senderId !== socketRef.current.id) {
				const user = typingInfo.user;
				setTypingUsers((users) => users.filter((u) => u.name !== user.name));
			}
		});

		socketRef.current.on(SocketEventType.SERVER_ACTIVE_USERS, (connectedUserFromSocket) => {
			// console.log('activeUsers', connectedUserFromSocket);
			let lConnectedUsers = connectedUsers;
			lConnectedUsers[connectedUserFromSocket?.id] = connectedUserFromSocket;
			setConnectedUsers(lConnectedUsers);
			// if (typingInfo.senderId !== socketRef.current.id) {
			// 	const user = typingInfo.user;
			// 	setTypingUsers((users) => users.filter((u) => u.name !== user.name));
			// }
		});

		socketRef.current.on(`${SocketEventType.SERVER_USER_CONNECTED}-${boardId}`, (connectedUserFromSocket) => {
			// console.log('connectedUsers connectedUsers', connectedUserFromSocket);
			// let lConnectedUsers = connectedUsers;
			// lConnectedUsers[connectedUserFromSocket?.id] = connectedUserFromSocket;
			// setConnectedUsers(lConnectedUsers);
			// if (typingInfo.senderId !== socketRef.current.id) {
			// 	const user = typingInfo.user;
			// 	setTypingUsers((users) => users.filter((u) => u.name !== user.name));
			// }
		});

		socketRef.current.on(`${SocketEventType.SERVER_UPDATED_CURSOR}-${boardId}`, (cursorPointsData) => {
			if (cursorPointsData.senderId !== socketRef.current.id) {
				let lCursorPoints = cursorPoints;
				lCursorPoints[cursorPointsData?.senderId] = cursorPointsData;
				setCursorPoints({ ...lCursorPoints });
			}
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, [roomId, user]);

	const sendMessage = (body) => {
		if (!socketRef.current) return;
		socketRef.current.emit(`${SocketEventType.CLIENT_SEND_MESSAGE}-${boardId}`, body);
	};

	const startTypingMessage = useCallback(() => {
		if (!socketRef.current) return;
		socketRef.current.emit(`${SocketEventType.CLIENT_TYPING_MESSAGE}-${boardId}`, {
			senderId: socketRef.current.id,
			user,
		});
	}, [boardId, user]);

	const stopTypingMessage = useCallback(() => {
		if (!socketRef.current) return;
		socketRef.current.emit(`${SocketEventType.CLIENT_STOP_TYPING_MESSAGE}-${boardId}`, {
			senderId: socketRef.current.id,
			user,
		});
	}, [boardId, user]);

	const updateCursor = (position) => {
		if (!socketRef.current) return;
		socketRef.current.emit(`${SocketEventType.CLIENT_UPDATE_CURSOR}-${boardId}`, {
			senderId: socketRef.current.id,
			user,
			position,
		});
	};

	const updateBoardContent = (data) => {
		if (!socketRef.current) return;
		socketRef.current.emit(`${SocketEventType.CLIENT_UPDATE_BOARD}-${boardId}`, {
			senderId: socketRef.current.id,
			user,
			data,
		});
	};

	const activeUsersList = useMemo(() => {
		return Object.keys(cursorPoints || {})
			.map((key, index) => {
				return cursorPoints[key]?.user?.name || '';
			})
			.join(',');
	}, [cursorPoints]);

	// console.log('activeUsersList', activeUsersList);

	return {
		messages,
		user,
		users,
		typingUsers,
		connectedUsers,
		cursorPoints,
		activeUsersList,
		sendMessage,
		startTypingMessage,
		stopTypingMessage,
		updateCursor,
		updateBoardContent,
	};
};

export default useChat;
