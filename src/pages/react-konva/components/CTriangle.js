import React from 'react';
import { RegularPolygon } from 'react-konva';
import ShapesHOC from './ShapesHOC';

const CTriangle = ({ shapeProps, setShapeRef, handleMouseEvents, isSelected, onSelect }) => {
	return (
		<RegularPolygon
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

export const TriangleWrapper = ShapesHOC(CTriangle);
