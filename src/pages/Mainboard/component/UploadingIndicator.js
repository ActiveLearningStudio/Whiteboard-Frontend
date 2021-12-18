import React from 'react';
import { SyncOutlined } from '@ant-design/icons';

const UploadingIndicator = () => {
	return (
		<div className="updating-loader">
			<SyncOutlined spin />
		</div>
	);
};

export default UploadingIndicator;
