import React from 'react';
import { Text } from 'react-konva';
import ShapesHOC from './ShapesHOC';

const CText = ({ shapeProps, isSelected, onSelect, onChange, index, handleTextDblClick, handleMouseEvents, setShapeRef }) => {
	return (
		<Text
			{...shapeProps}
			{...{
				text: shapeProps.textValue,
				onClick: onSelect,
				ref: setShapeRef,
				draggable: isSelected,
				onDragStart: handleMouseEvents,
				onDragMove: handleMouseEvents,
				onDragEnd: handleMouseEvents,
				onTransformEnd: handleMouseEvents,
				onMouseEnter: handleMouseEvents,
				onMouseLeave: handleMouseEvents,
				onDblClick: (e) => handleTextDblClick(e, index),
			}}
		/>
	);
};

export const TextWrapper = ShapesHOC(CText);
