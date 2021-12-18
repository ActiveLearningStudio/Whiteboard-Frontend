import { createSelector } from 'reselect';
import { initState } from './reducer';

const counterState = (state) => state.counter || initState;
const counterVal = createSelector(counterState, (cnter) => cnter.counterVal);

export default {
	counterState,
	counterVal,
};
