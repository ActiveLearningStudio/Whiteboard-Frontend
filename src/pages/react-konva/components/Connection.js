import React from 'react';
import { Path, Circle, Group, Rect, Text } from 'react-konva';

function ConnectionSource({ colour = '#F73492', x = 0, y = 0 }) {
	return (
		<Circle
			x={x}
			y={y}
			radius={6}
			fill="white"
			stroke={colour}
			strokeWidth={3}
			shadowColor={colour}
			shadowOffsetY={2}
			shadowOffsetX={0}
			shadowBlur={2}
			shadowOpacity={0.25}
		/>
	);
}

function ConnectionTarget({ colour = '#F73492', x = 0, y = 0 }) {
	return (
		<Path
			x={x}
			y={y}
			fill={colour}
			data="M229 7.5L217.75 13.9952V1.00481L229 7.5Z"
			shadowColor={colour}
			shadowOffsetY={2}
			shadowOffsetX={0}
			shadowBlur={2}
			shadowOpacity={0.25}
		/>
	);
}

function ConnectionLabel({ text = '', x = 0, y = 0, colour, width }) {
	const labelText = <Text x={5} y={5} text={text} fontSize={12} fill="white" />;
	return (
		<Group x={x} y={y}>
			<Rect x={0} y={0} fill={colour} height={20} width={width} cornerRadius={4} />
			{labelText}
		</Group>
	);
}

function getProgressStyleProps(colour) {
	return {
		stroke: colour,
		strokeWidth: 5,
		shadowColor: colour,
		shadowOffsetY: 2,
		shadowOffsetX: 0,
		shadowBlur: 2,
		shadowOpacity: 0.25,
	};
}

function getRegressStyleProps(colour) {
	return {
		stroke: colour,
		strokeWidth: 2,
		dash: [5, 10],
	};
}

export function Connection({ colour = '#F73492', x = 0, y = 0, path, capX, capY, type = 'progress', label, labelX, labelY, labelWidth }) {
	const styleProps = type === 'progress' ? getProgressStyleProps(colour) : getRegressStyleProps(colour);
	return (
		<Group>
			<Path x={x} y={y} data={path} lineCap="round" lineJoin="round" {...styleProps} />
			<ConnectionTarget colour={colour} x={capX} y={capY} />
			<ConnectionSource colour={colour} x={x} y={y} />
			<ConnectionLabel text={label} x={labelX} y={labelY} colour={colour} width={labelWidth} />
		</Group>
	);
}
