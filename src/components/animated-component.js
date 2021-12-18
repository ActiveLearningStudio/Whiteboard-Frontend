import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

const FadeIn = ({ children, direction = 'left', duration = 1, delay = 0, distance = 30, style = {} }) => {
	let componentRef = useRef(null);

	let fadeDirection;
	switch (direction) {
		case 'left':
			fadeDirection = { x: -distance };
			break;
		case 'right':
			fadeDirection = { x: distance };
			break;
		case 'top':
			fadeDirection = { y: -distance };
			break;
		case 'bottom':
			fadeDirection = { y: distance };
			break;
		default:
			fadeDirection = { y: distance };
	}
	useEffect(() => {
		gsap.from(componentRef, {
			duration,
			opacity: 0,
			delay,
			...fadeDirection,
		});
	}, []);

	return (
		<div {...{ style }} ref={(el) => (componentRef = el)}>
			{children}
		</div>
	);
};

export default FadeIn;
