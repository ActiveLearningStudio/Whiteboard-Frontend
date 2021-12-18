import React from 'react';
import { ReactReduxContext } from 'react-redux';
import { injectReducer, injectSaga } from './rootReducer';

class ReducerLoader extends React.Component {
	constructor(props) {
		super(props);
		const { store,  keyName, reducer, saga } = props;

		if (keyName) {
			injectReducer(store, { key: keyName, reducer: reducer });
			injectSaga(store, { key: keyName, saga: saga });
		}
	}

	render() {
		return this.props.children;
	}
}

export const withReducer = (key, reducer, saga) => (WrappedComponent) => {
	return (props) => {
		return (
			<ReactReduxContext.Consumer>
				{({ store, storeState }) => {
					return (
						<ReducerLoader keyName={key} reducer={reducer} saga={saga} store={store} storeState={storeState}>
							<WrappedComponent {...props} />
						</ReducerLoader>
					);
				}}
			</ReactReduxContext.Consumer>
		);
	};
};