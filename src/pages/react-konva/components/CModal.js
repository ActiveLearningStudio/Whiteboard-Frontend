import { Col, Modal, Row } from 'antd';
import React from 'react';

const Button = ({ text = '', onClick, ...rest }) => (
	<button onClick={onClick} className="modal_container_cancel" {...rest}>
		{text}
	</button>
);

const CModal = ({
	desc = 'Are you sure want to remove permanently erase the items to the bin?',
	isConfirmModalOpen = false,
	setIsConfirmModalOpen,
	handleClearContent,
}) => {
	return (
		<Modal centered className="custom_modal" visible={isConfirmModalOpen} footer={null}>
			<Row className="modal_container">
				<Col xl={24} className="modal_container_content">
					{desc}
				</Col>
				<Col xl={24}>
					<Row gutter={10}>
						<Col xl={12}>
							<Button {...{ text: 'Cancel', onClick: () => setIsConfirmModalOpen(), className: 'modal_container_cancel' }} />
						</Col>
						<Col xl={12}>
							<Button
								{...{
									text: 'Delete',
									onClick: () => {
										setIsConfirmModalOpen(false);
										handleClearContent();
									},
									className: 'modal_container_delete',
								}}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</Modal>
	);
};

export default CModal;
