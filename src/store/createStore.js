import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import makeRootReducer from './rootReducer';
import injectReducers from './injectReducers';

const initReducer = (state = {}, action) => {
	return state;
};

const initReducers = {
	init: initReducer,
};

const myStore = (initState = {}) => {
	const saga = createSagaMiddleware();
	let middleware = [saga];
	const enhancers = [];
	let composeEnhancers = undefined;

	// console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
	if (process.env.NODE_ENV !== 'production') {
		//remote debugging can be switched on/off by shaking the expo client.
		// if (Platform.OS === 'ios') NativeModules.DevSettings.setIsDebuggingRemotely(true);
		composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		// middleware.push(logger);
	} else {
		composeEnhancers = compose;
	}

	// composeEnhancers = compose;
	const store = createStore(
		makeRootReducer(initReducers),
		initState,
		// applyMiddleware(...middleware),
		composeEnhancers(applyMiddleware(...middleware), ...enhancers)
	);

	store.asyncReducers = {};
	store.sagaMiddleware = saga;
	store.injectedEffects = {};

	store.attachSaga = (saga) => {
		store.sagaMiddleware.run(saga);
	};
	injectReducers(store);
	return store;
};

export default myStore;
