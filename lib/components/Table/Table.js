import 'antd/es/notification/style';
import _notification from 'antd/es/notification';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import SortOrder from 'react-base-table/lib/SortOrder';
import BaseTable, { AutoResizer, callOrReturn, Column } from 'react-base-table';
import { empty, overlay } from './defaultSettings';
import SelectionHead from '../Table/Selectable/SelectionHead';
import SelectionCell, { parentAnalysis } from '../Table/Selectable/SelectionCell';
import CommandPanel from '../CommandPanel/CommandPanel';
import FilterPanel from '../FilterPanel/FilterPanel';
import SelectionList from '../Table/SelectionList/SelectionList';
import { flatten, generateUUID, getTableRowKeys, findNodeByRowKey, noop, getTableRowObjects } from '../utils/baseUtils';

/**
 *
 * Таблица с редактированием с первичной загрузкой с сервера
 *
 * Таблица с редактированием с подачей строк снаружи
 *
 * Таблица с автозагрузкой по скроллу
 *
 * Таблица с фильтрацией (внутренняя / внешняя)
 *
 * Таблица деревом
 *
 * Множественный выбор в любой таблица
 *
 * Значения по умолчанию
 *      Строки
 *      Выделенные строки
 *      Сортировка
 *      Фильтрация
 *
 * Создание строки
 * Изменение
 * Удаление
 *
 * Контролируемы из вне параметры (приоритетнее внутренних)
 *      Строки  (только при localSide)
 *      Выделенные строки (при любом режиме)
 *      Сортировка (при любом режиме)
 *      Фильтрация (при любом режиме)
 *
 * Управление строками (исключает функции изменения)
 *
 * Функция получения выделенных строк
 * Функция задания выделенных строк
 *
 *
 *  'infinity', 'serverSide', 'localSide'
 *
 * Загрузка по скроллу --- не доступно: добавить / удалить / изменить
 * Загрузка с сервера 1 раз + по сортировкам, фильтрациям и поискам --- доступно: добавить / удалить / изменить
 * Без загрузки с сервера --- доступно: добавить / удалить / изменить
 *
 *
 * Загрузка по скроллу
 * Загрузка при старте плоской
 * Загрузка при старте иерархии
 * Загрузка при старте плоской с обработкой lazyLoad
 * Обработка локальных данных
 *
 *
 * /** Локальная обработка запроса

 // console.log("manual table", localRows, rows);
 if (localRows.length === 0) {
    setLocalRows(rows);
}
 let _rows = localRows.length > 0 ? [...localRows] : [...rows];
 if (sortBy.key && sortBy.order) {
    _rows.sort((a, b) => {
        let x = a[sortBy.key].toLowerCase();
        let y = b[sortBy.key].toLowerCase();
        // console.log("sort", x, y);
        if (x > y) {
            return sortBy.order === 'asc' ? 1 : -1;
        }
        if (x < y) {
            return sortBy.order === 'asc' ? -1 : 1;
        }
        return 0;
    });
    // console.log("_rows", sortBy);
}
 if (searchLine) {
    _rows = _rows.filter((item, index) => {
        for (let propName in item) {
            if (item[propName]) {
                const val = item[propName].toString().toLowerCase();
                if (val.includes(searchLine.toLowerCase()))
                    return true;
            }
        }
        return false;
    });
}
 setRows(section, _rows);

 *
 *
 *
 */

