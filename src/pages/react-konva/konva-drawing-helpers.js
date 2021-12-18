import { notification } from 'antd';
import React from 'react';

//
// ─── GRID UI IMPLEMENTATION STARTS ──────────────────────────────────────────────
//
import { Line, Rect } from 'react-konva';

const grid = 100;
const gridWidth = window?.innerWidth * 10;

const linesA = [];
const linesB = [];

for (let i = 0; i < gridWidth / grid; i++) {
	linesA.push(<Line strokeWidth={2} stroke={'#ddd'} points={[i * grid, 0, i * grid, gridWidth]} />);

	linesB.push(<Line strokeWidth={2} stroke={'#ddd'} points={[0, i * grid, gridWidth, i * grid]} />);
}

//
// ─── GRID UI IMPLEMENTATION ENDS ────────────────────────────────────────────────
//

const horizontalCenter = window?.innerWidth;
const verticalCenter = window?.innerHeight;

const centerPosition = {
	y: verticalCenter,
	x: horizontalCenter,
};

//
// ─── ELEMENT OBJECT CREATION ────────────────────────────────────────────────────
//
const newCircleObj = {
	radius: 150,
	fill: 'transparent',
	stroke: '#637ef7',
	id: 0,
	type: 'circle',
	...centerPosition,
};
const newSquareObj = {
	width: 200,
	height: 200,
	fill: 'transparent',
	stroke: '#637ef7',
	id: 0,
	type: 'square',
	...centerPosition,
};
const newTriangleObj = {
	sides: 3,
	radius: 150,
	fill: 'transparent',
	stroke: '#637ef7',
	id: 0,
	type: 'triangle',
	...centerPosition,
};
const newHexagonObj = {
	sides: 6,
	radius: 150,
	fill: 'transparent',
	stroke: '#637ef7',
	id: 0,
	type: 'hexagon',
	...centerPosition,
};
const newImageObj = {
	x: 100,
	image: null,
	id: 50,
	type: 'image',
	...centerPosition,
};
const newTextObj = {
	textEditVisible: false,
	fill: 'black',
	textX: 0,
	textY: 0,
	textYTextArea: 0,
	textXTextArea: 0,
	textValue: 'Double clicks to edit',
	fontSize: 28,
	width: 250,
	height: 150,
	fontStyle: 'normal',
	align: 'left',
	id: 0,
	type: 'text',
	...centerPosition,
};

const stickyNoteObj = {
	type: 'sticky',
	x: 500,
	y: 500,
	width: 500,
	height: 500,
	draggable: true,
	background: '#d3f093',
	padding: 40,
	text: 'Type something',
	fontSize: 90,
	fontStyle: 'normal',
	align: 'center',
	verticalAlign: 'middle',
	fill: 'black',
	wrap: 'word',
};

const newArrowObj = {
	type: 'arrow',
	strokeWidth: 3,
	stroke: 'black',
	fill: 'black',
	pointerLength: 20,
	pointerWidth: 20,
};

const newLineObj = {
	type: 'line',
	strokeWidth: 4,
	stroke: 'black',
	fill: 'black',
};

const curvedLineObj = {
	type: 'curvedLine',
	strokeWidth: 4,
	stroke: 'black',
};

var HISTORY = [];

var POSITION = 0;

function saveHistory(history) {
	var remove = HISTORY.length - 1 - POSITION;
	HISTORY = HISTORY.slice(0, HISTORY.length - remove);
	HISTORY.push(history.slice(0));
	POSITION = HISTORY.length - 1;
}

function revertHistory() {
	return HISTORY[POSITION];
}

//
// ─── ADD NEW CIRCLE ─────────────────────────────────────────────────────────────
//
const addNewCircle = (state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, user } = state;
	let newCircleObj = Object.assign({}, { ...state.newCircleObj, user });
	newCircleObj.id = Math.round(Math.random() * 10000);
	let selectedObject = newCircleObj;
	arrayObjectsLayer.push(newCircleObj);
	saveHistory(arrayObjectsLayer);
	// updateBoardContent(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
};

