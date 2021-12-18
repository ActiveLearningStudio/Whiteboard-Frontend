import React from 'react';
import { Image, Text } from 'react-konva';

const MOVE_FROM_LEFT = 35;
const MOVE_FROM_TOP = 10;

const CursorPoints = ({ name = '', position = { x: 0, y: 0 }, image, color: stroke = 'black' }) => {
	return (
		<>
			<Image {...position} {...{ image }} />
			<Text {...{ x: position?.x + MOVE_FROM_LEFT, y: position?.y + MOVE_FROM_TOP, fontSize: 20, text: name, stroke }} />
		</>
	);
};

export default CursorPoints;
