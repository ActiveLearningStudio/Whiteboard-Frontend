import React from 'react';
import Lottie from 'react-lottie';
import LottieFile from 'src/assets/lottie-files';

const defaultOptions = {
	loop: true,
	autoplay: true,
	// rendererSettings: {
	// 	preserveAspectRatio: 'xMidYMid slice',
	// },
};

const LottieComponent = ({ width = '100%', height = '100%', type, loop = true, file = LottieFile.AccessDenied }) => {
	return <Lottie isClickToPauseDisabled={true} options={{ ...defaultOptions, animationData: file, loop }} width={width} height={height} />;
};

export default LottieComponent;
