/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { Line as LineT } from 'konva/lib/shapes/Line';
import { Transformer } from 'react-konva';
import ShapesToolbar from '../components/toolbar/ShapesToolbar';

const haveIntersection = (r1, r2) => {
	return !(r2.x > r1.x + r1.width || r2.x + r2.width < r1.x || r2.y > r1.y + r1.height || r2.y + r2.height < r1.y);
};

const ShapesHOC = (Component) => (props) => {
	const {
		shapeProps,
		onChange,
		isSelected,
		stageRef,
		// currentIndex,
		onBorderSelect,
		onBackgroundSelect,
		handleFontSizeAndStyle,
	} = props;

	const trRef = React.useRef();
	const [shapeRef, setShapeRef] = useState(null);
	const [prevClientRect, setPrevClientRect] = useState({});

	React.useEffect(() => {
		if (isSelected && shapeRef) {
			trRef.current.setNode(shapeRef);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected, shapeRef]);

	const handleIntersectedNodes = (event) => {
		var target = event.target;

		const layer = stageRef.current.getLayers()[1];
		const nodes = layer.getChildren();
		const filtered = nodes.filter((node) => node instanceof LineT);
		filtered.forEach((node) => {
			if (node.attrs.points && node.attrs.points.length > 0) {
				const isIntersect = haveIntersection(prevClientRect, node.getClientRect());
				if (isIntersect) {
					const { points, fromId, fromX, fromY, toId, toX, toY } = node.attrs;
					const clonedPoints = points.slice();
					if (target._id === fromId) {
						clonedPoints.splice(0, 2, ...[target.x() + fromX, target.y() + fromY]);
					} else if (target._id === toId) {
						clonedPoints.splice(points.length - 2, 2, ...[target.x() + toX, target.y() + toY]);
					}
					// console.log(points, '>>>>>>>>>>>>>>>', clonedPoints, '>>>>>>>>>>>', target.x(), target.y() );
					node.setAttrs({
						...node.attrs,
						points: clonedPoints,
					});
				}
			}
		});
	};

	const handleMouseEvents = (event) => {
		const type = event.type;
		switch (type) {
			case 'dragstart':
				setPrevClientRect(event.target.getClientRect());
				break;
			case 'dragmove':
				var targetRect = event.target.getClientRect();
				setPrevClientRect(targetRect);
				handleIntersectedNodes(event);
				onChange({
					...shapeProps,
					x: event.target.x(),
					y: event.target.y(),
				});
				break;

			case 'dragend':
				handleIntersectedNodes(event);
				onChange({
					...shapeProps,
					x: event.target.x(),
					y: event.target.y(),
				});
				break;
			case 'transformend':
				const node = event.target;
				onChange({
					...node.attrs,
				});
				break;
			case 'mouseenter':
				event.target.getStage().container().style.cursor = 'pointer';
				break;
			case 'mouseleave':
				event.target.getStage().container().style.cursor = 'default';
				break;
			default:
				break;
		}
	};

	// console.log('isSelected && shapeRef', isSelected, shapeRef);
	return (
		<>
			<Component {...props} setShapeRef={setShapeRef} handleMouseEvents={handleMouseEvents} />

			{isSelected && (
				<Transformer
					ref={trRef}
					borderEnabled={true}
					centeredScaling={false}
					anchorCornerRadius={10}
					anchorFill="#94a9ff"
					anchorStroke="#94a9ff"
					// anchorStroke="#4261ff"
					anchorSize={8}
					borderStroke="#4261ff30"
					padding={10}
					borderDash={[10, 10]}
					enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
				/>
			)}

			{isSelected && shapeRef && (
				<ShapesToolbar {...{ shapeProps, shapeRef, stageRef, onChange, onBorderSelect, onBackgroundSelect, handleFontSizeAndStyle }} />
			)}
		</>
	);
};

export default ShapesHOC;
