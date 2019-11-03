var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';

/**
 * ### Список / Дерево.
 */
var List = function List(props) {
	var rowKey = props.rowKey,
	    rowRender = props.rowRender,
	    title = props.title;


	var columns = [{
		key: rowKey,
		title: title,
		dataKey: rowKey,
		width: 500,
		cellRenderer: typeof rowRender === 'function' ? rowRender : function (_ref) {
			var rowData = _ref.rowData;
			return React.createElement(
				'div',
				null,
				rowData[rowRender]
			);
		}
	}];
	return React.createElement(Table, _extends({}, props, { columns: columns, headerHeight: title ? 30 : 0 }));
};

List.propTypes = {
	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/** Строка или функция для отображения элементов списка
  * Строка - имя поля
  * Функция - рендер строк. Параметры v
  * { cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) */
	rowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

	/** Заголовок списка (по умолчанию скрыт)*/
	title: PropTypes.string
};

List.defaultProps = {
	rowKey: 'id',
	rowRender: 'id',
	title: undefined
};

export default List;