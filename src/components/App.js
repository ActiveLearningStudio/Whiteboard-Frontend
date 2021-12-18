import '../styles/App.css';

import React, { Component } from 'react';
import { LoginRoutes } from 'src/routes';

class App extends Component {
	render() {
		return (
			// <div className="App">
			//   <div className="Header">FlyBoard</div>
			//   <Board />
			// </div>
			<LoginRoutes />
		);
	}
}

export default App;
