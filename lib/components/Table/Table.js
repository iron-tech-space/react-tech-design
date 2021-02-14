var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useRef, forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseTable, { AutoResizer, callOrReturn } from 'react-base-table';
// import BaseTable from "./BaseTable/BaseTable";
import { empty, overlay } from './defaultSettings';
import SelectionHead from './Selectable/SelectionHead';
import SelectionCell, { parentAnalysis, onChangeSelectionCell } from './Selectable/SelectionCell';
import SelectionList from './SelectionList/SelectionList';
import { rtPrefix } from '../utils/variables';
import { flatten, generateUUID, getTableRowKeys, findNodeByRowKey, noop, getTableRowObjects, notificationError, dispatchToStore, useMounted } from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import FormItems from "../deprecated/Form/FormItems";
import moment from "moment";
// import {Checkbox} from 'antd';

var Table = forwardRef(function (props, ref) {

	/** Наличие на сервере еще данных */
	var _useState = useState(true),
	    _useState2 = _slicedToArray(_useState, 2),
	    hasMore = _useState2[0],
	    setHasMore = _useState2[1];
	/** Индикатор загрузки данных */


	var _useState3 = useState(false),
	    _useState4 = _slicedToArray(_useState3, 2),
	    loading = _useState4[0],
	    setLoading = _useState4[1];

	/** Indoor control */
	/** Колонки таблицы */
	// const [_columns, _setColumns] = useState([]);


	var _useState5 = useState([]),
	    _useState6 = _slicedToArray(_useState5, 2),
	    _rows = _useState6[0],
	    _setRows = _useState6[1];

	var _useState7 = useState([]),
	    _useState8 = _slicedToArray(_useState7, 2),
	    _selectedRowKeys = _useState8[0],
	    setSelectedRowKeys = _useState8[1];

	var _useState9 = useState({}),
	    _useState10 = _slicedToArray(_useState9, 2),
	    _searchValue = _useState10[0],
	    setSearchValue = _useState10[1];

	var _useState11 = useState(false),
	    _useState12 = _slicedToArray(_useState11, 2),
	    _filter = _useState12[0],
	    setFilter = _useState12[1];

	var _useState13 = useState({}),
	    _useState14 = _slicedToArray(_useState13, 2),
	    _sortBy = _useState14[0],
	    setSortBy = _useState14[1];

	/** Selectable States */


	var _useState15 = useState(false),
	    _useState16 = _slicedToArray(_useState15, 2),
	    selectAll = _useState16[0],
	    setSelectAll = _useState16[1];

	/** Tree States */


	var _useState17 = useState([]),
	    _useState18 = _slicedToArray(_useState17, 2),
	    _indeterminateRowKeys = _useState18[0],
	    setIndeterminateRowKeys = _useState18[1];

	var _useState19 = useState([]),
	    _useState20 = _slicedToArray(_useState19, 2),
	    _expandedRowKeys = _useState20[0],
	    setExpandedRowKeys = _useState20[1];

	var _useState21 = useState(0),
	    _useState22 = _slicedToArray(_useState21, 2),
	    _totalCountRows = _useState22[0],
	    setTotalCountRows = _useState22[1];

	var _useState23 = useState(false),
	    _useState24 = _slicedToArray(_useState23, 2),
	    _footerShow = _useState24[0],
	    _setFooterShow = _useState24[1];

	var tableRef = useRef();

	var isMounted = useMounted();

	var columns = props.columns,
	    infinityMode = props.infinityMode,
	    defaultRows = props.defaultRows,
	    defaultSelectedRowKeys = props.defaultSelectedRowKeys,
	    defaultSearchValue = props.defaultSearchValue,
	    defaultFilter = props.defaultFilter,
	    defaultSortBy = props.defaultSortBy,
	    rows = props.rows,
	    setRows = props.setRows,
	    selectedRowKeys = props.selectedRowKeys,
	    searchValue = props.searchValue,
	    filter = props.filter,
	    sortBy = props.sortBy,
	    rowKey = props.rowKey,
	    customFields = props.customFields,
	    empty = props.empty,
	    overlay = props.overlay,
	    fixWidthColumn = props.fixWidthColumn,
	    headerHeight = props.headerHeight,
	    rowHeight = props.rowHeight,
	    rowRenderer = props.rowRenderer,
	    zebraStyle = props.zebraStyle,
	    estimatedRowHeight = props.estimatedRowHeight,
	    loadThreshold = props.loadThreshold,
	    pageSize = props.pageSize,
	    requestLoadRows = props.requestLoadRows,
	    requestLoadCount = props.requestLoadCount,
	    searchParamName = props.searchParamName,
	    selectable = props.selectable,
	    nodeAssociated = props.nodeAssociated,
	    expandColumnKey = props.expandColumnKey,
	    expandDefaultAll = props.expandDefaultAll,
	    expandLazyLoad = props.expandLazyLoad,
	    expandParentKey = props.expandParentKey,
	    onRowClick = props.onRowClick,
	    onRowDoubleClick = props.onRowDoubleClick,
	    onRowExpand = props.onRowExpand,
	    onSelectedRowsChange = props.onSelectedRowsChange,
	    onExpandedRowsChange = props.onExpandedRowsChange,
	    showSelection = props.showSelection,
	    rowRenderShowSelection = props.rowRenderShowSelection,
	    dispatchPath = props.dispatchPath,
	    subscribe = props.subscribe;


	var footerProps = _extends({}, Table.defaultProps.footerProps, props.footerProps);

	var selectedDispatchPath = dispatchPath && dispatchPath + '.selected';
	var rowsDispatchPath = dispatchPath && dispatchPath + '.rows';
	var rowDoubleClickDispatchPath = dispatchPath && dispatchPath + '.events.onRowDoubleClick';

	useEffect(function () {
		// console.log("Инициализация дефолтных значений ", selectColumn, columns);
		// console.log("Инициализация дефолтных значений defaultSelectedRowKeys > ", defaultSelectedRowKeys);

		// Инициализация дефолтных значений
		// _setRows(defaultRows);
		_setRowsHandler(defaultRows);
		// setSelectedRowKeys(defaultSelectedRowKeys);
		_setSelectedRowsHandler(defaultSelectedRowKeys, undefined, defaultRows);
		setSearchValue(defaultSearchValue);
		setFilter(defaultFilter);
		setSortBy(defaultSortBy);
		setSelectAll(defaultRows.length > 0 && defaultRows.length === defaultSelectedRowKeys.length);
		// Определение нужно ли отображать подвал
		_setFooterShow(footerProps.showElements.length || footerProps.leftCustomSideElement || footerProps.centerCustomSideElement || footerProps.rightCustomSideElement);

		// Only tree table
		if (!!expandColumnKey && !expandLazyLoad) {
			// Открытие всех нод
			if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(defaultRows, rowKey)));
			// Установка квадратиков на нужных нодах
			if (defaultSelectedRowKeys && defaultSelectedRowKeys.length > 0) {
				var flatRows = flatten(getTableRowKeys(defaultRows, rowKey));
				var selectedRow = flatRows.filter(function (item) {
					return defaultSelectedRowKeys.includes(item[rowKey]);
				});
				var _indeterminateRowKeys2 = [];
				selectedRow.forEach(function (item) {
					var _parentAnalysis = parentAnalysis({
						rowData: item,
						rowKey: rowKey,
						parentKey: expandParentKey,
						checked: true,
						nodeAssociated: nodeAssociated,
						treeData: defaultRows,
						selectedRowKeys: defaultSelectedRowKeys,
						indeterminateRowKeys: _indeterminateRowKeys2
					}),
					    _parentAnalysis2 = _slicedToArray(_parentAnalysis, 2),
					    ss = _parentAnalysis2[0],
					    ii = _parentAnalysis2[1];

					_indeterminateRowKeys2.push.apply(_indeterminateRowKeys2, _toConsumableArray(ii));
				});
				setIndeterminateRowKeys([].concat(_toConsumableArray(new Set(_indeterminateRowKeys2))));
			}
		}

		// if (type !== 'localSide') {
		_dataProcessing({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchLine: defaultSearchValue,
			reload: true
		});
		// }
		// console.log("Table => useEffect start ");
		// setMounted(true);
		if (ref && typeof ref === 'function') ref({ reloadData: reloadData });else if (ref && (typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) === 'object') ref.current = { reloadData: reloadData };
	}, []);

	useEffect(function () {
		// if (type === 'localSide') {
		// 	console.log("Control useEffect => ", rows, selectedRowKeys, searchValue, filter, sortBy);
		// _setRows(rows);
		_setRowsHandler(rows);
		// setSelectedRowKeys(selectedRowKeys);
		_setSelectedRowsHandler(selectedRowKeys, undefined, rows);
		setSearchValue(searchValue);
		setFilter(filter);
		setSortBy(sortBy);
		if (!!expandColumnKey && !expandLazyLoad) {
			// Открытие всех нод
			if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(rows, rowKey)));
		}
		// }
	}, [rows, selectedRowKeys, searchValue, filter, sortBy]);

	/** Подписка на изменение props[subscribe.name] в сторе */
	subscribe.map(function (item) {
		return useEffect(function () {
			if (isMounted && item.name) {
				// console.log("Table => useEffect => [%s] ", item.name, props[item.name]);
				var onChangeObject = {
					value: props[item.name],
					extraData: props[item.name + 'ExtraData'],
					reloadTable: reloadData,
					addRows: _addRows,
					addRow: _addRow,
					addRowAsCopy: _addRowAsCopy,
					editRow: _editRow,
					removeRow: _removeRow,
					moveUpRow: _moveUpRow,
					moveDownRow: _moveDownRow
				};
				item.onChange && item.onChange(onChangeObject);
			}
		}, [props[item.name]]);
	});

	/** BASE FUNCTIONS */
	var _setRowsHandler = function _setRowsHandler(rows) {
		_setRows(rows);
		setRows(rows);
		rowsDispatch(rows);
	};

	var _setSelectedRowsHandler = function _setSelectedRowsHandler() {
		var selectedKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var selectedObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
		var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		setSelectedRowKeys(selectedKeys);
		if (selectedKeys.length === 0) {
			if (selectable) selectedDispatch([]);else selectedDispatch(undefined);
		} else if (selectedKeys.length > 0 && !selectedObjects) {
			if (selectable) selectedDispatch(flatten(getTableRowObjects(rows, rowKey)).filter(function (item) {
				return selectedKeys.includes(item[rowKey]);
			}));else selectedDispatch(findNodeByRowKey(rows, rowKey, selectedKeys[0]));
		} else selectedDispatch(selectedObjects);
	};

	var rowsDispatch = function rowsDispatch(rows) {
		rowsDispatchPath && props.setDateStore && props.setDateStore(rowsDispatchPath, rows);
	};

	var selectedDispatch = function selectedDispatch(data) {
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, data);
	};

	var rowDoubleClickDispatch = function rowDoubleClickDispatch(value) {
		rowDoubleClickDispatchPath && props.setDateStore && props.setDateStore(rowDoubleClickDispatchPath, {
			timestamp: moment(),
			value: value
		});
	};

	var reloadData = function reloadData(_ref, appendParams) {
		var sortBy = _ref.sortBy,
		    filter = _ref.filter,
		    searchValue = _ref.searchValue;

		// console.log("reloadData params ", sortBy, filter, searchValue, loading);
		tableRef.current && tableRef.current.scrollToRow(0, 'auto');
		if (props.value && props.value.length > 0) _setSelectedRowsHandler(props.value.map(function (item) {
			return item[rowKey];
		}), props.value);else _setSelectedRowsHandler();

		var __sortBy = appendParams ? sortBy ? sortBy : _sortBy : sortBy;
		var __filter = appendParams ? _extends({}, _filter, filter) : filter;
		var __searchValue = appendParams ? searchValue ? searchValue : _searchValue : searchValue;
		if (sortBy) setSortBy(__sortBy);
		if (filter) setFilter(__filter);
		if (searchValue) setSearchValue(__searchValue);
		_dataProcessing({
			sortBy: __sortBy,
			filter: __filter,
			searchLine: __searchValue,
			reload: true
		});
		// console.log("reloadData loading ", loading);
	};

	var _dataProcessing = function _dataProcessing(params) {
		// console.log('_dataProcessing', params);
		var sortBy = params.sortBy,
		    filter = params.filter,
		    searchLine = params.searchLine,
		    expandRow = params.expandRow,
		    reload = params.reload;

		if ((hasMore || reload) && !loading) {
			setLoading(true);
			var pageNum = reload ? 0 : Math.floor(_rows.length / pageSize);
			var _params = {
				page: pageNum,
				size: pageSize,
				sort: sortBy && sortBy.key ? sortBy.key + ',' + sortBy.order : null
			};
			var dataQuery = _extends({}, filter, searchLine ? _defineProperty({}, searchParamName, searchLine) : null);
			// console.log('dataQuery', dataQuery);

			if (infinityMode && reload && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad) {
				requestLoadCount({
					params: _params,
					data: dataQuery
				}).then(function (response) {
					// console.log("infinity then response", response);
					// const result = response.data;
					setTotalCountRows(response.data);
				}).catch(function (error) {
					return notificationError(error, 'Ошибка получения количества записей по фильтру');
				});
			}

			// console.log('requestLoadRows => ', typeof requestLoadRows);
			// if(typeof requestLoadRows !== 'function'){
			//     setLoading(false);
			// }
			requestLoadRows({
				params: _params,
				data: dataQuery
			}).then(function (response) {
				// console.log("infinity then response", response);
				var result = response.data;
				// Если иерархия и ленивая, то ищим кому добавть полученные записи
				if (!!expandColumnKey && expandLazyLoad) {
					// lastExpandRow//, setLastExpandRow
					// console.log('!!expandColumnKey && expandLazyLoad', result);
					if (pageNum === 0) {
						result.forEach(function (child) {
							child.children = [_defineProperty({}, rowKey, generateUUID())];
						});
						// _setRows(result);
						_setRowsHandler(result);
					} else {
						var newRows = [].concat(_toConsumableArray(_rows));
						// (data, rowKey, rowValue)
						result.forEach(function (child) {
							child.children = [_defineProperty({}, rowKey, generateUUID())];
						});
						var node = findNodeByRowKey(newRows, rowKey, expandRow[rowKey]);
						node.children = result;
						// console.log('newRows -> ', newRows);
						// _setRows(newRows);
						_setRowsHandler(newRows);
					}
				} else {
					if (result && result.length < pageSize) {
						setHasMore(false);
					} else {
						setHasMore(true);
					}
					pageNum === 0 ? _setRowsHandler(result) // _setRows
					: _setRowsHandler(_rows.concat(result)); // _setRows

					// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);
					if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(result, rowKey)));
				}

				setLoading(false);
			}).catch(function (error) {
				notificationError(error, 'Ошибка загрузки данных');
				_setRowsHandler(_rows); // _setRows
				// setHasMore(false);
				setLoading(false);
			});
		}
	};

	/** Событие выделение одной строки в режиме без галочек */
	var useSimpleAndDoubleClick = function useSimpleAndDoubleClick(actionSimpleClick, actionDoubleClick) {
		var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

		var _useState25 = useState(0),
		    _useState26 = _slicedToArray(_useState25, 2),
		    click = _useState26[0],
		    setClick = _useState26[1];

		var _useState27 = useState(undefined),
		    _useState28 = _slicedToArray(_useState27, 2),
		    data = _useState28[0],
		    setData = _useState28[1];

		useEffect(function () {
			var timer = setTimeout(function () {
				// simple click
				if (click === 1) actionSimpleClick(data);
				setClick(0);
			}, delay);
			if (click === 2) actionDoubleClick(data);
			return function () {
				return clearTimeout(timer);
			};
		}, [click]);
		return function (_data) {
			setClick(function (prev) {
				return prev + 1;
			});setData(function () {
				return _data;
			});
		};
	};
	var _onRowClick = function _onRowClick(_ref5) {
		var rowData = _ref5.rowData,
		    rowIndex = _ref5.rowIndex,
		    rowKey = _ref5.rowKey,
		    event = _ref5.event;

		if (!selectable) {
			// console.log('_rowEventHandlers -> onClick', rowKey, rowIndex);
			// console.log('q onRowClick => ', rowData)
			var newRowObject = {
				rowData: _extends({}, rowData),
				rowIndex: rowIndex,
				rowKey: rowKey
			};
			_setSelectedRowsHandler([rowKey], rowData);
			onRowClick(_extends({
				selected: true
			}, newRowObject));
			onSelectedRowsChange([rowKey], [rowData]);
		} else {
			var checked = !_selectedRowKeys.includes(rowKey);
			onChangeSelectionCell({
				rowData: rowData,
				rowIndex: rowIndex,
				column: _getSelectionColumnProps(),
				rows: _rows,
				checked: checked
			});
		}
	};
	var _onDoubleClick = function _onDoubleClick(_ref6) {
		var rowData = _ref6.rowData,
		    rowIndex = _ref6.rowIndex,
		    rowKey = _ref6.rowKey;

		// console.log('onDoubleClick', rowData, rowIndex, rowKey);
		// console.log('q onRowDoubleClick => ', rowData)
		rowDoubleClickDispatch(rowData);
		onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
	};

	var _rowEventHandlers = {
		// onClick: _onRowClick,
		// onDoubleClick: _onDoubleClick,
		onClick: useSimpleAndDoubleClick(_onRowClick, _onDoubleClick)
		// onDoubleClick: console.log('onDoubleClick'),
		// onContextMenu: console.log('context menu'),
		// onMouseEnter: console.log('mouse enter'),
		// onMouseLeave: console.log('mouse leave'),
	};

	/** Событие при сортировке */
	var _onColumnSort = function _onColumnSort(sortBy) {
		// console.log("sortBy", sortBy);
		tableRef.current.scrollToRow(0, 'auto');
		setSortBy(sortBy);

		// Для серверной сортировки - сбросить выделение
		// if (type !== 'localSide') {
		// setSelectedRowKeys([]);
		_setSelectedRowsHandler();
		// }
		var loadParams = {
			sortBy: sortBy,
			filter: _filter,
			searchLine: _searchValue,
			reload: true
		};
		_dataProcessing(loadParams);
	};

	/** VIEW FUNCTIONS */

	var _footer = React.createElement(
		React.Fragment,
		null,
		_footerShow ? React.createElement(
			React.Fragment,
			null,
			React.createElement(
				'div',
				{ key: 'footer-left-custom-side', className: 'left-custom-side' },
				footerProps.leftCustomSideElement ? React.createElement(FormItems, { items: footerProps.leftCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ key: 'footer-center-custom-side', className: 'center-custom-side' },
				footerProps.centerCustomSideElement ? React.createElement(FormItems, { items: footerProps.centerCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ key: 'footer-right-custom-side', className: 'right-custom-side' },
				footerProps.rightCustomSideElement ? React.createElement(FormItems, { items: footerProps.rightCustomSideElement }) : null
			),
			selectable ? React.createElement(
				React.Fragment,
				null,
				footerProps.showElements.includes('selected') ? React.createElement(
					'span',
					null,
					footerProps.selectedTitle,
					' ',
					_selectedRowKeys.length
				) : null,
				footerProps.showElements.includes('loaded') ? React.createElement(
					'span',
					null,
					footerProps.loadedTitle,
					' ',
					flatten(getTableRowKeys(_rows, rowKey)).length
				) : null
			) : null,
			footerProps.showElements.includes('total') ? infinityMode && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad ? React.createElement(
				'span',
				null,
				footerProps.totalTitle,
				' ',
				_totalCountRows
			) : React.createElement(
				'span',
				null,
				footerProps.totalTitle,
				' ',
				flatten(getTableRowKeys(_rows, rowKey)).length
			) : null
		) : null
	);

	/** Событие при рендере для стилизации */
	var _rowClassName = function _rowClassName(_ref7) {
		var rowData = _ref7.rowData,
		    rowIndex = _ref7.rowIndex;
		var rowClassName = props.rowClassName;

		var rowClass = rowClassName ? callOrReturn(rowClassName, { rowData: rowData, rowIndex: rowIndex }) : '';
		// const key = {[rowKey]: rowData[rowKey], checked: true};
		// selectedRowKeys.some((item) => (item[rowKey] === rowData[rowKey] && item.checked))
		return [rowClass, _selectedRowKeys.includes(rowData[rowKey]) && 'row-selected'].filter(Boolean).concat(zebraStyle ? rowIndex % 2 === 0 ? 'even' : 'odd' : '').concat(' ');
	};

	/** LOAD DATA FUNCTIONS */
	var onEndReached = function onEndReached() {
		var selectAll = void 0;
		var selectLength = _selectedRowKeys.length;
		if (selectLength === 0) selectAll = false;else if (selectLength > 0) selectAll = null;

		setSelectAll(selectAll);

		if (infinityMode) {
			var loadParams = {
				sortBy: _sortBy,
				filter: _filter,
				searchLine: _searchValue,
				reload: false
			};
			_dataProcessing(loadParams);
		}
	};

	/** SELECTABLE FUNCTIONS */

	/** Событие при изменении галочки одной строки */
	var _onChangeSelectHandler = function _onChangeSelectHandler(_ref8) {
		var selected = _ref8.selected,
		    _selectedRow = _ref8._selectedRow,
		    _selectAll = _ref8._selectAll,
		    _selectedRowKeys = _ref8._selectedRowKeys,
		    _selectedRowObjects = _ref8._selectedRowObjects,
		    _indeterminateRowKeys = _ref8._indeterminateRowKeys;

		// console.group("_onChangeSelectHandler", _selectedRowKeys);
		// console.log("_selectedRowKeys", _selectedRowKeys);
		// console.log("_indeterminateRowKeys", _indeterminateRowKeys);
		// console.log("_selectAll", _selectAll);
		// console.groupEnd();

		// setSelectedRowKeys(_selectedRowKeys);
		// selectedDispatch(_selectedRowObjects);
		_setSelectedRowsHandler(_selectedRowKeys, _selectedRowObjects);
		setIndeterminateRowKeys(_indeterminateRowKeys);
		setSelectAll(_selectAll);
		onRowClick({
			selected: selected,
			rowData: _selectedRow.rowData,
			rowIndex: _selectedRow.rowIndex,
			rowKey: rowKey
		});
		onSelectedRowsChange(_selectedRowKeys, _selectedRowObjects);
	};

	/** Событие при изменении галочки "Выделить все" */
	var _onSelectAllHandler = function _onSelectAllHandler(_ref9) {
		var selected = _ref9.selected,
		    rowKeys = _ref9.rowKeys,
		    rowObjects = _ref9.rowObjects;

		var selectedKeys = selected ? rowKeys : [];
		// setSelectedRowKeys(selectedKeys);
		// selectedDispatch(selected ? rowObjects : []);
		_setSelectedRowsHandler(selectedKeys, selected ? rowObjects : []);
		setIndeterminateRowKeys([]);
		setSelectAll(selected);
		// setSelectedRowObjects(rows);
		// console.log("_handleSelectAll", selectedKeys);
		onSelectedRowsChange(selectedKeys, rowObjects);
	};
	//
	// const SelectionCell = (props) => {
	// 	const {rowData, column} = props;
	// 	const {selectedRowKeys, indeterminateRowKeys, rowKey} = column;
	// 	const det = indeterminateRowKeys.includes(rowData[rowKey]);
	// 	const checked = selectedRowKeys.includes(rowData[rowKey]);
	// 	React.useEffect(() => {
	// 		console.log("selectionCell", props);
	// 	}, []);
	//
	// 	const _handleChange = (checked) => {
	// 		console.log("_handleChange", checked);
	// 	}
	//
	// 	return (
	// 		<Checkbox
	// 			indeterminate={det}
	// 			onChange={(e) => _handleChange(e.target.checked)}
	// 			checked={checked}
	// 		/>
	// 	);
	// };

	var _getSelectionColumnProps = function _getSelectionColumnProps() {
		return {
			rowKey: rowKey,
			parentKey: expandParentKey,
			nodeAssociated: nodeAssociated,
			selectedRowKeys: _selectedRowKeys,
			indeterminateRowKeys: _indeterminateRowKeys,
			onChange: _onChangeSelectHandler
		};
	};

	var _getColumns = function _getColumns() {
		var selectColumn = _extends({
			key: '__selection__',
			headerRenderer: SelectionHead,
			cellRenderer: React.createElement(SelectionCell, null),
			width: 40,
			flexShrink: 0,
			resizable: false,
			frozen: 'left',
			selectAll: selectAll,
			onSelectAll: _onSelectAllHandler
		}, _getSelectionColumnProps());
		return selectable ? [selectColumn].concat(_toConsumableArray(columns)) : [].concat(_toConsumableArray(columns));
	};

	/** TREE FUNCTIONS */

	var _onExpandedRowsChange = function _onExpandedRowsChange(expandedRowKeys) {
		// console.log("_onExpandedRowsChange", expandedRowKeys);
		onExpandedRowsChange(expandedRowKeys);
	};
	var _onRowExpand = function _onRowExpand(_ref10) {
		var expanded = _ref10.expanded,
		    rowData = _ref10.rowData,
		    rowIndex = _ref10.rowIndex,
		    rowKey = _ref10.rowKey;

		// console.log("_onRowExpand", rowData, expanded, rowIndex, rowKey);
		if (expanded) {
			setExpandedRowKeys([].concat(_toConsumableArray(_expandedRowKeys), [rowKey]));

			if (expandLazyLoad) {
				var loadParams = {
					sortBy: _sortBy,
					filter: _extends({}, _filter, _defineProperty({}, expandParentKey, rowKey)),
					searchLine: _searchValue,
					reload: false,
					expandRow: rowData
				};
				// _callPropsOnLoad(loadParams);
				_dataProcessing(loadParams);
			}
		} else {
			var expandedRowKeys = [].concat(_toConsumableArray(_expandedRowKeys));
			var allChildKeys = flatten(getTableRowKeys(rowData.children, props.rowKey));
			allChildKeys.push(rowKey);
			// console.log('allChildKeys', allChildKeys);
			setExpandedRowKeys(expandedRowKeys.filter(function (item) {
				return !allChildKeys.includes(item);
			}));
		}
		onRowExpand({ expanded: expanded, rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
	};

	/** ROW CHANGE FUNCTIONS */

	/**
  * Find row by key
  * @param data - table rows
  * @param key - key row for find
  * @param callback - function for return result
  * @returns {*}
  */
	var loop = function loop(data, key, callback) {
		for (var i = 0; i < data.length; i++) {
			if (data[i][rowKey] === key) {
				// console.log(`Selected => index: [${i}], path: [${data[i].path}]`, data);
				return callback(data[i], i, data);
			} else {
				// console.log(`Other => index: [${i}], path: [${data[i].path}]`);
			}
			if (data[i].children) {
				loop(data[i].children, key, callback);
			}
		}
	};

	var _addRows = function _addRows(rows) {
		var saveRows = [].concat(_toConsumableArray(rows));
		if (customFields)
			// Фильтрация по пользовательским параметрам
			saveRows = saveRows.filter(function (sRow) {
				var isValid = true;
				customFields.forEach(function (field) {
					// Валидация по пользовательской логике функции validate
					if (field.validate) isValid = field.validate(sRow, _rows);

					// Создание или переобразование по пользовательской логике функции value
					if (field.value) sRow[field.name] = field.value(sRow, _rows);
				});
				if (isValid) return sRow;
			});
		_setRowsHandler([].concat(_toConsumableArray(_rows), _toConsumableArray(saveRows)));
	};

	var _addRow = function _addRow(row) {
		var _row = _extends({}, row);
		if (customFields) customFields.forEach(function (field) {
			return _row[field.name] = field.value(_row, _rows);
		});
		_setRowsHandler([].concat(_toConsumableArray(_rows), [_row]));
	};

	var _addRowAsCopy = function _addRowAsCopy() {
		// console.log("_onClickAddAsCopy", selectedRow);
		_setRowsHandler([].concat(_toConsumableArray(_rows), [findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])]));
	};

	var _editRow = function _editRow(row) {
		// console.log("_onClickEdit", selectedRow);
		var data = [].concat(_toConsumableArray(_rows));
		var key = row[rowKey];
		loop(data, key, function (item, index, arr) {
			data[index] = row;
			_setRowsHandler(data);
			// selectedDispatch(row)
			_setSelectedRowsHandler(_selectedRowKeys, undefined, data);
			// setSelectedRowKeys([]);
		});
		// props.onClickEdit(event, selectedRow);
	};

	var _removeRow = function _removeRow(event) {
		// console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
		_setRowsHandler(_rows.filter(function (item) {
			return !_selectedRowKeys.includes(item[rowKey]);
		}));
		_setSelectedRowsHandler();
		// setSelectedRowKeys([]);
		// if (selectable)
		// 	selectedDispatch([]);
		// else
		// 	selectedDispatch(undefined);
		// commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	var _moveUpRow = function _moveUpRow(event) {
		var data = [].concat(_toConsumableArray(_rows));
		var key = _selectedRowKeys[0];
		loop(data, key, function (item, index, arr) {
			var newRowIndex = _getNewIndexRow(index, index - 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			// commandPanelProps.onClickUp(event, {
			// 	rowIndex: newRowIndex,
			// 	rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			// }, data);
		});
	};

	var _moveDownRow = function _moveDownRow(event) {
		var data = [].concat(_toConsumableArray(_rows));
		var key = _selectedRowKeys[0];
		loop(data, key, function (item, index, arr) {
			var newRowIndex = _getNewIndexRow(index, index + 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			// commandPanelProps.onClickDown(event, {
			// 	rowIndex: newRowIndex,
			// 	rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			// }, data);
		});
	};

	var _getNewIndexRow = function _getNewIndexRow(oldIndex, newIndex) {
		return newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;
	};

	var _changeIndexRow = function _changeIndexRow(oldIndex, newIndex, arr, data) {
		if (newIndex >= 0 && newIndex < arr.length) {
			// let arr = [..._rows]; // Копируем массив
			var item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
			// console.log('_changeIndexRow => ',item);
			arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
			// console.log("_changeIndexRow", item[0]);
			_setRowsHandler(data);
		}
	};

	// const _onSearch = (searchLine, e) => {
	// 	e.preventDefault();
	// 	// console.log("_onSearch", searchLine);
	// 	tableRef.current.scrollToRow(0, 'auto');
	// 	setSearchValue(searchLine);
	// 	const loadParams = {
	// 		sortBy: _sortBy,
	// 		filter: _filter,
	// 		searchLine: searchLine,
	// 		reload: true,
	// 	};
	// 	_dataProcessing(loadParams);
	// 	commandPanelProps.onSearch(searchLine);
	// };

	/** SELECTED PANEL */

	var _onClickDropSelectHandler = function _onClickDropSelectHandler(dropObject) {
		var newSelectedKeys = _selectedRowKeys.filter(function (item) {
			return item !== dropObject[rowKey];
		});
		// setSelectedRowKeys(newSelectedKeys);
		_setSelectedRowsHandler(newSelectedKeys, undefined, _rows);
		setSelectAll(newSelectedKeys.length === 0 ? false : null);
		onSelectedRowsChange(newSelectedKeys);
	};

	return React.createElement(
		'div',
		{ className: rtPrefix + '-table' },
		React.createElement(
			'div',
			{ className: rtPrefix + '-baseTable' },
			React.createElement(
				AutoResizer,
				null,
				function (_ref11) {
					var width = _ref11.width,
					    height = _ref11.height;
					return React.createElement(BaseTable, {
						ref: tableRef
						/** Required */
						, columns: _getColumns(),
						data: _rows
						/** Control Props */
						, sortBy: _sortBy
						/** Base Props */
						, width: width,
						height: height,
						rowKey: rowKey
						// rowProps={rowProps}

						/** View Props */
						, rowClassName: _rowClassName,
						emptyRenderer: empty,
						fixed: fixWidthColumn,
						footerHeight: _footerShow ? footerProps.height : 0,
						headerHeight: headerHeight,
						rowHeight: rowHeight,
						overlayRenderer: loading ? overlay : null,
						footerRenderer: _footer,
						rowRenderer: rowRenderer,
						estimatedRowHeight: estimatedRowHeight
						/** Load Data Props */
						, onEndReachedThreshold: loadThreshold,
						onEndReached: infinityMode ? onEndReached : undefined,
						disabled: loading
						/** Tree Props */
						, expandColumnKey: expandColumnKey,
						expandedRowKeys: _expandedRowKeys
						/** Events */
						, onColumnSort: _onColumnSort,
						rowEventHandlers: _rowEventHandlers,
						onExpandedRowsChange: _onExpandedRowsChange,
						onRowExpand: _onRowExpand
					});
				}
			)
		),
		showSelection && selectable && !expandColumnKey ? React.createElement(SelectionList, {
			onClickDropSelect: _onClickDropSelectHandler,
			selectedRowObjects: flatten(getTableRowObjects(_rows, rowKey)).filter(function (item) {
				return _selectedRowKeys.includes(item[rowKey]);
			}),
			rowRender: rowRenderShowSelection
		}) : null
	);
});

Table.propTypes = {
	/**
  * REQUIRED
  * */

	/** Столбцы таблицы */
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,

	/** Тип таблицы
  * **infinity** - загрузка данных по скроллу. Фильтрация, сортировка и поиск через сервер.
  * **serverSide** - первичная загрузка таблицы с сервера. Фильтрация, сортировка и поиск через сервер. Lazy Load для дерева тоже тут.
  * **localSide** - полностью локальная таблица. Фильтрация, сортировка и поиск через локальный rows */
	// type: PropTypes.oneOf(['infinity', 'serverSide', 'localSide']).isRequired,
	infinityMode: PropTypes.bool,

	/**
  * ПРОПСЫ ЗАДАНИЯ ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ
  * */

	/** Строки по умолчанию */
	defaultRows: PropTypes.arrayOf(PropTypes.object),

	/** Ключи выделенных по умолчанию строк */
	defaultSelectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Значение строки поиска по умолчанию строк */
	defaultSearchValue: PropTypes.string,

	/** Объект фильтрации по умолчанию */
	defaultFilter: PropTypes.object,

	/** Сортировка по умолчанию */
	defaultSortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc'])
	}),

	/**
  * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
  * */

	/** Строки таблицы. Используется для контроля таблицы из вне. */
	rows: PropTypes.arrayOf(PropTypes.object),

	/** Функция задания строк таблицы. */
	setRows: PropTypes.func,

	/** Выделенные строки таблицы. */
	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Объект фильтрации */
	filter: PropTypes.object,

	/** Объект сортировки */
	sortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc'])
	}),

	/**
  * BASE PROPS
  * */

	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/** Дополнительные поля и валидация в объекты таблицы */
	customFields: PropTypes.arrayOf(PropTypes.object),

	/**
  * VIEW PROPS
  * */

	/** Вывод когда нет данных */
	empty: PropTypes.element,

	/** Отображение загрузки данных */
	overlay: PropTypes.element,

	/** Фиксированная ширина столбцов. Появится боковой скрол */
	fixWidthColumn: PropTypes.bool,

	footerProps: PropTypes.shape({

		/** Высота подвала */
		height: PropTypes.number,

		/** Массив элементов футтера, которые надо отобразить
   * ['selected', 'loaded', 'total'] */
		showElements: PropTypes.arrayOf(PropTypes.string),

		/** Заколовок для кол-ва выбранных объектов */
		selectedTitle: PropTypes.string,

		/** Заколовок для кол-ва загруженны объектов */
		loadedTitle: PropTypes.string,

		/** Заколовок для кол-ва всего объектов */
		totalTitle: PropTypes.string,

		/** Левый кастомный элемент командной панели */
		leftCustomSideElement: PropTypes.arrayOf(PropTypes.object),

		/** Центральный кастомный элемент командной панели */
		centerCustomSideElement: PropTypes.arrayOf(PropTypes.object),

		/** Правый кастомный элемент командной панели */
		rightCustomSideElement: PropTypes.arrayOf(PropTypes.object)
	}),

	/** Высота заголовка таблицы */
	headerHeight: PropTypes.number,

	/** Высота строки таблицы */
	rowHeight: PropTypes.number,

	/** Custom row renderer
  * Параметры - ({ isScrolling, cells, columns, rowData, rowIndex, depth }) */
	rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

	/** Строки будут в зебро-стиле */
	zebraStyle: PropTypes.bool,

	/** Высота расширения */
	estimatedRowHeight: PropTypes.number,

	/**
  * LOAD DATA PROPS
  * */

	/** Порог в пикселях для вызова _onLoad.
  * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
	loadThreshold: PropTypes.number,

	/** Размер страницы */
	pageSize: PropTypes.number,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadRows: PropTypes.func,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadCount: PropTypes.func,

	/** Имя параметра для поиска */
	searchParamName: PropTypes.string,

	/**
  * SELECTABLE PROPS
  * */

	/** Таблица с возможностью выбора строки */
	selectable: PropTypes.bool,

	/**
  * TREE PROPS
  * */

	/** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
	nodeAssociated: PropTypes.bool,

	/** Ключ колонки по которой строить иерархию */
	expandColumnKey: PropTypes.string,

	/** Открыть по умолчанию вложенность до уровня N или 'All' */
	expandDefaultAll: PropTypes.bool,

	/** Загружать ноды иерархии по одной */
	expandLazyLoad: PropTypes.bool,

	/** Поле в котором хранится ссылка на родителя */
	expandParentKey: PropTypes.string,

	/**
  * EVENTS
  * */

	/** Событие при клике на строку (только при selectable = false)
  * Параметр - ({selected, rowData, rowIndex}) */
	onRowClick: PropTypes.func,

	/** Событие при двойном клике на строку.
  * Параметр - ({rowData, rowIndex, rowKey}) */
	onRowDoubleClick: PropTypes.func,

	/** События при открытии / закрытии ноды
  * Парметры - ({ expanded, rowData, rowIndex, rowKey }) */
	onRowExpand: PropTypes.func,

	/** Событие при выборе строки.
  * Параметр - массив выбранных строе (только rowKey) */
	onSelectedRowsChange: PropTypes.func,

	/** События при открытии / закрытии ноды
  * Парметры - (expandedRowKeys) - массив ключей открытых нод */
	onExpandedRowsChange: PropTypes.func,

	/** SELECTED PANEL */

	/** Отображать ли панель выбранных элементов */
	showSelection: PropTypes.bool,

	/** Строка или функция для отображения элементов списка выбранных
  * Строка - имя поля
  * Функция - рендер строк.
  * `({ rowData, rowIndex }) => { return <Component> }` */
	rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

	/** Путь в сторе куда класть выбранную строку таблицы */
	dispatchPath: PropTypes.string,

	/** Объект для подписки на изменения в STORE */
	subscribe: PropTypes.arrayOf(PropTypes.object)
};

