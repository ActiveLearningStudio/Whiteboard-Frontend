import { createSelector } from 'reselect';
import { initState } from './reducer';

const LandingPage = (state) => state.landing || initState;
// const counterVal = createSelector(counterState, (cnter) => cnter.counterVal);
const BoardList = createSelector(LandingPage, (cnter) => cnter.boardList);
const boardSaving = createSelector(LandingPage, (cnter) => cnter.boardSaving);
const boardListLoading = createSelector(LandingPage, (cnter) => cnter.boardListLoading);
const deletingBoard = createSelector(LandingPage, (cnter) => cnter.deletingBoard);

export default {
	BoardList,
	boardSaving,
	deletingBoard,
	boardListLoading,
};
