import React from 'react';
import { Circle } from 'react-konva';
import ShapesHOC from './ShapesHOC';

const CCircle = ({ shapeProps, setShapeRef, handleMouseEvents, isSelected, onSelect }) => {
	return (
		<Circle
			{...shapeProps}
			{...{
				onClick: onSelect,
				ref: setShapeRef,
				draggable: isSelected,
				onDragStart: handleMouseEvents,
				onDragMove: handleMouseEvents,
				onDragEnd: handleMouseEvents,
				onTransformEnd: handleMouseEvents,
				onMouseEnter: handleMouseEvents,
				onMouseLeave: handleMouseEvents,
			}}
		/>
	);
};

export const CircleWrapper = ShapesHOC(CCircle);
