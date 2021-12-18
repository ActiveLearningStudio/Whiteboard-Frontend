/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Layer, Stage, Line, Rect } from 'react-konva';
// import Konva from 'konva';
// import useImage from 'use-image';
import Draggable from 'react-draggable';
import { CirclePicker } from 'react-color';
import ChatContent from '@pages/Mainboard/component/ChatContent';
import UploadingIndicator from '@pages/Mainboard/component/UploadingIndicator';
import { Images } from 'src/assets/img';
import useChat from 'src/socket/useChat';
import {
	// Triangulo, Texto, Circulo,
	Imagem,
	Arrowo,
	//   ConnectedArrow,
	NarrowLine,
	Pencil,
} from './components/Formas';
import WhiteBoardTools from './WhiteBoardTools';
import {
	newCircleObj,
	newTriangleObj,
	newSquareObj,
	newImageObj,
	newTextObj,
	newArrowObj,
	addNewCircle,
	addNewImage,
	addNewSquare,
	addNewTriangle,
	addNewText,
	addNewArrow,
	deleteNodeSelected,
	redo,
	undo,
	saveHistory,
	selectShape,
	handleTextDblClick,
	handleTextEdit,
	moveItem,
	duplicateObject,
	setObjColor,
	// handleTouch,
	// handleTouchEnd,
	addNewLine,
	addNewCurvedLine,
	addStickyNote,
	handleFontSizeAndStyle,
	curvedLineObj,
} from './konva-drawing-helpers';
import KeyboardHandlers from './components/keyboard-handlers';
import ColorPickerPalette from './components/ColorPickerPalette';
import AppEmitter from 'src/utils/emitter';
import { EMITTER_KEYS } from '@constants/app-constants';
import { download } from 'src/utils/helpers';
import CurvedLine from './components/CurvedLine';
import { RectWrapper } from './components/CRectangle';
import { TriangleWrapper } from './components/CTriangle';
import { CircleWrapper } from './components/CCircle';
import CStickyNote from './components/CStickyNote';
import { TextWrapper } from './components/CText';
// import CursorPoints from '@pages/Mainboard/component/CursorPoints';
// import { Connection } from './components/Connection';
// import { Col, Modal, Row } from 'antd';
// import ButtonComponent from '@sharedComponent/button';
import CModal from './components/CModal';
import { Border } from './components/CBoards';
// import { SIZE } from './components/config';

function createConnectionPoints(source, destination) {
	return [source.x, source.y, destination.x, destination.y];
}

const Elements = {
	pencil: Pencil,
	square: RectWrapper,
	triangle: TriangleWrapper,
	hexagon: TriangleWrapper,
	circle: CircleWrapper,
	sticky: CStickyNote,
	arrow: Arrowo,
	line: NarrowLine,
	curvedLine: CurvedLine,
	image: Imagem,
	text: TextWrapper,
};

