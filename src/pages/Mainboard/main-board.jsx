import React from 'react';
import FunctionalComp from './component/main-board-functional';
import { withReducer } from '@store/reducerLoader';
import reducer from './reducer';
import sagas from './sagas';

const MainBoard = () => {
	return <FunctionalComp />;
};
const ReducedScreen = withReducer('mainBoardState', reducer, sagas)(MainBoard);
export default ReducedScreen;
