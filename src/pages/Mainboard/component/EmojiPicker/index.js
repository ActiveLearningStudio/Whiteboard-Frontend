import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Smiley from '../../../../assets/img/Smiley.svg';

const EmojiPicker = ({ showEmojis, showEmoji, addEmoji }) => {
	// let emojiPicker = useRef(null);
	return (
		<>
			<div className="footer__icons">
				<img src={Smiley} className="footer__image1" onClick={showEmoji} alt="emoji" />
			</div>
			{showEmojis && (
				<div
					style={styles.emojiPicker}
					// ref={(el) => (emojiPicker = el)}
				>
					<Picker onSelect={addEmoji} emojiTooltip={true} title="weChat" />
				</div>
			)}
		</>
	);
};

export default EmojiPicker;

const styles = {
	emojiPicker: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		cssFloat: 'right',
	},
};
