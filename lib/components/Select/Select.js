import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/typography/style';
import _Typography from 'antd/es/typography';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { flatten, getTableRowKeys, noop } from '../utils/baseUtils';
import { SelectContainer } from '../Select/SelectContainer';

import Table from '../Table/Table';
var Paragraph = _Typography.Paragraph;


var Select = function Select(props) {
	var _useState = useState([]),
	    _useState2 = _slicedToArray(_useState, 2),
	    _selectedRowKeys = _useState2[0],
	    setSelectedRowKeys = _useState2[1];

	var _useState3 = useState(null),
	    _useState4 = _slicedToArray(_useState3, 2),
	    _selectedRowData = _useState4[0],
	    setSelectedRowData = _useState4[1];

	var _useState5 = useState(false),
	    _useState6 = _slicedToArray(_useState5, 2),
	    isSelectOpened = _useState6[0],
	    setIsSelectOpened = _useState6[1];

	var name = props.name,
	    rowRender = props.rowRender,
	    className = props.className,
	    type = props.type,
	    title = props.title,
	    placeholder = props.placeholder,
	    selectedRowKeys = props.selectedRowKeys,
	    widthControl = props.widthControl,
	    widthPopup = props.widthPopup,
	    heightPopup = props.heightPopup,
	    onChangeKeys = props.onChangeKeys,
	    defaultSelectedRowKeys = props.defaultSelectedRowKeys,
	    rowKey = props.rowKey,
	    expandColumnKey = props.expandColumnKey,
	    showSelection = props.showSelection,
	    requestLoadRows = props.requestLoadRows,
	    requestLoadDefault = props.requestLoadDefault,
	    commandPanelProps = props.commandPanelProps,
	    rows = props.rows;


	var searchable = commandPanelProps && commandPanelProps.showElements && commandPanelProps.showElements.includes('search');

	useEffect(function () {
		if (defaultSelectedRowKeys) {
			var request = requestLoadDefault ? requestLoadDefault : requestLoadRows;

			if (!!request && !rows && defaultSelectedRowKeys.length > 0) {
				// console.log('defaultSelectedRowKeys ', defaultSelectedRowKeys, defaultSelectedRowKeys.length);
				request({
					data: _defineProperty({}, rowKey, defaultSelectedRowKeys)
				}).then(function (response) {
					var result = response.data;
					if (result.length > 0) setSelectedRowData(result[0]);
				}).catch(function (error) {});
			} else if (rows && defaultSelectedRowKeys.length > 0 && type === 'SingleSelect') {
				var findRow = rows.find(function (row) {
					return row[rowKey] === defaultSelectedRowKeys[0];
				});
				// console.log("setSelectedRowData => ", findRow);
				setSelectedRowData(findRow);
			}
			// console.log("setSelectedRowKeys[65] -> ", defaultSelectedRowKeys);
			setSelectedRowKeys(defaultSelectedRowKeys);
		}
	}, []);

	useEffect(function () {
		if (selectedRowKeys && selectedRowKeys.length === 0) {
			// console.log("setSelectedRowKeys[72] -> ", selectedRowKeys);
			setSelectedRowKeys(selectedRowKeys);
		}
		if (rows && selectedRowKeys.length > 0 && type === 'SingleSelect') {
			var findRow = rows.find(function (row) {
				return row[rowKey] === selectedRowKeys[0];
			});
			// console.log("setSelectedRowData => ", findRow);
			setSelectedRowData(findRow);
		}
	}, [selectedRowKeys]);

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

	var _getHeadText = function _getHeadText() {
		if (type === 'SingleSelect') {
			return _selectedRowData && _selectedRowData[rowRender] ? '' + _selectedRowData[rowRender] : '' + placeholder;
		} else {
			return _selectedRowKeys.length > 0 ? '\u0412\u044B\u0431\u0440\u0430\u043D\u043E: ' + _selectedRowKeys.length : '' + placeholder;
		}
	};

	var _getPopupStyle = function _getPopupStyle() {
		// if (heightPopup)
		// 	return {height: `${heightPopup}px`, width: `${widthPopup}px`};

		var height = {};
		var defRowsLen = 0;

		if (!requestLoadRows && rows) if (expandColumnKey) defRowsLen = flatten(getTableRowKeys(rows, rowKey)).length;else defRowsLen = rows.length;

		// console.log('_getPopupStyle', defRowsLen);
		if (defRowsLen && defRowsLen > 0) {
			height = defRowsLen * 30 + ( // Кол-во строк * высоту строки
			searchable ? 46 : 0) + ( // Размер поисковой строки или 0
			type === 'MultiSelect' ? 65 : 0) + ( // Размер футтера (30) + размер кнопки 35 или 0
			showSelection ? 200 : 0) + // Размер панели выбранных элементов или 0
			22; // Паддинги и бордер
			// console.log('heightPopup', height);
			if (height > heightPopup) height = heightPopup + 'px';else height = height + 'px';
		} else {
			// console.log("heightPopup", heightPopup);
			height = heightPopup + 'px';
		}

		// console.log("heightPopup, widthPopup", heightPopup, widthPopup);
		return { height: height, width: widthPopup + 'px' };
	};

	var _onChange = function _onChange(selectedKeys) {
		// console.log('_onChange', selectedObjects);
		setSelectedRowKeys(selectedKeys);
		// setSelectedRowData(selectedObjects);
		onChangeKeys(name, selectedKeys.length ? selectedKeys : null);
		// onChangeObjects(name, selectedObjects.length ? selectedObjects : null);
		// setCountSelect(selectedKeys.length);
		if (type === 'SingleSelect') {
			setIsSelectOpened(false);
		}
	};

	var _SingleSelectRow = function _SingleSelectRow(_ref2) {
		var selected = _ref2.selected,
		    rowData = _ref2.rowData,
		    rowIndex = _ref2.rowIndex;

		// console.log("_SingleSelectRow => ", rowData);
		setSelectedRowData(rowData);
		// selected ? setSingleSelectRowData(rowData) : setSingleSelectRowData({})
	};

	return React.createElement(
		SelectContainer,
		{
			handleOpen: function handleOpen() {
				return setIsSelectOpened(true);
			},
			handleClose: function handleClose() {
				return setIsSelectOpened(false);
			},
			isOpened: isSelectOpened,
			className: className
		},
		title ? React.createElement(
			'div',
			{ className: 'title' },
			title
		) : null,
		React.createElement(
			'div',
			{
				className: ['select-header', isSelectOpened ? 'opened' : '', _selectedRowKeys && _selectedRowKeys.length > 0 ? 'selected' : ''].join(' '),
				style: {
					width: widthControl === 0 ? '100%' : widthControl + 'px'
				}
			},
			React.createElement(
				Paragraph,
				{ ellipsis: true },
				' ',
				_getHeadText(),
				' '
			)
		),
		isSelectOpened ? React.createElement(
			'div',
			{ className: 'select-popup', style: _getPopupStyle() },
			React.createElement(Table, _extends({}, props, {
				defaultSelectedRowKeys: _selectedRowKeys,
				selectedRowKeys: _selectedRowKeys,
				headerHeight: 0,
				columns: columns,
				type: !!requestLoadRows ? 'serverSide' : 'localSide'
				// showElements={searchable ? ['search'] : undefined}
				, selectable: type === 'MultiSelect',
				footerShow: type === 'MultiSelect',
				showSelection: showSelection,
				rowRenderShowSelection: rowRender,
				onRowClick: _SingleSelectRow,
				onSelectedRowsChange: _onChange
			})),
			type === 'MultiSelect' ? React.createElement(
				'div',
				{ className: 'close-panel' },
				React.createElement(
					_Button,
					{
						onClick: function onClick() {
							return setIsSelectOpened(false);
						},
						size: 'small'
					},
					'Ok'
				)
			) : null
		) : null
	);
};

