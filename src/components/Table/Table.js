import React, {useEffect, useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {notification} from 'antd';
import SortOrder from 'react-base-table/lib/SortOrder';
import BaseTable, {AutoResizer, callOrReturn, Column} from 'react-base-table';
import {empty, overlay} from './defaultSettings';
import SelectionHead from '../Table/Selectable/SelectionHead';
import SelectionCell, {parentAnalysis} from '../Table/Selectable/SelectionCell';
import CommandPanel from '../CommandPanel/CommandPanel';
import FilterPanel from '../FilterPanel/FilterPanel';
import SelectionList from '../Table/SelectionList/SelectionList';
import {
	flatten,
	generateUUID,
	getTableRowKeys,
	findNodeByRowKey,
	noop,
	getTableRowObjects,
} from '../utils/baseUtils';

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

    const tableRef = React.useRef();

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
		headerHeight,
		rowHeight,
		zebraStyle,
		rowRenderer,

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
	} = props;

	const commandPanelProps = {
		...CommandPanel.defaultProps,
		...props.commandPanelProps,
	};
	const filterPanelProps = {
		...FilterPanel.defaultProps,
		...props.filterPanelProps,
	};

	useEffect(() => {
		// console.log("Инициализация дефолтных значений ");

		// Инициализация дефолтных значений
		_setRows(defaultRows);
		setSelectedRowKeys(defaultSelectedRowKeys);
		setSearchValue(defaultSearchValue);
		setFilter(defaultFilter);
		setSortBy(defaultSortBy);
		setSelectAll(
			defaultRows.length > 0 &&
				defaultRows.length === defaultSelectedRowKeys.length
		);

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
		setMounted(true);
		if (ref && typeof ref === 'function') ref({reloadData});
		else if (ref && typeof ref === 'object') ref.current = {reloadData};
	}, []);

	const reloadData = ({sortBy, filter, searchValue}) => {
	    // console.log("reloadData params ", sortBy, filter, searchValue);
        setSelectedRowKeys([]);
        if(sortBy) setSortBy(sortBy);
        if(filter) setFilter(filter);
        if(searchValue) setSearchValue(searchValue);
        _dataProcessing({
			sortBy: sortBy ? sortBy : _sortBy,
			filter: filter ? filter : _filter,
			searchLine: searchValue ? searchValue : _searchValue,
			reload: true,
		});
	};

	useEffect(() => {
		if (type === 'localSide') {
			// console.log("Control useEffect => ", rows, selectedRowKeys, searchValue, filter, sortBy);
			_setRows(rows);
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

	/** BASE FUNCTIONS */
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
                            .catch((error) => {
                                console.log('RequestLoadCount catch: ', error);
                            });
                    }

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
									_setRows(result);
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
									_setRows(newRows);
								}
							} else {
								if (result && result.length < pageSize) {
									setHasMore(false);
								} else {
									setHasMore(true);
								}
								pageNum === 0
									? _setRows(result)
									: _setRows(_rows.concat(result));

								// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);
								if (expandDefaultAll)
									setExpandedRowKeys(
										flatten(getTableRowKeys(result, rowKey))
									);
							}

							setLoading(false);
						})
						.catch((error) => {
							// console.log('loadData catch: ', error);
							if (error.response) {
								notification.error({
									message: `Ошибка загрузки данных [${error.response.status}]`,
									description: error.response.data.message,
								});
							} else
								notification.error({
									message:
										'Не удалось детектировать ошибку. См. console.log',
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
				// console.log('_rowEventHandlers -> onClick', rowKey);
				const newRowObject = {
					rowData: {...rowData},
					rowIndex: rowIndex,
					rowKey: rowKey,
				};
				// if(type !== 'localSide')
				setSelectedRowKeys([rowKey]);
				// setSelectedRow(newRowObject);
				// setSelectedRowObjects([newRowObject]);
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
		<div className={'BaseTable__footer__counter'}>
			{selectable ? (
                <React.Fragment>
                    <span>{footerTitles.selectedRows} {_selectedRowKeys.length}</span>
                    <span>{footerTitles.loadedRows} {flatten(getTableRowKeys(_rows, rowKey)).length}</span>
                </React.Fragment>
                ) : null}

            {type === 'infinity' && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad
                ? <span>{footerTitles.totalRows} {_totalCountRows}</span>
                : <span>{footerTitles.totalRows} {flatten(getTableRowKeys(_rows, rowKey)).length}</span>
            }

            </div>
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
		// console.log("_handleSelectChange", _selectedRowKeys, newSelectedObjects);
		onRowClick({
			selected,
			rowData: _selectedRow.rowData,
			rowIndex: _selectedRow.rowIndex,
			rowKey,
		});
		onSelectedRowsChange(_selectedRowKeys);
	};

	/** Событие при изменении галочки "Выделить все" */
	const _onSelectAllHandler = ({selected, rowKeys}) => {
		const selectedKeys = selected ? rowKeys : [];
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
				setRows(
					_rows.filter(
						(item) => !_selectedRowKeys.includes(item[rowKey])
					)
				);
			} else {
				_setRows(
					_rows.filter(
						(item) => !_selectedRowKeys.includes(item[rowKey])
					)
				);
			}
			setSelectedRowKeys([]);
		}
		commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	const _onClickUp = (event) => {
		// console.log("_onClickUp", selectedRow);
		const rowIndex = _rows.findIndex(
			(item) => item[rowKey] === _selectedRowKeys[0]
		);
		const newRowIndex = _getNewIndexRow(rowIndex, rowIndex - 1);
		_changeIndexRow(rowIndex, newRowIndex);
		// console.log("_onClickUp", rowIndex, newRowIndex);
		commandPanelProps.onClickUp(event, {
			rowIndex: newRowIndex,
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
		});
	};

	const _onClickDown = (event) => {
		const rowIndex = _rows.findIndex(
			(item) => item[rowKey] === _selectedRowKeys[0]
		);
		const newRowIndex = _getNewIndexRow(rowIndex, rowIndex + 1);
		_changeIndexRow(rowIndex, newRowIndex);
		// console.log("_onClickDown", rowIndex, newRowIndex);
		commandPanelProps.onClickDown(event, {
			rowIndex: newRowIndex,
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
		});
	};

	const _getNewIndexRow = (oldIndex, newIndex) =>
		newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;

	const _changeIndexRow = (oldIndex, newIndex) => {
		if (newIndex >= 0 && newIndex < _rows.length) {
			let arr = [..._rows]; // Копируем массив
			const item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
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

	const _onSearch = (searchLine) => {
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
			className={'Table__container'}
			style={{width: '100%', height: '100%'}}
		>
			<div className={'Table__Top-panel'}>
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
			<div className={'BaseTable__container'}>
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
							footerHeight={footerShow ? footerHeight : 0}
							headerHeight={headerHeight}
							rowHeight={rowHeight}
							overlayRenderer={loading ? overlay : null}
							footerRenderer={_footer}
							rowRenderer={rowRenderer}
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
	defaultSelectedRowKeys: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),

	/** Значение строки поиска по умолчанию строк */
	defaultSearchValue: PropTypes.string,

	/** Объект фильтрации по умолчанию */
	defaultFilter: PropTypes.object,

	/** Сортировка по умолчанию */
	defaultSortBy: PropTypes.shape({
		key: PropTypes.string,
		order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC]),
	}),

	/**
	 * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
	 * */

	/** Строки таблицы. Используется для контроля таблицы из вне. */
	rows: PropTypes.arrayOf(PropTypes.object),

	/** Выделенные строки таблицы. */
	selectedRowKeys: PropTypes.arrayOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),

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
		order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC]),
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
        totalRows: PropTypes.string,
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
	rowRenderShowSelection: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
	]),
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
};

export default Table;