Table.defaultProps = {
	defaultRows: [],
	defaultSelectedRowKeys: [],
	defaultSearchValue: '',
	defaultFilter: {},
	defaultSortBy: {},

	rows: [],
	setRows: noop,
	selectedRowKeys: [],
	searchValue: '',
	filter: {},
	sortBy: {},

	rowKey: 'id',

	empty: empty,
	overlay: overlay,
	fixWidthColumn: false,
	footerProps: {
		height: 30,
		showElements: [],
		selectedTitle: 'Выделено:',
		loadedTitle: 'Загружено записей:',
		totalTitle: 'Всего записей:',
		leftCustomSideElement: null,
		centerCustomSideElement: null,
		rightCustomSideElement: null
	},
	headerHeight: 30,
	rowHeight: 30,
	zebraStyle: false,
	estimatedRowHeight: undefined,

	loadThreshold: 300,
	pageSize: 50,
	requestLoadRows: noop,
	requestLoadCount: noop,
	searchParamName: 'searchLine',

	selectable: false,

	nodeAssociated: true,
	expandColumnKey: undefined,
	expandDefaultAll: true,
	expandLazyLoad: false,
	expandParentKey: 'parentId',

	onRowClick: noop,
	onRowDoubleClick: noop,
	onRowExpand: noop,
	onSelectedRowsChange: noop,
	onExpandedRowsChange: noop,

	showSelection: false,

	dispatchPath: undefined,
	subscribe: []
};

var mapStateToProps = function mapStateToProps(store, ownProps) {
	var subscribe = ownProps.subscribe;

	var state = {};
	if (subscribe && subscribe.length > 0) {
		subscribe.forEach(function (item) {
			var name = item.name,
			    path = item.path,
			    extraData = item.extraData;

			if (name && path) state[name] = objectPath.get(store, path);
			if (name && extraData) state[name + 'ExtraData'] = objectPath.get(store, extraData);
		});
	}
	return state;
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);