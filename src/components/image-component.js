import React, { useState } from 'react';

import boardImg from '../assets/img/boardimg.png';

const ImageComponent = ({ className, style, src = '', alt = 'k', onClick }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const [imageSRC, setImageSRC] = useState(src);
	return (
		<div style={{ position: 'relative' }}>
			{!imageLoaded && (
				<div className="image-loader">
					<span className="loader" />
				</div>
			)}
			<img
				alt={alt}
				className={className}
				onLoad={() => setImageLoaded(true)}
				style={style}
				src={imageSRC}
				onClick={onClick}
				onError={() => setImageSRC(boardImg)}
			/>
		</div>
	);
};

export default ImageComponent;
