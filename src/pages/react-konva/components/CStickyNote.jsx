import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import ShapesHOC from './ShapesHOC';

const CStickyNote = (props) => {
	const {
		shapeProps,
		setShapeRef,
		handleMouseEvents,
		isSelected,
		onSelect,
		handleTextDblClick,
		// index
	} = props;

	return (
		<Group
			{...shapeProps}
			{...{
				onClick: onSelect,
				onDblClick: handleTextDblClick,
				ref: setShapeRef,
				draggable: isSelected,
				onDragStart: handleMouseEvents,
				onDragMove: handleMouseEvents,
				onDragEnd: handleMouseEvents,
				onTransformEnd: handleMouseEvents,
				onMouseEnter: handleMouseEvents,
				onMouseLeave: handleMouseEvents,
			}}>
			<Rect
				x={0}
				y={0}
				width={shapeProps.width}
				height={shapeProps.height}
				fill={shapeProps.background}
				shadowBlur={30}
				shadowColor="black"
				shadowOffset={{ x: 10, y: 30 }}
				shadowOpacity={0.5}
			/>
			<Text {...shapeProps} x={0} y={0} scaleX={1} scaleY={1} draggable={false} />
		</Group>
	);
};

export default ShapesHOC(CStickyNote);
