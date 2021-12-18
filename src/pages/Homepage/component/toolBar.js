import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Selectors from '../selectors';
import Actions from '../action';
import Presentational from './home-page-presentational';

const Toolbar = () => {
	const [tool, setTool] = useState();
	useEffect(() => {
		// getPatientListStarted();
	}, []);

	return (
		<div>
			<div onClick={() => setTool('TOOL_PENCIL')}>Pencil</div>
			<div onClick={() => setTool('TOOL_LINE')}>Line</div>
		</div>
	);
};

export default Toolbar;
