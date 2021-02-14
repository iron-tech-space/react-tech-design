import React from 'react';
import PropTypes from 'prop-types';
import { CloseCircleOutlined } from '@ant-design/icons';
import { rtPrefix } from '../../../utils/variables';

var SelectionList = function SelectionList(props) {
	var selectedRowObjects = props.selectedRowObjects,
	    rowRender = props.rowRender,
	    onClickDropSelect = props.onClickDropSelect;

	// console.log("SelectionList typeof -> ", typeof(rowRender));

	return React.createElement(
		'div',
		{ className: rtPrefix + '-table-selected-rows' },
		selectedRowObjects && selectedRowObjects.length > 0 ? React.createElement(
			'ul',
			null,
			selectedRowObjects.map(function (item, index) {
				return React.createElement(
					'li',
					{ key: index },
					typeof rowRender === 'function' ? rowRender({ rowData: item, rowIndex: index }) : React.createElement(
						'div',
						null,
						item[rowRender]
					),
					React.createElement(
						'div',
						{ onClick: function onClick() {
								return onClickDropSelect(item);
							} },
						React.createElement(CloseCircleOutlined, null)
					)
				);
			})
		) : React.createElement(
			'div',
			null,
			'\u041D\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439'
		)
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
	onClickDropSelect: PropTypes.func.isRequired
};

SelectionList.defaultProps = {};

export default SelectionList;