//
// ─── ADD NEW TRIANGLE ───────────────────────────────────────────────────────────
//
const addNewTriangle = (state, handleSetState, isHexagon = false, updateBoardContent) => {
	let { arrayObjectsLayer, user } = state;
	let newTriangleObj = Object.assign({}, isHexagon ? newHexagonObj : state.newTriangleObj);
	newTriangleObj.id = Math.round(Math.random() * 10000);
	let selectedObject = newTriangleObj;
	arrayObjectsLayer.push({ ...newTriangleObj, user });
	saveHistory(arrayObjectsLayer);
	updateBoardContent(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
};

//
// ─── ADD NEW SQUARE ─────────────────────────────────────────────────────────────
//
const addNewSquare = (state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, user } = state;
	let newSquareObj = Object.assign({}, { ...state.newSquareObj, user });
	newSquareObj.id = Math.round(Math.random() * 10000);
	let selectedObject = newSquareObj;
	arrayObjectsLayer.push(newSquareObj);
	saveHistory(arrayObjectsLayer);
	updateBoardContent(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
};
//
// ─── ADD IMAGE ──────────────────────────────────────────────────────────────────
//
const addNewImage = (image, state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, newImageObj } = state;
	newImageObj.id = Math.round(Math.random() * 10000);
	newImageObj.image = image;
	arrayObjectsLayer.push(newImageObj);
	saveHistory(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
	});
	// updateBoardContent(arrayObjectsLayer);
};

//
// ─── ADD NEW TEXT ───────────────────────────────────────────────────────────────
//
const addNewText = (state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, newTextObj, user } = state;
	newTextObj.id = Math.round(Math.random() * 10000);
	arrayObjectsLayer.push({ ...newTextObj, user });
	let selectedObject = newTextObj;
	saveHistory(arrayObjectsLayer);
	updateBoardContent(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
};

//
// ─── Handle new Line ───────────────────────────────────────────────────────────
//

const addNewLine = (state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, user } = state;
	const arrowProps = {
		...newLineObj,
	};
	arrowProps.id = Math.round(Math.random() * 10000);
	const x1 = Math.random() * (window.innerWidth - 200);
	const y1 = Math.random() * (window.innerHeight - 200);
	arrowProps.points = [x1, y1, x1 + 300, y1];
	arrayObjectsLayer.push({ ...arrowProps, user });
	let selectedObject = arrowProps;
	saveHistory(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
	updateBoardContent(arrayObjectsLayer);
};

//
// ─── HANDLE NEW ARROW ───────────────────────────────────────────────────────────
//
const addNewArrow = (state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, newArrowObj, user } = state;
	const arrowProps = {
		...newArrowObj,
	};
	arrowProps.id = Math.round(Math.random() * 10000);
	const x1 = Math.random() * (window.innerWidth - 200);
	const y1 = Math.random() * (window.innerHeight - 200);
	arrowProps.points = [x1, y1, x1 + 300, y1];
	arrayObjectsLayer.push({ ...arrowProps, user });
	let selectedObject = arrowProps;
	saveHistory(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
	updateBoardContent(arrayObjectsLayer);
};

const addNewCurvedLine = (state, handleSetState, updateBoardContent, points) => {
	let { arrayObjectsLayer, user } = state;
	const arrowProps = {
		...curvedLineObj,
	};
	arrowProps.id = Math.round(Math.random() * 10000);
	const x1 = Math.random() * (window.innerWidth - 200);
	const y1 = Math.random() * (window.innerHeight - 200);
	const x2 = x1 + 600;
	const y2 = y1;
	const midX = (x1 + x2) / 2;
	const midY = (y1 + y2) / 2 + 200;
	arrowProps.points = points ? points : [x1, y1, midX, midY, x2, y2];
	arrayObjectsLayer.push({ ...arrowProps, user });
	let selectedObject = arrowProps;
	saveHistory(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
	updateBoardContent(arrayObjectsLayer);
};

//
// ─── HANDLE LAYERING ────────────────────────────────────────────────────────────
//
const moveItem = (front, state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, selectedObject } = state;
	if (state.selectedObject) {
		front
			? arrayObjectsLayer.push(
					arrayObjectsLayer.splice(
						arrayObjectsLayer.findIndex((elt) => elt.id === selectedObject.id),
						1
					)[0]
			  )
			: arrayObjectsLayer.unshift(
					arrayObjectsLayer.splice(
						arrayObjectsLayer.findIndex((elt) => elt.id === selectedObject.id),
						1
					)[0]
			  );
		saveHistory(arrayObjectsLayer);
		handleSetState({
			arrayObjectsLayer,
		});
		updateBoardContent(arrayObjectsLayer);
	}
};

