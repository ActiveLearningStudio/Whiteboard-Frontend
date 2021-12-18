import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Selectors from '../selectors';
import Actions from '../action';
import Presentational from './home-page-presentational';
import { useHistory } from 'react-router-dom';

const HomepageFunctionalComponent = ({ getAllBoards, boardList, createWhiteboard, boardSaving, deleteBoards, boardListLoading }) => {
	const [boardName, setBoardName] = useState('');
	const [modal2Visible, setModal2Visible] = useState(false);

	const history = useHistory();

	useEffect(() => {
		getAllBoards();
	}, [getAllBoards]);

	const handleAddBoard = (boardName) => {
		createWhiteboard({ boardName }, history);
		setModal2Visible(false);
	};

	const handleRemoveBoard = (boardId) => deleteBoards(boardId);

	return (
		<Presentational
			{...{
				boardList,
				handleAddBoard,
				modal2Visible,
				setModal2Visible,
				boardName,
				setBoardName,
				history,
				boardSaving,
				handleRemoveBoard,
				boardListLoading,
			}}
		/>
	);
};

const mapStateToProps = (state) => {
	return {
		boardList: Selectors.BoardList(state),
		boardListLoading: Selectors.boardListLoading(state),
		boardSaving: Selectors.boardSaving(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAllBoards: () => dispatch(Actions.creators.getAllBoards()),
		createWhiteboard: (input, history) => dispatch(Actions.creators.createWhiteboard(input, history)),
		deleteBoards: (boardId) => dispatch(Actions.creators.deleteBoards(boardId)),
	};
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(HomepageFunctionalComponent);

export default Connected;
