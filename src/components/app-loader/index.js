import React from 'react';
import { withReducer } from 'src/store/reducerLoader';
import AppLoaderFunctional from './components/app-loader-functional';
import reducer from './reducer';
import sagas from './sagas';

const AppLoader = () => {
	return <AppLoaderFunctional />;
};

const ReducedScreen = withReducer('appState', reducer, sagas)(AppLoader);
export default ReducedScreen;