//
// ─── MAKE DUPLICATE ELEMENT ─────────────────────────────────────────────────────
//
const duplicateObject = (state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer, selectedObject, user } = state;
	if (selectedObject) {
		let copy = { ...selectedObject, user };
		copy.x = copy.x + 10;
		copy.y = copy.y + 10;
		copy.id = Math.round(Math.random() * 10000);
		selectedObject = { ...copy };
		arrayObjectsLayer.push(copy);
		saveHistory(arrayObjectsLayer);
		handleSetState({
			arrayObjectsLayer,
			selectedObject,
		});
		updateBoardContent(arrayObjectsLayer);
	}
};

//
// ─── SET COLOR FOR OBJECT ───────────────────────────────────────────────────────
//
const setObjColor = (color, state, handleSetState, updateBoardContent, isBorder = false) => {
	let arrayObjectsLayer = state.arrayObjectsLayer;
	let selectedObject = { ...state.selectedObject };

	let COLOR = typeof color === 'string' ? color : color.hex;

	for (let i = 0; i < arrayObjectsLayer.length; i++) {
		if (selectedObject.id === arrayObjectsLayer[i].id) {
			if (isBorder) {
				arrayObjectsLayer[i].stroke = COLOR;
			} else {
				arrayObjectsLayer[i].fill = COLOR;
			}
		}
	}
	saveHistory(arrayObjectsLayer);
	handleSetState({
		selectedObject,
		arrayObjectsLayer,
	});
	updateBoardContent(arrayObjectsLayer);
};

const handleFontSizeAndStyle = (key, value, state, handleSetState, updateBoardContent) => {
	let arrayObjectsLayer = state.arrayObjectsLayer;
	let selectedObject = { ...state.selectedObject };

	for (let i = 0; i < arrayObjectsLayer.length; i++) {
		if (selectedObject.id === arrayObjectsLayer[i].id) {
			arrayObjectsLayer[i][key] = value;
		}
	}
	saveHistory(arrayObjectsLayer);
	handleSetState({
		selectedObject,
		arrayObjectsLayer,
	});
	updateBoardContent(arrayObjectsLayer);
};

//
// ─── TEXT HANDLE EDIT ───────────────────────────────────────────────────────────
//
const handleTextDblClick = (e, index, state, handleSetState, stageRef, containerCanvas) => {
	// console.log('stageRef, containerCanvas', containerCanvas.current.scrollLeft);
	const absPos = e.target.getAbsolutePosition();
	const stageBox = stageRef.current.container().getBoundingClientRect();
	let {
		arrayObjectsLayer,
		// widthKanvas
	} = state;
	for (let i; i < arrayObjectsLayer.length; i++) {
		arrayObjectsLayer[i].textEditVisible = false;
	}
	arrayObjectsLayer[index].textEditVisible = true;
	arrayObjectsLayer[index].textXTextArea = (stageBox.left + absPos.x + containerCanvas.current.scrollLeft) / state.zoom;
	arrayObjectsLayer[index].textYTextArea =
		stageBox.bottom +
		absPos.y -
		stageBox.height +
		// 40 +
		containerCanvas.current.scrollTop;
	saveHistory(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
	});
};

//
// ─── HANDLE TEXT EDITS ──────────────────────────────────────────────────────────
//
const handleTextEdit = (e, index, state, handleSetState, updateBoardContent) => {
	let { arrayObjectsLayer } = state;
	arrayObjectsLayer[index].textValue = e.target.value;
	saveHistory(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
	});
	updateBoardContent(arrayObjectsLayer);
};