var Table = forwardRef(function (props, ref) {
	/** Состояние первоначалной настройки компонента*/
	var _useState = useState(false),
	    _useState2 = _slicedToArray(_useState, 2),
	    mounted = _useState2[0],
	    setMounted = _useState2[1];
	/** Наличие на сервере еще данных */


	var _useState3 = useState(true),
	    _useState4 = _slicedToArray(_useState3, 2),
	    hasMore = _useState4[0],
	    setHasMore = _useState4[1];
	/** Индикатор загрузки данных */


	var _useState5 = useState(false),
	    _useState6 = _slicedToArray(_useState5, 2),
	    loading = _useState6[0],
	    setLoading = _useState6[1];

	/** Indoor control */


	var _useState7 = useState([]),
	    _useState8 = _slicedToArray(_useState7, 2),
	    _rows = _useState8[0],
	    _setRows = _useState8[1];

	var _useState9 = useState([]),
	    _useState10 = _slicedToArray(_useState9, 2),
	    _selectedRowKeys = _useState10[0],
	    setSelectedRowKeys = _useState10[1];

	var _useState11 = useState({}),
	    _useState12 = _slicedToArray(_useState11, 2),
	    _searchValue = _useState12[0],
	    setSearchValue = _useState12[1];

	var _useState13 = useState(false),
	    _useState14 = _slicedToArray(_useState13, 2),
	    _filter = _useState14[0],
	    setFilter = _useState14[1];

	var _useState15 = useState(false),
	    _useState16 = _slicedToArray(_useState15, 2),
	    _sortBy = _useState16[0],
	    setSortBy = _useState16[1];

	/** Selectable States */


	var _useState17 = useState(false),
	    _useState18 = _slicedToArray(_useState17, 2),
	    selectAll = _useState18[0],
	    setSelectAll = _useState18[1];

	/** Tree States */


	var _useState19 = useState([]),
	    _useState20 = _slicedToArray(_useState19, 2),
	    _indeterminateRowKeys = _useState20[0],
	    setIndeterminateRowKeys = _useState20[1];

	var _useState21 = useState([]),
	    _useState22 = _slicedToArray(_useState21, 2),
	    _expandedRowKeys = _useState22[0],
	    setExpandedRowKeys = _useState22[1];

	var _useState23 = useState(0),
	    _useState24 = _slicedToArray(_useState23, 2),
	    _totalCountRows = _useState24[0],
	    setTotalCountRows = _useState24[1];

	var tableRef = React.useRef();

	var defaultRows = props.defaultRows,
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
	    columns = props.columns,
	    type = props.type,
	    autoDeleteRows = props.autoDeleteRows,
	    rowKey = props.rowKey,
	    empty = props.empty,
	    fixWidthColumn = props.fixWidthColumn,
	    footerHeight = props.footerHeight,
	    footerShow = props.footerShow,
	    footerTitles = props.footerTitles,
	    headerHeight = props.headerHeight,
	    rowHeight = props.rowHeight,
	    zebraStyle = props.zebraStyle,
	    rowRenderer = props.rowRenderer,
	    loadThreshold = props.loadThreshold,
	    pageSize = props.pageSize,
	    requestLoadRows = props.requestLoadRows,
	    requestLoadCount = props.requestLoadCount,
	    searchParamName = props.searchParamName,
	    selectable = props.selectable,
	    nodeAssociated = props.nodeAssociated,
	    expandColumnKey = props.expandColumnKey,
	    expandParentKey = props.expandParentKey,
	    expandLazyLoad = props.expandLazyLoad,
	    expandDefaultAll = props.expandDefaultAll,
	    onRowClick = props.onRowClick,
	    onRowDoubleClick = props.onRowDoubleClick,
	    onRowExpand = props.onRowExpand,
	    onSelectedRowsChange = props.onSelectedRowsChange,
	    onExpandedRowsChange = props.onExpandedRowsChange,
	    showSelection = props.showSelection,
	    rowRenderShowSelection = props.rowRenderShowSelection;


	var commandPanelProps = _extends({}, CommandPanel.defaultProps, props.commandPanelProps);
	var filterPanelProps = _extends({}, FilterPanel.defaultProps, props.filterPanelProps);

	useEffect(function () {
		// console.log("Инициализация дефолтных значений ");

		// Инициализация дефолтных значений
		_setRows(defaultRows);
		setSelectedRowKeys(defaultSelectedRowKeys);
		setSearchValue(defaultSearchValue);
		setFilter(defaultFilter);
		setSortBy(defaultSortBy);
		setSelectAll(defaultRows.length > 0 && defaultRows.length === defaultSelectedRowKeys.length);

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

		if (type !== 'localSide') {
			_dataProcessing({
				sortBy: defaultSortBy,
				filter: defaultFilter,
				searchLine: defaultSearchValue,
				reload: true
			});
		}
		setMounted(true);
		if (ref && typeof ref === 'function') ref({ reloadData: reloadData });else if (ref && (typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) === 'object') ref.current = { reloadData: reloadData };
	}, []);

	var reloadData = function reloadData(_ref) {
		var sortBy = _ref.sortBy,
		    filter = _ref.filter,
		    searchValue = _ref.searchValue;

		// console.log("reloadData params ", sortBy, filter, searchValue);
		setSelectedRowKeys([]);
		if (sortBy) setSortBy(sortBy);
		if (filter) setFilter(filter);
		if (searchValue) setSearchValue(searchValue);
		_dataProcessing({
			sortBy: sortBy ? sortBy : _sortBy,
			filter: filter ? filter : _filter,
			searchLine: searchValue ? searchValue : _searchValue,
			reload: true
		});
	};

	useEffect(function () {
		if (type === 'localSide') {
			// console.log("Control useEffect => ", rows, selectedRowKeys, searchValue, filter, sortBy);
			_setRows(rows);
			setSelectedRowKeys(selectedRowKeys);
			setSearchValue(searchValue);
			setFilter(filter);
			setSortBy(sortBy);
			if (!!expandColumnKey && !expandLazyLoad) {
				// Открытие всех нод
				if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(rows, rowKey)));
			}
		}
	}, [rows, selectedRowKeys, searchValue, filter, sortBy]);

	/** BASE FUNCTIONS */
	var _dataProcessing = function _dataProcessing(params) {
		// console.log('_dataProcessing', params);
		var sortBy = params.sortBy,
		    filter = params.filter,
		    searchLine = params.searchLine,
		    expandRow = params.expandRow,
		    reload = params.reload;

		switch (type) {
			case 'infinity':
			case 'serverSide':
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

					if (type === 'infinity' && reload && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad) {
						requestLoadCount({
							params: _params,
							data: dataQuery
						}).then(function (response) {
							// console.log("infinity then response", response);
							// const result = response.data;
							setTotalCountRows(response.data);
						}).catch(function (error) {
							console.log('RequestLoadCount catch: ', error);
						});
					}

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
								_setRows(result);
							} else {
								var newRows = [].concat(_toConsumableArray(_rows));
								// (data, rowKey, rowValue)
								result.forEach(function (child) {
									child.children = [_defineProperty({}, rowKey, generateUUID())];
								});
								var node = findNodeByRowKey(newRows, rowKey, expandRow[rowKey]);
								node.children = result;
								// console.log('newRows -> ', newRows);
								_setRows(newRows);
							}
						} else {
							if (result && result.length < pageSize) {
								setHasMore(false);
							} else {
								setHasMore(true);
							}
							pageNum === 0 ? _setRows(result) : _setRows(_rows.concat(result));

							// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);
							if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(result, rowKey)));
						}

						setLoading(false);
					}).catch(function (error) {
						// console.log('loadData catch: ', error);
						if (error.response) {
							_notification.error({
								message: '\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 [' + error.response.status + ']',
								description: error.response.data.message
							});
						} else _notification.error({
							message: 'Не удалось детектировать ошибку. См. console.log'
						});
						_setRows(_rows);
						// setHasMore(false);
						setLoading(false);
					});
				}
				break;
			// case 'serverSide':
			// 	setLoading(true);
			// 	break;
			case 'localSide':
				break;
			default:
				break;
		}
	};

	/** Событие выделение одной строки в режиме без галочек */
	var _rowEventHandlers = {
		onClick: function onClick(_ref5) {
			var rowData = _ref5.rowData,
			    rowIndex = _ref5.rowIndex,
			    rowKey = _ref5.rowKey,
			    event = _ref5.event;

			if (!selectable) {
				// if (_selectedRowKeys.includes(rowKey)) {
				//     setSelectedRowKeys([]);
				//     // setSelectedRow([]);
				//     // setSelectedRowObjects([]);
				//     onRowClick({
				//         selected: false,
				//         rowData,
				//         rowIndex,
				//         rowKey,
				//     });
				//     onSelectedRowsChange([]);
				// } else {
				// console.log('_rowEventHandlers -> onClick', rowKey);
				var newRowObject = {
					rowData: _extends({}, rowData),
					rowIndex: rowIndex,
					rowKey: rowKey
				};
				// if(type !== 'localSide')
				setSelectedRowKeys([rowKey]);
				// setSelectedRow(newRowObject);
				// setSelectedRowObjects([newRowObject]);
				onRowClick(_extends({
					selected: true
				}, newRowObject));
				onSelectedRowsChange([rowKey], [rowData]);
				// }
			}
		},
		onDoubleClick: function onDoubleClick(_ref6) {
			var rowData = _ref6.rowData,
			    rowIndex = _ref6.rowIndex,
			    rowKey = _ref6.rowKey;

			// console.log('onDoubleClick', rowData, rowIndex, rowKey);
			onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
		}
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
		if (type !== 'localSide') {
			setSelectedRowKeys([]);
		}
		var loadParams = {
			sortBy: sortBy,
			filter: _filter,
			searchLine: _searchValue,
			reload: true
		};
		_dataProcessing(loadParams);
	};

	/** Получение колонок таблицы */
	var _getColumns = function _getColumns() {
		var _columns = [].concat(_toConsumableArray(columns));

		/** Создаем колонку с галочками (если надо) */
		if (selectable) {
			var selectColumn = {
				key: '__selection__',
				headerRenderer: SelectionHead,
				cellRenderer: SelectionCell,
				width: 40,
				flexShrink: 0,
				resizable: false,
				frozen: Column.FrozenDirection.LEFT,
				rowKey: rowKey,
				parentKey: expandParentKey,
				selectedRowKeys: _selectedRowKeys,
				indeterminateRowKeys: _indeterminateRowKeys,
				nodeAssociated: nodeAssociated,
				onChange: _onChangeSelectHandler,
				selectAll: selectAll,
				onSelectAll: _onSelectAllHandler
			};
			_columns.unshift(selectColumn);
		}
		return _columns;
	};

	/** VIEW FUNCTIONS */

	var _footer = React.createElement(
		'div',
		{ className: 'BaseTable__footer__counter' },
		selectable ? React.createElement(
			React.Fragment,
			null,
			React.createElement(
				'span',
				null,
				footerTitles.selectedRows,
				' ',
				_selectedRowKeys.length
			),
			React.createElement(
				'span',
				null,
				footerTitles.loadedRows,
				' ',
				flatten(getTableRowKeys(_rows, rowKey)).length
			)
		) : null,
		type === 'infinity' && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad ? React.createElement(
			'span',
			null,
			footerTitles.totalRows,
			' ',
			_totalCountRows
		) : React.createElement(
			'span',
			null,
			footerTitles.totalRows,
			' ',
			flatten(getTableRowKeys(_rows, rowKey)).length
		)
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

		if (type === 'infinity') {
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
		    _indeterminateRowKeys = _ref8._indeterminateRowKeys;

		setSelectedRowKeys(_selectedRowKeys);
		setIndeterminateRowKeys(_indeterminateRowKeys);
		setSelectAll(_selectAll);
		// setSelectedRow(_selectedRow);

		// let newSelectedObjects = [];
		// if (selected) {
		// 	if (!!expandColumnKey)
		// 		newSelectedObjects = flatten(
		// 			getTableRowObjects(rows, rowKey)
		// 		).filter((item) => _selectedRowKeys.includes(item[rowKey]));
		// 	else
		// 		newSelectedObjects = selectedRowObjects.concat([
		// 			_selectedRow.rowData,
		// 		]);
		// 	// setSelectedRowObjects(newSelectedObjects);
		// } else {
		// 	newSelectedObjects = selectedRowObjects.filter(
		// 		(item) => item[rowKey] !== _selectedRow.rowData[rowKey]
		// 	);
		// 	// setSelectedRowObjects(newSelectedObjects);
		// }
		// console.log("_handleSelectChange", _selectedRowKeys, newSelectedObjects);
		onRowClick({
			selected: selected,
			rowData: _selectedRow.rowData,
			rowIndex: _selectedRow.rowIndex,
			rowKey: rowKey
		});
		onSelectedRowsChange(_selectedRowKeys);
	};

	/** Событие при изменении галочки "Выделить все" */
	var _onSelectAllHandler = function _onSelectAllHandler(_ref9) {
		var selected = _ref9.selected,
		    rowKeys = _ref9.rowKeys;

		var selectedKeys = selected ? rowKeys : [];
		setSelectedRowKeys(selectedKeys);
		setIndeterminateRowKeys([]);
		setSelectAll(selected);
		// setSelectedRowObjects(rows);
		// console.log("_handleSelectAll", selectedKeys);
		onSelectedRowsChange(selectedKeys);
	};

	/** TREE FUNCTIONS */

	/** Анализ дерева на пердмет квадратиков
  * Нужно для выделения по умолчанию свернутых элементов */
	// const _postLoadTreeAnalysis = () => {
	//     if (!!expandColumnKey && !expandLazyLoad) {
	//         let _indeterminateRowKeys = [];
	//         // console.log("mounted->selectedRowObjects: ", selectedRowObjects);
	//         selectedRowObjects.map((item) => {
	//             const [ss, ii] = parentAnalysis({
	//                 rowData: item,
	//                 rowKey,
	//                 parentKey: expandParentKey,
	//                 checked: true,
	//                 nodeAssociated,
	//                 treeData: _rows,
	//                 selectedRowKeys: _selectedRowKeys,
	//                 indeterminateRowKeys: _indeterminateRowKeys,
	//             });
	//             _indeterminateRowKeys.push(...ii);
	//         });
	//         setIndeterminateRowKeys([...new Set(_indeterminateRowKeys)]);
	//     }
	// }

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

	/** COMMAND PANEL FUNCTIONS */

	var _getDisabledElementsOfCommandPanel = function _getDisabledElementsOfCommandPanel() {
		// console.log('commandPanelProps', commandPanelProps);
		var _disabledElements = [].concat(_toConsumableArray(commandPanelProps.disabledElements));
		if (type === 'infinity') {
			_disabledElements.push('up', 'down');
		}
		if (selectable && _selectedRowKeys.length > 1) {
			_disabledElements.push('addAsCopy', 'edit', 'up', 'down');
		}
		if (_selectedRowKeys.length === 0) {
			_disabledElements.push('addAsCopy', 'edit', 'delete', 'up', 'down');
		}
		if (expandColumnKey) {
			//|| !selectedRow) {
			_disabledElements.push('up', 'down');
		}
		return [].concat(_toConsumableArray(new Set(_disabledElements)));
	};

	var _onClickAddAsCopy = function _onClickAddAsCopy(event) {
		// console.log("_onClickAddAsCopy", selectedRow);
		commandPanelProps.onClickAddAsCopy(event, findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]));
	};

	var _onClickEdit = function _onClickEdit(event) {
		// console.log("_onClickEdit", selectedRow);
		commandPanelProps.onClickEdit(event, {
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
		});
		// props.onClickEdit(event, selectedRow);
	};

	var _onClickDelete = function _onClickDelete(event) {
		// console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
		if (autoDeleteRows) {
			if (type === 'localSide') {
				setRows(_rows.filter(function (item) {
					return !_selectedRowKeys.includes(item[rowKey]);
				}));
			} else {
				_setRows(_rows.filter(function (item) {
					return !_selectedRowKeys.includes(item[rowKey]);
				}));
			}
			setSelectedRowKeys([]);
		}
		commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	var _onClickUp = function _onClickUp(event) {
		// console.log("_onClickUp", selectedRow);
		var rowIndex = _rows.findIndex(function (item) {
			return item[rowKey] === _selectedRowKeys[0];
		});
		var newRowIndex = _getNewIndexRow(rowIndex, rowIndex - 1);
		_changeIndexRow(rowIndex, newRowIndex);
		// console.log("_onClickUp", rowIndex, newRowIndex);
		commandPanelProps.onClickUp(event, {
			rowIndex: newRowIndex,
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
		});
	};

	var _onClickDown = function _onClickDown(event) {
		var rowIndex = _rows.findIndex(function (item) {
			return item[rowKey] === _selectedRowKeys[0];
		});
		var newRowIndex = _getNewIndexRow(rowIndex, rowIndex + 1);
		_changeIndexRow(rowIndex, newRowIndex);
		// console.log("_onClickDown", rowIndex, newRowIndex);
		commandPanelProps.onClickDown(event, {
			rowIndex: newRowIndex,
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
		});
	};

	var _getNewIndexRow = function _getNewIndexRow(oldIndex, newIndex) {
		return newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;
	};

	var _changeIndexRow = function _changeIndexRow(oldIndex, newIndex) {
		if (newIndex >= 0 && newIndex < _rows.length) {
			var arr = [].concat(_toConsumableArray(_rows)); // Копируем массив
			var item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
			// console.log('_changeIndexRow => ',item);
			arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
			// console.log("_changeIndexRow", item[0]);
			if (type === 'localSide') {
				setRows(arr);
			} else {
				_setRows(arr);
			}
		}
	};

	var _onSearch = function _onSearch(searchLine) {
		// console.log("_onSearch", searchLine);
		tableRef.current.scrollToRow(0, 'auto');
		setSearchValue(searchLine);
		var loadParams = {
			sortBy: _sortBy,
			filter: _filter,
			searchLine: searchLine,
			reload: true
		};
		_dataProcessing(loadParams);
		commandPanelProps.onSearch(searchLine);
	};

	/** FILTER PANEL FUNCTIONS */

	var _onChangeFilter = function _onChangeFilter(filter) {
		// console.log('_onChangeFilter', filter);
		setHasMore(true);
		setFilter(filter);
		filterPanelProps.onChangeFilter(filter);
	};
	var _onApplyFilter = function _onApplyFilter(filter) {
		// console.log('_onApplyFilter', filter);
		var loadParams = {
			sortBy: _sortBy,
			filter: filter,
			searchLine: _searchValue,
			reload: true
		};
		_dataProcessing(loadParams);
		filterPanelProps.onApplyFilter(filter);
	};

	/** SELECTED PANEL */

	var _onClickDropSelectHandler = function _onClickDropSelectHandler(dropObject) {
		var newSelectedKeys = _selectedRowKeys.filter(function (item) {
			return item !== dropObject[rowKey];
		});
		setSelectedRowKeys(newSelectedKeys);
		onSelectedRowsChange(newSelectedKeys);
	};

	// const rowProps = {
	//     // tagName: 'button',
	//     // onClick: e => {
	//     //     e.preventDefault();
	//     //     e.stopPropagation();
	//     //     console.log(`You clicked row onClick`)
	//     // },
	//     onDoubleClick: e => {
	//         e.preventDefault();
	//         e.stopPropagation();
	//         console.log(`You clicked row onDoubleClick`)
	//     }
	// };

	return React.createElement(
		'div',
		{
			className: 'Table__container',
			style: { width: '100%', height: '100%' }
		},
		React.createElement(
			'div',
			{ className: 'Table__Top-panel' },
			React.createElement(CommandPanel, _extends({}, commandPanelProps, {
				defaultValueSearch: defaultSearchValue,
				disabledElements: _getDisabledElementsOfCommandPanel(),
				onClickAddAsCopy: _onClickAddAsCopy,
				onClickDelete: _onClickDelete,
				onClickDown: _onClickDown,
				onClickEdit: _onClickEdit,
				onClickUp: _onClickUp,
				onSearch: _onSearch
			})),
			React.createElement(FilterPanel, _extends({}, filterPanelProps, {
				defaultFilter: defaultFilter,
				onChangeFilter: _onChangeFilter,
				onApplyFilter: _onApplyFilter
			}))
		),
		React.createElement(
			'div',
			{ className: 'BaseTable__container' },
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
						footerHeight: footerShow ? footerHeight : 0,
						headerHeight: headerHeight,
						rowHeight: rowHeight,
						overlayRenderer: loading ? overlay : null,
						footerRenderer: _footer,
						rowRenderer: rowRenderer
						/** Load Data Props */
						, onEndReachedThreshold: loadThreshold,
						onEndReached: type === 'infinity' ? onEndReached : undefined,
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

	/** Столбцы таблицы (обязательно) */
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,

	/** Тип таблицы.
  * 'infinity' - загрузка данных по скроллу. Фильтрация, сортировка и поиск через сервер.
  * 'serverSide' - первичная загрузка таблицы с сервера. Фильтрация, сортировка и поиск через сервер. Lazy Load для дерева тоже тут.
  * 'localSide' - полностью локальная таблица. Фильтрация, сортировка и поиск через локальный rows
  */
	type: PropTypes.oneOf(['infinity', 'serverSide', 'localSide']).isRequired,

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
		key: PropTypes.string,
		order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
	}),

	/**
  * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
  * */

	/** Строки таблицы. Используется для контроля таблицы из вне. */
	rows: PropTypes.arrayOf(PropTypes.object),

	/** Выделенные строки таблицы. */
	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Фильтр */
	filter: PropTypes.object,

	/** Объект сортировки ({ key: 'string', order: 'asc' }).
  * key - поле по которому сотрировать,
  * order - направление сортировки ("asc", "desc")
  * */
	sortBy: PropTypes.shape({
		key: PropTypes.string,
		order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
	}),

	/**
  * BASE PROPS
  * */

	/** Автоудаление строк из таблицы по кнопке в командной панели*/
	autoDeleteRows: PropTypes.bool,

	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/**
  * VIEW PROPS
  * */

	/** Вывод когда нет данных */
	empty: PropTypes.element,

	/** Отображение загрузки данных */
	overlay: PropTypes.element,

	/** Фиксированная ширина столбцов. Появится боковой скрол */
	fixWidthColumn: PropTypes.bool,

	/** Высота подвала */
	footerHeight: PropTypes.number,

	/** Отображать ли подвал */
	footerShow: PropTypes.bool,

	/** Названия футтера */
	footerTitles: PropTypes.shape({
		selectedRows: PropTypes.string,
		loadedRows: PropTypes.string,
		totalRows: PropTypes.string
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

	/**
  *
  *
  */
	// commandPanelProps: PropTypes.shape(CommandPanel.propTypes),
	//
	// filterPanelProps: PropTypes.shape(FilterPanel.propTypes),

	/** SELECTED PANEL */

	/** Отображать ли панель выбранных элементов */
	showSelection: PropTypes.bool,

	/** Строка или функция для отображения элементов списка выбранных
  * Строка - имя поля
  * Функция - рендер строк.
  * Параметры - ({ rowData, rowIndex }) */
	rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

Table.defaultProps = {
	defaultRows: [],
	defaultSelectedRowKeys: [],
	defaultSearchValue: '',
	defaultFilter: {},
	defaultSortBy: {},

	rows: [],
	selectedRowKeys: [],
	searchValue: '',
	filter: {},
	sortBy: {},

	autoDeleteRows: true,
	rowKey: 'id',

	empty: empty,
	overlay: overlay,
	fixWidthColumn: false,
	footerHeight: 30,
	footerShow: false,
	footerTitles: {
		selectedRows: 'Выделено:',
		loadedRows: 'Загружено записей:',
		totalRows: 'Всего записей:'
	},
	headerHeight: 30,
	rowHeight: 30,
	zebraStyle: false,

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

	showSelection: false
};

export default Table;