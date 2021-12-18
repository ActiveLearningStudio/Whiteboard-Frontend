import React from 'react';
import { Rect } from 'react-konva';
import ShapesHOC from './ShapesHOC';

const CRectangle = ({ shapeProps, setShapeRef, handleMouseEvents, isSelected, onSelect, onBorderSelect, onBackgroundSelect, drayDynamicBorder }) => {
	return (
		<Rect
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
				onBorderSelect,
				onBackgroundSelect,
			}}
		/>
	);
};

export const RectWrapper = ShapesHOC(CRectangle);
