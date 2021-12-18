import React from 'react';
import LottieComponent from '@sharedComponent/lottie-component';
import LottieFile from 'src/assets/lottie-files';

const AppLoaderPresentational = () => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff85', width: '100%', height: '100%' }}>
			<LottieComponent width={'15%'} height={'15%'} file={LottieFile.PencilLoader} />
		</div>
	);
};

export default AppLoaderPresentational;
