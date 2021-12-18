/* eslint-disable react-hooks/exhaustive-deps */
import { Line as LineT } from 'konva/lib/shapes/Line';
import { Circle as CircleT } from 'konva/lib/shapes/Circle';
import React, { useState } from 'react';
import { Text, Circle, Image, Transformer, Arrow, Line } from 'react-konva';
import { linesA, linesB } from '../konva-drawing-helpers';

const haveIntersection = (r1, r2) => {
	return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
};

export const Arrowo = ({ shapeProps, isSelected, onSelect, onChange, stageRef }) => {
	const shapeRef = React.useRef();
	const [anchorPoints, setAnchorPoints] = useState([]);

	React.useEffect(() => {
		if (isSelected) {
			const arrowPoints = [...shapeProps.points];
			changeAnchorPoints(arrowPoints);
		}
	}, [isSelected]);

	const changeAnchorPoints = (arrowPoints, props = shapeProps) => {
		const anchorPoints = [];
		const shapeX = props.x || 0;
		const shapeY = props.y || 0;
		let i = 0,
			j = 0;
		while (i < arrowPoints.length) {
			j = i + 1; //
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
		shapeRef.current.points(points);
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
		shapeRef.current.points(points);
		changeAnchorPoints(points);
	};

	const isIntersected = shapeProps.fromX || shapeProps.toX || shapeProps.fromY || shapeProps.toY;

	return (
		<React.Fragment>
			<Arrow
				onClick={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable={isSelected && !isIntersected}
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
				onTransformEnd={(e) => {
					// transformer is changing scale
					const node = shapeRef.current;
					onChange({
						...node.attrs,
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
							radius={8}
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
								const target = event.target;
								var targetRect = target.getClientRect();
								const { x, y } = { ...target.attrs };
								const shape = { ...shapeProps };
								const points = [];
								const shapeX = shapeProps.x || 0;
								const shapeY = shapeProps.y || 0;
								anchorPoints.forEach((item, i) => {
									if (i === index) {
										points.push(-shapeX + x);
										points.push(-shapeY + y);
									} else if (!item.isAnchor) {
										points.push(-shapeX + item.x);
										points.push(-shapeY + item.y);
									}
								});
								shape.points = points;
								/**
								 * set fromX, fromY toX, toY diff based on intersected shape (x, y)
								 *
								 */
								if (index === 0 || index === anchorPoints.length - 1) {
									const layer = stageRef.current.getLayers()[1];
									const nodes = layer.getChildren();
									const filtered = nodes.filter((node) => !(node instanceof LineT) && !(node instanceof CircleT));
									const intersectedShapes = filtered.filter((node) => haveIntersection(targetRect, node.getClientRect()));
									if (intersectedShapes.length) {
										const intersected = intersectedShapes[0];
										if (index === 0) {
											shape.fromX = x - intersected.x();
											shape.fromY = y - intersected.y();
											shape.fromId = intersected._id;
										} else {
											shape.toX = x - intersected.x();
											shape.toY = y - intersected.y();
											shape.toId = intersected._id;
										}
										// console.log('>>>>>>>INTERSECTED>>>>>>>', shape);
									} else {
										if (index === 0) {
											shape.fromX = null;
											shape.fromY = null;
										} else {
											shape.toX = null;
											shape.toY = null;
										}
									}
								}
								/**
								 * update in state, prev update in konva state
								 */
								onChange({
									...shape,
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

export const NarrowLine = ({ currentIndex, shapeProps, isSelected, onSelect, onChange, stageRef }) => {
	const shapeRef = React.useRef();
	const [anchorPoints, setAnchorPoints] = useState([]);

	React.useEffect(() => {
		if (isSelected) {
			if (!shapeRef) {
				const arrowPoints = [...shapeProps.points];
				changeAnchorPoints(arrowPoints);
			} else {
				const node = shapeRef.current;
				onChange({ ...node.attrs });
				changeAnchorPoints(shapeRef.current.attrs.points);
			}
		}
	}, [isSelected]);

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
		shapeRef.current.points(points);
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
		shapeRef.current.points(points);
		changeAnchorPoints(points); // while change non anchor point, need to change list of anchor points based on points list
	};

	const isIntersected = shapeProps.fromX || shapeProps.toX || shapeProps.fromY || shapeProps.toY;

	return (
		<React.Fragment>
			<Line
				onClick={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable={isSelected && !isIntersected}
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
							radius={8}
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
								const target = event.target;
								var targetRect = target.getClientRect();
								const { x, y } = { ...target.attrs };
								const shape = { ...shapeProps };
								const points = [];
								const shapeX = shapeProps.x || 0;
								const shapeY = shapeProps.y || 0;
								anchorPoints.forEach((item, i) => {
									if (i === index) {
										points.push(-shapeX + x);
										points.push(-shapeY + y);
									} else if (!item.isAnchor) {
										points.push(-shapeX + item.x);
										points.push(-shapeY + item.y);
									}
								});
								shape.points = points;
								/**
								 * set fromX, fromY toX, toY diff based on intersected shape (x, y)
								 *
								 */
								if (index === 0 || index === anchorPoints.length - 1) {
									const layer = stageRef.current.getLayers()[1];
									const nodes = layer.getChildren();
									const filtered = nodes.filter((node) => !(node instanceof LineT) && !(node instanceof CircleT));
									const intersectedShapes = filtered.filter((node) => haveIntersection(targetRect, node.getClientRect()));
									if (intersectedShapes.length) {
										const intersected = intersectedShapes[0];
										if (index === 0) {
											shape.fromX = x - intersected.x();
											shape.fromY = y - intersected.y();
											shape.fromId = intersected._id;
										} else {
											shape.toX = x - intersected.x();
											shape.toY = y - intersected.y();
											shape.toId = intersected._id;
										}
										// console.log('>>>>>>>INTERSECTED>>>>>>>', shape);
									} else {
										if (index === 0) {
											shape.fromX = null;
											shape.fromY = null;
										} else {
											shape.toX = null;
											shape.toY = null;
										}
									}
								}
								/**
								 * update in state, prev update in konva state
								 */
								onChange({
									...shape,
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

export const Pencil = ({ shapeProps, isSelected, onSelect, onChange }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Line
				onClick={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable={isSelected}
				onDragMove={(event) => {
					if (isSelected) {
						// const node = event.target;
					}
				}}
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onTransformEnd={(e) => {
					const node = shapeRef.current;
					onChange({
						...node.attrs,
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
				<Transformer
					{...{ ref: trRef }}
					anchorCornerRadius={10}
					anchorFill="#4261ff"
					anchorStroke="#4261ff"
					anchorSize={8}
					borderStroke="#4261ff30"
					padding={10}
					borderDash={[10, 10]}
				/>
			)}
		</React.Fragment>
	);
};

export const Texto = ({ shapeProps, isSelected, onSelect, onChange, index, handleTextDblClick }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Text
				{...shapeProps}
				ref={shapeRef}
				fontSize={shapeProps.fontSize}
				align={shapeProps.align}
				fontStyle={shapeProps.fontStyle}
				draggable={isSelected}
				text={shapeProps.textValue}
				x={shapeProps.x}
				y={shapeProps.y}
				wrap="word"
				width={shapeProps.width}
				onDblClick={(e) => handleTextDblClick(e, index)}
				onClick={() => onSelect(index)}
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onTransformEnd={(e) => {
					// transformer is changing scale
					const node = shapeRef.current;
					// const scaleX = node.scaleX();
					// const scaleY = node.scaleY();
					// we will reset it back
					node.scaleX(1);
					node.scaleY(1);
					// onChange({
					// 	...shapeProps,
					// 	rotation: node.rotation(),
					// 	x: node.x(),
					// 	y: node.y(),
					// 	width: node.width() * scaleX,
					// 	height: node.height() * scaleY,
					// });
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
				<Transformer
					{...{ ref: trRef }}
					anchorCornerRadius={10}
					anchorFill="#4261ff"
					anchorStroke="#4261ff"
					anchorSize={8}
					borderStroke="#4261ff30"
					padding={10}
					borderDash={[10, 10]}
				/>
			)}
		</React.Fragment>
	);
};

export const Imagem = ({ shapeProps, isSelected, onSelect, onChange }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.setNode(shapeRef.current);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Image
				onClick={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onTransformEnd={(e) => {
					// transformer is changing scale
					const node = shapeRef.current;
					onChange({
						...node.attrs,
						enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
						keepRatio: true,
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
				<Transformer
					{...{ ref: trRef, enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'] }}
					anchorCornerRadius={10}
					anchorFill="#4261ff"
					anchorStroke="#4261ff"
					anchorSize={8}
					borderStroke="#4261ff30"
					padding={10}
					borderDash={[10, 10]}
				/>
			)}
		</React.Fragment>
	);
};

export const Background = () => {
	return (
		<React.Fragment>
			{/* <Rect height={height} width={width} x={0} y={0} fill={'white'} /> */}
			{linesA}
			{linesB}
		</React.Fragment>
	);
};
