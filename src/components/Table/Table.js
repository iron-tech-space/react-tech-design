import React, {useRef, forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseTable, {AutoResizer, callOrReturn} from 'react-base-table';
// import BaseTable from "./BaseTable/BaseTable";
import {empty, overlay} from './defaultSettings';
import SelectionHead from './Selectable/SelectionHead';
import SelectionCell, {parentAnalysis} from './Selectable/SelectionCell';
import SelectionList from './SelectionList/SelectionList';
import {rtPrefix} from '../utils/variables';
import {
	flatten,
	generateUUID,
	getTableRowKeys,
	findNodeByRowKey,
	noop,
	getTableRowObjects, notificationError, dispatchToStore, useMounted
} from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import FormItems from "../deprecated/Form/FormItems";

const Table = forwardRef((props, ref) => {

	/** Наличие на сервере еще данных */
	const [hasMore, setHasMore] = useState(true);
	/** Индикатор загрузки данных */
	const [loading, setLoading] = useState(false);

	/** Indoor control */
	/** Колонки таблицы */
	// const [_columns, _setColumns] = useState([]);
	const [_rows, _setRows] = useState([]);
	const [_selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [_searchValue, setSearchValue] = useState({});
	const [_filter, setFilter] = useState(false);
	const [_sortBy, setSortBy] = useState({});

	/** Selectable States */
	const [selectAll, setSelectAll] = useState(false);

	/** Tree States */
	const [_indeterminateRowKeys, setIndeterminateRowKeys] = useState([]);
    const [_expandedRowKeys, setExpandedRowKeys] = useState([]);

    const [_totalCountRows, setTotalCountRows] = useState(0);

    const [_footerShow, _setFooterShow] = useState(false);

    const tableRef = useRef();

	const isMounted = useMounted()

	const {
		/** Required */
		columns,
		// type,
		infinityMode,

		/** Def values */
		defaultRows,
		defaultSelectedRowKeys,
		defaultSearchValue,
		defaultFilter,
		defaultSortBy,

		/** Outdoor control */
		rows,
		setRows, // ???
		selectedRowKeys,
		searchValue,
		filter,
		sortBy,

		/** Base Props */
		rowKey,
		customFields,

		/** View Props */
		empty,
		overlay,
		fixWidthColumn,
		// footerProps,
		headerHeight,
		rowHeight,
		rowRenderer,
		zebraStyle,
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
		expandDefaultAll,
		expandLazyLoad,
		expandParentKey,

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

	const footerProps = {
		...Table.defaultProps.footerProps,
		...props.footerProps,
	};

	const selectedDispatchPath = dispatchPath && `${dispatchPath}.selected`;
	const rowsDispatchPath = dispatchPath && `${dispatchPath}.rows`;

	useEffect(() => {
        // console.log("Инициализация дефолтных значений ", selectColumn, columns);
        // console.log("Инициализация дефолтных значений defaultSelectedRowKeys > ", defaultSelectedRowKeys);

		// Инициализация дефолтных значений
		// _setRows(defaultRows);
		_setRowsHandler(defaultRows);
		// setSelectedRowKeys(defaultSelectedRowKeys);
		_setSelectedRowsHandler(defaultSelectedRowKeys,undefined, defaultRows)
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

		// Only tree table
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

		// if (type !== 'localSide') {
		_dataProcessing({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchLine: defaultSearchValue,
			reload: true,
		});
		// }
		// console.log("Table => useEffect start ");
		// setMounted(true);
		if (ref && typeof ref === 'function') ref({reloadData});
		else if (ref && typeof ref === 'object') ref.current = {reloadData};
	}, []);

	useEffect(() => {
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
				if (expandDefaultAll)
					setExpandedRowKeys(flatten(getTableRowKeys(rows, rowKey)));
			}
		// }
    }, [rows, selectedRowKeys, searchValue, filter, sortBy]);

	/** Подписка на изменение props[subscribe.name] в сторе */
	subscribe.map(item => {
		return useEffect( () => {
			if(isMounted && item.name) {
				// console.log("Table => useEffect => [%s] ", item.name, props[item.name]);
				const onChangeObject = {
					value: props[item.name],
					extraData: props[`${item.name}ExtraData`],
					reloadTable: reloadData,
					addRows: _addRows,
					addRow: _addRow,
					addRowAsCopy: _addRowAsCopy,
					editRow: _editRow,
					removeRow: _removeRow,
					moveUpRow: _moveUpRow,
					moveDownRow: _moveDownRow,
				}
				item.onChange && item.onChange(onChangeObject);
			}
		}, [props[item.name]]);
	})

	/** BASE FUNCTIONS */
	const _setRowsHandler = (rows) => {
		_setRows(rows);
		setRows(rows);
		rowsDispatch(rows);
	};

	const _setSelectedRowsHandler = (selectedKeys = [], selectedObjects = undefined, rows = []) => {
		setSelectedRowKeys(selectedKeys);
		if(selectedKeys.length === 0)
			if (selectable)
				selectedDispatch([]);
			else
				selectedDispatch(undefined);
		else if(selectedKeys.length > 0 && !selectedObjects)
			if (selectable)
				selectedDispatch (flatten( getTableRowObjects(rows, rowKey) ).filter((item) => selectedKeys.includes(item[rowKey])))
			else
				selectedDispatch (findNodeByRowKey(rows, rowKey, selectedKeys[0]))
		else
			selectedDispatch(selectedObjects);
	}

	const rowsDispatch = (rows) => {
		rowsDispatchPath && props.setDateStore && props.setDateStore(rowsDispatchPath, rows);
	};

	const selectedDispatch = (data) => {
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, data);
	}

	const reloadData = ({sortBy, filter, searchValue}, appendParams) => {
		// console.log("reloadData params ", sortBy, filter, searchValue, loading);
		tableRef.current && tableRef.current.scrollToRow(0, 'auto');
		if(props.value && props.value.length > 0)
			_setSelectedRowsHandler(props.value.map(item => item[rowKey]), props.value);
		else
			_setSelectedRowsHandler()

		const __sortBy = appendParams ? (sortBy ? sortBy : _sortBy) : sortBy;
		const __filter = appendParams ? {..._filter, ...filter} : filter;
		const __searchValue = appendParams ? (searchValue ? searchValue : _searchValue) : searchValue;
		if(sortBy) setSortBy(__sortBy);
		if(filter) setFilter(__filter);
		if(searchValue) setSearchValue(__searchValue);
		_dataProcessing({
			sortBy: __sortBy,
			filter: __filter,
			searchLine: __searchValue,
			reload: true,
		});
        // console.log("reloadData loading ", loading);
    };

	const _dataProcessing = (params) => {
		// console.log('_dataProcessing', params);
		const {sortBy, filter, searchLine, expandRow, reload} = params;
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

			if(infinityMode && reload && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad) {
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
	};

	/** Событие выделение одной строки в режиме без галочек */
	const _rowEventHandlers = {
		onClick: ({rowData, rowIndex, rowKey, event}) => {
			if (!selectable) {
				// console.log('_rowEventHandlers -> onClick', rowKey, rowIndex);
				const newRowObject = {
					rowData: {...rowData},
					rowIndex: rowIndex,
					rowKey: rowKey,
				};
				_setSelectedRowsHandler([rowKey], rowData);
				// setSelectedRowKeys([rowKey]);
				// selectedDispatch(rowData);
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
		// if (type !== 'localSide') {
		// setSelectedRowKeys([]);
		_setSelectedRowsHandler();
		// }
		const loadParams = {
			sortBy: sortBy,
			filter: _filter,
			searchLine: _searchValue,
			reload: true,
		};
		_dataProcessing(loadParams);
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
							? infinityMode && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad
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

		if (infinityMode) {
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
		// console.log("_onChangeSelectHandler", _selectedRowKeys);
		// setSelectedRowKeys(_selectedRowKeys);
		// selectedDispatch(_selectedRowObjects);
		_setSelectedRowsHandler(_selectedRowKeys, _selectedRowObjects)
		setIndeterminateRowKeys(_indeterminateRowKeys);
		setSelectAll(_selectAll);
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
		// setSelectedRowKeys(selectedKeys);
		// selectedDispatch(selected ? rowObjects : []);
		_setSelectedRowsHandler(selectedKeys, selected ? rowObjects : [])
		setIndeterminateRowKeys([]);
		setSelectAll(selected);
		// setSelectedRowObjects(rows);
		// console.log("_handleSelectAll", selectedKeys);
		onSelectedRowsChange(selectedKeys, rowObjects);
	};

	const _getColumns = () => {
		const selectColumn = {
			key: '__selection__',
			headerRenderer: SelectionHead,
			cellRenderer: SelectionCell,
			width: 40,
			flexShrink: 0,
			resizable: false,
			frozen: 'left',
			rowKey: rowKey,
			parentKey: expandParentKey,
			selectedRowKeys: _selectedRowKeys,
			indeterminateRowKeys: _indeterminateRowKeys,
			nodeAssociated: nodeAssociated,
			onChange: _onChangeSelectHandler,
			selectAll: selectAll,
			onSelectAll: _onSelectAllHandler,
		};
		return selectable ? [selectColumn, ...columns] : [...columns];
	}



	/** TREE FUNCTIONS */

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


	/** ROW CHANGE FUNCTIONS */

	/**
	 * Find row by key
	 * @param data - table rows
	 * @param key - key row for find
	 * @param callback - function for return result
	 * @returns {*}
	 */
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

	const _addRows = (rows) => {
		let saveRows = [...rows];
		if (customFields)
			// Фильтрация по пользовательским параметрам
			saveRows = saveRows.filter((sRow) => {
				let isValid = true;
				customFields.forEach((field) => {
					// Валидация по пользовательской логике функции validate
					if(field.validate)
						isValid = field.validate(sRow, _rows);

					// Создание или переобразование по пользовательской логике функции value
					if(field.value)
						sRow[field.name] = field.value(sRow, _rows);
				});
				if(isValid)
					return sRow;
			});
		_setRowsHandler([..._rows, ...saveRows]);
	}

	const _addRow = (row) => {
		let _row = {...row}
		if (customFields)
			customFields.forEach((field) => _row[field.name] = field.value(_row, _rows));
		_setRowsHandler([..._rows, _row]);
	}

	const _addRowAsCopy = () => {
		// console.log("_onClickAddAsCopy", selectedRow);
		_setRowsHandler([..._rows, findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])]);
	};

	const _editRow = (row) => {
		// console.log("_onClickEdit", selectedRow);
		const data = [..._rows];
		const key = row[rowKey];
		loop(data, key, (item, index, arr)  => {
			data[index] = row;
			_setRowsHandler(data);
			// selectedDispatch(row)
			_setSelectedRowsHandler(_selectedRowKeys, undefined, data);
			// setSelectedRowKeys([]);
		})
		// props.onClickEdit(event, selectedRow);
	};

	const _removeRow = (event) => {
		// console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
		_setRowsHandler(
			_rows.filter(
				(item) => !_selectedRowKeys.includes(item[rowKey])
			)
		);
		_setSelectedRowsHandler();
		// setSelectedRowKeys([]);
		// if (selectable)
		// 	selectedDispatch([]);
		// else
		// 	selectedDispatch(undefined);
		// commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	const _moveUpRow = (event) => {
		const data = [..._rows];
		const key = _selectedRowKeys[0];
		loop(data, key, (item, index, arr)  => {
			const newRowIndex = _getNewIndexRow(index, index - 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			// commandPanelProps.onClickUp(event, {
			// 	rowIndex: newRowIndex,
			// 	rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			// }, data);
		})
	};

	const _moveDownRow = (event) => {
		const data = [..._rows];
		const key = _selectedRowKeys[0];
		loop(data, key, (item, index, arr)  => {
			const newRowIndex = _getNewIndexRow(index, index + 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			// commandPanelProps.onClickDown(event, {
			// 	rowIndex: newRowIndex,
			// 	rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			// }, data);
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

	const _onClickDropSelectHandler = (dropObject) => {
		const newSelectedKeys = _selectedRowKeys.filter(
			(item) => item !== dropObject[rowKey]
		);
		// setSelectedRowKeys(newSelectedKeys);
		_setSelectedRowsHandler(newSelectedKeys, undefined, _rows);
		setSelectAll((newSelectedKeys.length === 0 ? false : null));
		onSelectedRowsChange(newSelectedKeys);
	};

	return (
		<div className={`${rtPrefix}-table`}>
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
							onEndReached={infinityMode ? onEndReached : undefined}
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
	// type: PropTypes.oneOf(['infinity', 'serverSide', 'localSide']).isRequired,
	infinityMode: PropTypes.bool,

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
	rowRenderShowSelection: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.string,
	]),

	/** Путь в сторе куда класть выбранную строку таблицы */
	dispatchPath: PropTypes.string,

	/** Объект для подписки на изменения в STORE */
	subscribe: PropTypes.arrayOf(PropTypes.object),
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
	subscribe: [],
};

const mapStateToProps = (store, ownProps) => {
	const {subscribe} = ownProps;
	let state = {};
	if(subscribe && subscribe.length > 0){
		subscribe.forEach(item => {
			const {name, path, extraData} = item;
			if(name && path)
				state[name] = objectPath.get(store, path);
			if(name && extraData)
				state[`${name}ExtraData`] = objectPath.get(store, extraData);
		})
	}
	return state;
};
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ setDateStore: setDateStore}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);
