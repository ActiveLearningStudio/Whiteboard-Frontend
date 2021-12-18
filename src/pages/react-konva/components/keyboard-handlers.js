import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { duplicateObject, redo, undo } from '../konva-drawing-helpers';

const KeyboardHandlers = ({ deleteNodeSelected, state, handleSetState, updateBoardContent }) => {
	return (
		<>
			{/* undo redo handlers */}
			<KeyboardEventHandler handleKeys={['ctrl+z', 'meta+z']} onKeyEvent={() => undo(handleSetState, updateBoardContent, state)} />
			<KeyboardEventHandler handleKeys={['ctrl+y', 'meta+shift+z']} onKeyEvent={() => redo(handleSetState, updateBoardContent, state)} />

			{/* create copy of the element handler */}
			<KeyboardEventHandler handleKeys={['ctrl+c', 'meta+c']} onKeyEvent={() => duplicateObject(state, handleSetState, updateBoardContent)} />

			{/* delete node handler */}
			<KeyboardEventHandler
				handleKeys={['backspace', 'delete']}
				onKeyEvent={() => deleteNodeSelected(state, handleSetState, updateBoardContent)}
			/>
		</>
	);
};

export default KeyboardHandlers;
