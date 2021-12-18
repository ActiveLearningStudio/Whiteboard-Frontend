import React from 'react';
import { Route, Switch } from 'react-router-dom';
import WorkspacePage from '@pages/Mainboard/main-board';
import Homepage from '@pages/Homepage/HomePage';

const HomeRoutes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Homepage} />
			<Route path="/whiteboard/:boardId" component={WorkspacePage} />
			<Route path="/whiteboard" component={WorkspacePage} />
		</Switch>
	);
};

export { HomeRoutes };
