import React from 'react';
import {Checkbox} from 'antd';
import { flatten, getTableRowKeys, getTableRowObjects } from "../../../utils/baseUtils";

const SelectionHead = (props) => {
	const {column, container} = props;
	const {rowKey, onSelectAll, selectedRowKeys, selectAll} = column;

	const _handleChange = (e) => {
		const rowKeys = flatten(getTableRowKeys(container.props.data, column.rowKey));
		const rowObjects = flatten(getTableRowObjects(container.props.data, rowKey)).filter((item) => rowKeys.includes(item[rowKey]));
		const totalLength = rowKeys.length;
		const selectLength = selectedRowKeys.length;
		const checked = !(totalLength === selectLength);

		// const newRowKeys = container.props.data.map((item) => { return item[column.rowKey] });
		onSelectAll({selected: checked, rowKeys: rowKeys, rowObjects: rowObjects});
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
