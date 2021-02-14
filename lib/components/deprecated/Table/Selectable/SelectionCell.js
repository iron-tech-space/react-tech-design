import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from 'react';

import { flatten, getTableRowKeys, findNodeByRowKey, getTableRowObjects } from "../../../utils/baseUtils";

var getRowChildren = function getRowChildren(data, rowKey) {
	return data.map(function (item) {
		if (item.children && item.children.length) {
			return [item[rowKey], getRowChildren(item.children, rowKey)];
		}
		return item[rowKey];
	});
};

var findBrothers = function findBrothers(data, selfItem, rowKey, parentKey) {
	var rowKeys = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

	var arr = [];
	data.forEach(function (item) {
		if (item[parentKey] && item[parentKey] === selfItem[parentKey] && item[rowKey] !== selfItem[rowKey]) {
			if (rowKeys !== null) {
				if (rowKeys.includes(item[rowKey])) {
					arr.push(item[rowKey]);
				}
			} else {
				arr.push(item[rowKey]);
			}
		} else if (item.children && item.children.length) {
			arr.push(findBrothers(item.children, selfItem, rowKey, parentKey, rowKeys));
		}
	});
	return arr;
};

export var parentAnalysis = function parentAnalysis(_ref) {
	var rowData = _ref.rowData,
	    rowKey = _ref.rowKey,
	    parentKey = _ref.parentKey,
	    checked = _ref.checked,
	    nodeAssociated = _ref.nodeAssociated,
	    treeData = _ref.treeData,
	    selectedRowKeys = _ref.selectedRowKeys,
	    indeterminateRowKeys = _ref.indeterminateRowKeys;

	var _selectedRowKeys = [].concat(_toConsumableArray(selectedRowKeys));
	var _indeterminateRowKeys = [].concat(_toConsumableArray(indeterminateRowKeys));

	var currentRowData = rowData;
	var parentExist = !!currentRowData[parentKey];
	var lastTypeSelect = checked ? 'checked' : 'square';
	var typeSelect = '';
	var nextSquare = false;

	/** Пока есть родитель */
	while (parentExist && nodeAssociated) {
		var indeterminateBrothers = flatten(findBrothers(treeData, currentRowData, rowKey, parentKey, _indeterminateRowKeys));
		var selectedBrothers = flatten(findBrothers(treeData, currentRowData, rowKey, parentKey, _selectedRowKeys));
		var allBrothers = flatten(findBrothers(treeData, currentRowData, rowKey, parentKey));

		if (checked) {
			if (lastTypeSelect === 'checked' && selectedBrothers.length === allBrothers.length) typeSelect = 'checked';else typeSelect = 'square';
		} else {
			if (!checked && !nextSquare && (selectedBrothers.length || indeterminateBrothers.length)) nextSquare = true;
			if (nextSquare) typeSelect = 'square';else typeSelect = 'none';
		}

		// console.log("allBrothers ", allBrothers);
		// console.log("findParentById ", treeData,
		//     rowKey,
		//     parentKey,
		//     currentRowData[parentKey]);
		//
		// console.log("findNodeByRowKey ", findNodeByRowKey(treeData, rowKey, currentRowData[parentKey]));

		// Найти родителя
		currentRowData = findNodeByRowKey(treeData, rowKey, currentRowData[parentKey]);

		if (typeSelect === 'checked') {
			// Выделить галкой
			// console.log("checked");
			lastTypeSelect = 'checked';
			if (!_selectedRowKeys.includes(currentRowData[rowKey])) _selectedRowKeys.push(currentRowData[rowKey]);
			var index = _indeterminateRowKeys.indexOf(currentRowData[rowKey]);
			if (index > -1) _indeterminateRowKeys.splice(index, 1);
		} else if (typeSelect === 'square') {
			// Выдлеить квадратом
			// console.log("square: ");
			lastTypeSelect = 'square';
			if (!_indeterminateRowKeys.includes(currentRowData[rowKey])) _indeterminateRowKeys.push(currentRowData[rowKey]);
			var _index = _selectedRowKeys.indexOf(currentRowData[rowKey]);
			if (_index > -1) _selectedRowKeys.splice(_index, 1);
		} else if (typeSelect === 'none') {
			// Снять выделение
			// console.log("none: ");
			lastTypeSelect = 'none';
			var indexS = _selectedRowKeys.indexOf(currentRowData[rowKey]);
			if (indexS > -1) _selectedRowKeys.splice(indexS, 1);
			var indexI = _indeterminateRowKeys.indexOf(currentRowData[rowKey]);
			if (indexI > -1) _indeterminateRowKeys.splice(indexI, 1);
		}

		parentExist = !!currentRowData[parentKey];
		// parentExist = проверка наличия след родителя
	}

	return [_selectedRowKeys, _indeterminateRowKeys];
};

