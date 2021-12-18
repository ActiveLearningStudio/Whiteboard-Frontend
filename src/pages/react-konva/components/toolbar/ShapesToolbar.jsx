import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Html } from 'react-konva-utils';
import { Col, Popover, Row } from 'antd';
import { AiOutlineFontSize, AiOutlineFontColors, AiOutlineBold } from 'react-icons/ai';

const ShapesToolbar = (props) => {
	const [color, setColor] = useState('#333');
	const { shapeProps, shapeRef, stageRef, onBorderSelect, onBackgroundSelect, handleFontSizeAndStyle } = props;

	const isSticky = shapeProps?.type === 'sticky' || shapeProps?.type === 'text';

	const getStyles = () => {
		const shapePos = shapeRef.getAbsolutePosition();
		const shapeProps = shapeRef.getAttrs();
		var areaPosition = {};
		if (shapeProps.radius) {
			var radius = shapeProps.radius * stageRef.current.scale().x;
			radius = shapeProps.scaleX ? radius * shapeProps.scaleX : radius;
			areaPosition = {
				x: shapePos.x - 40,
				y: shapePos.y - radius - 120,
			};
			if (areaPosition.y < 50) {
				areaPosition.y = radius + areaPosition.y + 120 + 100;
			}
		} else {
			var width = shapeProps.width * stageRef.current.scale().x;
			var height = shapeProps.height * stageRef.current.scale().y;
			width = shapeProps.scaleX ? width * shapeProps.scaleX : width;
			height = shapeProps.scaleY ? height * shapeProps.scaleY : height;
			areaPosition = {
				x: shapePos.x + width / 2 - (isSticky ? 72 : 40),
				y: shapePos.y - 120,
			};
			if (areaPosition.y < 50) {
				areaPosition.y = height + areaPosition.y + 120 + 50;
			}
		}

		return {
			position: 'absolute',
			left: areaPosition.x + 'px',
			top: areaPosition.y + 'px',
			display: 'flex',
			justifyContent: 'center',
		};
	};

	const content = (isBackground = false) => <SketchPicker color={color} {...{ onChange: ({ hex }) => handleColorChange(hex, isBackground) }} />;
	const fontSizeContent = () => {
		return (
			<Row style={{ width: '100%', height: '100%' }} className="fontSizeContainer">
				{[12, 14, 16, 18, 20, 22, 24, 26, 28].map((value, index) => (
					<Col
						key={index}
						onClick={() => handleFontSizeAndStyle('fontSize', value * 2)}
						style={{
							fontWeight: shapeProps?.fontSize === value * 2 ? 'bold' : 'normal',
						}}
						className="fontSizeStyle">
						{value}
					</Col>
				))}
			</Row>
		);
	};
	const fontStyleContent = () => {
		return (
			<Row style={{ width: '100%', height: '100%' }} className="fontSizeContainer">
				{['Bold', 'Italic'].map((value, index) => (
					<Col
						key={index}
						onClick={() => handleFontSizeAndStyle('fontStyle', value?.toLowerCase())}
						style={{
							fontWeight: shapeProps?.fontStyle === value?.toLowerCase() ? 'bold' : 'normal',
						}}
						className="fontSizeStyle">
						{value}
					</Col>
				))}
			</Row>
		);
	};

	const handleColorChange = (hex, isBackground = false) => {
		setColor(hex);
		isBackground ? onBackgroundSelect(hex) : onBorderSelect(hex);
	};

	return (
		<Html
			transform={false}
			transformFunc={(attrs) => {
				return { ...attrs, scaleX: 1, scaleY: 1 };
			}}
			divProps={{
				style: getStyles(),
			}}>
			{/* <input placeholder="cascsac" /> */}
			<Row className="tool_bar_container" style={{ '--toolBarWidth': getStyles()?.width }}>
				<Col className="pickers">
					{isSticky ? (
						<Row style={{ padding: '0 10px' }}>
							<Col>
								<Popover overlayClassName="element_color_picker" placement="top" trigger="click" content={fontStyleContent}>
									<div className="fontSizeStyle">
										<AiOutlineBold />
									</div>
								</Popover>
							</Col>
							<Col>
								<Popover overlayClassName="element_color_picker" placement="top" trigger="click" content={fontSizeContent}>
									<div className="fontSizeStyle">
										<AiOutlineFontSize />
									</div>
								</Popover>
							</Col>
							<Col>
								<Popover overlayClassName="element_color_picker" placement="right" trigger="click" content={() => content(true)}>
									<div className="fontSizeStyle">
										<AiOutlineFontColors
										// color={shapeProps?.fill}
										/>
									</div>
								</Popover>
							</Col>
						</Row>
					) : (
						<>
							<Popover overlayClassName="element_color_picker" placement="right" trigger="click" content={content}>
								<div className="border_picker_style" style={{ '--borderColor': shapeProps?.stroke }} />
							</Popover>
							<Popover overlayClassName="element_color_picker" placement="right" trigger="click" content={() => content(true)}>
								<div className="background_picker_style" style={{ '--backgroundColor': shapeProps?.fill }} />
							</Popover>
						</>
					)}
				</Col>
			</Row>
		</Html>
	);
};

export default ShapesToolbar;
