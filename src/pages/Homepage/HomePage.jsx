import React from 'react';
import FunctionalComp from './component/home-page-functional';
import { withReducer } from '@store/reducerLoader';
import reducer from './reducer';
import sagas from './sagas';

const Homempage = () => {
	return <FunctionalComp />;
};
const ReducedScreen = withReducer('landing', reducer, sagas)(Homempage);
export default ReducedScreen;
