import React from 'react';
import { Popover, Upload, message } from 'antd';
import { AiOutlineUndo, AiOutlineRedo, AiOutlineDelete } from 'react-icons/ai';
import Text from '../../../assets/img/TextIcon.svg';
import Rounded from '../../../assets/img/Rounded shape Icon.svg';
import Image from '../../../assets/img/ImageIcon.svg';
import Circle from '../../../assets/img/circle.svg';
// import Rectangle from '../../../assets/img/Rectangle 8.svg';
import Square from '../../../assets/img/Rectangle 9.svg';
import Line from '../../../assets/img/line.svg';
import Triangle from '../../../assets/img/Triangle.svg';
import One from '../../../assets/img/Lineone.svg';
import Two from '../../../assets/img/Linetwo.svg';
import Three from '../../../assets/img/Linethree.svg';
import Stitcky from '../../../assets/img/StickyIcon.svg';
import Select from '../../../assets/img/SelectIcon.svg';
import Pen from '../../../assets/img/PenIcon.svg';
import './WhiteBoardTools.scss';

const toolPallatte = [
	{ tool: 'line', icon: Line },
	{ tool: 'rectangle', icon: Square },
	{ tool: 'triangle', icon: Triangle },
	{ tool: 'circle', icon: Circle },
];

const lineSizes = [
	{ size: 5, icon: One },
	{ size: 8, icon: Two },
	{ size: 11, icon: Three },
];

const WhiteBoardTools = ({
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
	// setImage,
	// image,
	// setText,
	handleImage,
}) => {
	const content = () => (
		<div className={hover === false ? 'colorPicker' : 'colorPicker1'}>
			{/* <BiEraser id="eraser" />onMouseOver={() => setHover(true)} OveronMouseOut={() => setHover(false)} */}
			<div className="tools__pallette">
				{toolPallatte.map(({ icon, tool: toolName }, index) => (
					<div key={index} className={`tool_style ${tool === toolName ? 'active' : ''}`}>
						<img
							className={`tool ${tool === toolName ? 'active' : ''}`}
							id={toolName}
							src={icon}
							onClick={() => {
								// setColor('black');
								setFillColor('transparent');
								setBorderColor('black');
								setTool(toolName);
								setSelectedElement(null);
							}}
						/>
					</div>
				))}
			</div>
		</div>
	);

	const lineSizeContent = () => (
		<div className="line-content-container">
			{lineSizes.map(({ icon, size: lineSize }, index) => (
				<span key={index} id={`text`} className={`${size === lineSize ? 'active' : ''}`} onClick={() => setSize(lineSize)}>
					<img className="icon" src={icon} />
				</span>
			))}
		</div>
	);

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess('ok');
		}, 0);
	};

	const props = {
		name: 'file',
		customRequest: dummyRequest,
		onChange(info) {
			const canvas = document.getElementById('canvas');
			const context = canvas.getContext('2d');
			// var imageContent = new Image();
			if (info.file.status !== 'uploading') {
				// console.log(info.file, info.fileList);
			}
			if (info.file.status === 'done') {
				message.success(`${info.file.name} file uploaded successfully`);
				handleImage(info.file.originFileObj);
				// var reader = new FileReader(image);
				// var src = reader;
				// imageContent.src = 'https://images.pexels.com/photos/54283/pexels-photo-54283.jpeg';
				// context.drawImage(imageContent, 0, 0);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};

	return (
		<div className="icon__container">
			<span id="selection" onClick={() => setTool('selection')}>
				<img className={`icon toolIcon ${tool === 'selection' ? 'active' : ''}`} src={Select} />{' '}
			</span>
			<span id="line" onClick={() => setTool('pencil')}>
				<img className={`icon toolIcon ${tool === 'pen' ? 'active' : ''}`} src={Pen} />
			</span>

			<span onClick={() => setTool('text')}>
				<img className={`icon toolIcon ${tool === 'text' ? 'active' : ''}`} src={Text} />
				{/* <input type="text" className="textDraw" onChange={(e) => setText(e.target.value)} /> */}
			</span>
			<span type="radio" onMouseOver={() => setHover(true)}>
				<Popover overlayClassName="customPopOverStyle" placement="right" content={content} trigger="click">
					<img className="icon" src={Rounded} />
				</Popover>
			</span>

			<span>
				<Upload {...props}>
					<img className="icon" type="file" onClick={() => setTool('image')} src={Image} />
				</Upload>
			</span>

			<span onClick={() => setTool('sticky')}>
				<img className="icon" src={Stitcky} />
			</span>

			<div className={`toolIconStyle ${tool === 'eraser' ? 'active' : ''}`}>
				<span onClick={undo}>
					<AiOutlineUndo className="icon__react" />
				</span>
			</div>

			<div className={`toolIconStyle ${tool === 'eraser' ? 'active' : ''}`}>
				<span onClick={redo}>
					<AiOutlineRedo className="icon__react" />
				</span>
			</div>
			<span>
				{/* <AiOutlineDelete onClick={() => handleRemoveElement(selectedElement?.id)} className="icon__react" /> */}
				<div className={`toolIconStyle ${tool === 'eraser' ? 'active' : ''}`}>
					<AiOutlineDelete onClick={() => setTool('eraser')} className="icon__react" />
				</div>
			</span>

			<span type="radio" onMouseOver={() => setHover(true)}>
				<Popover overlayClassName="customPopOverStyle" placement="right" content={tool !== 'selection' && lineSizeContent} trigger="click">
					<span id="text">
						<img className="icon" src={One} />
					</span>
				</Popover>
			</span>
		</div>
	);
};

export default WhiteBoardTools;