const KonvaMainPresentational = ({
	boardId,
	boardContentAdding,
	addBoardContents,
	handleSaveWhiteboardImage,
	shapes,
	handleClearContent,
	reduxMessages,
	// reduxMessagesLoading,
	// selectedStep,
	// setSelectedStep,
	// steps,
	// setSteps,
	connectionPreview,
	setConnectionPreview,
	connections,
	setConnections,
	userDetails,
}) => {
	const stageRef = useRef(null);
	const containerCanvas = useRef(null);
	const [toggleStates, setToggleStates] = useState({
		chatVisible: false,
		toggleColorPallete: false,
		toggleGrid: true,
	});
	const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 });
	const [tool, setTool] = React.useState('');
	const [isDrawing, setIsDrawing] = React.useState(false);
	const [line, setLine] = React.useState(null);
	// const [stageDraggable, setStageDraggable] = React.useState(true);
	const [scale, setScale] = React.useState(0.5);
	const [editData, setEditData] = React.useState(null);
	const [isOpen, setIsOpen] = React.useState(false);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [pencilProps, setPencilProps] = useState({
		color: '#4261FF',
		size: 5,
	});

	const [state, setState] = useState({
		arrayObjectsLayer: [],
		kanvasWidth: 18.9,
		kanvasHeight: 10,
		widthKanvas: window?.innerWidth,
		heightKanvas: window?.innerHeight,
		zoom: 2,
		newCircleObj,
		newTriangleObj,
		newSquareObj,
		newImageObj,
		newTextObj,
		newArrowObj,
		deltaPosition: {
			x: 0,
			y: 0,
		},
	});

	// const [myCursorPosition, setCursorPosition] = useState({ x: 954 * 2, y: 752 * 2 });

	// const [image] = useImage(Images.Cursor);

	useEffect(() => {
		saveHistory(state.arrayObjectsLayer);
		handleSaveWhiteboardImage(stageRef);
	}, []);

	useEffect(() => {
		const SHAPES = shapes || [];
		// const CONNECTED_LINES = shapes[0]?.connectedLines || [];
		handleSetState({ arrayObjectsLayer: SHAPES || [] }, false);
		// setConnections([...CONNECTED_LINES]);
	}, [shapes]);

	const handleSetState = (newStates, makeAPICall = true) => {
		const states = {
			...state,
			...newStates,
		};
		setState(states);
		if (makeAPICall || !!(states?.arrayObjectsLayer || [])?.length) {
			if (!states.selectedObject) {
				addBoardContents(states.arrayObjectsLayer, connections);
				handleSaveWhiteboardImage(stageRef);
			}
		}
	};

	const handleToggleStates = (label) => {
		setToggleStates({
			...toggleStates,
			[label]: !toggleStates[label],
		});
	};

	const setArrayObject = (arrayObjectsLayer, selectedObject = null) => {
		saveHistory(arrayObjectsLayer);
		handleSetState({
			arrayObjectsLayer,
			// ...(selectedObject && selectedObject),
			selectedObject,
		});
		updateBoardContent(arrayObjectsLayer);
	};

	const loadImage = (base64) => {
		var image = new window.Image();
		image.src = `data:image/png;base64,${base64}`;
		image.addEventListener('load', addNewImage(image, state, handleSetState, updateBoardContent));
	};

	const generateTextStyle = (item) => {
		const { zoom } = state;
		return {
			display: item.textEditVisible ? 'block' : 'none',
			position: 'absolute',
			top: item.textYTextArea + 'px',
			left: item.textXTextArea * zoom + 'px',
			width: item.width * (1 / zoom),
			height: item.height * (1 / zoom),
			fontSize: item.fontSize * (1 / zoom),
			color: item.fill,
			fontStyle: item.fontStyle,
			fontWeight: item.fontStyle,
		};
	};

	const handleImportJson = (jsonValueFromFile) => {
		handleSetState({ arrayObjectsLayer: jsonValueFromFile });
	};

	useEffect(() => {
		const listener = AppEmitter.addListener(EMITTER_KEYS.DOWNLOAD_CANVAS, (type, boardName) =>
			download(type, arrayObjectsLayer, boardName, stageRef)
		);
		const importListener = AppEmitter.addListener(EMITTER_KEYS.IMPORT_JSON, (jsonValueFromFile) => handleImportJson(jsonValueFromFile));
		return () => {
			listener.remove();
			importListener.remove();
		};
	}, [state.arrayObjectsLayer]);

	const clearBoard = () => {
		handleSetState({
			arrayObjectsLayer: [],
		});
		updateBoardContent(arrayObjectsLayer);
	};

	//
	// ─── COLOR PICKER DRAG FUNCTIONALITY STARTS ─────────────────────────────────────
	//
	const handleDrag = (e, ui) => {
		e.stopPropagation();
		const { x, y } = state.deltaPosition;
		handleSetState({
			deltaPosition: {
				x: x + ui.deltaX,
				y: y + ui.deltaY,
			},
		});
	};
	const onStart = () => {
		handleSetState({ activeDrags: ++state.activeDrags });
	};
	const onStop = () => {
		handleSetState({ activeDrags: --state.activeDrags });
	};
	const dragHandlers = { onStart, onStop };
	//
	// ─── COLOR PICKER DRAG FUNCTIONALITY ENDS ─────────────────────────────────────
	//

	const { selectedObject, arrayObjectsLayer } = state;
	const { chatVisible, toggleColorPallete, toggleGrid } = toggleStates;
	const {
		messages,
		user,
		users,
		typingUsers,
		// connectedUsers,
		// cursorPoints,
		activeUsersList,
		sendMessage,
		startTypingMessage,
		stopTypingMessage,
		// updateCursor,
		updateBoardContent,
	} = useChat(boardId, reduxMessages, handleSetState, arrayObjectsLayer, userDetails);

	const handleMouseDown = (e) => {
		if (tool) {
			setIsDrawing(true);
			const obj = {
				type: tool,
				stroke: pencilProps.color,
				strokeWidth: pencilProps.size,
				tension: 0.5,
				lineCap: 'round',
				points: [],
				globalCompositeOperation: 'source-over',
			};
			setLine(obj);
		} else {
			const clickedOnEmpty = e.target === e.target.getStage() || !e.target.getAttrs()?.type;
			if (clickedOnEmpty && !e.target.getAttrs()?.name) {
				selectShape(null, null, state, handleSetState);
			}
		}
	};

	const handleMouseUp = (e) => {
		if (tool) {
			setIsDrawing(false);
			const item = arrayObjectsLayer.slice();
			item.push({
				...line,
				user,
				id: uuidv4(),
			});
			setArrayObject(item);
			setLine(null);
		}
	};

	// const handleCursorMove = (e) => {
	// 	let stage = e?.target?.getStage();
	// 	let tempPosition = stage?.getPointerPosition?.();
	// 	const position = {
	// 		// x: tempPosition?.x,
	// 		// y: tempPosition?.y,
	// 		x: tempPosition?.x * 2,
	// 		y: tempPosition?.y * 2,
	// 	};
	// 	updateCursor(position);
	// 	// setCursorPosition(position);
	// };

	const handleMouseMove = (e) => {
		if (tool) {
			if (!isDrawing) {
				return;
			}
			const stage = stageRef.current;
			const point = stage.getPointerPosition();
			const pointX = (point.x - stagePos.x) / scale;
			const pointY = (point.y - stagePos.y) / scale;
			const points = [...line.points, pointX, pointY];
			setLine({ ...line, points: points });
		}
	};

	const handleZoom = (event) => {
		const newScale = event.evt.deltaY > 0 ? scale * 1.035 : scale / 1.035;
		const stage = stageRef.current;
		if (stage !== null) {
			const { x: pointerX, y: pointerY } = stage.getPointerPosition();
			const mousePointTo = {
				x: (pointerX - stage.x()) / scale,
				y: (pointerY - stage.y()) / scale,
			};
			const newPos = {
				x: pointerX - mousePointTo.x * newScale,
				y: pointerY - mousePointTo.y * newScale,
			};
			setScale(newScale);
			setStagePos(newPos);
		}
	};

	const generateInfiniteGrid = () => {
		var i = 0;
		const WIDTH = 230;
		const HEIGHT = 230;
		const startX = (Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH) / scale;
		const endX = (Math.floor((-stagePos.x + window.innerWidth) / WIDTH) * WIDTH) / scale;

		const startY = (Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT) / scale;
		const endY = (Math.floor((-stagePos.y + window.innerHeight) / HEIGHT) * HEIGHT) / scale;

		// var linesH = [];
		var linesV = [];

		// for (var x = startX; x < endX; x += WIDTH) {
		// 	// linesV.push(<Rectangle x={x} y={y} width={WIDTH} height={HEIGHT} fill={'red'} stroke="black" />);
		// 	linesV.push(<Line fill="#fff" stroke="#f3f3f3" strokeWidth={2} points={[x, startY, x, endY]} />);
		// }
		// for (var y = startY; y < endY; y += HEIGHT) {
		// 	linesH.push(<Line fill="#fff" stroke="#f3f3f3" strokeWidth={2} points={[startX, y, endX, y]} />);
		// }

		for (var x = startX; x < endX; x += WIDTH) {
			for (var y = startY; y < endY; y += HEIGHT) {
				if (i === 4) {
					i = 0;
				}
				linesV.push(<Rect x={x} y={y} width={WIDTH} height={HEIGHT} fill={'white'} stroke="#f3f3f3" />);
			}
		}

		return (
			<>
				{/* {linesH} */}
				{linesV}
			</>
		);
	};

	const handleStageClick = () => {
		if (isOpen) {
			const { node, index, text, fontSize } = editData;
			const { scaleX = 1, scaleY = 1 } = node.attrs;
			const TOTAL_SCALE = scale * Math.max(scaleX, scaleY);
			const list = arrayObjectsLayer.slice();
			const item = list[index];
			list[index] = {
				...item,
				text,
				fontSize: fontSize / TOTAL_SCALE,
			};
			setArrayObject(list);
			setIsOpen(false);
			setEditData(null);
		}
	};

	const handeEdit = (e, index) => {
		const node = e.currentTarget;
		const styles = getStyles(node);

		const text = node.attrs.text;
		const fontSize = getFontSizeToFit(text, node);
		setEditData({
			node: node,
			index: index,
			styles: styles,
			initialText: text,
			text: text,
			fontSize: fontSize,
		});
		setIsOpen(true);
	};

	const getStyles = (textNode) => {
		const { width, height, background, fill, align, padding, scaleX = 1, scaleY = 1 } = textNode.attrs;
		const textPosition = textNode.getAbsolutePosition();
		const stageBox = stageRef.current.container().getBoundingClientRect();
		const areaPosition = {
			x: stageBox.left + textPosition.x,
			y: stageBox.top + textPosition.y,
		};
		const WIDTH = `${width * scale * scaleX}px`;
		const HEIGHT = `${height * scale * scaleY}px`;
		const PADDING = `${padding * scale * scaleX}px ${padding * scale * scaleY}px `;

		return {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			left: areaPosition.x + 'px',
			top: areaPosition.y + 'px',

			width: WIDTH,
			height: HEIGHT,
			padding: PADDING,
			background: background,
			color: fill,
			textAlign: align,
			lineHeight: 1,
		};
	};

	const handleTextChange = (event) => {
		const text = event.target.innerText;
		const { node } = editData;
		const fontSize = getFontSizeToFit(text, node);
		setEditData({
			...editData,
			text: text,
			fontSize: fontSize,
		});
	};

	const getFontSizeToFit = (text, node) => {
		const { width, height, scaleX = 1, scaleY = 1, padding } = node.attrs;
		const WIDTH = scale * scaleX * (width - 2 * padding);
		const HEIGHT = scale * scaleY * (height - 2 * padding);

		const ctx = document.createElement('canvas').getContext('2d');
		ctx.font = `1px Arial`;

		let fitFontWidth = Number.MAX_VALUE;
		const lines = text.match(/[^\r\n\s]+/g) || [];
		// console.log(text, '>>>>>>>>>', lines);
		lines.forEach((line) => {
			fitFontWidth = Math.min(fitFontWidth, WIDTH / ctx.measureText(line).width);
		});
		let fitFontHeight = HEIGHT / 3;
		if (lines.length > 0) {
			if (lines.length === 1) {
				fitFontHeight = HEIGHT / (lines.length * 3);
			} else if (lines.length < 5) {
				fitFontHeight = HEIGHT / (lines.length * 2);
			} else {
				fitFontHeight = HEIGHT / (lines.length * 1.25);
			}
		}
		return Math.min(fitFontHeight, fitFontWidth);
	};

	useEffect(() => {
		user && handleSetState({ user });
	}, [user]);
	useEffect(() => {
		selectedObject && setTool(null);
		tool && handleSetState({ selectedObject: null });
	}, [selectedObject, tool]);

	const borders = selectedObject ? (
		<Border
			id={selectedObject?.id}
			step={selectedObject}
			onAnchorDragEnd={(e) => handleAnchorDragEnd(e, selectedObject)}
			onAnchorDragMove={handleAnchorDragMove}
			onAnchorDragStart={handleAnchorDragStart}
		/>
	) : null;

	// const connectionObjs = connections.map((connection, index) => {
	// 	const fromStep = connection.from;
	// 	const toStep = connection.to;
	// 	const lineEnd = {
	// 		x: toStep.x - fromStep.x,
	// 		y: toStep.y - fromStep.y,
	// 	};
	// 	connection.points = createConnectionPoints({ x: 0, y: 0 }, lineEnd);
	// 	connection.id = Math.random() * 1000;
	// 	return (
	// 		<Line
	// 			key={index}
	// 			x={fromStep.x + fromStep.width / 2}
	// 			y={fromStep.y + fromStep.height / 2}
	// 			points={connection.points}
	// 			stroke="#94a9ff"
	// 			strokeWidth={2.5}
	// 			from={fromStep.id}
	// 			to={toStep.id}
	// 		/>
	// 	);
	// });

	function getRelativePointerPosition(e) {
		var node = e.target;
		var transform = node.getAbsoluteTransform().copy();
		transform.invert();
		var pos = node.getStage().getPointerPosition();
		return transform.point(pos);
	}

	function handleAnchorDragStart(e) {
		const position = e.target.position();
		setConnectionPreview(
			<Line x={position.x} y={position.y} points={createConnectionPoints(position, position)} stroke="black" strokeWidth={2} />
		);
	}

	function handleAnchorDragMove(e) {
		const position = e.target.position();
		const mousePos = getRelativePointerPosition(e);
		setConnectionPreview(
			<Line x={position.x} y={position.y} points={createConnectionPoints({ x: 0, y: 0 }, mousePos)} stroke="black" strokeWidth={2} />
		);
	}

	function handleAnchorDragEnd(e, fromObject) {
		var mousePos = {
			x: connectionPreview.props.x + connectionPreview.props.points[2],
			y: connectionPreview.props.y + connectionPreview.props.points[3],
		};
		const connectionTo = detectConnection(mousePos, fromObject, arrayObjectsLayer);
		console.log('connectionTo', connectionTo);
		if (connectionTo !== null) {
			const arrowProps = {
				...curvedLineObj,
			};
			arrowProps.id = Math.round(Math.random() * 1000);
			arrowProps.points = getConnectionPoints(fromObject, connectionTo);
			arrowProps.from = fromObject;
			arrowProps.to = connectionTo;
			//arrowProps.offsets = getConnectionPointOffsets(fromObject, connectionTo, connectionPreview, mousePos);
			setConnectionPreview(null);
			arrayObjectsLayer.push({ ...arrowProps, user });
			setArrayObject(arrayObjectsLayer);
			setConnections([
				...connections,
				{
					to: connectionTo,
					from: fromObject,
					id: arrowProps.id,
				},
			]);
		} else {
			setConnectionPreview(null);
		}
	}

	function getConnectionPoints(fromObject, toObject) {
		var x1 = fromObject.x;
		var y1 = fromObject.y;
		var x2 = toObject.x;
		var y2 = toObject.y;

		if (fromObject.width) {
			x1 = x1 + fromObject.width / 2;
			y1 = y1 + fromObject.height / 2;
		}
		if (toObject.width) {
			x2 = x2 + toObject.width / 2;
			y2 = y2 + toObject.height / 2;
		}
		var midX = (x1 + x2) / 2;
		var midY = (y1 + y2) / 2 + 200;

		return [x1, y1, midX, midY, x2, y2];
	}

	// function getConnectionPointOffsets(fromObject, toObject, connectionPreview, mousePos) {
	// 	var borderspace = 25;
	// 	var offsets = {
	// 		from: {
	// 			x: connectionPreview.props.x - fromObject.x,
	// 			y: connectionPreview.props.y - fromObject.y,
	// 		},
	// 		to: {
	// 			x: mousePos.x - toObject.x,
	// 			y: mousePos.y - toObject.y,
	// 		},
	// 	};

	// 	if (fromObject.radius) {
	// 		if (offsets.from.x === 0) {
	// 			offsets.from.y = offsets.from.y < 0 ? offsets.from.y + borderspace : offsets.from.y;
	// 			offsets.from.y = offsets.from.y > 0 ? offsets.from.y - borderspace : offsets.from.y;
	// 		}
	// 		if (offsets.from.y === 0) {
	// 			offsets.from.x = offsets.from.x < 0 ? offsets.from.x + borderspace : offsets.from.x;
	// 			offsets.from.x = offsets.from.x > 0 ? offsets.from.x - borderspace : offsets.from.x;
	// 		}
	// 	}
	// 	if (fromObject.width) {
	// 		if (offsets.from.x === 0) {
	// 			offsets.from.y = offsets.from.y + borderspace;
	// 		}
	// 		if (offsets.from.x === fromObject.width) {
	// 			offsets.from.x = offsets.from.x - borderspace;
	// 		}
	// 		if (offsets.from.y === 0) {
	// 			offsets.from.x = offsets.from.x + borderspace;
	// 		}
	// 		if (offsets.from.y === fromObject.height) {
	// 			offsets.from.y = offsets.from.y - borderspace;
	// 		}
	// 	}

	// 	if (toObject.radius) {
	// 		if (offsets.to.x === 0) {
	// 			offsets.to.y = offsets.to.y < 0 ? offsets.to.y + borderspace : offsets.to.y;
	// 			offsets.to.y = offsets.to.y > 0 ? offsets.to.y - borderspace : offsets.to.y;
	// 		}
	// 		if (offsets.to.y === 0) {
	// 			offsets.to.x = offsets.to.x < 0 ? offsets.to.x + borderspace : offsets.to.x;
	// 			offsets.to.x = offsets.to.x > 0 ? offsets.to.x - borderspace : offsets.to.x;
	// 		}
	// 	}
	// 	if (toObject.width) {
	// 		if (offsets.to.x === 0) {
	// 			offsets.to.y = offsets.to.y + borderspace;
	// 		}
	// 		if (offsets.to.x === toObject.width) {
	// 			offsets.to.x = offsets.to.x - borderspace;
	// 		}
	// 		if (offsets.to.y === 0) {
	// 			offsets.to.x = offsets.to.x + borderspace;
	// 		}
	// 		if (offsets.to.y === toObject.height) {
	// 			offsets.to.y = offsets.to.y - borderspace;
	// 		}
	// 	}

	// 	return offsets;
	// }

	function detectConnection(position, fromObject, arrayObjectsLayer) {
		// const intersectingStep = Object.keys(steps).find((key) => {
		// 	return key !== id && hasIntersection(position, steps[key]);
		// });
		const intersectingStep = (arrayObjectsLayer || []).find((shape, index) => {
			return shape.id !== fromObject.id && shape.type !== 'curvedLine' && hasIntersection(position, arrayObjectsLayer[index]);
		});

		if (intersectingStep) {
			return intersectingStep;
		}
		return null;
	}

	function hasIntersection(position, step) {
		var targetX = step.x;
		var targetY = step.y;
		var width = step.width;
		var height = step.height;

		if (step.radius) {
			var radius = step.radius;
			targetX = step.x - radius;
			targetY = step.y - radius;
			width = radius * 2;
			height = radius * 2;
		}
		const value = !(targetX > position.x || targetX + width < position.x || targetY > position.y || targetY + height < position.y);
		return value;
	}

	function adjustLines(element, arrayObjectsLayer) {
		connections.map((connection, index) => {
			if (element.id === connection.from.id) {
				connection.from = element;
			}
			if (element.id === connection.to.id) {
				connection.to = element;
			}
			return null;
		});
		setConnections([...connections]);
		(arrayObjectsLayer || []).find((shape, index) => {
			if (shape.from && element.id === shape.from.id) {
				shape.from = element;
				shape.points = getConnectionPoints(shape.from, shape.to);
			}
			if (shape.to && element.id === shape.to.id) {
				shape.to = element;
				shape.points = getConnectionPoints(shape.from, shape.to);
			}
			arrayObjectsLayer[index] = shape;
			return null;
		});
		return arrayObjectsLayer;
	}

	return (
		<div>
			<div ref={containerCanvas}>
				<div
					className="team"
					onClick={() => {
						handleToggleStates('chatVisible', true);
					}}>
					<img className="team__logo" src={Images.Message} alt="" />
					<button className="team__meet">Team Meet</button>
				</div>
				{chatVisible ? (
					<div className="chat__ui">
						<ChatContent
							{...{
								handleToggleStates,
								messages,
								user,
								users,
								typingUsers,
								sendMessage,
								startTypingMessage,
								stopTypingMessage,
								activeUsersList,
							}}
						/>
					</div>
				) : null}

				<WhiteBoardTools
					{...{
						handlePencilDrawing: (value = false) => {
							// if (tool) {
							// 	setTool('');
							// 	setStageDraggable(true);
							// } else {
							// 	setTool('pencil');
							// 	setStageDraggable(false);
							// }
							setTool(value ? 'pencil' : null);
						},
						handleClearContent: () => !!arrayObjectsLayer.length && setIsConfirmModalOpen(true),
						addNewCircle: () => addNewCircle(state, handleSetState, updateBoardContent),
						addNewTriangle: () => addNewTriangle(state, handleSetState, false, updateBoardContent),
						addNewHexagon: () => addNewTriangle(state, handleSetState, true, updateBoardContent),
						addNewSquare: () => addNewSquare(state, handleSetState, updateBoardContent),
						addNewText: () => addNewText(state, handleSetState, updateBoardContent),
						addNewArrow: () => addNewArrow(state, handleSetState, updateBoardContent),
						addNewLine: () => addNewLine(state, handleSetState, updateBoardContent),
						addNewCurvedLine: () => addNewCurvedLine(state, handleSetState, updateBoardContent),
						addStickyNote: (color) => addStickyNote(state, handleSetState, color, updateBoardContent),
						moveItem: (front) => moveItem(front, state, handleSetState, updateBoardContent),
						duplicateObject: () => duplicateObject(state, handleSetState, updateBoardContent),
						clearBoard: clearBoard,
						handleToggleStates: () => handleToggleStates('toggleColorPallete'),
						undo: () => undo(handleSetState, updateBoardContent),
						redo: () => redo(handleSetState, updateBoardContent),
						loadImage: (base64) => loadImage(base64),
						selectedObject,
						setPencilProps,
						pencilProps,
					}}
				/>
				<Stage
					ref={stageRef}
					width={window?.innerWidth}
					height={window?.innerHeight}
					scaleY={scale}
					scaleX={scale}
					position={stagePos}
					style={{ backgroundColor: 'white' }}
					// draggable={stageDraggable}
					draggable={!!!tool}
					onClick={handleStageClick}
					// draggable={!isTouchEnabled()}
					onWheel={handleZoom}
					// onTouchMove={(e) => handleTouch(e, stageRef)}
					// onTouchEnd={handleTouchEnd}
					onDragEnd={(e) => {
						setStagePos(e.currentTarget.getAbsolutePosition());
					}}
					onMouseDown={handleMouseDown}
					onMouseMove={(e) => {
						handleMouseMove(e);
						// handleCursorMove(e);
					}}
					onMouseUp={handleMouseUp}>
					<Layer>{toggleGrid ? generateInfiniteGrid() : null}</Layer>
					<Layer>
						{borders}
						{connectionPreview}
						{/* {connectionObjs} */}
						{tool === 'pencil' && line && line.points.length > 0 && <Line {...line} />}
						{/* {Object.keys(cursorPoints).map((key, index) => (
							<CursorPoints
								{...{
									position: cursorPoints[key]?.position || { x: 0, y: 0 },
									name: cursorPoints[key]?.user?.userName || '',
									color: cursorPoints[key]?.user?.color || '',
									image,
									key: index,
								}}
							/>
						))} */}
						{(arrayObjectsLayer || []).map((item, index) => {
							const props = {
								key: index,
								currentIndex: index,
								shapeProps: item,
								stageRef: stageRef,
								isSelected: selectedObject && item.id === selectedObject.id,
								onSelect: () => {
									selectShape(item, null, state, handleSetState);
								},
								onChange: (newAttrs) => {
									var item = arrayObjectsLayer.slice();
									item[index] = newAttrs;
									item = adjustLines(item[index], item);
									setArrayObject(item, item[index]);
									// selectedObject && item[index].id === selectedObject.id && handleSetState({ selectedObject: item[index] });
									// adjustLines(item[index]);
								},
								onBorderSelect: (color) => setObjColor(color, state, handleSetState, updateBoardContent, true),
								onBackgroundSelect: (color) => setObjColor(color, state, handleSetState, updateBoardContent),
								handleFontSizeAndStyle: (key, value) => handleFontSizeAndStyle(key, value, state, handleSetState, updateBoardContent),
							};
							const Component = Elements[item.type];
							return (
								<Component
									{...{
										...props,
										...(item.type === 'text' && {
											onSelect: () => {
												selectShape(item, index + 1, state, handleSetState);
											},
											handleTextDblClick: (e) => handleTextDblClick(e, index, state, handleSetState, stageRef, containerCanvas),
										}),
										...(item.type === 'sticky' && {
											handleTextDblClick: (e) => {
												handeEdit(e, index);
											},
										}),
									}}
								/>
							);
						})}
						{/* <ConnectedArrow {...{ node1: arrayObjectsLayer?.[0], node2: arrayObjectsLayer?.[1] }} /> */}
						{/* <Connection
							y={253}
							x={420}
							capX={-185}
							capY={393}
							path="M0 0 H-50 q -10 0 -10 -10 V-65 q 0 -10 -10 -10 H-390 q -10 0 -10 10 V137 q 0 10 10 10 H-387"
							colour="#CCCCCC"
							type="regress"
							label="Back to CV List"
							labelX={50}
							labelY={168}
							labelWidth={93}
						/> */}
					</Layer>
				</Stage>
			</div>
			<CModal
				{...{
					desc: 'Are you sure want to remove permanently erase the items to the bin?',
					isConfirmModalOpen,
					setIsConfirmModalOpen,
					handleClearContent,
				}}
			/>

			{isOpen && (
				<div style={{ ...editData.styles, fontSize: editData.fontSize }}>
					<div
						contentEditable={true}
						suppressContentEditableWarning={true}
						onInput={handleTextChange}
						style={{ width: '100%', outline: 'none' }}>
						{editData.initialText}
					</div>
				</div>
			)}

			{arrayObjectsLayer &&
				arrayObjectsLayer?.map((item, index) => {
					return item ? (
						<textarea
							className="c_text_input"
							autoFocus
							key={index}
							value={item.textValue}
							style={{ ...generateTextStyle(item) }}
							onChange={(e) => handleTextEdit(e, index, state, handleSetState, updateBoardContent)}
						/>
					) : (
						false
					);
				})}

			{toggleColorPallete && (
				<div onClick={() => handleToggleStates('toggleColorPallete')} className="containerColors">
					<Draggable onDrag={handleDrag} {...dragHandlers}>
						<div className="containerColorPickerPalette" onClick={(e) => e.stopPropagation()}>
							<ColorPickerPalette setObjColor={(color) => setObjColor(color, state, handleSetState, updateBoardContent)} />
							<div className="containerCirclePicker">
								<CirclePicker
									color={selectedObject?.fill}
									onChangeComplete={(color) => setObjColor(color, state, handleSetState, updateBoardContent)}
									onChange={(color) => setObjColor(color, state, handleSetState, updateBoardContent)}
								/>
							</div>
						</div>
					</Draggable>
				</div>
			)}

			{/* keyboard press handler */}
			<KeyboardHandlers {...{ deleteNodeSelected, state, handleSetState, updateBoardContent }} />

			{/* toggle grid for the canvas */}
			<div className="grid">
				<img className="grid__logo" src={Images.Gridx} alt="" onClick={() => handleToggleStates('toggleGrid', !toggleGrid)} />
			</div>

			{/* loader while saving data in backend */}
			{boardContentAdding && <UploadingIndicator />}
		</div>
	);
};

export default KonvaMainPresentational;
