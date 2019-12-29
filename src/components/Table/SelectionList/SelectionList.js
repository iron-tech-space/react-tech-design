import React from 'react';
import PropTypes from 'prop-types';
import {CloseCircleOutlined} from '@ant-design/icons';
import {rtPrefix} from '../../utils/variables';

const SelectionList = (props) => {
	const {selectedRowObjects, rowRender, onClickDropSelect} = props;

	// console.log("SelectionList typeof -> ", typeof(rowRender));
	return (
		<div className={`${rtPrefix}-table-selected-rows`}>
			{selectedRowObjects && selectedRowObjects.length > 0 ? (
				<ul>
					{selectedRowObjects.map((item, index) => (
						<li key={index}>
							{/*{(typeof(rowRender) === 'string') ? <div>{item[rowRender]}</div> : rowRender }*/}
							{typeof rowRender === 'function' ? (
								rowRender({rowData: item, rowIndex: index})
							) : (
								<div>{item[rowRender]}</div>
							)}
							<div onClick={() => onClickDropSelect(item)}>
								<CloseCircleOutlined />
							</div>
						</li>
					))}
				</ul>
			) : (
				<div>Нет выбранных записей</div>
			)}
		</div>
	);
};

SelectionList.propTypes = {
	/** Строка или функция для отображения элементов списка
	 * Строка - имя поля
	 * Функция - рендер строк. Параметры v
	 * { rowData, rowIndex }) */
	rowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

	/** Список выделенных объектов */
	selectedRowObjects: PropTypes.arrayOf(PropTypes.object).isRequired,

	/** Событие удаления элемента */
	onClickDropSelect: PropTypes.func.isRequired,
};

SelectionList.defaultProps = {};

export default SelectionList;
