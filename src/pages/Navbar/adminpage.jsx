import React from 'react';
import FunctionalComp from './component/navbar-functional';
import { withReducer } from '@store/reducerLoader';
import reducer from './reducer';
import sagas from './sagas';

const AdminPage = () => {
	return (
		<div>
			<FunctionalComp />
		</div>
	);
};
const ReducedScreen = withReducer('tasks', reducer, sagas)(AdminPage);
export default ReducedScreen;
