import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import React from 'react';

import { flatten, getTableRowKeys, getTableRowObjects } from "../../utils/baseUtils";

var SelectionHead = function SelectionHead(props) {
	var column = props.column,
	    container = props.container;
	var rowKey = column.rowKey,
	    onSelectAll = column.onSelectAll,
	    selectedRowKeys = column.selectedRowKeys,
	    selectAll = column.selectAll;


	var _handleChange = function _handleChange(e) {
		var rowKeys = flatten(getTableRowKeys(container.props.data, column.rowKey));
		var rowObjects = flatten(getTableRowObjects(container.props.data, rowKey)).filter(function (item) {
			return rowKeys.includes(item[rowKey]);
		});
		var totalLength = rowKeys.length;
		var selectLength = selectedRowKeys.length;
		var checked = !(totalLength === selectLength);

		// const newRowKeys = container.props.data.map((item) => { return item[column.rowKey] });
		onSelectAll({ selected: checked, rowKeys: rowKeys, rowObjects: rowObjects });
	};

	return React.createElement(_Checkbox, {
		indeterminate: selectAll === null,
		onChange: _handleChange,
		checked: selectAll
	});
};

export default SelectionHead;