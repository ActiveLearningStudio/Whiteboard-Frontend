import React, { Fragment } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import '../../pages/main-layout/components/project-menu/project-menu.scss';
import './flyersTable.scss';

const flyersTable = ({ data = [], column = [] }) => {
	const renderTable = () => (
		<div className="flyers_table" style={{ paddingTop: '15px' }}>
			<div className="flyers_table__outer">
				<div className="flyers_table__header">
					{column &&
						column.map((col, i) => {
							const style = col.thStyle ? col.thStyle : {};
							return (
								<div key={i} style={style} className="flyers_table__header_cell">
									{col.label}
									{col.isSort && (
										<span style={{ display: 'inline-block', paddingLeft: '5px' }}>
											<CaretUpOutlined />
											<CaretDownOutlined />
										</span>
									)}
								</div>
							);
						})}
				</div>
				{data &&
					data.map((dd, index) => {
						return <div className="flyers_table__row" key={index}>
							{column &&
								column.map((coldata) => {
									const style = coldata.tdStyle ? coldata.tdStyle : {};
									if (coldata.renderCell) {
										return <div style={style} className="flyers_table__cell">{coldata.renderCell(dd[coldata.dataKey], coldata)}</div>;
									} else {
										return <div style={style} className="flyers_table__cell">{dd[coldata.dataKey]}</div>;
									}
								})}
						</div>
					})}
			</div>
		</div>
	);

	return <Fragment>{renderTable()}</Fragment>;
};

export default flyersTable;
