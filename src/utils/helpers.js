import jsPDF from 'jspdf';
import { debounce } from 'lodash';

// This function is used to convert base64 encoding to mime type (blob)
export function base64ToBlob(base64, mime) {
	mime = mime || '';
	var sliceSize = 1024;
	var byteChars = window.atob(base64);
	var byteArrays = [];

	for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
		var slice = byteChars.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: mime });
}

export function dataURLtoFile(dataurl, filename) {
	if (dataurl) {
		var arr = dataurl?.split(','),
			mime = arr?.[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	}
}

//
// ─── DOWNLOAD CANVAS IMAGES ─────────────────────────────────────────────────────
//
export const download = (type, boardData, boardName, stageRef) => {
	if (type) {
		switch (type) {
			case 'pdf':
				var imgData = stageRef?.current?.toDataURL();
				var pdf = new jsPDF('l', 'pt', 'a4');
				pdf.addImage(imgData, 'JPEG', 0, 0);
				pdf.save(`${boardName}.pdf`);
				break;
			case 'json':
				const json = JSON.stringify(boardData);
				const blob = new Blob([json], { type: 'application/json' });
				createDownloadLink(blob, boardName, type);
				break;
			default:
				const url = stageRef?.current?.toDataURL();
				fetch(url).then((response) => {
					response.blob().then((blob) => {
						createDownloadLink(blob, boardName, type);
					});
				});
				break;
		}
	}
};

const createDownloadLink = async (blob, boardData, type) => {
	const href = await URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = href;
	link.download = `${boardData}.${type}`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const downloadImage = (e, file, name, type) => {
	if (e?.preventDefault) {
		e.preventDefault();
	}
	// console.log(e.target.href);
	fetch(file?.fileUrl, {
		method: 'GET',
		headers: {},
	})
		.then((response) => {
			response.arrayBuffer().then(function (buffer) {
				const url = window.URL.createObjectURL(new Blob([buffer]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${name}.${type}`); //or any other extension
				document.body.appendChild(link);
				link.click();
			});
		})
		.catch((err) => {
			console.log('err...', err);
		});
};

// export const getFileNameFromURL = (url = '') => url?.replace(/^.*[\\\/]/, '');
export const getFileNameFromURL = (url = '') => {
	const arr = url?.split('/');
	return arr?.[arr.length - 1];
};

export const mockRequest = ({ file, onSuccess }) => {
	setTimeout(() => {
		onSuccess('ok');
	}, 0);
};

export const debounceHandler = debounce((query, functionToCall) => {
	functionToCall(query);
}, 500);

export const getQueryVariable = (variable) => {
	var query = window.location.search.substring(1);
	// console.log(query); //"app=article&act=news_content&aid=160990"
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		// console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
		if (pair[0] === variable) {
			return pair[1];
		}
	}
	return false;
};
