// import { dataURLtoFile } from 'src/utils/helpers';
import getStroke from 'perfect-freehand';

export const getFilteredElements = (elements, id) => {
	let filteredElements = elements.filter((ele, i) => ele.id !== id);

	filteredElements = filteredElements.map((ele, index) => {
		return {
			...ele,
			id: index,
		};
	});

	return filteredElements;
};

export const nearPoint = (x, y, x1, y1, name) => {
	return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};

export const draw = (context, element) => {
	let { id, x1, y1, x2, y2, type, borderColor, size, text, fillColor, imageSrc, points } = element;

	switch (type) {
		case 'rectangle':
			// context.fillStyle = fillColor;
			// // context.fillRect(x1, y1, x2 - x1, y2 - y1);
			// context.strokeStyle = borderColor || 'black';
			// context.lineWidth = size;
			// context.strokeRect(x1, y1, x2 - x1, y2 - y1);

			context.fillStyle = fillColor || 'transparent';
			context.strokeStyle = borderColor;
			context.lineWidth = size;
			context.fillRect(x1, y1, x2 - x1, y2 - y1);
			context.strokeRect(x1, y1, x2 - x1, y2 - y1);
			break;
		case 'line':
			context.strokeStyle = borderColor || 'black';
			context.lineWidth = size;
			context.beginPath();
			context.moveTo(x1, y1);
			context.lineTo(x2, y2);
			context.stroke();
			break;
		case 'triangle':
			context.strokeStyle = borderColor || 'black';
			let height = 200 * Math.cos(Math.PI / 6);
			context.lineWidth = size;
			context.beginPath();
			context.moveTo(x2, y2);
			context.lineTo(x1, y1);
			context.lineTo(x1 + (x1 - y1), y2);
			context.closePath();
			context.stroke();
			if (fillColor) {
				context.fillStyle = fillColor;
				context.fill();
			}
			break;
		case 'circle':
			context.strokeStyle = borderColor || 'black';
			context.lineWidth = size;
			context.beginPath();
			//  context.lineTo(x1, y1);
			context.arc(x1, y1, 2 * Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), 0, y2);
			context.stroke();
			context.closePath();
			// if (fillColor) {
			// 	context.fillStyle = fillColor;
			// 	context.fill();
			// }
			break;
		case 'image':
			// var canvas = document.getElementById('canvas');
			// var reader = new FileReader();
			// reader.onload = function (image) {
			// 	var img = new Image();
			// 	img.onload = function () {
			// 		canvas.width = img.width;
			// 		canvas.height = img.height;
			// 		context.drawImage(img, 0, 0);
			// 	};
			// 	img.src = image;
			// };

			var avatarImg = new Image();
			avatarImg.src = imageSrc;
			avatarImg.onload = function () {
				context.drawImage(avatarImg, x1, y1, x2, y2);
			};
			break;
		case 'text':
			context.textBaseline = 'top';
			context.textAlign = 'left';
			context.fillText(text, x1 - 4, y1 - 4);
			// console.log(text);
			break;
		case 'pencil':
			context.fillStyle = 'black';
			context.fillRect(x1, y1, 210, 210);
			return { id, type, points };
		case 'sticky':
			context.shadowColor = 'grey';
			context.shadowBlur = 15;
			context.shadowOffsetX = 6;
			context.shadowOffsetY = 6;
			context.fillStyle = 'yellow';
			context.fillRect(x1, y1, 210, 210);
			context.strokeStyle = borderColor || 'transparent';
			context.lineWidth = size;
			context.strokeRect(x1, y1, 210, 210);
			break;
		default:
			throw Error('Type not recognised');
	}
};

export const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
	const a = { x: x1, y: y1 };
	const b = { x: x2, y: y2 };
	const c = { x, y };
	const offset = distance(a, b) - (distance(a, c) + distance(b, c));
	return Math.abs(offset) < maxDistance ? 'inside' : null;
};

const positionWithinElement = (x, y, element) => {
	const { type, x1, x2, y1, y2 } = element;
	switch (type) {
		case 'line':
			const on = onLine(x1, y1, x2, y2, x, y);
			const start = nearPoint(x, y, x1, y1, 'start');
			const end = nearPoint(x, y, x2, y2, 'end');
			return start || end || on;
		case 'rectangle':
		case 'image':
		case 'circle':
		case 'triangle':
		case 'text':
		case 'sticky':
			const topLeft = nearPoint(x, y, x1, y1, 'tl');
			const topRight = nearPoint(x, y, x2, y1, 'tr');
			const bottomLeft = nearPoint(x, y, x1, y2, 'bl');
			const bottomRight = nearPoint(x, y, x2, y2, 'br');
			const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? 'inside' : null;
			return topLeft || topRight || bottomLeft || bottomRight || inside;

		case 'pencil':
			const betweenAnyPoint = element.points.some((point, index) => {
				const nextPoint = element.points[index + 1];
				if (!nextPoint) return false;
				return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null;
			});
			return betweenAnyPoint ? 'inside' : null;
		default:
			throw new Error(`Type not recognised: ${type}`);
	}
};

export const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

export const getElementAtPosition = (x, y, elements) => {
	return elements
		.map((element) => ({
			...element,
			position: positionWithinElement(x, y, element),
		}))
		.find((element) => element.position !== null);
};

export const adjustElementCoordinates = (element) => {
	const { type, x1, y1, x2, y2 } = element;
	// console.log("newwwwwggrgdgfg");
	if ((type === 'rectangle' || 'circle' || 'triangle', 'sticky')) {
		const minX = Math.min(x1, x2);
		const maxX = Math.max(x1, x2);
		const minY = Math.min(y1, y2);
		const maxY = Math.max(y1, y2);
		return { x1: minX, y1: minY, x2: maxX, y2: maxY };
	} else {
		if (x1 < x2 || (x1 === x2 && y1 < y2)) {
			return { x1, y1, x2, y2 };
		} else {
			return { x1: x2, y1: y2, x2: x1, y2: y1 };
		}
	}
};

export const cursorForPosition = (position) => {
	switch (position) {
		case 'tl':
		case 'br':
		case 'start':
		case 'end':
			return 'nwse-resize';
		case 'tr':
		case 'bl':
			return 'nesw-resize';
		default:
			return 'move';
	}
};

export const getSvgPathFromStroke = (stroke) => {
	if (!stroke.length) return '';

	const d = stroke.reduce(
		(acc, [x0, y0], i, arr) => {
			const [x1, y1] = arr[(i + 1) % arr.length];
			acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
			return acc;
		},
		['M', ...stroke[0], 'Q']
	);

	d.push('Z');
	return d.join(' ');
};

export const drawElement = (context, element) => {
	const { type, borderColor, size } = element;

	switch (type) {
		case 'rectangle':
		case 'line':
		case 'circle':
		case 'triangle':
		case 'text':
		case 'image':
		case 'sticky':
			draw(context, element);
			break;
		case 'pencil':
			const stroke = getSvgPathFromStroke(getStroke(element.points));
			context.fill(new Path2D(stroke));
			break;
		default:
			throw new Error(`Type not recognised`);
	}
};
export const adjustmentRequired = (type) => ['line', 'rectangle', 'circle', 'triangle', 'text', 'sticky'].includes(type);
