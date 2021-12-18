import { useEffect, useState } from 'react';

const COUNT_DOWN = 1;

const useTyping = () => {
	const [isTyping, setIsTyping] = useState(false);
	const [isKeyPressed, setIsKeyPressed] = useState(false);
	const [countdown, setCountdown] = useState(COUNT_DOWN);

	const startTyping = () => {
		setIsKeyPressed(true);
		setCountdown(COUNT_DOWN);
		setIsTyping(true);
	};

	const stopTyping = () => {
		setIsKeyPressed(false);
	};

	const cancelTyping = () => {
		setCountdown(0);
	};

	useEffect(() => {
		let interval;
		if (!isKeyPressed) {
			interval = setInterval(() => {
				setCountdown((c) => c - 1);
			}, 1000);
		} else if (isKeyPressed || countdown === 0) {
			clearInterval(interval);
		}
		if (countdown === 0) {
			setIsTyping(false);
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isKeyPressed, countdown]);

	return { isTyping, startTyping, stopTyping, cancelTyping };
};

export default useTyping;
