import React from 'react';
import { SketchPicker } from 'react-color';

const Colors = [
	{ name: 'one', value: '#0000ff' },
	{ name: 'two', value: '#009fff' },
	{ name: 'three', value: '#0fffff' },
	{ name: 'four', value: '#bfffff' },
	{ name: 'five', value: '#000000' },
];

const ColorToolBarComponent = ({
	selectedElement,
	handleBorderFillColor,
	handlePickerVisible,
	borderColorPicker,
	borderColor,
	fillColorPicker,
	fillColor,
}) => {
	return (
		<div className="toolBarComponent" style={{}}>
			{/* <div className="remove_item_style">
						<span className="text-color">Remove</span>
						<div
							className="colors__pallette"
							style={{
								...(selectedElement?.type === 'line' && { padding: 0 }),
							}}>
							<AiOutlineDelete onClick={() => handleRemoveElement(selectedElement?.id)} className="icon__react" />
						</div>
					</div> */}
			<div>
				<span className="text-color">Border Color</span>
				<div
					className="colors__pallette"
					style={{
						...(selectedElement?.type === 'line' && { padding: 0 }),
					}}>
					{Colors.map(({ name, value }, index) => (
						<button
							key={index}
							id={name}
							className="color"
							type="button"
							value={value}
							onClick={(e) => {
								handleBorderFillColor(e.target.value, null);
							}}
						/>
					))}
				</div>
				<div style={{ paddingBottom: 10 }}>
					Custom{' '}
					<div
						onClick={() => handlePickerVisible('borderColorPicker')}
						className="custom_fill_color"
						style={{ backgroundColor: 'tomato' }}></div>
				</div>
				{borderColorPicker && (
					<div style={{ position: 'absolute', left: '-150%', top: '25%' }}>
						<SketchPicker color={borderColor} onChangeComplete={({ hex: borderColor }) => handleBorderFillColor(borderColor, null)} />
					</div>
				)}
			</div>
			{selectedElement?.type !== 'line' && (
				<div className="fill-color-container">
					<span className="text-color">Fill Color</span>
					<div className="colors__pallette">
						{Colors.map(({ name, value }, index) => (
							<button
								key={index}
								id={name}
								className="color"
								type="button"
								value={value}
								onClick={(e) => {
									handleBorderFillColor(null, e.target.value);
								}}
							/>
						))}
					</div>
					<div>
						Custom{' '}
						<div
							onClick={() => handlePickerVisible('fillColorPicker')}
							className="custom_fill_color"
							style={{ backgroundColor: 'tomato' }}></div>
					</div>
					{fillColorPicker && (
						<div style={{ position: 'absolute', left: '-150%', top: '50%' }}>
							<SketchPicker color={fillColor} onChangeComplete={({ hex: fillColor }) => handleBorderFillColor(null, fillColor)} />
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default ColorToolBarComponent;
