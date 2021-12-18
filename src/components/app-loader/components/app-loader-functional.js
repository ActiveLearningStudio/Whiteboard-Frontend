import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { getQueryVariable } from 'src/utils/helpers';
import Selectors from '../selectors';
import Actions from '../action';
import AppLoaderPresentational from './app-loader-presentational';

const AppLoaderFunctional = ({ apiStatus, userLoading, userDetails, getUserById }) => {
	const search = useLocation().search;
	const userId = new URLSearchParams(search).get('userId');

	useEffect(() => {
		getUserById(userId);
	}, [userDetails, apiStatus, userId, getUserById]);

	return <AppLoaderPresentational />;
};

const mapStateToProps = (state) => {
	return {
		userLoading: Selectors.userLoading(state),
		userDetails: Selectors.userDetails(state),
		apiStatus: Selectors.apiStatus(state),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getUserById: (boardId) => dispatch(Actions.creators.getUserById(boardId)),
	};
};

const Connected = connect(mapStateToProps, mapDispatchToProps)(AppLoaderFunctional);

export default Connected;
