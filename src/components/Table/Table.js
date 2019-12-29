import React, {useRef, forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {notification} from 'antd';
import SortOrder from 'react-base-table/lib/SortOrder';
import BaseTable, {AutoResizer, callOrReturn, Column} from 'react-base-table';
import {empty, overlay} from './defaultSettings';
import SelectionHead from '../Table/Selectable/SelectionHead';
import SelectionCell, {parentAnalysis} from '../Table/Selectable/SelectionCell';
import CommandPanel from '../CommandPanel/CommandPanel';
import FilterPanel from '../FilterPanel/FilterPanel';
import SelectionList from '../Table/SelectionList/SelectionList';
import {rtPrefix} from '../utils/variables';
import {
	flatten,
	generateUUID,
	getTableRowKeys,
	findNodeByRowKey,
	noop,
	getTableRowObjects, notificationError
} from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import FormItems from "../Form/FormItems";



const Table = forwardRef((props, ref) => {
	/** Состояние первоначалной настройки компонента*/
	const [mounted, setMounted] = useState(false);
	/** Наличие на сервере еще данных */
	const [hasMore, setHasMore] = useState(true);
	/** Индикатор загрузки данных */
	const [loading, setLoading] = useState(false);

	/** Indoor control */
	const [_rows, _setRows] = useState([]);
	const [_selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [_searchValue, setSearchValue] = useState({});
	const [_filter, setFilter] = useState(false);
	const [_sortBy, setSortBy] = useState(false);

	/** Selectable States */
	const [selectAll, setSelectAll] = useState(false);

	/** Tree States */
	const [_indeterminateRowKeys, setIndeterminateRowKeys] = useState([]);
    const [_expandedRowKeys, setExpandedRowKeys] = useState([]);

    const [_totalCountRows, setTotalCountRows] = useState(0);

    const [_footerShow, _setFooterShow] = useState(false);

    const tableRef = useRef();

	const {
		/** Def values */
		defaultRows,
		defaultSelectedRowKeys,
		defaultSearchValue,
		defaultFilter,
		defaultSortBy,

		/** Outdoor control */
		rows,
		setRows,
		selectedRowKeys,
		searchValue,
		filter,
		sortBy,

		/** Required */
		columns,
		type,

		/** Base Props */
		autoDeleteRows,
		rowKey,

		/** View Props */
		empty,
		fixWidthColumn,
		footerHeight,
		footerShow,
        footerTitles,
		// footerProps,
		headerHeight,
		rowHeight,
		zebraStyle,
		rowRenderer,
		estimatedRowHeight,

		/** Load Data Props */
		loadThreshold,
		pageSize,
		requestLoadRows,
        requestLoadCount,
		searchParamName,

		/** Selectable Props */
		selectable,

		/** Tree Props */
		nodeAssociated,
		expandColumnKey,
		expandParentKey,
		expandLazyLoad,
		expandDefaultAll,

		/** Events */
		onRowClick,
		onRowDoubleClick,
		onRowExpand,
		onSelectedRowsChange,
		onExpandedRowsChange,

		/** SELECTED PANEL */
		showSelection,
		rowRenderShowSelection,

		/** REDUX PROPS */
		dispatchPath,
		subscribe,
	} = props;

	// console.log('props.commandPanelProps => ', props.commandPanelProps);
	const commandPanelProps = {
		...CommandPanel.defaultProps,
		...props.commandPanelProps,
	};
	const filterPanelProps = {
		...FilterPanel.defaultProps,
		...props.filterPanelProps,
	};

	const footerProps = {
		...Table.defaultProps.footerProps,
		...props.footerProps,
	};

	const selectedDispatchPath = dispatchPath && `${dispatchPath}.selected`;
	const rowsDispatchPath = dispatchPath && `${dispatchPath}.rows`;


	useEffect(() => {
        // console.log("Инициализация дефолтных значений ");
        // console.log("Инициализация дефолтных значений defaultSelectedRowKeys > ", defaultSelectedRowKeys);

		// Инициализация дефолтных значений
		// _setRows(defaultRows);
		_setRowsHandler(defaultRows);
		setSelectedRowKeys(defaultSelectedRowKeys);
		setSearchValue(defaultSearchValue);
		setFilter(defaultFilter);
		setSortBy(defaultSortBy);
		setSelectAll(
			defaultRows.length > 0 &&
				defaultRows.length === defaultSelectedRowKeys.length
		);
		// Определение нужно ли отображать подвал
		_setFooterShow(
			(footerProps.showElements.length ||
			footerProps.leftCustomSideElement ||
			footerProps.centerCustomSideElement ||
			footerProps.rightCustomSideElement));

		if (!!expandColumnKey && !expandLazyLoad) {
			// Открытие всех нод
			if (expandDefaultAll)
				setExpandedRowKeys(
					flatten(getTableRowKeys(defaultRows, rowKey))
				);
			// Установка квадратиков на нужных нодах
			if (defaultSelectedRowKeys && defaultSelectedRowKeys.length > 0) {
				let flatRows = flatten(getTableRowKeys(defaultRows, rowKey));
				let selectedRow = flatRows.filter((item) =>
					defaultSelectedRowKeys.includes(item[rowKey])
				);
				let _indeterminateRowKeys = [];
				selectedRow.forEach((item) => {
					const [ss, ii] = parentAnalysis({
						rowData: item,
						rowKey,
						parentKey: expandParentKey,
						checked: true,
						nodeAssociated,
						treeData: defaultRows,
						selectedRowKeys: defaultSelectedRowKeys,
						indeterminateRowKeys: _indeterminateRowKeys,
					});
					_indeterminateRowKeys.push(...ii);
				});
				setIndeterminateRowKeys([...new Set(_indeterminateRowKeys)]);
			}
		}

		if (type !== 'localSide') {
			_dataProcessing({
				sortBy: defaultSortBy,
				filter: defaultFilter,
				searchLine: defaultSearchValue,
				reload: true,
			});
		}
		// console.log("Table => props ", props);
		setMounted(true);
		if (ref && typeof ref === 'function') ref({reloadData});
		else if (ref && typeof ref === 'object') ref.current = {reloadData};
	}, []);

	useEffect(() => {
		if (type === 'localSide') {
			// console.log("Control useEffect => ", rows, selectedRowKeys, searchValue, filter, sortBy);
			// _setRows(rows);
			_setRowsHandler(rows);
			setSelectedRowKeys(selectedRowKeys);
			setSearchValue(searchValue);
			setFilter(filter);
			setSortBy(sortBy);
			if (!!expandColumnKey && !expandLazyLoad) {
				// Открытие всех нод
				if (expandDefaultAll)
					setExpandedRowKeys(flatten(getTableRowKeys(rows, rowKey)));
			}
		}
    }, [rows, selectedRowKeys, searchValue, filter, sortBy]);

	/** Подписка на изменение props[subscribe.name] в сторе */
	useEffect( () => {
		if(subscribe.name) {
			// console.log("Table => useEffect => subscribe.value ", props[subscribe.name]);
			subscribe.onChange && subscribe.onChange({value: props[subscribe.name], setReloadTable: reloadData});
		}
	}, [props[subscribe.name]]);


	/** BASE FUNCTIONS */
	const _setRowsHandler = (rows) => {
		_setRows(rows);
		rowsDispatch(rows);
	};
	const setRowsHandler = (rows) => {
		setRows(rows);
		rowsDispatch(rows);
	};
	const rowsDispatch = (rows) => {
		rowsDispatchPath && props.setDateStore && props.setDateStore(rowsDispatchPath, rows);
	};

	const reloadData = ({sortBy, filter, searchValue}) => {
		// console.log("reloadData params ", sortBy, filter, searchValue, loading);
        if(props.value && props.value.length > 0)
            setSelectedRowKeys(props.value.map(item => item[rowKey]));
        else
            setSelectedRowKeys([]);
		// setSelectedRowKeys([]);
		if(sortBy) setSortBy(sortBy);
		if(filter) setFilter(filter);
		if(searchValue) setSearchValue(searchValue);
		_dataProcessing({
			sortBy: sortBy ? sortBy : _sortBy,
			filter: filter ? filter : _filter,
			searchLine: searchValue ? searchValue : _searchValue,
			reload: true,
		});
        // console.log("reloadData loading ", loading);
    };

	const _dataProcessing = (params) => {
		// console.log('_dataProcessing', params);
		const {sortBy, filter, searchLine, expandRow, reload} = params;
		switch (type) {
			case 'infinity':
			case 'serverSide':
				if ((hasMore || reload) && !loading) {
					setLoading(true);
					const pageNum = reload
						? 0
						: Math.floor(_rows.length / pageSize);
					const params = {
						page: pageNum,
						size: pageSize,
						sort:
							sortBy && sortBy.key
								? sortBy.key + ',' + sortBy.order
								: null,
					};
					const dataQuery = {
                        ...filter,
                        ...(searchLine
                            ? {[searchParamName]: searchLine}
                            : null),
                    };
					// console.log('dataQuery', dataQuery);

                    if(type === 'infinity' && reload && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad) {
                        requestLoadCount({
                            params,
                            data: dataQuery,
                        })
                            .then((response) => {
                                // console.log("infinity then response", response);
                                // const result = response.data;
                                setTotalCountRows(response.data);
                            })
							.catch(error =>
								notificationError(error, 'Ошибка получения количества записей по фильтру') );
                    }

                    // console.log('requestLoadRows => ', typeof requestLoadRows);
                    // if(typeof requestLoadRows !== 'function'){
                    //     setLoading(false);
                    // }
                    requestLoadRows({
						params,
						data: dataQuery,
					})
						.then((response) => {
							// console.log("infinity then response", response);
							const result = response.data;
							// Если иерархия и ленивая, то ищим кому добавть полученные записи
							if (!!expandColumnKey && expandLazyLoad) {
								// lastExpandRow//, setLastExpandRow
								// console.log('!!expandColumnKey && expandLazyLoad', result);
								if (pageNum === 0) {
									result.forEach((child) => {
										child.children = [
											{[rowKey]: generateUUID()},
										];
									});
									// _setRows(result);
									_setRowsHandler(result);
								} else {
									let newRows = [..._rows];
									// (data, rowKey, rowValue)
									result.forEach((child) => {
										child.children = [
											{[rowKey]: generateUUID()},
										];
									});
									let node = findNodeByRowKey(
										newRows,
										rowKey,
										expandRow[rowKey]
									);
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
								pageNum === 0
									? _setRowsHandler(result) // _setRows
									: _setRowsHandler(_rows.concat(result)); // _setRows

								// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);
								if (expandDefaultAll)
									setExpandedRowKeys(
										flatten(getTableRowKeys(result, rowKey))
									);
							}

							setLoading(false);
						})
						.catch((error) => {
							notificationError(error, 'Ошибка загрузки данных')
							_setRowsHandler(_rows); // _setRows
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
	const _rowEventHandlers = {
		onClick: ({rowData, rowIndex, rowKey, event}) => {
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
				// console.log('_rowEventHandlers -> onClick', rowKey, rowIndex);
				const newRowObject = {
					rowData: {...rowData},
					rowIndex: rowIndex,
					rowKey: rowKey,
				};
				// if(type !== 'localSide')
				setSelectedRowKeys([rowKey]);
				// setSelectedRow(newRowObject);
				// setSelectedRowObjects([newRowObject]);
				selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, rowData);
				onRowClick({
					selected: true,
					...newRowObject,
				});
				onSelectedRowsChange([rowKey], [rowData]);
				// }
			}
		},
		onDoubleClick: ({rowData, rowIndex, rowKey}) => {
			// console.log('onDoubleClick', rowData, rowIndex, rowKey);
			onRowDoubleClick({rowData, rowIndex, rowKey});
		},
		// onContextMenu: console.log('context menu'),
		// onMouseEnter: console.log('mouse enter'),
		// onMouseLeave: console.log('mouse leave'),
	};

	/** Событие при сортировке */
	const _onColumnSort = (sortBy) => {
		// console.log("sortBy", sortBy);
		tableRef.current.scrollToRow(0, 'auto');
		setSortBy(sortBy);

		// Для серверной сортировки - сбросить выделение
		if (type !== 'localSide') {
			setSelectedRowKeys([]);
		}
		const loadParams = {
			sortBy: sortBy,
			filter: _filter,
			searchLine: _searchValue,
			reload: true,
		};
		_dataProcessing(loadParams);
	};

	/** Получение колонок таблицы */
	const _getColumns = () => {
		let _columns = [...columns];

		/** Создаем колонку с галочками (если надо) */
		if (selectable) {
			const selectColumn = {
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
				onSelectAll: _onSelectAllHandler,
			};
			_columns.unshift(selectColumn);
		}
		return _columns;
	};

	/** VIEW FUNCTIONS */

	const _footer = (
		<React.Fragment>
			{_footerShow ? (
					<React.Fragment>
                        {/*className={'BaseTable__footer__counter'}>*/}
						<div key={'footer-left-custom-side'} className={'left-custom-side'}>
							{footerProps.leftCustomSideElement ? <FormItems items={footerProps.leftCustomSideElement} /> : null}
						</div>
						<div key={'footer-center-custom-side'} className={'center-custom-side'}>
							{footerProps.centerCustomSideElement ? <FormItems items={footerProps.centerCustomSideElement} /> : null}
						</div>
						<div key={'footer-right-custom-side'} className={'right-custom-side'}>
							{footerProps.rightCustomSideElement ? <FormItems items={footerProps.rightCustomSideElement} /> : null}
						</div>

						{selectable ? (
							<React.Fragment>
								{footerProps.showElements.includes('selected')
									? <span>{footerProps.selectedTitle} {_selectedRowKeys.length}</span>
									: null }
								{footerProps.showElements.includes('loaded')
									? <span>{footerProps.loadedTitle} {flatten(getTableRowKeys(_rows, rowKey)).length}</span>
									: null }
							</React.Fragment>
							) : null}

						{footerProps.showElements.includes('total')
							? type === 'infinity' && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad
								? <span>{footerProps.totalTitle} {_totalCountRows}</span>
								: <span>{footerProps.totalTitle} {flatten(getTableRowKeys(_rows, rowKey)).length}</span>
							: null}

					</React.Fragment>
				) : null}
		</React.Fragment>
	);

	/** Событие при рендере для стилизации */
	const _rowClassName = ({rowData, rowIndex}) => {
		const {rowClassName} = props;
		const rowClass = rowClassName
			? callOrReturn(rowClassName, {rowData, rowIndex})
			: '';
		// const key = {[rowKey]: rowData[rowKey], checked: true};
		// selectedRowKeys.some((item) => (item[rowKey] === rowData[rowKey] && item.checked))
		return [
			rowClass,
			_selectedRowKeys.includes(rowData[rowKey]) && 'row-selected',
		]
			.filter(Boolean)
			.concat(zebraStyle ? (rowIndex % 2 === 0 ? 'even' : 'odd') : '')
			.concat(' ');
	};

	/** LOAD DATA FUNCTIONS */
	const onEndReached = () => {
		let selectAll;
		const selectLength = _selectedRowKeys.length;
		if (selectLength === 0) selectAll = false;
		else if (selectLength > 0) selectAll = null;

		setSelectAll(selectAll);

		if (type === 'infinity') {
			const loadParams = {
				sortBy: _sortBy,
				filter: _filter,
				searchLine: _searchValue,
				reload: false,
			};
			_dataProcessing(loadParams);
		}
	};

	/** SELECTABLE FUNCTIONS */

	/** Событие при изменении галочки одной строки */
	const _onChangeSelectHandler = ({
		selected,
		_selectedRow,
		_selectAll,
		_selectedRowKeys,
		_selectedRowObjects,
		_indeterminateRowKeys,
	}) => {
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
		// console.log("_handleSelectChange", props);
		// dispatchPath && props.setTableSelectedRow && props.setTableSelectedRow(dispatchPath, _selectedRow.rowData);
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, _selectedRowObjects);
		onRowClick({
			selected,
			rowData: _selectedRow.rowData,
			rowIndex: _selectedRow.rowIndex,
			rowKey,
		});
		onSelectedRowsChange(_selectedRowKeys, _selectedRowObjects);
	};

	/** Событие при изменении галочки "Выделить все" */
	const _onSelectAllHandler = ({selected, rowKeys, rowObjects}) => {
		const selectedKeys = selected ? rowKeys : [];
		setSelectedRowKeys(selectedKeys);
		setIndeterminateRowKeys([]);
		setSelectAll(selected);
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, selected ? rowObjects : []);
		// setSelectedRowObjects(rows);
		// console.log("_handleSelectAll", selectedKeys);
		onSelectedRowsChange(selectedKeys, rowObjects);
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

	const _onExpandedRowsChange = (expandedRowKeys) => {
		// console.log("_onExpandedRowsChange", expandedRowKeys);
		onExpandedRowsChange(expandedRowKeys);
	};
	const _onRowExpand = ({expanded, rowData, rowIndex, rowKey}) => {
		// console.log("_onRowExpand", rowData, expanded, rowIndex, rowKey);
		if (expanded) {
			setExpandedRowKeys([..._expandedRowKeys, rowKey]);

			if (expandLazyLoad) {
				const loadParams = {
					sortBy: _sortBy,
					filter: {..._filter, [expandParentKey]: rowKey},
					searchLine: _searchValue,
					reload: false,
					expandRow: rowData,
				};
				// _callPropsOnLoad(loadParams);
				_dataProcessing(loadParams);
			}
		} else {
			let expandedRowKeys = [..._expandedRowKeys];
			let allChildKeys = flatten(
				getTableRowKeys(rowData.children, props.rowKey)
			);
			allChildKeys.push(rowKey);
			// console.log('allChildKeys', allChildKeys);
			setExpandedRowKeys(
				expandedRowKeys.filter((item) => !allChildKeys.includes(item))
			);
		}
		onRowExpand({expanded, rowData, rowIndex, rowKey});
	};

	/** COMMAND PANEL FUNCTIONS */

	const _getDisabledElementsOfCommandPanel = () => {
		// console.log('commandPanelProps', commandPanelProps);
		let _disabledElements = [...commandPanelProps.disabledElements];
		if (type === 'infinity') {
			_disabledElements.push('up', 'down');
            // console.log('_getDisabledElementsOfCommandPanel => infinity');
        }
		if (selectable && _selectedRowKeys.length > 1) {
			_disabledElements.push('addAsCopy', 'edit', 'up', 'down');
            // console.log('_getDisabledElementsOfCommandPanel => selectable');
        }
		if (_selectedRowKeys.length === 0) {
			_disabledElements.push('addAsCopy', 'edit', 'delete', 'up', 'down');
            // console.log('_getDisabledElementsOfCommandPanel => NO select');
        }
		// if (expandColumnKey) {
			//|| !selectedRow) {
			// _disabledElements.push('up', 'down');
            // console.log('_getDisabledElementsOfCommandPanel => expandColumnKey');
        // }
        // console.log('_getDisabledElementsOfCommandPanel => ', _disabledElements, _selectedRowKeys);

        return [...new Set(_disabledElements)];
	};

	const _onClickAddAsCopy = (event) => {
		// console.log("_onClickAddAsCopy", selectedRow);
		commandPanelProps.onClickAddAsCopy(
			event,
			findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
		);
	};

	const _onClickEdit = (event) => {
		// console.log("_onClickEdit", selectedRow);
		commandPanelProps.onClickEdit(event, {
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
		});
		// props.onClickEdit(event, selectedRow);
	};

	const _onClickDelete = (event) => {
		// console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
		if (autoDeleteRows) {
			if (type === 'localSide') {
				setRowsHandler(
					_rows.filter(
						(item) => !_selectedRowKeys.includes(item[rowKey])
					)
				);
			} else {
				_setRowsHandler(
					_rows.filter(
						(item) => !_selectedRowKeys.includes(item[rowKey])
					)
				);
			}
			setSelectedRowKeys([]);
		}
		commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	const loop = (data, key, callback) => {
		for (let i = 0; i < data.length; i++) {
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

	const _onClickUp = (event) => {
		const data = [..._rows];
		const key = _selectedRowKeys[0];
		loop(data, key, (item, index, arr)  => {
			const newRowIndex = _getNewIndexRow(index, index - 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			commandPanelProps.onClickUp(event, {
				rowIndex: newRowIndex,
				rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			}, data);
		})
	};

	const _onClickDown = (event) => {
		const data = [..._rows];
		const key = _selectedRowKeys[0];
		loop(data, key, (item, index, arr)  => {
			const newRowIndex = _getNewIndexRow(index, index + 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			commandPanelProps.onClickDown(event, {
				rowIndex: newRowIndex,
				rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			}, data);
		})
	};

	const _getNewIndexRow = (oldIndex, newIndex) =>
		newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;

	const _changeIndexRow = (oldIndex, newIndex, arr, data) => {
		if (newIndex >= 0 && newIndex < arr.length) {
			// let arr = [..._rows]; // Копируем массив
			const item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
			// console.log('_changeIndexRow => ',item);
			arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
			// console.log("_changeIndexRow", item[0]);
			if (type === 'localSide') {
				setRowsHandler(data);
			} else {
				_setRowsHandler(data);
			}
		}
	};

	const _onSearch = (searchLine, e) => {
        e.preventDefault();
		// console.log("_onSearch", searchLine);
        tableRef.current.scrollToRow(0, 'auto');
		setSearchValue(searchLine);
		const loadParams = {
			sortBy: _sortBy,
			filter: _filter,
			searchLine: searchLine,
			reload: true,
		};
		_dataProcessing(loadParams);
		commandPanelProps.onSearch(searchLine);
	};

	/** FILTER PANEL FUNCTIONS */

	const _onChangeFilter = (filter) => {
		// console.log('_onChangeFilter', filter);
		setHasMore(true);
		setFilter(filter);
		filterPanelProps.onChangeFilter(filter);
	};
	const _onApplyFilter = (filter) => {
		// console.log('_onApplyFilter', filter);
		const loadParams = {
			sortBy: _sortBy,
			filter: filter,
			searchLine: _searchValue,
			reload: true,
		};
		_dataProcessing(loadParams);
		filterPanelProps.onApplyFilter(filter);
	};

	/** SELECTED PANEL */

	const _onClickDropSelectHandler = (dropObject) => {
		const newSelectedKeys = _selectedRowKeys.filter(
			(item) => item !== dropObject[rowKey]
		);
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

	return (
		<div
			className={`${rtPrefix}-table`}
			style={{width: '100%', height: '100%'}}
		>
			<div className={`${rtPrefix}-table-top-panel`}>
				<CommandPanel
					{...commandPanelProps}
					defaultValueSearch={defaultSearchValue}
					disabledElements={_getDisabledElementsOfCommandPanel()}
					onClickAddAsCopy={_onClickAddAsCopy}
					onClickDelete={_onClickDelete}
					onClickDown={_onClickDown}
					onClickEdit={_onClickEdit}
					onClickUp={_onClickUp}
					onSearch={_onSearch}
				/>
				{/*{!filter ? (*/}
				<FilterPanel
					{...filterPanelProps}
					defaultFilter={defaultFilter}
					onChangeFilter={_onChangeFilter}
					onApplyFilter={_onApplyFilter}
				/>
				{/*) : null}*/}
			</div>
			<div className={`${rtPrefix}-baseTable`}>
				<AutoResizer>
					{({width, height}) => (
						<BaseTable
							ref={tableRef}
							/** Required */
							columns={_getColumns()}
							data={_rows}
							/** Control Props */
							sortBy={_sortBy}
							/** Base Props */
							width={width}
							height={height}
							rowKey={rowKey}
							// rowProps={rowProps}

							/** View Props */
							rowClassName={_rowClassName}
							emptyRenderer={empty}
							fixed={fixWidthColumn}
							footerHeight={_footerShow ? footerProps.height : 0}
							headerHeight={headerHeight}
							rowHeight={rowHeight}
							overlayRenderer={loading ? overlay : null}
							footerRenderer={_footer}
							rowRenderer={rowRenderer}
							estimatedRowHeight={estimatedRowHeight}
							/** Load Data Props */
							onEndReachedThreshold={loadThreshold}
							onEndReached={
								type === 'infinity' ? onEndReached : undefined
							}
							disabled={loading}
							/** Tree Props */
							expandColumnKey={expandColumnKey}
							expandedRowKeys={_expandedRowKeys}
							/** Events */
							onColumnSort={_onColumnSort}
							rowEventHandlers={_rowEventHandlers}
							onExpandedRowsChange={_onExpandedRowsChange}
							onRowExpand={_onRowExpand}
						/>
					)}
				</AutoResizer>
			</div>
			{showSelection && selectable && !expandColumnKey ? (
				<SelectionList
					onClickDropSelect={_onClickDropSelectHandler}
					selectedRowObjects={flatten(
						getTableRowObjects(_rows, rowKey)
					).filter((item) => _selectedRowKeys.includes(item[rowKey]))}
					rowRender={rowRenderShowSelection}
				/>
			) : null}
		</div>
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
	type: PropTypes.oneOf(['infinity', 'serverSide', 'localSide']).isRequired,

	/** Объект со свойствами Command Panel */
	commandPanelProps: PropTypes.object,

	/** Объект со свойствами Filter Panel */
	filterPanelProps: PropTypes.object,

	/**
	 * ПРОПСЫ ЗАДАНИЯ ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ
	 * */

	/** Строки по умолчанию */
	defaultRows: PropTypes.arrayOf(PropTypes.object),

	/** Ключи выделенных по умолчанию строк */
	defaultSelectedRowKeys: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),

	/** Значение строки поиска по умолчанию строк */
	defaultSearchValue: PropTypes.string,

	/** Объект фильтрации по умолчанию */
	defaultFilter: PropTypes.object,

	/** Сортировка по умолчанию */
	defaultSortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc']),
	}),

	/**
	 * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
	 * */

	/** Строки таблицы. Используется для контроля таблицы из вне. */
	rows: PropTypes.arrayOf(PropTypes.object),

    /** Функция задания строк таблицы. */
    setRows: PropTypes.func,

	/** Выделенные строки таблицы. */
	selectedRowKeys: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Объект фильтрации */
	filter: PropTypes.object,

	/** Объект сортировки */
	sortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc']),
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

    /** Заголовки футтера */
    footerTitles: PropTypes.shape({
		/** Заголовок выделенных элементов */
        selectedRows: PropTypes.string,
		/** Заголовок загруженных элементов */
        loadedRows: PropTypes.string,
		/** Заголовок всего элементов */
		totalRows: PropTypes.string,
    }),

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
		rightCustomSideElement: PropTypes.arrayOf(PropTypes.object),
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

	/** SELECTED PANEL */

	/** Отображать ли панель выбранных элементов */
	showSelection: PropTypes.bool,

	/** Строка или функция для отображения элементов списка выбранных
	 * Строка - имя поля
	 * Функция - рендер строк.
	 * `({ rowData, rowIndex }) => { return <Component> }` */
	rowRenderShowSelection: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
	]),

	/** Путь в сторе куда класть выбранную строку таблицы */
	dispatchPath: PropTypes.string,

	/** Объект для подписки на изменения в STORE */
	subscribe: PropTypes.object,
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
        totalRows: 'Всего записей:',
    },
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

	subscribe: {},
};

const mapStateToProps = (store, ownProps) => {
	const {subscribe} = ownProps;
	if(subscribe){
		const {name, path} = subscribe;
		if(name && path)
			return { [name]: objectPath.get(store, path) };
	}

	return {};
};
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ setDateStore: setDateStore}, dispatch);

// const mapStateToProps = (store, ownProps) => {
//     // console.log("mapStateToProps -> store", store);
//     // const {match , section} = ownProps;
//     // const { path } = match;
//     // const rows = store.table[path] && store.table[path][section] ? store.table[path][section].rows : [];
//     // console.log("mapStateToProps -> rows", rows);
//     return { store: store };
// };
// const mapDispatchToProps = (dispatch, ownProps) => {
//     // console.log("mapDispatchToProps -> ownProps", ownProps);
//     // const {match , section} = ownProps;
//     // const { path } = match;
//     // initTableStore(path, section);
//     return bindActionCreators(
//         {
//             initTableStore,
//             setRows,
//         },
//         dispatch
//     );
// };
//
// export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);
