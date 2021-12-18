import React from 'react';
import { connect } from 'react-redux';
import selectors from '@sharedComponent/app-loader/selectors';
import Presentational from './navbar-presentational';

const FunctionalComponent = ({ userDetails }) => {
	return <Presentational {...{ userDetails }} />;
};

const mapStateToProps = (state) => {
	return {
		userDetails: selectors.userDetails(state),
	};
};

const Connected = connect(mapStateToProps, null)(FunctionalComponent);

export default Connected;
