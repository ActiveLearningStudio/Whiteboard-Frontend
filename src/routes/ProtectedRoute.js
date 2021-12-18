import { LOCAL_STORAGE_VARIABLES } from '@constants/app-constants';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// const auth_logins = ['/login', '/register', '/request-received', '/forgot-password'];

const ProtectedRoute = ({ component: Component, ...rest }) => {
	// const {
	// 	location: { pathname },
	// } = rest;

	// const isAuthPath = auth_logins.includes(pathname);
	return (
		<Route
			{...rest}
			render={(props) =>
				localStorage.getItem(LOCAL_STORAGE_VARIABLES.USER_PROFILE) ? (
					<Component {...props} {...rest} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: {
								from: props.location,
							},
						}}
					/>
				)
			}
		/>
	);
};

export default ProtectedRoute;
