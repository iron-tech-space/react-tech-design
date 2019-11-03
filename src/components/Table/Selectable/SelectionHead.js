import React from 'react';
import {Checkbox} from 'antd';
import {flatten, getTableRowKeys} from '../../utils/baseUtils';

const SelectionHead = (props) => {
	const {column, container} = props;
	const {onSelectAll, selectedRowKeys, selectAll} = column;

	const _handleChange = (e) => {
		const rowKeys = flatten(
			getTableRowKeys(container.props.data, column.rowKey)
		);
		const totalLength = rowKeys.length;
		const selectLength = selectedRowKeys.length;
		const checked = !(totalLength === selectLength);

		// const newRowKeys = container.props.data.map((item) => { return item[column.rowKey] });
		onSelectAll({selected: checked, rowKeys: rowKeys});
	};

	return (
		<Checkbox
			indeterminate={selectAll === null}
			onChange={_handleChange}
			checked={selectAll}
		/>
	);
};

export default SelectionHead;
