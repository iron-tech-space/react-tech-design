import React from 'react';
import {Checkbox} from 'antd';
import {
	flatten,
	getTableRowKeys,
	findNodeByRowKey, getTableRowObjects
} from "../../../utils/baseUtils";

const getRowChildren = (data, rowKey) =>
	data.map((item) => {
		if (item.children && item.children.length) {
			return [item[rowKey], getRowChildren(item.children, rowKey)];
		}
		return item[rowKey];
	});

const findBrothers = (data, selfItem, rowKey, parentKey, rowKeys = null) => {
	let arr = [];
	data.forEach((item) => {
		if (
			item[parentKey] &&
			item[parentKey] === selfItem[parentKey] &&
			item[rowKey] !== selfItem[rowKey]
		) {
			if (rowKeys !== null) {
				if (rowKeys.includes(item[rowKey])) {
					arr.push(item[rowKey]);
				}
			} else {
				arr.push(item[rowKey]);
			}
		} else if (item.children && item.children.length) {
			arr.push(
				findBrothers(
					item.children,
					selfItem,
					rowKey,
					parentKey,
					rowKeys
				)
			);
		}
	});
	return arr;
};

export const parentAnalysis = ({
	rowData,
	rowKey,
	parentKey,
	checked,
	nodeAssociated,
	treeData,
	selectedRowKeys,
	indeterminateRowKeys,
}) => {
	let _selectedRowKeys = [...selectedRowKeys];
	let _indeterminateRowKeys = [...indeterminateRowKeys];

	let currentRowData = rowData;
	let parentExist = !!currentRowData[parentKey];
	let lastTypeSelect = checked ? 'checked' : 'square';
	let typeSelect = '';
	let nextSquare = false;

	/** Пока есть родитель */
	while (parentExist && nodeAssociated) {
		const indeterminateBrothers = flatten(
			findBrothers(
				treeData,
				currentRowData,
				rowKey,
				parentKey,
				_indeterminateRowKeys
			)
		);
		const selectedBrothers = flatten(
			findBrothers(
				treeData,
				currentRowData,
				rowKey,
				parentKey,
				_selectedRowKeys
			)
		);
		const allBrothers = flatten(
			findBrothers(treeData, currentRowData, rowKey, parentKey)
		);

		if (checked) {
			if (
				lastTypeSelect === 'checked' &&
				selectedBrothers.length === allBrothers.length
			)
				typeSelect = 'checked';
			else typeSelect = 'square';
		} else {
			if (
				!checked &&
				!nextSquare &&
				(selectedBrothers.length || indeterminateBrothers.length)
			)
				nextSquare = true;
			if (nextSquare) typeSelect = 'square';
			else typeSelect = 'none';
		}

		// console.log("allBrothers ", allBrothers);
		// console.log("findParentById ", treeData,
		//     rowKey,
		//     parentKey,
		//     currentRowData[parentKey]);
		//
		// console.log("findNodeByRowKey ", findNodeByRowKey(treeData, rowKey, currentRowData[parentKey]));

		// Найти родителя
		currentRowData = findNodeByRowKey(
			treeData,
			rowKey,
			currentRowData[parentKey]
		);

		if (typeSelect === 'checked') {
			// Выделить галкой
			// console.log("checked");
			lastTypeSelect = 'checked';
			if (!_selectedRowKeys.includes(currentRowData[rowKey]))
				_selectedRowKeys.push(currentRowData[rowKey]);
			const index = _indeterminateRowKeys.indexOf(currentRowData[rowKey]);
			if (index > -1) _indeterminateRowKeys.splice(index, 1);
		} else if (typeSelect === 'square') {
			// Выдлеить квадратом
			// console.log("square: ");
			lastTypeSelect = 'square';
			if (!_indeterminateRowKeys.includes(currentRowData[rowKey]))
				_indeterminateRowKeys.push(currentRowData[rowKey]);
			const index = _selectedRowKeys.indexOf(currentRowData[rowKey]);
			if (index > -1) _selectedRowKeys.splice(index, 1);
		} else if (typeSelect === 'none') {
			// Снять выделение
			// console.log("none: ");
			lastTypeSelect = 'none';
			const indexS = _selectedRowKeys.indexOf(currentRowData[rowKey]);
			if (indexS > -1) _selectedRowKeys.splice(indexS, 1);
			const indexI = _indeterminateRowKeys.indexOf(
				currentRowData[rowKey]
			);
			if (indexI > -1) _indeterminateRowKeys.splice(indexI, 1);
		}

		parentExist = !!currentRowData[parentKey];
		// parentExist = проверка наличия след родителя
	}

	return [_selectedRowKeys, _indeterminateRowKeys];
};

