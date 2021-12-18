import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import KonvaMainPresentational from '@pages/react-konva/konva-main-presentational';
import LottieComponent from '@sharedComponent/lottie-component';
import LottieFile from 'src/assets/lottie-files';
import { dataURLtoFile } from 'src/utils/helpers';
import Selectors from '../selectors';
import UserDetailsSelectors from '@sharedComponent/app-loader/selectors';
import Actions from '../action';
// import Presentational from './main-board-presentational';
import { INITIAL_STATE } from '@pages/react-konva/components/config';
import './style.scss';

const MainBoardFunctional = ({
	boardLoading,
	getWhiteboardByIdReset,
	getWhiteboardContentById,
	getWhiteboardById,
	boardData,
	shapes,
	// setShape,
	addContent,
	clearContent,
	boardContentAdding,
	saveWhiteboardImage,
	boardContentLoading,
	getWhiteboardContentByIdReset,
	getWhiteboardChatHistory,
	reduxMessages,
	reduxMessagesLoading,
	userDetails,
}) => {
	const { boardId } = useParams();
	// const history = useHistory();
	// const {
	// 	state: {
	// 		// newBoard
	// 	},
	// } = useLocation();

	const [selectedStep, setSelectedStep] = useState(null);
	const [steps, setSteps] = useState(INITIAL_STATE.steps);
	const [connectionPreview, setConnectionPreview] = useState(null);
	const [connections, setConnections] = useState([]);

	// Reset the state value while reload
	// useEffect(() => {
	// 	if (history.location.state && history.location.state.transaction) {
	// 		let state = { ...history.location.state };
	// 		delete state.transaction;
	// 		history.replace({ ...history.location, state });
	// 	}
	// }, []);

	// useEffect(() => {
	// 	if (!boardContentLoading && shapes?.length) {
	// 		// handleSaveWhiteboardImage();
	// 	}
	// }, [boardContentLoading]);

	useEffect(() => {
		if (boardId) {
			// setTimeout(() => {
			getWhiteboardById(boardId);
			getWhiteboardContentById(boardId);
			getWhiteboardChatHistory(boardId);
			// }, 1000);
		}
		return () => {
			getWhiteboardByIdReset();
			getWhiteboardContentByIdReset();
		};
	}, [boardId, getWhiteboardById, getWhiteboardContentById, getWhiteboardChatHistory, getWhiteboardByIdReset, getWhiteboardContentByIdReset]);

	const addBoardContents = (elements, connections = []) => {
		let requestObj = {
			boardId,
			action: 'add',
			newContent: elements,
		};
		addContent(requestObj);
	};

	const handleSaveWhiteboardImage = (stageRef) => {
		const dataURI = stageRef?.current?.toDataURL();
		// var canvas = document.getElementById('canvas');
		// var dataURI = canvas?.toDataURL(`image/png`);
		if (dataURI) {
			var file = dataURLtoFile(dataURI, `${boardData?.boardName}.png`);
			var formData = new FormData();
			formData.append('file', file);
			if (file) {
				saveWhiteboardImage({
					boardId,
					image: formData,
				});
			}
		}
	};

	const handleClearContent = () => {
		clearContent({
			boardId,
			action: 'clear',
			newContent: [],
		});
	};

	// const { saveWhiteboardImageLoading } = saveWhiteboardImage;

	return (
		<>
			{boardLoading && (
				<div
					style={{
						position: 'absolute',
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: 2,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						// backgroundColor: '#ffffff85',
						backgroundColor: 'white',
					}}>
					<LottieComponent width={'15%'} height={'15%'} file={LottieFile.PencilLoader} />
				</div>
			)}
			{/* <Presentational
				{...{
					boardData,
					shapes,
					setShape,
					boardLoading,
					addBoardContents,
					boardContentAdding,
					saveWhiteboardImageLoading,
					handleSaveWhiteboardImage,
					newBoard,
					boardId,
				}}
			/> */}
			<KonvaMainPresentational
				{...{
					boardId,
					boardContentAdding,
					addBoardContents,
					handleSaveWhiteboardImage,
					shapes,
					handleClearContent,
					reduxMessages,
					reduxMessagesLoading,
					selectedStep,
					setSelectedStep,
					steps,
					setSteps,
					connectionPreview,
					setConnectionPreview,
					connections,
					setConnections,
					userDetails,
				}}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		boardState: Selectors.boardState(state),
		boardLoading: Selectors.boardLoading(state),
		boardData: Selectors.boardData(state),
		shapes: Selectors.shapes(state),
		boardContentAdding: Selectors.boardContentAdding(state),
		boardContentLoading: Selectors.boardContentLoading(state),
		saveWhiteboardImage: Selectors.saveWhiteboardImage(state),
		reduxMessages: Selectors.reduxMessages(state),
		reduxMessagesLoading: Selectors.reduxMessagesLoading(state),
		userDetails: UserDetailsSelectors.userDetails(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getWhiteboardById: (boardId) => dispatch(Actions.creators.getWhiteboardById(boardId)),
		getWhiteboardChatHistory: (boardId) => dispatch(Actions.creators.getWhiteboardChatHistory(boardId)),
		getWhiteboardContentById: (boardId) => dispatch(Actions.creators.getWhiteboardContentById(boardId)),
		getWhiteboardContentByIdReset: (boardId) => dispatch(Actions.creators.getWhiteboardContentByIdReset(boardId)),
		getWhiteboardByIdReset: () => dispatch(Actions.creators.getWhiteboardByIdReset()),
		setShape: (elements) => dispatch(Actions.creators.setShape(elements)),
		addContent: (requestObj) => dispatch(Actions.creators.addContent(requestObj)),
		clearContent: (requestObj) => dispatch(Actions.creators.clearContent(requestObj)),
		saveWhiteboardImage: (requestObj) => dispatch(Actions.creators.saveWhiteboardImage(requestObj)),
	};
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(MainBoardFunctional);

export default Connected;
