import React from 'react';
import { Avatar, Image } from 'antd';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { downloadImage, getFileNameFromURL } from 'src/utils/helpers';
import { ARRAY_OF_FILES, ARRAY_OF_IMAGE_FILES } from '@constants/app-constants';

const FileDisplayDownload = ({ file = {} }) => {
	const fileName = getFileNameFromURL(file?.fileUrl);
	const [name, type] = fileName.split('.');
	return (
		<div className="file_style">
			<div className="file_name">{fileName}</div>
			<div className="file_download" onClick={(e) => file?.fileUrl && downloadImage(e, file, name, type)}>
				Download
			</div>
		</div>
	);
};

function ChatItem({ name, message, picture = '', currentUser = {}, messageTime = '', file = null }) {
	const isSelf = currentUser?.name === name;

	const renderFile = (file) => {
		if (ARRAY_OF_IMAGE_FILES.includes(`.${file?.fileType}`)) {
			return <Image src={file?.fileUrl} width={'100%'} style={{ width: '-webkit-fill-available' }} />;
		} else if (ARRAY_OF_FILES.includes(`.${file?.fileType}`)) {
			return <FileDisplayDownload {...{ file }} />;
		}
	};

	return (
		<div className="chat_item_container">
			<div className={`${isSelf ? 'me' : ''} chat__item`}>
				<div className="chat__iconleft">
					<Avatar>{name.charAt(0)}</Avatar>
				</div>
				<div className="chat__receiver">
					<div className="chat_name">{name}</div>
					<div className="chat__msg">
						<CopyToClipboard text={message}>
							<span>{message}</span>
						</CopyToClipboard>
					</div>
					{file && renderFile(file)}
					<div className="chat__meta">
						<span>{moment(messageTime).fromNow()}</span>
						{/* <span>Seen 1.03PM</span> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChatItem;
