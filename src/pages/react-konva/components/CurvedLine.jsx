/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Circle, Line } from 'react-konva';

const CurvedLine = ({ shapeProps, isSelected, onSelect, onChange }) => {
	const shapeRef = React.useRef();
	const [pts, setPoints] = useState([]);
	const [anchorPoints, setAnchorPoints] = useState([]);

	useEffect(() => {
		if (isSelected) {
			const arrowPoints = [...shapeProps.points];
			changeAnchorPoints(arrowPoints);
		}
	}, [isSelected]);

	useEffect(() => {
		if (shapeProps.offsets) {
			shapeProps.points[0] = shapeProps.points[0] + shapeProps.offsets.from.x;
			shapeProps.points[1] = shapeProps.points[1] + shapeProps.offsets.from.y;
			shapeProps.points[2] = shapeProps.points[2] + shapeProps.offsets.to.x;
			shapeProps.points[3] = shapeProps.points[3] + shapeProps.offsets.to.y;
		}
		setPoints(shapeProps.points);
	}, [shapeProps.points]);

	const changeAnchorPoints = (arrowPoints, props = shapeProps) => {
		const anchorPoints = [];
		const shapeX = props.x || 0;
		const shapeY = props.y || 0;
		let i = 0,
			j = 0;
		while (i < arrowPoints.length) {
			j = i + 1;
			anchorPoints.push({ x: shapeX + arrowPoints[i], y: shapeY + arrowPoints[i + 1], isAnchor: false });
			if (j + 1 < arrowPoints.length)
				anchorPoints.push({
					x: shapeX + (arrowPoints[i] + arrowPoints[i + 2]) / 2,
					y: shapeY + (arrowPoints[j] + arrowPoints[j + 2]) / 2,
					isAnchor: true,
				});
			i = i + 2;
		}
		setAnchorPoints(anchorPoints);
	};

	const handleDragAnchorPoint = (event, index) => {
		const node = event.target;
		const attrs = { ...node.attrs };
		const points = [];
		const shapeX = shapeProps.x || 0;
		const shapeY = shapeProps.y || 0;
		anchorPoints.forEach((item, i) => {
			if (i === index) {
				points.push(-shapeX + attrs.x);
				points.push(-shapeY + attrs.y);
			} else {
				points.push(-shapeX + item.x);
				points.push(-shapeY + item.y);
			}
		});
		setPoints(points);
	};

	const handleDragNonAnchorPoint = (event, index) => {
		const node = event.target;
		const attrs = { ...node.attrs };
		const points = [];
		const shapeX = shapeProps.x || 0;
		const shapeY = shapeProps.y || 0;
		anchorPoints.forEach((item, i) => {
			if (i === index) {
				points.push(-shapeX + attrs.x);
				points.push(-shapeY + attrs.y);
			} else if (!item.isAnchor) {
				points.push(-shapeX + item.x);
				points.push(-shapeY + item.y);
			}
		});
		setPoints(points);
		changeAnchorPoints(points);
	};

	return (
		<React.Fragment>
			<Line
				ref={shapeRef}
				onClick={onSelect}
				{...shapeProps}
				draggable={isSelected}
				stroke="#94a9ff"
				sceneFunc={(context, shape) => {
					const points = [];
					for (let j = 0; j < pts.length; j = j + 2) {
						points.push({ x: pts[j], y: pts[j + 1] });
					}
					if (points.length === 0) {
						return;
					}
					context.beginPath();
					context.moveTo(points[0].x, points[0].y);

					// var t = (tension != null) ? tension : 1;
					var t = 0.9;
					for (var i = 0; i < points.length - 1; i++) {
						var p0 = i > 0 ? points[i - 1] : points[0];
						var p1 = points[i];
						var p2 = points[i + 1];
						var p3 = i !== points.length - 2 ? points[i + 2] : p2;

						var cp1x = p1.x + ((p2.x - p0.x) / 6) * t;
						var cp1y = p1.y + ((p2.y - p0.y) / 6) * t;

						var cp2x = p2.x - ((p3.x - p1.x) / 6) * t;
						var cp2y = p2.y - ((p3.y - p1.y) / 6) * t;

						context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
					}
					context.fillStrokeShape(shape);
				}}
				onDragMove={(event) => {
					if (isSelected) {
						const node = event.target;
						changeAnchorPoints(node.points, { x: node.x(), y: node.y() });
					}
				}}
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onMouseEnter={(e) => {
					const container = e.target.getStage().container();
					container.style.cursor = 'pointer';
				}}
				onMouseLeave={(e) => {
					const container = e.target.getStage().container();
					container.style.cursor = 'default';
				}}
			/>
			{isSelected && (
				<>
					{anchorPoints.map((item, index) => (
						<Circle
							x={item.x}
							y={item.y}
							isAnchor={true}
							radius={12}
							fill={item.isAnchor ? '#a2c1f7' : '#a9a9a9'}
							draggable={true}
							onDragMove={(event) => {
								if (item.isAnchor) {
									handleDragAnchorPoint(event, index);
								} else {
									handleDragNonAnchorPoint(event, index);
								}
							}}
							onDragEnd={(event) => {
								const node = event.target;
								const attrs = { ...node.attrs };
								const points = [];
								const shapeX = shapeProps.x || 0;
								const shapeY = shapeProps.y || 0;
								anchorPoints.forEach((item, i) => {
									if (i === index) {
										points.push(-shapeX + attrs.x);
										points.push(-shapeY + attrs.y);
									} else if (!item.isAnchor) {
										points.push(-shapeX + item.x);
										points.push(-shapeY + item.y);
									}
								});
								// console.log('>>>>>>POINTS>>>>>>>', points);
								setPoints(points);
								onChange({
									...shapeProps,
									points,
								});
								changeAnchorPoints(points);
							}}
						/>
					))}
				</>
			)}
		</React.Fragment>
	);
};

export default CurvedLine;