//
// ─── SELECT ELEMENT ─────────────────────────────────────────────────────────────
//
const selectShape = (selectedObject, index = undefined, state, handleSetState) => {
	let { arrayObjectsLayer, indexTextSelected } = state;
	// fecha a text area do texto
	for (let i; i < arrayObjectsLayer.length; i++) {
		arrayObjectsLayer[i].textEditVisible = false;
	}
	if (index) {
		indexTextSelected = index - 1;
		arrayObjectsLayer[indexTextSelected].textEditVisible = false;
	} else {
		if (arrayObjectsLayer[indexTextSelected]) {
			arrayObjectsLayer[indexTextSelected].textEditVisible = false;
			indexTextSelected = undefined;
		}
	}
	handleSetState({
		selectedObject,
		arrayObjectsLayer,
		indexTextSelected,
	});
};

//
// ─── DELETE SELECTED NODE ───────────────────────────────────────────────────────
//
const deleteNodeSelected = (state, handleSetState, updateBoardContent) => {
	let { selectedObject, arrayObjectsLayer } = state;
	if (selectedObject) {
		if (arrayObjectsLayer.length > 0) {
			for (let i = 0; i < arrayObjectsLayer.length; i++) {
				if (arrayObjectsLayer[i].type === 'text') arrayObjectsLayer[i].textEditVisible = false;
				if (selectedObject?.id === arrayObjectsLayer[i].id) {
					arrayObjectsLayer.splice(i, 1);
				}
			}
			saveHistory(arrayObjectsLayer);
			handleSetState(
				{
					arrayObjectsLayer,
				},
				true
			);
			updateBoardContent(arrayObjectsLayer);
		}
	} else {
		notification.info({
			message: `Please select an element to delete`,
			description: '',
			placement: 'bottomLeft',
		});
	}
};

//
// ─── HANDLE NEW Sticky note ───────────────────────────────────────────────────────────
//
const addStickyNote = (state, handleSetState, color, updateBoardContent) => {
	let { arrayObjectsLayer, user } = state;
	const arrowProps = {
		...stickyNoteObj,
		background: color || stickyNoteObj.background,
	};
	arrowProps.id = Math.round(Math.random() * 10000);
	arrowProps.x = Math.random() * (window.innerWidth - 200);
	arrowProps.y = Math.random() * (window.innerHeight - 200);
	arrayObjectsLayer.push({ ...arrowProps, user });
	let selectedObject = arrowProps;
	saveHistory(arrayObjectsLayer);
	handleSetState({
		arrayObjectsLayer,
		selectedObject,
	});
	updateBoardContent(arrayObjectsLayer);
};

//
// ─── UNDO REDO ──────────────────────────────────────────────────────────────────
//
const undo = (handleSetState, updateBoardContent) => {
	POSITION = POSITION === 0 ? POSITION : POSITION - 1;
	const history = revertHistory();
	handleSetState({
		arrayObjectsLayer: history.slice(0),
	});
	updateBoardContent(history.slice(0));
};

const redo = (handleSetState, updateBoardContent) => {
	POSITION = POSITION < HISTORY.length - 1 ? POSITION + 1 : POSITION;
	const history = revertHistory();
	handleSetState({
		arrayObjectsLayer: history.slice(0),
	});
	updateBoardContent(history.slice(0));
};

//
// ─── ZOOMING HELPERS STARTS ────────────────────────────────────────────────────────────
//
const scaleBy = 1.035;

