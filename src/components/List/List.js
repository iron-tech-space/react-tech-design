import React from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';

/**
 * ### Список / Дерево.
 */
const List = (props) => {
	const {rowKey, rowRender, title} = props;

	const columns = [
		{
			key: rowKey,
			title: title,
			dataKey: rowKey,
			width: 500,
			cellRenderer:
				typeof rowRender === 'function'
					? rowRender
					: ({rowData}) => <div>{rowData[rowRender]}</div>,
		},
	];
	return <Table {...props} columns={columns} headerHeight={title ? 30 : 0} />;
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
	title: PropTypes.string,
};

List.defaultProps = {
	rowKey: 'id',
	rowRender: 'id',
	title: undefined,
};

export default List;
