import React from 'react';
import {
	Popover,
	//  Upload, message, notification,
	Row,
	Col,
} from 'antd';
import { AiOutlineUndo, AiOutlineRedo, AiOutlineDelete } from 'react-icons/ai';

import './WhiteBoardTools.scss';
import { Images } from 'src/assets/img';
// import { DropImage } from './components/DropImage';
// import { duplicateObject } from './konva-drawing-helpers';
import Draggable from 'react-draggable';
// import { SketchPicker } from 'react-color';

const lineSizes = [
	{ size: 5, icon: Images.One, height: 1 },
	{ size: 8, icon: Images.Two, height: 2 },
	{ size: 11, icon: Images.Three, height: 3 },
];

const WhiteBoardTools = ({
	setTool,
	handlePencilDrawing,
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

	addNewCircle,
	addNewTriangle,
	addNewHexagon,
	addNewSquare,
	addNewText,
	addNewArrow,
	addNewLine,
	addNewCurvedLine,
	addStickyNote,
	moveItem,
	duplicateObject,
	handleToggleStates,
	clearBoard,
	loadImage,
	selectedObject,
	handleClearContent,
	setPencilProps,
	pencilProps,
}) => {
	// const [color, setColor] = useState('#333');
	const toolPallatte = [
		{ tool: 'rectangle', icon: Images.Square, touchHandler: addNewSquare },
		{ tool: 'triangle', icon: Images.Triangle, touchHandler: addNewTriangle },
		{ tool: 'circle', icon: Images.Circle, touchHandler: addNewCircle },
		{ tool: 'circle', icon: Images.Hexagon, touchHandler: addNewHexagon },
	];
	const lineToolPallatte = [
		{ tool: 'line', icon: Images.Line, touchHandler: addNewLine },
		{ tool: 'normalArrow', icon: Images.NormalArrow, touchHandler: addNewArrow },
		{ tool: 'curvedArrow', icon: Images.CurvedArrow, touchHandler: addNewCurvedLine },
	];
	const pencilColor = [
		{
			color: '#4261FF',
		},
		{
			color: '#E13232',
		},
		{
			color: '#FFAF00',
		},
		{
			color: '#42B8FF',
		},
		{
			color: '#E5408B',
		},
	];

	const stickyNotesColor = [
		{
			color: '#f5f6f8',
		},
		{
			color: '#fff9b1',
		},
		{
			color: '#d5f692',
		},
		{
			color: '#f5d126',
		},
		{
			color: '#c9df55',
		},
		{
			color: '#fe9d47',
		},
		{
			color: '#94d274',
		},
		{
			color: '#f26c7f',
		},
		{
			color: '#67c6bf',
		},
		{
			color: '#eb94ba',
		},
		{
			color: '#6cd8fa',
		},
		{
			color: '#fecedf',
		},
		{
			color: '#a6ccf4',
		},
		{
			color: '#be87c7',
		},
	];

	const pencilPickerContent = () => {
		return (
			<Row className="pencil_color_picker">
				<Col>
					<Row className="pencil_color_picker_container">
						{pencilColor.map(({ color }, index) => (
							<Col
								key={index}
								onClick={() => {
									setPencilProps({ ...pencilProps, color });
									handlePencilDrawing(true);
								}}
								className={`pencil_color_picker_container_item ${pencilProps.color === color ? 'selected' : ''}`}
								style={{ '--color': color }}
							/>
						))}
					</Row>
					<Row className="pencil_color_picker_line_container">
						{lineSizes.map(({ icon, size, height }, index) => (
							<Col
								key={index}
								onClick={() => {
									setPencilProps({ ...pencilProps, size });
									handlePencilDrawing(true);
								}}
								className={`pencil_color_picker_line_container_item ${pencilProps.size === size ? 'selected' : ''}`}>
								{/* <img className="icon" src={icon} /> */}
								<div style={{ height, width: '100%' }} />
							</Col>
						))}
					</Row>
				</Col>
			</Row>
		);
	};

	const stickyNotesPickerContent = () => {
		return (
			<Row className="sticky_notes_picker">
				<Col>
					<Row className="sticky_notes_picker_container">
						{stickyNotesColor.map(({ color }, index) => (
							<Col
								key={index}
								onClick={() => {
									addStickyNote(color);
									handlePencilDrawing();
								}}
								className={`sticky_notes_picker_container_item`}
								style={{ '--color': color }}
							/>
						))}
					</Row>
				</Col>
			</Row>
		);
	};

	const content = (type = null) => (
		<div className={hover === false ? 'colorPicker' : 'colorPicker1'}>
			<div className="tools__pallette">
				{(type === 'line' ? lineToolPallatte : toolPallatte).map(({ icon, tool: toolName, touchHandler }, index) => (
					<div key={index} className={`tool_style ${tool === toolName ? 'active' : ''}`}>
						<img
							className={`tool ${tool === toolName ? 'active' : ''}`}
							id={toolName}
							alt="toolIcon"
							src={icon}
							onClick={() => {
								touchHandler();
								handlePencilDrawing();
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);

	// const lineSizeContent = () => (
	// 	<div className="line-content-container">
	// 		{lineSizes.map(({ icon, size: lineSize }, index) => (
	// 			<span key={index} id={`text`} className={`${size === lineSize ? 'active' : ''}`} onClick={() => setSize(lineSize)}>
	// 				<img className="icon" src={icon} />
	// 			</span>
	// 		))}
	// 	</div>
	// );

	// const dummyRequest = ({ file, onSuccess }) => {
	// 	setTimeout(() => {
	// 		onSuccess('ok');
	// 	}, 0);
	// };

	// const backgroundPickerContent = (isBackground = false) => (
	// 	<SketchPicker color={color} {...{ onChange: ({ hex }) => handleColorChange(hex, isBackground) }} />
	// );

	// const handleColorChange = (hex, isBackground = false) => {
	// 	setColor(hex);
	// 	// onBackgroundSelect(hex);
	// };

	return (
		<Draggable disabled>
			<div className="icon__container">
				<span type="radio">
					<Popover overlayClassName="customPopOverStyle" placement="rightTop" content={pencilPickerContent} trigger="click">
						<img className="icon" src={Images.Pen} alt="shapes" />
					</Popover>
				</span>

				<span
					onClick={() => {
						addNewText();
						handlePencilDrawing();
					}}>
					<img className={`icon toolIcon ${tool === 'text' ? 'active' : ''}`} src={Images.Text} alt="text" />
				</span>
				<span type="radio">
					<Popover overlayClassName="customPopOverStyle" placement="right" content={content} trigger="click">
						<img className="icon" src={Images.Rounded} alt="shapes" />
					</Popover>
				</span>
				<span type="radio">
					<Popover overlayClassName="customPopOverStyle" placement="right" content={content('line')} trigger="click">
						<img className="icon" src={Images.Line} alt="shapes" />
					</Popover>
				</span>
				{/* <span>
					<DropImage
						getImage={(base64) => {
							loadImage(base64);
							handlePencilDrawing();
						}}>
						<img className="icon" type="file" src={Images.Image} alt="imgUpload" />
					</DropImage>
				</span> */}
				<span>
					<div
						className="moveStyle"
						onClick={() => {
							moveItem(true);
							handlePencilDrawing();
						}}>
						<img className="icon" src={Images.Front} alt="front" />
					</div>
				</span>
				<span>
					<div
						className="moveStyle"
						onClick={() => {
							moveItem();
							handlePencilDrawing();
						}}>
						<img className="icon" src={Images.Back} alt="back" />
					</div>
				</span>
				<span>
					<div
						className="moveStyle"
						onClick={() => {
							duplicateObject();
							handlePencilDrawing();
						}}>
						<img className="icon" src={Images.Duplicate} alt="duplicate" />
					</div>
				</span>
				{/* <span>
					{selectedObject ? (
						<Popover overlayClassName="element_color_picker" placement="right" trigger="click" content={backgroundPickerContent}>
							<div className="moveStyle">
								<img className="icon" src={Images.FillColor} />
							</div>
						</Popover>
					) : (
						<div
							className="moveStyle"
							onClick={() =>
								notification.info({
									message: `Please select an element to apply color`,
									description: '',
									placement: 'bottomLeft',
								})
							}>
							<img className="icon" src={Images.FillColor} />
						</div>
					)}
				</span> */}

				<span type="radio">
					<Popover overlayClassName="customPopOverStyle" placement="rightBottom" content={stickyNotesPickerContent} trigger="click">
						<img className="icon" src={Images.Stitcky} alt="shapes" />
					</Popover>
				</span>
				<div className={`toolIconStyle`}>
					<AiOutlineUndo
						onClick={() => {
							undo();
							handlePencilDrawing();
						}}
						className="icon__react"
					/>
				</div>
				<div className={`toolIconStyle`}>
					<AiOutlineRedo
						onClick={() => {
							redo();
							handlePencilDrawing();
						}}
						className="icon__react"
					/>
				</div>
				<div className={`toolIconStyle`}>
					{/* <div className={`toolIconStyle ${tool === 'eraser' ? 'active' : ''}`}> */}
					<AiOutlineDelete
						onClick={() => {
							handleClearContent();
							handlePencilDrawing();
						}}
						className="icon__react"
					/>
				</div>

				{/* <span type="radio" onMouseOver={() => setHover?.(true)}>
				<Popover overlayClassName="customPopOverStyle" placement="right" content={tool !== 'selection' && lineSizeContent} trigger="click">
					<span id="text">
						<img className="icon" src={Images.One} />
					</span>
				</Popover>
			</span> */}
			</div>
		</Draggable>
	);
};

export default WhiteBoardTools;
