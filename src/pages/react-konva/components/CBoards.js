import React from 'react';
// import { Line } from 'react-konva';
// import { SIZE } from './config';
import { Anchor } from './CAnchor';

// const points = [0, 0, SIZE, 0, SIZE, SIZE, 0, SIZE, 0, 0];

const DISTANCE = 25;

function getAnchorPoints(x, y, step) {
	var size = step.width ? step.width : step.radius * 2;
	size = step.scaleX ? size * step.scaleX : size;
	const halfSize = size / 2;
	if (step.width) {
		return [
			{
				x: x - DISTANCE,
				y: y + halfSize,
			},
			{
				x: x + halfSize,
				y: y - DISTANCE,
			},
			{
				x: x + size + DISTANCE,
				y: y + halfSize,
			},
			{
				x: x + halfSize,
				y: y + size + DISTANCE,
			},
		];
	} else if (step.type === 'circle') {
		return [
			{
				x: x - halfSize - DISTANCE,
				y: y,
			},
			{
				x: x,
				y: y - halfSize - DISTANCE,
			},
			{
				x: x + halfSize + DISTANCE,
				y: y,
			},
			{
				x: x,
				y: y + halfSize + DISTANCE,
			},
		];
	} else {
		return [
			{
				x: x - halfSize,
				y: y - DISTANCE,
			},
			{
				x: x,
				y: y - halfSize - DISTANCE,
			},
			{
				x: x + halfSize,
				y: y - DISTANCE,
			},
			{
				x: x,
				y: y + halfSize / 2 + DISTANCE,
			},
		];
	}
}

export function Border({ step, id, onAnchorDragStart, onAnchorDragMove, onAnchorDragEnd }) {
	const { x, y } = step;
	const anchorPoints = getAnchorPoints(x, y, step);
	const anchors = anchorPoints.map((position, index) => (
		<Anchor
			key={`anchor-${index}`}
			id={id}
			x={position.x}
			y={position.y}
			onDragStart={onAnchorDragStart}
			onDragMove={onAnchorDragMove}
			onDragEnd={onAnchorDragEnd}
		/>
	));
	return (
		<>
			{/* <Line x={step?.x} y={step?.y} points={points} stroke="black" strokeWidth={2} perfectDrawEnabled={false} /> */}
			{anchors}
		</>
	);
}
