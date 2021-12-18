import React, { useEffect, useRef } from 'react';
import { TweenMax, Power3 } from 'gsap';
import './flyersModel.scss';
import ButtonComponent from './../button/index';
import FadeIn from '@sharedComponent/animated-component';

const Modal = ({ isVisible, setIsVisible, content, heading }) => {
	// let modalRef = useRef(null);
	// console.log('content', content);
	// useEffect(() => {
	// 	if (isVisible) {
	// 		TweenMax.from(modalRef, 3, {
	// 			yPercent: 1000,
	// 			autoAlpha: 0,
	// 			ease: Power3.easeInOut,
	// 		});
	// 	}
	// }, []);
	const [show, setShow] = React.useState(false);

	return (
		<div className={`flyers_model ${isVisible ? 'flyers-model-show' : 'flyers-model-hide'}`}>
			<div className="flyers_model__outer">
				<div className="flyers_model__inner">
					<div className="flyers_model__heading">{heading}</div>
					<div className="flyers_model__close" onClick={() => setIsVisible(false)}>
						X
					</div>
				</div>
				<div className="flyers_model__body">{content}</div>
				{show ? (
					<div style={{ display: setShow ? 'block' : 'none' }}>
						<hr className="flyers_model__horizentelline"></hr>
						<div className="flyers_model__footerblog">
							<div className="flyers_model__footerbtn">
								<ButtonComponent className="flyers-scendory-btn savebtn">Save</ButtonComponent>
								<ButtonComponent className="flyers-scendory-btn" onClick={() => setIsVisible(false)}>
									cancel
								</ButtonComponent>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

const FlyersModel = ({ isVisible = false, setIsVisible, content, heading }) => {
	return isVisible ? <Modal {...{ isVisible, setIsVisible, content, heading }} /> : null;
};

export default FlyersModel;
