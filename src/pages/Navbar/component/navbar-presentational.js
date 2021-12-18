import React, { useState, useRef, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import {
	Menu,
	Dropdown,
	Space,
	//  message, Divider,
	Spin,
	//    Upload, Modal, Button
} from 'antd';
import {
	LoadingOutlined,
	ExportOutlined,
	// DownOutlined, ImportOutlined, UploadOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import Yellow from '../../../assets/img/yellow.svg';
// import Notification from '../../../assets/img/Notification.svg';
// import Avathar from '../../../assets/img/Profile 1.png';
// import Globe from '../../../assets/img/Globe.svg';
// import Link from '../../../assets/img/Link.svg';
// import axios from 'axios';
import { EMITTER_KEYS, MENU_KEYS } from '@constants/app-constants';
import Actions from '@pages/Mainboard/action';
import AppEmitter from 'src/utils/emitter';
import './style.scss';
// import { getQueryVariable } from 'src/utils/helpers';

const MENUS = MENU_KEYS.map(({ value, name }) => {
	return (
		<Menu.Item key={value} {...{ name }} icon={<ExportOutlined />}>
			{name}
		</Menu.Item>
	);
});

function Navbar({ userDetails }) {
	// const [modal, setModal] = useState(false);
	const inputRef = useRef(null);
	const antIcon = <LoadingOutlined style={{ fontSize: 18 }} spin />;

	const boardData = useSelector((state) => state?.mainBoardState?.boardData);
	const boardNameUpdating = useSelector((state) => state?.mainBoardState?.boardNameUpdating || false);

	const dispatch = useDispatch();
	// const [userDet, setUserDet] = useState();

	// const location = useLocation();

	const [boardName, setBoardName] = useState(boardData?.boardName || 'untitled');

	const whiteBoardName = boardData?.boardName;

	useEffect(() => {
		setBoardName(whiteBoardName);
	}, [whiteBoardName, setBoardName]);

	// const history = useHistory();

	const handleSave = (boardName) => {
		if (boardName !== boardData?.boardName) {
			inputRef.current.blur();
			dispatch(Actions.creators.editWhiteboardName(boardData?.boardId, boardName));
		}
	};

	// const handleChange = () => {
	// 	history.push('/');
	// };

	function handleMenuClick(e) {
		AppEmitter.emit(EMITTER_KEYS.DOWNLOAD_CANVAS, e.key, boardData?.boardName);
	}

	const menu = <Menu onClick={handleMenuClick}>{MENUS}</Menu>;

	// const menu1 = (
	// 	<Menu onClick={handleMenuClick}>
	// 		<Menu.Item key="1">Everyone</Menu.Item>
	// 		<Menu.Item key="2">Owner</Menu.Item>
	// 	</Menu>
	// );

	// const menu2 = (
	// 	<Menu onClick={handleMenuClick}>
	// 		<Menu.Item key="1">Everyone</Menu.Item>
	// 		<Menu.Item key="2">Owner</Menu.Item>
	// 	</Menu>
	// );

	// const dummyRequest = ({ file, onSuccess }) => {
	// 	setTimeout(() => {
	// 		onSuccess('ok');
	// 	}, 0);
	// };

	// const props = {
	// 	name: 'file',
	// 	customRequest: dummyRequest,
	// 	onChange(info) {
	// 		if (info.file.status === 'done') {
	// 			var reader = new FileReader();
	// 			reader.onload = onReaderLoad;
	// 			reader.readAsText(info.file.originFileObj);
	// 			message.success(`${info.file.name} file uploaded successfully`);
	// 		} else if (info.file.status === 'error') {
	// 			message.error(`${info.file.name} file upload failed.`);
	// 		}
	// 	},
	// };

	// const onReaderLoad = (event) => {
	// 	var jsonValue = JSON.parse(event.target.result);
	// 	// console.log('jsonValue', jsonValue);
	// 	AppEmitter.emit(EMITTER_KEYS.IMPORT_JSON, jsonValue);
	// };

	return (
		<div className="navbar">
			<div className="navbar-left">
				{/* {boardData?.boardName && ( */}
				<div className="export" style={{ width: '100%' }}>
					{/* <div style={{ width: '150px', display: 'flex', alignItems: 'center' }} onClick={() => download()}>
							<img className="name__icon" src={Export} />
							<span className="name__logo">Export</span>
						</div> */}

					{/* <Upload {...props}>
							<Button type="primary" icon={<UploadOutlined />} />
						</Upload> */}
					<div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }} className="board_name_container">
						<input
							ref={inputRef}
							style={{ paddingLeft: '25px', border: 'none', outline: 'none' }}
							className="input__nav"
							value={boardName}
							onChange={(e) => setBoardName(e.target.value)}
							onBlur={(e) => handleSave(e.target.value)}
							onKeyPress={(e) => e.key === 'Enter' && e.target.blur()}
						/>
						{boardNameUpdating ? (
							<Spin indicator={antIcon} />
						) : (
							<BiEdit className="input__edit" onClick={() => inputRef.current.focus()} />
						)}
					</div>
					<Space wrap>
						<Dropdown.Button overlay={menu} placement="bottomCenter" icon={<ExportOutlined />}>
							Export as
						</Dropdown.Button>
					</Space>
				</div>
				{/* // )} */}
				<div
					className="name"
					style={{ width: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px' }}>
					{/* <img className="name__icon" src={Yellow} onClick={handleChange} /> */}
					<div className="name__text">{(userDetails?.username || 'Flyerssoft').charAt(0)}</div>
					<span className="name__logo">{userDetails?.username || 'Flyerssoft'}</span>
				</div>
			</div>

			{/* <div className="search">
					<img className="search__icon" src={Search} />
				</div> */}
			{/* <div className="add">
				<Button className="add__member" type="primary" onClick={() => setModal(true)}>
					Add member
				</Button>
				<Modal
					title="Vertically centered modal dialog"
					centered
					visible={modal}
					onOk={() => setModal(false)}
					onCancel={() => setModal(false)}
					className="addMember">
					<div className="modal__main">
						<div className="header__to">
							<b>To:</b>
							<input className="modal__input" placeholder="Enter participient emails address(can be multiple)" />
						</div>
						<Divider />
						<div className="modal__link">
							<div className="link__left">
								<div className="modal__icon">
									<img src={Link} />
								</div>
								<div className="modal__invite">
									<span className="name__link">Invite Link to</span>
									<b>Board</b>
								</div>
								<div className="modal__dropdown">
									<Dropdown overlay={menu1}>
										<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
											Can Edit <DownOutlined />
										</a>
									</Dropdown>
								</div>
							</div>
							<div className="modal__button">
								<button className="modal__button">Copy Link</button>
							</div>
						</div>
						<Divider />
						<div className="globe__link">
							<div className="globe__icon">
								<img src={Globe} />
							</div>
							<div className="globe__title">
								<span>Anyone with this Link</span>
							</div>
							<div className="modal__dropdown1">
								<Dropdown overlay={menu2}>
									<a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
										No Access <DownOutlined />
									</a>
								</Dropdown>
							</div>
						</div>

						<div className="footer__button">
							<button>Done</button>
						</div>
					</div>
				</Modal>
			</div>
			<div className="notification">
				<img className="notification__icon" src={Notification} />
			</div>
			<div className="avathar">
				<img className="avathar__icon" src={Avathar} />
				<span className="name__logo">{userDet && userDet.username}</span>
			</div> */}
		</div>
	);
}

export default Navbar;
