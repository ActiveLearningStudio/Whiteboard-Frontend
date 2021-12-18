import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UploadingIndicator from './UploadingIndicator';
import ColorToolBarComponent from './ColorToolBarComponent';
import WhiteBoardTools from './WhiteBoardTools';
import {
	cursorForPosition,
	// draw,
	getElementAtPosition,
	getFilteredElements,
	drawElement,
	adjustmentRequired,
	adjustElementCoordinates,
} from './drawingHelpers';
import LottieComponent from '@sharedComponent/lottie-component';
import Message from '../../../assets/img/Messager.svg';
import Gridx from '../../../assets/img/Grid Black.svg';
import LottieFile from 'src/assets/lottie-files';
import ChatContent from './ChatContent';
import './style.scss';
import useChat from 'src/socket/useChat';

const NAV_BAR_HEIGHT = 50;

const createElement = (id, x1, y1, x2, y2, type, borderColor, size, text, fillColor, imageSrc) => ({
	id,
	x1,
	y1,
	x2,
	y2,
	type,
	borderColor,
	size,
	text,
	fillColor,
	imageSrc,
	points: [{ x: x1, y: y1 }],
});

// const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
	const { x1, y1, x2, y2 } = coordinates;
	switch (position) {
		case 'tl':
		case 'start':
			return { x1: clientX, y1: clientY, x2, y2 };
		case 'tr':
			return { x1, y1: clientY, x2: clientX, y2 };
		case 'bl':
			return { x1: clientX, y1, x2, y2: clientY };
		case 'br':
		case 'end':
			return { x1, y1, x2: clientX, y2: clientY };
		default:
			return null;
	}
};

const useHistory = (initialState) => {
	const [index, setIndex] = useState(0);
	const [history, setHistory] = useState([initialState]);

	const setState = (action, overwrite = false) => {
		const newState = typeof action === 'function' ? action(history[index]) : action;
		if (overwrite) {
			const historyCopy = [...history];
			historyCopy[index] = newState;
			setHistory(historyCopy);
		} else {
			const updatedState = [...history].slice(0, index + 1);
			setHistory([...updatedState, newState]);
			setIndex((prevState) => prevState + 1);
		}
	};

	const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
	const redo = () => index < history.length - 1 && setIndex((prevState) => prevState + 1);

	return [history[index], setState, undo, redo];
};

