import { createSelector } from 'reselect';
import { initState } from './reducer';

const AppLoader = (state) => state.appState || initState;
const userLoading = createSelector(AppLoader, (cnter) => cnter.userLoading);
const userDetails = createSelector(AppLoader, (cnter) => cnter.userDetails);
const apiStatus = createSelector(AppLoader, (cnter) => cnter.apiStatus);

export default {
	userLoading,
	userDetails,
	apiStatus,
};