var SelectionCell = function SelectionCell(props) {
	var _handleChange = function _handleChange(checked) {
		var rowData = props.rowData,
		    rowIndex = props.rowIndex,
		    column = props.column,
		    container = props.container;
		var onChange = column.onChange,
		    selectedRowKeys = column.selectedRowKeys,
		    indeterminateRowKeys = column.indeterminateRowKeys,
		    rowKey = column.rowKey,
		    parentKey = column.parentKey,
		    nodeAssociated = column.nodeAssociated;

		// const rowKeys = flatten(getTableRowKeys([rowData], column.rowKey));
		// const totalLength = container.props.data.length;
		// const checked = e.target.checked;
		// const currentRowKey = {[rowKey]: rowData[rowKey], checked};
		// console.log("_handleChange: ", selectedRowKeys);

		var _selectedRowKeys = [].concat(_toConsumableArray(selectedRowKeys));
		var _indeterminateRowKeys = [].concat(_toConsumableArray(indeterminateRowKeys));

		/** Обработка себя, поиск детей, выделение / снятие их */
		var rowChildren = [];
		if (checked) {
			if (rowData.children && nodeAssociated) rowChildren = flatten(getRowChildren(rowData.children, rowKey));

			_selectedRowKeys = _selectedRowKeys.concat([rowData[rowKey]]).concat(rowChildren);
			_indeterminateRowKeys = _indeterminateRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
		} else {
			if (rowData.children && nodeAssociated) rowChildren = flatten(getRowChildren(rowData.children, rowKey, false));

			_selectedRowKeys = _selectedRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
			_indeterminateRowKeys = _indeterminateRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
		}

		var _parentAnalysis = parentAnalysis({
			rowData: rowData,
			rowKey: rowKey,
			parentKey: parentKey,
			checked: checked,
			nodeAssociated: nodeAssociated,
			treeData: container.props.data,
			selectedRowKeys: _selectedRowKeys,
			indeterminateRowKeys: _indeterminateRowKeys
		});

		var _parentAnalysis2 = _slicedToArray(_parentAnalysis, 2);

		_selectedRowKeys = _parentAnalysis2[0];
		_indeterminateRowKeys = _parentAnalysis2[1];


		var keys = [].concat(_toConsumableArray(new Set(_selectedRowKeys)));
		var _selectedRowObjects = flatten(getTableRowObjects(container.props.data, rowKey)).filter(function (item) {
			return keys.includes(item[rowKey]);
		});
		//return [...new Set(_disabledElements)]
		// onChange({ selected: checked, totalLength, rowData, rowIndex });

		/** Выясняем новое состояние галочки "Выделить все" */
		var selectAll = void 0;
		var selectLength = _selectedRowKeys.length;
		var totalLength = flatten(getTableRowKeys(container.props.data, column.rowKey)).length;

		if (selectLength === 0) selectAll = false;else if (totalLength === selectLength) selectAll = true;else if (totalLength !== selectLength) selectAll = null;

		onChange({
			selected: checked,
			_selectedRow: {
				rowData: _extends({}, rowData),
				rowIndex: rowIndex,
				rowKey: rowKey
			},
			_selectAll: selectAll,
			_selectedRowKeys: keys, //[...new Set(_selectedRowKeys)],
			_selectedRowObjects: _selectedRowObjects,
			_indeterminateRowKeys: [].concat(_toConsumableArray(new Set(_indeterminateRowKeys)))
		});

		// let uniqIds = {};
		// onChange({selected: checked, rowKeys: rowKeys.filter(obj => !uniqIds[obj[rowKey]] && (uniqIds[obj[rowKey]] = true)) });
	};

	var rowData = props.rowData,
	    column = props.column;
	var selectedRowKeys = column.selectedRowKeys,
	    indeterminateRowKeys = column.indeterminateRowKeys,
	    rowKey = column.rowKey;

	var det = indeterminateRowKeys.includes(rowData[rowKey]);
	var checked = selectedRowKeys.includes(rowData[rowKey]);

	return React.createElement(_Checkbox, {
		indeterminate: det,
		onChange: function onChange(e) {
			return _handleChange(e.target.checked);
		},
		checked: checked
	});
};

export default SelectionCell;