const Board = ({
	handleAdd,
	boardData,
	shapes,
	setShape,
	boardLoading,
	addBoardContents,
	boardContentAdding,
	saveWhiteboardImageLoading,
	handleSaveWhiteboardImage,
	newBoard,
	boardId,
}) => {
	const [lottieAnimationShow, setLottieAnimationShow] = useState(true);

	const { messages, user, users, typingUsers, sendMessage, startTypingMessage, stopTypingMessage } = useChat(boardId);

	useEffect(() => {
		if (!boardLoading) {
			setTimeout(() => {
				setLottieAnimationShow(false);
			}, 3000);
		}
	}, [boardLoading]);

	const [elements, setElements, undo, redo] = useHistory([]);
	const [action, setAction] = useState('none');
	const [tool, setTool] = useState('line');
	const [selectedElement, setSelectedElement] = useState(null);
	const [chatVisible, setChatVisible] = useState(false);
	const [fillColor, setFillColor] = useState('transparent');
	const [pickersVisible, setPickersVisible] = useState({
		borderColorPicker: false,
		fillColorPicker: false,
	});
	const [borderColor, setBorderColor] = useState('');
	const [weight, setWeight] = useState('normal');
	const [font, setFont] = useState('');
	const [grid, setGrid] = useState(true);
	const [size, setSize] = useState(2);
	const [hover, setHover] = useState(false);
	const [image, setImage] = useState();
	const [text, setText] = useState('');
	const [x, setX] = useState();
	const [y, setY] = useState();
	const [inputs, setInputs] = useState(false);

	const contextRef = useRef(null);

	useEffect(() => {
		if (shapes?.length) {
			setElements([...shapes, ...elements]);
		}
	}, [shapes]);

	const handlePickerVisible = (pickerType) => {
		setPickersVisible({
			...pickersVisible,
			[pickerType]: !pickersVisible[pickerType],
		});
	};

	const handleBorderFillColor = (borderColor, fillColor) => {
		borderColor && setBorderColor(borderColor);
		fillColor && setFillColor(fillColor);
		const elementsTemp = elements.map((ele) => {
			if (ele.id === selectedElement.id) {
				return {
					...ele,
					...(borderColor && { borderColor }),
					...(fillColor && { fillColor }),
				};
			} else return ele;
		});

		setElements([...elementsTemp]);
	};

	useLayoutEffect(() => {
		const canvas = document.getElementById('canvas');
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.save();
		contextRef.current = context;

		if (grid === true) {
			let bw = 2130;
			let bh = 1500;
			let p = 0;

			for (var x = 0; x <= bw; x += 80) {
				context.moveTo(1 + x + p, p);
				context.lineTo(1 + x + p, bh + p);
			}
			for (var x = 0; x <= bh; x += 80) {
				context.moveTo(p, 0.5 + x + p);
				context.lineTo(bw + p, 0.5 + x + p);
			}
			context.lineWidth = 2;
			context.strokeStyle = '#ddd';
			context.stroke();
		}

		elements.forEach((element) => drawElement(context, element));
	}, [elements, grid, shapes]);

	useEffect(() => {
		const undoRedoFunction = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
				if (event.shiftKey) {
					redo();
				} else {
					undo();
				}
			}
		};

		document.addEventListener('keydown', undoRedoFunction);
		return () => {
			document.removeEventListener('keydown', undoRedoFunction);
		};
	}, [undo, redo]);

	const updateElement = (id, x1, y1, x2, y2, type, borderColor, size, text, fillColorValue = 'transparent', imageSrc) => {
		const elementsCopy = [...elements];
		switch (type) {
			case 'line':
			case 'rectangle':
				elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, borderColor, size, text, fillColorValue, imageSrc);
				break;
			case 'triangle':
			case 'circle':
			case 'text':
			case 'image':
			case 'sticky':
				elementsCopy[id] = createElement(id, x1, y1, x2, y2, type, borderColor, size, text, fillColorValue, imageSrc);
				break;
			case 'pencil':
				elementsCopy[id].points = [...elementsCopy[id].points, { x: x2, y: y2 }];
				break;
			default:
				throw new Error(`Type not recognised: ${type}`);
		}
		// console.log('elementsCopy', elementsCopy);
		setElements(elementsCopy, true);
	};

	const handleMouseDown = (event) => {
		const { clientX, clientY } = event;
		const element = getElementAtPosition(clientX, clientY, elements);

		if (tool === 'eraser') {
			handleRemoveElement(element?.id);
			return;
		}

		if (tool === 'text') {
			addInput(clientX, clientY);
			return;
		}

		if (tool === 'selection') {
			if (element) {
				if (element.type === 'pencil') {
					const xOffsets = element.points.map((point) => clientX - point.x);
					const yOffsets = element.points.map((point) => clientY - point.y);
					setSelectedElement({ ...element, xOffsets, yOffsets });
				} else {
					const offsetX = clientX - element.x1;
					const offsetY = clientY - element.y1;
					setSelectedElement({ ...element, offsetX, offsetY });
				}
				setChatVisible(false);
				setElements((prevState) => prevState);
				if (element.position === 'inside') {
					setAction('moving');
				} else {
					setAction('resizing');
				}
			} else {
				setSelectedElement(null);
			}
		} else {
			const id = elements.length;
			const element = createElement(id, clientX, clientY, clientX, clientY, tool, borderColor, size, text, image);
			setElements((prevState) => [...prevState, element]);
			setAction('drawing');
		}
	};

	const handleMouseMove = (event) => {
		const { clientX, clientY } = event;

		if (tool === 'selection') {
			const element = getElementAtPosition(clientX, clientY, elements);
			event.target.style.cursor = element ? cursorForPosition(element.position) : 'default';
		}
		if (tool === 'eraser') {
			const element = getElementAtPosition(clientX, clientY, elements);
			event.target.style.cursor = element ? 'not-allowed' : 'default';
		}

		if (action === 'drawing') {
			const index = elements.length - 1;
			const { x1, y1 } = elements[index];
			updateElement(index, x1, y1, clientX, clientY, tool, borderColor, size, text, image);
		} else if (action === 'moving') {
			if (selectedElement.type === 'pencil') {
				const newPoints = selectedElement.points.map((_, index) => ({
					x: clientX - selectedElement.xOffsets[index],
					y: clientY - selectedElement.yOffsets[index],
				}));
				const elementsCopy = [...elements];
				elementsCopy[selectedElement.id] = {
					...elementsCopy[selectedElement.id],
					points: newPoints,
				};
				setElements(elementsCopy, true);
			} else {
				const { id, x1, x2, y1, y2, type, offsetX, offsetY, borderColor, size, text, fillColor, imageSrc } = selectedElement;
				const width = x2 - x1;
				const height = y2 - y1;
				const newX1 = clientX - offsetX;
				const newY1 = clientY - offsetY;
				// console.log('updateElement moving', id, x1, x2, y1, y2, type, offsetX, offsetY, borderColor, size, text, fillColor, imageSrc);
				updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type, borderColor, size, text, fillColor, imageSrc);
			}
		} else if (action === 'resizing') {
			const { id, type, position, imageSrc, ...coordinates } = selectedElement;
			const { x1, y1, x2, y2 } = resizedCoordinates(clientX, clientY, position, coordinates);
			updateElement(id, x1, y1, x2, y2, type, borderColor, size, text, fillColor, imageSrc);
		}
		// console.log(clientX, clientY`);
	};

	const handleMouseUp = () => {
		if (selectedElement) {
			const index = selectedElement.id;
			const { id, type } = elements[index];
			if ((action === 'drawing' || action === 'resizing') && adjustmentRequired(type)) {
				const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
				updateElement(id, x1, y1, x2, y2, type, borderColor, size, text, fillColor);
			}
		}

		setAction('none');

		const latestElement = elements[elements.length - 1];
		// console.log(
		// 	"tool === 'eraser'",
		// 	tool === 'eraser',
		// 	tool !== 'selection',
		// 	selectedElement,
		// 	elements,
		// 	!(latestElement?.x1 === latestElement?.x2 && latestElement?.y1 === latestElement?.y2)
		// );

		if (tool === 'eraser' || !(latestElement?.x1 === latestElement?.x2 && latestElement?.y1 === latestElement?.y2)) {
			addBoardContents(elements);
			handleSaveWhiteboardImage();
		}
	};

	// console.log('elements data', selectedElement, fillColor, borderColor);

	// const layer = (front) => {
	//   // let { arrayObjectsLayer, selectedObject } = this.state;
	//   if (elements.id) {
	//     front
	//       ? elements.push(
	//           elements.splice(
	//             elements.findIndex((elt) => elt.id === elements.id),
	//             1
	//           )[0]
	//         )
	//       : elements.unshift(
	//           elements.splice(
	//             elements.findIndex((elt) => elt.id === elements.id),
	//             1
	//           )[0]
	//         );
	//     setElements(elements);
	//   }
	// };

	// const layer = () => {
	//   if (tool === "layer" && elements.id) {
	//     elements.push(
	//       elements.splice(
	//         elements.findIndex((elt) => elt.id === elements.id),
	//         1
	//       )[0]
	//     );
	//   }
	//   setElements(elements);
	// };

	function handleMenuClick(e) {
		if (e.key === '1') {
			setWeight('bold');
		}
		if (e.key === '2') {
			setWeight('italic');
		}
		if (e.key === '3') {
			setWeight('oblique');
		}
		if (e.key === '4') {
			setFont('Trebuchet MS');
		}
		if (e.key === '5') {
			setFont('Helvetica');
		}
	}

	function addInput(x, y) {
		// console.log('cons', x, y);
		var input = document.createElement('input');
		input.style.position = 'fixed';
		input.style.left = x - 4 + 'px';
		input.style.top = y - 4 + 'px';

		input.onkeydown = handleEnter;

		document.body.appendChild(input);

		input.focus();

		setInputs(true);
	}

	function handleEnter(e) {
		var keyCode = e.keyCode;
		if (keyCode === 13) {
			setText(this.value);
			// drawText(, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
			document.body.removeChild(this);
			setInputs(false);
		}
	}

	const menu = (
		<Menu onClick={handleMenuClick}>
			<Menu.Item key="1" icon={<UserOutlined />}>
				Bold
			</Menu.Item>
			<Menu.Item key="2" icon={<UserOutlined />}>
				Italic
			</Menu.Item>
			<Menu.Item key="3" icon={<UserOutlined />}>
				oblique
			</Menu.Item>
			<Menu.Item key="4" icon={<UserOutlined />}>
				Trebuchet MS
			</Menu.Item>
			<Menu.Item key="5" icon={<UserOutlined />}>
				Helvetica
			</Menu.Item>
		</Menu>
	);

	// console.log('element: ', elements);

	const { fillColorPicker, borderColorPicker } = pickersVisible;

	const handleRemoveElement = (id) => {
		let elementArray = getFilteredElements(elements, id);

		setElements([...elementArray]);
		setSelectedElement(null);
	};

	const handleImage = (file) => {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.addEventListener('load', function () {
			var avatarImg = new Image();
			var src = reader.result;
			avatarImg.src = src;
			avatarImg.onload = function () {
				// Logic to create the proper with and height for the uploaded image starts
				var MAX_WIDTH = 300;
				var MAX_HEIGHT = 300;
				var width = avatarImg.width;
				var height = avatarImg.height;

				if (width > height) {
					if (width > MAX_WIDTH) {
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				} else {
					if (height > MAX_HEIGHT) {
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				// Logic to create the proper with and height for the uploaded image ends

				const id = elements.length;
				const element = createElement(id, NAV_BAR_HEIGHT + 10, NAV_BAR_HEIGHT + 50, width, height, 'image', null, null, null, reader.result);
				setElements((prevState) => [...prevState, element]);

				// const obj = {
				// 	id: elements.length,
				// 	x1: NAV_BAR_HEIGHT + 10,
				// 	y1: NAV_BAR_HEIGHT + 50,
				// 	x2: width,
				// 	y2: height,
				// 	type: 'image',
				// 	imageSrc: reader.result,
				// };

				// setElements([...elements, obj]);
			};
		});
	};

	return (
		<div className="toolbar">
			<div className="main__container">
				{!boardLoading && (
					<WhiteBoardTools
						{...{
							setTool,
							tool,
							size,
							setFillColor,
							setBorderColor,
							setSelectedElement,
							setSize,
							hover,
							setHover,
							undo,
							redo,
							setImage,
							image,
							setText,
							handleImage,
						}}
					/>
				)}
				{!boardLoading && newBoard && lottieAnimationShow && (
					<div className="confetti-container">
						<LottieComponent file={LottieFile.Confetti} loop={false} />
					</div>
				)}

				<div className="grid">
					<img className="grid__logo" src={Gridx} onClick={() => setGrid(!grid)} />
				</div>

				{!boardLoading && (
					<div
						className="team"
						onClick={() => {
							setChatVisible(true);
						}}>
						<img className="team__logo" src={Message} />
						<button className="team__meet">Team Meet</button>
					</div>
				)}
			</div>
			{chatVisible ? (
				<div className="chat__ui">
					<ChatContent {...{ setChatVisible, messages, user, users, typingUsers, sendMessage, startTypingMessage, stopTypingMessage }} />
				</div>
			) : (
				''
			)}
			{selectedElement && (
				<ColorToolBarComponent
					{...{
						selectedElement,
						handleBorderFillColor,
						handlePickerVisible,
						borderColorPicker,
						borderColor,
						fillColorPicker,
						fillColor,
					}}
				/>
			)}
			<canvas
				id="canvas"
				width={window.innerWidth}
				height={window.innerHeight - 10}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				// onKeyDown={handleKeyDown}
				// tabIndex="4"
			>
				Canvas
			</canvas>

			{boardContentAdding && <UploadingIndicator />}
		</div>
	);
};

export default Board;