const SelectionCell = (props) => {
	const _handleChange = (checked) => {
		const {rowData, rowIndex, column, container} = props;
		const {
			onChange,
			selectedRowKeys,
			indeterminateRowKeys,
			rowKey,
			parentKey,
			nodeAssociated,
		} = column;

		// const rowKeys = flatten(getTableRowKeys([rowData], column.rowKey));
		// const totalLength = container.props.data.length;
		// const checked = e.target.checked;
		// const currentRowKey = {[rowKey]: rowData[rowKey], checked};
		// console.log("_handleChange: ", selectedRowKeys);

		let _selectedRowKeys = [...selectedRowKeys];
		let _indeterminateRowKeys = [...indeterminateRowKeys];

		/** Обработка себя, поиск детей, выделение / снятие их */
		let rowChildren = [];
		if (checked) {
			if (rowData.children && nodeAssociated)
				rowChildren = flatten(getRowChildren(rowData.children, rowKey));

			_selectedRowKeys = _selectedRowKeys
				.concat([rowData[rowKey]])
				.concat(rowChildren);
			_indeterminateRowKeys = _indeterminateRowKeys.filter(
				(element) =>
					element !== rowData[rowKey] &&
					!rowChildren.includes(element)
			);
		} else {
			if (rowData.children && nodeAssociated)
				rowChildren = flatten(
					getRowChildren(rowData.children, rowKey, false)
				);

			_selectedRowKeys = _selectedRowKeys.filter(
				(element) =>
					element !== rowData[rowKey] &&
					!rowChildren.includes(element)
			);
			_indeterminateRowKeys = _indeterminateRowKeys.filter(
				(element) =>
					element !== rowData[rowKey] &&
					!rowChildren.includes(element)
			);
		}

		[_selectedRowKeys, _indeterminateRowKeys] = parentAnalysis({
			rowData,
			rowKey,
			parentKey,
			checked,
			nodeAssociated,
			treeData: container.props.data,
			selectedRowKeys: _selectedRowKeys,
			indeterminateRowKeys: _indeterminateRowKeys,
		});

		const keys = [...new Set(_selectedRowKeys)];
		const _selectedRowObjects = flatten(getTableRowObjects(container.props.data, rowKey)).filter((item) => keys.includes(item[rowKey]));
		//return [...new Set(_disabledElements)]
		// onChange({ selected: checked, totalLength, rowData, rowIndex });

		/** Выясняем новое состояние галочки "Выделить все" */
		let selectAll;
		const selectLength = _selectedRowKeys.length;
		const totalLength = flatten(
			getTableRowKeys(container.props.data, column.rowKey)
		).length;

		if (selectLength === 0) selectAll = false;
		else if (totalLength === selectLength) selectAll = true;
		else if (totalLength !== selectLength) selectAll = null;



		onChange({
			selected: checked,
			_selectedRow: {
				rowData: {...rowData},
				rowIndex: rowIndex,
				rowKey: rowKey,
			},
			_selectAll: selectAll,
			_selectedRowKeys: keys, //[...new Set(_selectedRowKeys)],
			_selectedRowObjects: _selectedRowObjects,
			_indeterminateRowKeys: [...new Set(_indeterminateRowKeys)],
		});

		// let uniqIds = {};
		// onChange({selected: checked, rowKeys: rowKeys.filter(obj => !uniqIds[obj[rowKey]] && (uniqIds[obj[rowKey]] = true)) });
	};

	const {rowData, column} = props;
	const {selectedRowKeys, indeterminateRowKeys, rowKey} = column;
	const det = indeterminateRowKeys.includes(rowData[rowKey]);
	const checked = selectedRowKeys.includes(rowData[rowKey]);

	return (
		<Checkbox
			indeterminate={det}
			onChange={(e) => _handleChange(e.target.checked)}
			checked={checked}
		/>
	);
};

export default SelectionCell;