Select.propTypes = {
	/** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
	name: PropTypes.string.isRequired,

	/** Строка или функция для отображения элементов списка
  * Строка - имя поля
  * Функция - рендер строк. Параметры v
  * { rowData, rowIndex }) */
	rowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

	/** Тип селекта (SingleSelect и MultiSelect) */
	type: PropTypes.oneOf(['SingleSelect', 'MultiSelect']).isRequired,

	/** Дополнительное имя класса для элемента */
	className: PropTypes.string,

	/** Заголовок фильтра */
	title: PropTypes.string,

	/** Строка, когда ничего не выбрано */
	placeholder: PropTypes.string,

	/** Запрос на загрузку дефолтных данных */
	requestLoadDefault: PropTypes.func,

	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	// /** Показывать ли поисковую строку */
	// searchable: PropTypes.bool,

	/** Ширина поля выбора в пикселях */
	widthControl: PropTypes.number,

	/** Ширина выпадающего меню */
	widthPopup: PropTypes.number,

	/** Высота выпадающего меню (по умолчанию считается сама) */
	heightPopup: PropTypes.number,

	/** Событие об изменении состояния селектора */
	onChangeKeys: PropTypes.func
};

Select.defaultProps = {
	onChangeKeys: noop,
	// onChangeObjects: noop,
	placeholder: 'Выбрать',
	// searchable: false,
	widthControl: 110,
	widthPopup: 400,
	heightPopup: 600,
	rowKey: 'id'
};

export default Select;