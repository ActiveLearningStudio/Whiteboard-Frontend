import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { HomeRoutes } from '@routes';
import './App.css';
import Navbar from '@pages/Navbar/component/navbar-functional';
import AppLoader from '@sharedComponent/app-loader';
import Selectors from '@sharedComponent/app-loader/selectors';
import { connect } from 'react-redux';

function App({ userLoading, userDetails, apiStatus }) {
	// if (true)
	if (userDetails && apiStatus)
		return (
			<Fragment>
				<Navbar />
				<HomeRoutes />
			</Fragment>
		);
	return <AppLoader />;
}

const mapStateToProps = (state) => {
	return {
		userLoading: Selectors.userLoading(state),
		userDetails: Selectors.userDetails(state),
		apiStatus: Selectors.apiStatus(state),
	};
};

const Connected = connect(mapStateToProps, null)(App);

export default withRouter(Connected);
