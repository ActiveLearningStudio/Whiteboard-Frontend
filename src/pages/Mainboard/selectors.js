import { createSelector } from 'reselect';
import { initState } from './reducer';

const boardState = (state) => state.mainBoardState || initState;
// const boardLoading = createSelector(boardState, (cnter) => cnter.boardLoading);
const boardLoading = createSelector(boardState, (cnter) => cnter.boardLoading);
const boardData = createSelector(boardState, (cnter) => cnter.boardData);
const shapes = createSelector(boardState, (cnter) => cnter.shapes);
const boardContentAdding = createSelector(boardState, (cnter) => cnter.boardContentAdding);
const boardNameUpdating = createSelector(boardState, (cnter) => cnter.boardNameUpdating);
const saveWhiteboardImage = createSelector(boardState, (cnter) => cnter.saveWhiteboardImage);
const boardContentLoading = createSelector(boardState, (cnter) => cnter.boardContentLoading);
const reduxMessagesLoading = createSelector(boardState, (cnter) => cnter.reduxMessagesLoading);
const reduxMessages = createSelector(boardState, (cnter) => cnter.reduxMessages);
const chatSearchData = createSelector(boardState, (cnter) => cnter.chatSearchData);

export default {
	shapes,
	boardState,
	boardLoading,
	boardData,
	boardNameUpdating,
	boardContentAdding,
	saveWhiteboardImage,
	boardContentLoading,
	reduxMessagesLoading,
	reduxMessages,
	chatSearchData,
};
