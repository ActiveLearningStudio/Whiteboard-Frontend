/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { Upload, message as antMessage, Input } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import { IoCloseOutline } from 'react-icons/io5';
import TypingMessage from '@sharedComponent/TypingMessage/TypingMessage';
import { ALLOW_ARRAY_OF_FILES, baseUrl } from '@constants/app-constants';
import LottieComponent from '@sharedComponent/lottie-component';
import useTyping from 'src/socket/useTyping';
import LottieFile from 'src/assets/lottie-files';
import { debounceHandler, mockRequest } from 'src/utils/helpers';
import EmojiPicker from './EmojiPicker';
import ChatItem from './ChatItem';
import Image from '../../../assets/img/Image.svg';
import Send from '../../../assets/img/Send.svg';
import Selectors from '../selectors';
import Actions from '../action';
import 'emoji-mart/css/emoji-mart.css';
import './chatContent.scss';

function ChatContent({
	handleToggleStates,
	messages,
	user,
	typingUsers,
	sendMessage,
	startTypingMessage,
	stopTypingMessage,
	activeUsersList,
	chatSearchData = {},
	getSearchResults,
}) {
	const [message, setMessage] = useState('');
	const messagesEndRef = useRef(null);
	const [uploading, setUploading] = useState(false);
	const [showSearch, setShowSearch] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const {
		isTyping,
		startTyping,
		stopTyping,
		// cancelTyping
	} = useTyping();

	const { boardId } = useParams();

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	const showEmoji = (e) => {
		setShowEmojis(!showEmojis);
	};

	const addEmoji = (e) => {
		let emoji = e.native;
		setMessage(message + emoji);
		setShowEmojis(() => false);
	};

	// const closeMenu = (e) => {
	// 	if (emojiPicker !== null && !emojiPicker?.contains?.(e.target)) {
	// 		setShowEmojis(() => false);
	// 	}
	// };

	useEffect(() => {
		scrollToBottom();
	}, [messages, typingUsers]);

	useEffect(() => {
		if (isTyping) startTypingMessage();
		else stopTypingMessage();
	}, [isTyping]);

	const emitMessage = () => {
		if (message) {
			const { name, picture } = user;
			const messageTime = moment();
			sendMessage({ name, message, picture, messageTime, messageId: uuidv4() });
			setMessage('');
			stopTypingMessage();
		}
	};

	const emitFileUploadMessage = (file) => {
		const { name, picture } = user;
		const messageTime = moment();
		sendMessage({ name, message, picture, messageTime, file, messageId: uuidv4() });
	};

	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	const uploadImage = (file) => {
		setUploading(true);
		var formData = new FormData();
		formData.append('file', file);
		axios
			.put(`${baseUrl}/whiteboard/updateImage/${boardId}`, formData)
			.then((response) => {
				setUploading(false);
				// console.log('response', response?.data?.data);
				emitFileUploadMessage(response?.data?.data);
			})
			.catch((err) => {
				setUploading(false);
			});
	};

	const props = {
		name: 'file',
		accept: ALLOW_ARRAY_OF_FILES.join(),
		customRequest: mockRequest,
		onChange(info) {
			// var imageContent = new Image();
			// console.log('canvas, context', canvas, context);
			if (info.file.status !== 'uploading') {
				// console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				// console.log('info.file', info.file.originFileObj);
				uploadImage(info.file.originFileObj);
				// handleImage(info.file.originFileObj);
				// var reader = new FileReader(image);
				// var src = reader;
				// imageContent.src = 'https://images.pexels.com/photos/54283/pexels-photo-54283.jpeg';
				// context.drawImage(imageContent, 0, 0);
			} else if (info.file.status === 'error') {
				antMessage.error(`${info.file.name} file upload failed.`);
			}
		},
	};
	const onSearch = (value) => {
		// alert(value);
		value && getSearchResults(boardId, value);
	};

	return (
		<div className="chat-content">
			<div className="chat-header">
				<div className="closeText">
					<div className="chat__close">
						<IoCloseOutline className="closeIcon" onClick={() => handleToggleStates('chatVisible', false)} />
					</div>
					<div className="header__content">
						<h3>Team Flyerssoft</h3>
						{/* <p>Natasha, Ramesh, Nitin...13+</p> */}
						<p style={{ textAlign: 'left', width: '100%' }}>{activeUsersList}</p>
					</div>
				</div>
				{/* <div className="chat__search">
					<IoSearchOutline className="closeIcon" onClick={() => setShowSearch(true)} />
				</div> */}
				{showSearch && (
					<div className="chat_search_area">
						<div className="chat_search_area_input">
							<Input.Search loading={chatSearchData?.loading || false} onChange={(e) => debounceHandler(e.target.value, onSearch)} />
							<IoCloseOutline className="closeIcon" style={{ marginLeft: 10 }} onClick={() => setShowSearch(false)} />
						</div>
					</div>
				)}
			</div>
			<div className="chat__body">
				<div
					className="chat__area"
					style={{
						...(!messages?.length && { height: '100%' }),
					}}>
					{messages?.length ? (
						messages?.map(({ message: obj }, index) => {
							const { name, message, picture, messageTime, file = null } = obj;
							return (
								<ChatItem
									animationDelay={index + 2}
									key={index}
									{...{ name, message, picture, currentUser: user, messageTime, file }}
								/>
							);
						})
					) : (
						<LottieComponent file={LottieFile.GroupChat} />
					)}
				</div>
				<ul className="chat__typing_area">
					{uploading && (
						<div className="file_uploading">
							<LottieComponent file={LottieFile.Uploading} />
						</div>
					)}
					{typingUsers.map((user, i) => (
						<li key={messages.length + i}>
							<TypingMessage user={user}></TypingMessage>
						</li>
					))}
					<div ref={messagesEndRef} />
				</ul>
			</div>
			<div className="chat__footer">
				<EmojiPicker {...{ showEmojis, showEmoji, addEmoji }} />
				<div className="footer__icons">
					<Upload {...props}>
						<img src={Image} className="footer__image2" alt="Upload" />
					</Upload>
				</div>
				<div className="footer__input">
					<input
						value={message}
						placeholder="Type Something"
						onKeyPress={(e) => (e.key === 'Enter' ? emitMessage() : startTyping())}
						onKeyUp={stopTyping}
						onChange={(e) => handleChange(e, user)}
					/>
				</div>
				<div className="footer__send">{message && message.length > 3 && <img src={Send} onClick={emitMessage} alt="Send" />}</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		chatSearchData: Selectors.chatSearchData(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSearchResults: (boardId, searchKey) => dispatch(Actions.creators.getSearchResults(boardId, searchKey)),
	};
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(ChatContent);

export default Connected;