export function getDistance(p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function getCenter(p1, p2) {
	return {
		x: (p1.x + p2.x) / 2,
		y: (p1.y + p2.y) / 2,
	};
}

function isTouchEnabled() {
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

let lastCenter = null;
let lastDist = 0;

function zoomStage(event, stageRef) {
	event.evt.preventDefault();
	if (stageRef.current !== null) {
		const stage = stageRef.current;
		const oldScale = stage.scaleX();
		const { x: pointerX, y: pointerY } = stage.getPointerPosition();
		const mousePointTo = {
			x: (pointerX - stage.x()) / oldScale,
			y: (pointerY - stage.y()) / oldScale,
		};
		const newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
		stage.scale({ x: newScale, y: newScale });
		const newPos = {
			x: pointerX - mousePointTo.x * newScale,
			y: pointerY - mousePointTo.y * newScale,
		};
		stage.position(newPos);
		stage.batchDraw();
	}
}

function handleTouch(e, stageRef) {
	e.evt.preventDefault();
	var touch1 = e.evt.touches[0];
	var touch2 = e.evt.touches[1];
	const stage = stageRef.current;
	if (stage !== null) {
		if (touch1 && touch2) {
			if (stage.isDragging()) {
				stage.stopDrag();
			}

			var p1 = {
				x: touch1.clientX,
				y: touch1.clientY,
			};
			var p2 = {
				x: touch2.clientX,
				y: touch2.clientY,
			};

			if (!lastCenter) {
				lastCenter = getCenter(p1, p2);
				return;
			}
			var newCenter = getCenter(p1, p2);

			var dist = getDistance(p1, p2);

			if (!lastDist) {
				lastDist = dist;
			}

			// local coordinates of center point
			var pointTo = {
				x: (newCenter.x - stage.x()) / stage.scaleX(),
				y: (newCenter.y - stage.y()) / stage.scaleX(),
			};

			var scale = stage.scaleX() * (dist / lastDist);

			stage.scaleX(scale);
			stage.scaleY(scale);

			// calculate new position of the stage
			var dx = newCenter.x - lastCenter.x;
			var dy = newCenter.y - lastCenter.y;

			var newPos = {
				x: newCenter.x - pointTo.x * scale + dx,
				y: newCenter.y - pointTo.y * scale + dy,
			};

			stage.position(newPos);
			stage.batchDraw();

			lastDist = dist;
			lastCenter = newCenter;
		}
	}
}

function handleTouchEnd() {
	lastCenter = null;
	lastDist = 0;
}
//
// ─── ZOOMING HELPERS ENDS ────────────────────────────────────────────────────────────
//

//
// ─── INFINITE GRID HELPERS ──────────────────────────────────────────────────────
//
const WIDTH = 40;
const HEIGHT = WIDTH;

const gridColors = [
	['white', 'white'],
	['white', 'white'],
];

const generateInfiniteGrid = (stagePos) => {
	const startX = Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH;
	const endX = Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH;

	const startY = Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
	const endY = Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

	const gridComponents = [];
	var i = 0;
	for (var x = startX; x < endX; x += WIDTH) {
		for (var y = startY; y < endY; y += HEIGHT) {
			if (i === 4) {
				i = 0;
			}

			const indexX = Math.abs(x / WIDTH) % gridColors.length;
			const indexY = Math.abs(y / HEIGHT) % gridColors[0].length;
			gridComponents.push(<Rect x={x} y={y} width={WIDTH} height={HEIGHT} fill={gridColors[indexX][indexY]} stroke="#ddd" />);
		}
	}
	return gridComponents;
};

export {
	linesA,
	linesB,
	newCircleObj,
	newTriangleObj,
	newHexagonObj,
	newSquareObj,
	newImageObj,
	newTextObj,
	newArrowObj,
	newLineObj,
	curvedLineObj,
	stickyNoteObj,
	addStickyNote,
	centerPosition,
	saveHistory,
	undo,
	redo,
	selectShape,
	addNewCircle,
	addNewTriangle,
	addNewSquare,
	addNewImage,
	addNewText,
	addNewArrow,
	addNewLine,
	addNewCurvedLine,
	duplicateObject,
	setObjColor,
	moveItem,
	handleTextEdit,
	deleteNodeSelected,
	handleTextDblClick,
	generateInfiniteGrid,
	// zooming
	isTouchEnabled,
	zoomStage,
	handleTouch,
	handleTouchEnd,
	handleFontSizeAndStyle,
};
