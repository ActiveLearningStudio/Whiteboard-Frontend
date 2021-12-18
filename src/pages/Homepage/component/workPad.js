import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Toolbar from './toolBar';
import { Pencil, TOOL_PENCIL, Line, TOOL_LINE, Ellipse, TOOL_ELLIPSE, Rectangle, TOOL_RECTANGLE } from './tools';

export const toolsMap = {
	[TOOL_PENCIL]: Pencil,
	[TOOL_LINE]: Line,
	[TOOL_RECTANGLE]: Rectangle,
	[TOOL_ELLIPSE]: Ellipse,
};

export default class WorkPad extends Component {
	tool = null;
	interval = null;

	// static propTypes = {
	// 	width: PropTypes.number,
	// 	height: PropTypes.number,
	// 	items: PropTypes.array.isRequired,
	// 	animate: PropTypes.bool,
	// 	canvasClassName: PropTypes.string,
	// 	color: PropTypes.string,
	// 	fillColor: PropTypes.string,
	// 	size: PropTypes.number,
	// 	tool: PropTypes.string,
	// 	toolsMap: PropTypes.object,
	// 	onItemStart: PropTypes.func, // function(stroke:Stroke) { ... }
	// 	onEveryItemChange: PropTypes.func, // function(idStroke:string, x:number, y:number) { ... }
	// 	onDebouncedItemChange: PropTypes.func, // function(idStroke, points:Point[]) { ... }
	// 	onCompleteItem: PropTypes.func, // function(stroke:Stroke) { ... }
	// 	debounceTime: PropTypes.number,
	// };

	static defaultProps = {
		width: 150,
		height: 150,
		color: '#000',
		size: 1,
		fillColor: '',
		canvasClassName: 'canvas',
		debounceTime: 1000,
		animate: true,
		tool: TOOL_ELLIPSE,
		toolsMap,
	};

	constructor(props) {
		super(props);
		this.initTool = this.initTool.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onDebouncedMove = this.onDebouncedMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
	}

	componentDidMount() {
		this.canvas = findDOMNode(this.canvasRef);
		this.ctx = this.canvas.getContext('2d');
		// console.log(getLayer);
		this.ctx.draggable = true;
		//grid width and height
		let bw = this.props.width;
		let bh = this.props.height;
		//padding around grid
		let p = 0;
		//size of canvas
		let cw = bw + p * 2 + 1;
		let ch = bh + p * 2 + 1;
		for (var x = 0; x <= bw; x += 80) {
			this.ctx.moveTo(1 + x + p, p);
			this.ctx.lineTo(1 + x + p, bh + p);
		}
		for (var x = 0; x <= bh; x += 80) {
			this.ctx.moveTo(p, 0.5 + x + p);
			this.ctx.lineTo(bw + p, 0.5 + x + p);
		}
		// for (var x = 0; x <= bw; x += 80) {
		// 	this.ctx.moveTo(1 + x + p, p);
		// 	this.ctx.lineTo(1 + x + p, bh + p);
		// }
		// for (var x = 0; x <= bh; x += 80) {
		// 	this.ctx.moveTo(p, 0.5 + x + p);
		// 	this.ctx.lineTo(bw + p, 0.5 + x + p);
		// }
		// for (var x = 0; x <= bw; x += 1200) {
		// 	this.ctx.moveTo(1 + x + p, p);
		// 	this.ctx.lineTo(1 + x + p, bh + p);
		// }
		// for (var x = 0; x <= bh; x += 1200) {
		// 	this.ctx.moveTo(p, 0.5 + x + p);
		// 	this.ctx.lineTo(bw + p, 0.5 + x + p);
		// }
		// for (var x = 0; x <= bw; x += 2100) {
		// 	this.ctx.moveTo(1 + x + p, p);
		// 	this.ctx.lineTo(1 + x + p, bh + p);
		// }
		// for (var x = 0; x <= bh; x += 2100) {
		// 	this.ctx.moveTo(p, 0.5 + x + p);
		// 	this.ctx.lineTo(bw + p, 0.5 + x + p);
		// }

		this.ctx.strokeStyle = '#ddd';
		// this.ctx.stroke();
		this.initTool(this.props.tool);
	}

	componentWillReceiveProps({ tool, items = [] }) {
		items
			.filter((item) => this.props.items.indexOf(item) === -1)
			.forEach((item) => {
				this.initTool(item.tool);
				this.tool.draw(item, this.props.animate);
			});
		this.initTool(tool);
	}

	initTool(tool) {
		this.tool = this.props.toolsMap[tool](this.ctx);
	}

	onMouseDown(e) {
		const data = this.tool.onMouseDown(...this.getCursorPosition(e), this.props.color, this.props.size, this.props.fillColor);
		data && data[0] && this.props.onItemStart && this.props.onItemStart.apply(null, data);
		if (this.props.onDebouncedItemChange) {
			this.interval = setInterval(this.onDebouncedMove, this.props.debounceTime);
		}
	}

	onDebouncedMove() {
		if (typeof this.tool.onDebouncedMouseMove == 'function' && this.props.onDebouncedItemChange) {
			this.props.onDebouncedItemChange.apply(null, this.tool.onDebouncedMouseMove());
		}
	}

	onMouseMove(e) {
		const data = this.tool.onMouseMove(...this.getCursorPosition(e));
		data && data[0] && this.props.onEveryItemChange && this.props.onEveryItemChange.apply(null, data);
	}

	onMouseUp(e) {
		const data = this.tool.onMouseUp(...this.getCursorPosition(e));
		data && data[0] && this.props.onCompleteItem && this.props.onCompleteItem.apply(null, data);
		if (this.props.onDebouncedItemChange) {
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	getCursorPosition(e) {
		const { top, left } = this.canvas.getBoundingClientRect();
		return [e.clientX - left, e.clientY - top];
	}

	render() {
		const { width, height, canvasClassName } = this.props;
		return (
			<>
				<canvas
					ref={(canvas) => {
						this.canvasRef = canvas;
					}}
					className={canvasClassName}
					onMouseDown={this.onMouseDown}
					onMouseMove={this.onMouseMove}
					onMouseOut={this.onMouseUp}
					onMouseUp={this.onMouseUp}
					width={width}
					height={height}
				/>
			</>
		);
	}
}
