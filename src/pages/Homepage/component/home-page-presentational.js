import React from 'react';

import './style.scss';
import { Col, Row } from 'antd';
import moment from 'moment';
import { Modal, Button } from 'antd';
import Skeleton from 'react-loading-skeleton';
import boardImg from '../../../assets/img/boardimg.png';
// import { useHistory } from 'react-router-dom';
import { BiPlus } from 'react-icons/bi';
import { AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import ImageComponent from '@sharedComponent/image-component';
import LottieComponent from '@sharedComponent/lottie-component';
import LottieFile from 'src/assets/lottie-files';
import ButtonComponent from '@sharedComponent/button';

function Presentational({
	boardList,
	handleAddBoard,
	modal2Visible,
	setModal2Visible,
	boardName,
	setBoardName,
	history,
	boardSaving,
	boardListLoading,
	handleRemoveBoard,
}) {
	return (
		<div className="container" style={{ paddingTop: 60, height: '100%' }}>
			<Modal
				destroyOnClose
				title="Create New Board"
				centered
				footer={null}
				visible={modal2Visible}
				onOk={() => handleAddBoard(boardName)}
				onCancel={() => setModal2Visible(false)}
				className="homepage__modal">
				<div className="modal-elements">
					<div className="element-container">
						<input autoFocus className="modal__input" onChange={(e) => setBoardName(e.target.value)} />
						<Button disabled={!boardName} className="button__space" loading={boardSaving} onClick={() => handleAddBoard(boardName)}>
							Continue
						</Button>
					</div>
				</div>
			</Modal>

			<div className="context__board" style={{ paddingLeft: 20, paddingRight: 20 }}>
				<div className="jumbotron text-left board__text">
					<span className="create">
						<h1>All boards</h1>
						<span className="icon__main">
							<BiPlus className="plusIcon" type="primary" onClick={() => setModal2Visible(true)} title="Create Board" />
						</span>
					</span>
				</div>

				{!boardListLoading ? (
					<>
						<Row className="cards">
							{(boardList.length ? boardList : []).map((obj, index) => {
								if (obj.boardName) {
									return (
										<Col key={index} xl={6} md={12} xs={24} sm={24} style={{ padding: 10 }} className="">
											<div className="card card_style">
												<div>
													<ImageComponent className="card-img-top" src={obj?.imageUrl || boardImg} alt="Card image cap" />
													<div className="card-body">
														<h2>{obj?.boardName}</h2>
														<p className="card-text">
															<span className="label">Last modified</span> - {moment(obj.modifiedAt).fromNow()}{' '}
														</p>
													</div>
												</div>
												<div className="bottom_action">
													<div onClick={() => history.push(`/whiteboard/${obj._id}`)}>
														<AiOutlineEye style={{ color: '#4261ff' }} />
													</div>
													<div
														onClick={(e) => {
															e.stopPropagation();
															handleRemoveBoard(obj._id);
														}}>
														<AiOutlineDelete style={{ color: 'tomato' }} />
													</div>
												</div>
											</div>
										</Col>
									);
								}
								return null;
							})}
						</Row>
						{!boardList?.length ? (
							<div className="no-data-container">
								<div style={{ width: 300, height: 300 }}>
									<LottieComponent file={LottieFile.NoBoard} />
								</div>
								<div className="content">
									<div>Create your white board now..</div>
									<div>
										<ButtonComponent onClick={() => setModal2Visible(true)}>Create New</ButtonComponent>
									</div>
								</div>
							</div>
						) : null}
					</>
				) : (
					<Row className="cards">
						{Array(8)
							.fill('')
							.map((obj, index) => {
								return (
									<Col key={index} xl={6} md={12} xs={24} sm={24} style={{ padding: 10 }}>
										<div className="card">
											<div>
												<div className="card-img-top" alt="Card image cap">
													<Skeleton width={'100%'} height={'90%'} />{' '}
												</div>
												<div className="card-body">
													<h2>
														<Skeleton width={'100%'} />{' '}
													</h2>
													<p className="card-text">
														<Skeleton width={'80%'} />{' '}
													</p>
												</div>
											</div>
										</div>
									</Col>
								);
							})}
					</Row>
				)}
			</div>
		</div>
	);
}

export default Presentational;
