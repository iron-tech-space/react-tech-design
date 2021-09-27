import React, {useRef, forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BaseTable, {AutoResizer} from 'react-base-table';
import {empty, overlay} from './defaultSettings';
import SelectionHead from './Selectable/SelectionHead';
import SelectionCell, {parentAnalysis, onChangeSelectionCell} from './Selectable/SelectionCell';
import SelectionList from './SelectionList/SelectionList';
import {rtPrefix} from '../../utils/variables';
import {
	flatten,
	generateUUID,
	getTableRowKeys,
	findNodeByRowKey,
	noop,
	getTableRowObjects, notificationError, useMounted
} from "../../utils/baseUtils";
import FormItems from "../../Form/FormItems";
import moment from "moment";
import { getExtraData, mapDispatchToProps, mapStateToProps } from "../../utils/storeUtils";

/** Компонент таблицы */
const Table = forwardRef((props, ref) => {

	/** LOADING AND INFINITY MODE STATES */
	/** Наличие на сервере еще данных */
	const [hasMore, setHasMore] = useState(true);
	/** Индикатор загрузки данных */
	const [loading, setLoading] = useState(false);

	/** TABLE STATES */
	/** Колонки таблицы */
	// const [_columns, _setColumns] = useState([]);
	/** Строки таблицы */
	const [_rows, _setRows] = useState([]);
	/** Ключи выделенных строк */
	const [_selectedRowKeys, setSelectedRowKeys] = useState([]);
	/** Значение строки поиска */
	const [_searchValue, setSearchValue] = useState('');
	/** Объект фильтра */
	const [_filter, setFilter] = useState({});
	/** Объект соритировки */
	const [_sortBy, setSortBy] = useState({});
	/** Состояние selectAll галочки */
	const [selectAll, setSelectAll] = useState(false);

	/** TREE STATES */
	/** Ключи строк с кубиками при selectable = true */
	const [_indeterminateRowKeys, setIndeterminateRowKeys] = useState([]);
	/** Ключи раскрытых строк при selectable = true */
	const [_expandedRowKeys, setExpandedRowKeys] = useState([]);

	/** FOOTER STATES */
	/** Отображать ли footer */
	const [_footerShow, _setFooterShow] = useState(false);
	/** Всего строк по фильтру в таблице */
    const [_totalCountRows, setTotalCountRows] = useState(0);


	const [subscribeProps, setSubscribeProps] = useState({});

	const tableRef = useRef();

	const isMounted = useMounted()

	const {
		/** Required */
		columns,
		// type,
		infinityMode,
		editMode, // need Props.types

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
		// cellBordered, // need Props.types
		rowBordered,  // need Props.types
		className,
		style,

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
		dispatch,
		subscribe,

		value,
		onChange,
	} = {...props, ...subscribeProps};

	const footerProps = {
		...Table.defaultProps.footerProps,
		...props.footerProps,
	};

	const selectedDispatchPath = dispatch && dispatch.path
		? `${dispatch.path}.selected`
		: dispatchPath && `${dispatchPath}.selected`;
	const rowsDispatchPath = dispatch && dispatch.path
		? `${dispatch.path}.rows`
		: dispatchPath && `${dispatchPath}.rows`;

	useEffect(() => {
        // console.log("Инициализация дефолтных значений ", selectColumn, columns);
        // console.log("Инициализация дефолтных значений defaultSelectedRowKeys > ", defaultSelectedRowKeys);

		// Инициализация дефолтных значений
		// _setRows(defaultRows);
		if(defaultRows.length > 0) _setRowsHandler(defaultRows);
		else if(rows.length > 0) _setRowsHandler(rows);
		// setSelectedRowKeys(defaultSelectedRowKeys);
		// _setSelectedRowsHandler(defaultSelectedRowKeys, undefined, defaultRows)
		if (selectable && props.value && props.value.length > 0)
			_setSelectedRowsHandler(props.value.map(item => item[rowKey]), props.value);
		else
			_setSelectedRowsHandler(defaultSelectedRowKeys, undefined, defaultRows);
		setSearchValue(defaultSearchValue);
		setFilterHandler(defaultFilter);
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
		if(isMounted) {
			// console.log('useEffect rows');
			_setRowsHandler(rows);
			// setSelectedRowKeys(selectedRowKeys);
			_setSelectedRowsHandler(selectedRowKeys, undefined, rows);
			setSearchValue(searchValue);
			setFilterHandler(filter);
			setSortBy(sortBy);
			if (!!expandColumnKey && !expandLazyLoad) {
				// Открытие всех нод
				if (expandDefaultAll)
					setExpandedRowKeys(flatten(getTableRowKeys(rows, rowKey)));
			}
		}
    }, [rows, selectedRowKeys, searchValue, filter, sortBy]);

	useEffect(() => {
		// console.log('useEffect editMode');
		_setSelectedRowsHandler([], [])
	}, [editMode])

	useEffect(() => {
		// console.log('useEffect value');
		if(value && Array.isArray(value) && !requestLoadRows)
			_setRowsHandler(value)
	}, [value])

	/** Подписка на изменение props[subscribe.name] в сторе */
	subscribe.map(item => {
		return useEffect( () => {
			if((item.withMount || isMounted) && item.name) {
				// console.log("Table => useEffect => [%s] ", item.name, props[item.name]);
				const onChangeObject = {
					value: props[item.name],
					extraData: getExtraData(item, props), //extraData, //props[`${item.name}ExtraData`],
					reloadTable: reloadData,
					addRows: _addRows,
					addRow: _addRow,
					addRowAsCopy: _addRowAsCopy,
					editRow: _editRow,
					removeRow: _removeRow,
					moveUpRow: _moveUpRow,
					moveDownRow: _moveDownRow,
					setSubscribeProps: _setSubscribeProps,
				}
				item.onChange && item.onChange(onChangeObject);
			}
		}, [props[item.name]]);
	})

	/** BASE FUNCTIONS */

	const _setSubscribeProps = (props) => {
		// setTimeout(() => {
		// 	console.log('_setSubscribeProps');
		setSubscribeProps({...subscribeProps, ...props});
		// }, 2000)
	}

	const _setLoadedRowsHandler = (rows) => {
		_setRowsHandler(rows)
		// !selectable && onChange && onChange(rows)
	};
	const _setRowsHandler = (rows) => {
		// console.log('_setRowsHandler onChange');
		_setRows(rows);
		setRows(rows);
		rowsDispatch(rows);
	};

	const _setSelectedRowsHandler = (selectedKeys = [], selectedObjects = undefined, rows = []) => {
		// console.log('_setSelectedRowsHandler => ', selectedKeys)
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
		// console.log('rowsDispatch ', rowsDispatchPath);
		rowsDispatchPath && props.setDataStore && props.setDataStore(rowsDispatchPath, rows);
		!selectable && onChange && onChange(rows);
	};

	const selectedDispatch = (data) => {
		selectedDispatchPath && props.setDataStore && props.setDataStore(selectedDispatchPath, data);
		selectable && onChange && onChange(data);
	}

	const onTableEventsDispatch = (nameEvent, value) => {
		const dp = dispatch && dispatch.path
			? `${dispatch.path}.events.${nameEvent}`
			: dispatchPath && `${dispatchPath}.events.${nameEvent}`;

		dp && props.setDataStore && props.setDataStore(dp, {
			timestamp: moment(),
			value: value
		});
		// console.log('onTableEventsDispatch onChange');
		Array.isArray(value) && onChange && onChange(value)
	}

	const setFilterHandler = (filter) => {
		// console.log('setFilterHandler => ', filter);
		setFilter(filter);
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
		setSortBy(__sortBy);
		setFilterHandler(__filter);
		setSearchValue(__searchValue);
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
			if(requestLoadRows) {
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
										{ [rowKey]: generateUUID() },
									];
								});
								// _setRows(result);
								_setLoadedRowsHandler(result);
							} else {
								let newRows = [..._rows];
								// (data, rowKey, rowValue)
								result.forEach((child) => {
									child.children = [
										{ [rowKey]: generateUUID() },
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
								_setLoadedRowsHandler(newRows);
							}
						} else {
							if (result && result.length < pageSize) {
								setHasMore(false);
							} else {
								setHasMore(true);
							}
							pageNum === 0
								? _setLoadedRowsHandler(result) // _setRows
								: _setLoadedRowsHandler(_rows.concat(result)); // _setRows

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
						_setLoadedRowsHandler(_rows); // _setRows
						// setHasMore(false);
						setLoading(false);
					});
			} else setLoading(false);
		}
	};

	/** Событие выделение одной строки в режиме без галочек */
	const useSimpleAndDoubleClick = (actionSimpleClick, actionDoubleClick, delay = 200) => {
		const [click, setClick] = useState(0);
		const [data, setData] = useState(undefined);
		useEffect(() => {
			const timer = setTimeout(() => {
				// simple click
				if (click === 1) actionSimpleClick(data);
				setClick(0);
			}, delay);
			if (click === 2) actionDoubleClick(data);
			return () => clearTimeout(timer);
		}, [click]);
		return (_data) => {setClick(prev => prev + 1); setData(() => _data);}
	}

	let timer;
	const simpleAndDoubleClick = (actionSimpleClick, actionDoubleClick, data) => (event) => {
		clearTimeout(timer);
		if (event.detail === 1) {
			// console.log('actionSimpleClick', data)
			timer = setTimeout(() => actionSimpleClick(data), 200)
		} else if (event.detail === 2) {
			// console.log('actionDoubleClick', data)
			actionDoubleClick(data)
		}
	}

	const _onRowClick = ({rowData, rowIndex, rowKey}) => {
		// console.log('actionSimpleClick')
		onTableEventsDispatch('onRowClick', rowData)
		_rowSelectAfterClick({rowData, rowIndex, rowKey, onClick: onRowClick})
	}
	const _onRowDoubleClick = ({rowData, rowIndex, rowKey}) => {
		// console.log('onDoubleClick', rowData, rowIndex, rowKey);
		// console.log('actionDoubleClick')
		// rowDoubleClickDispatch(rowData);
		onTableEventsDispatch('onRowDoubleClick', rowData)
		_rowSelectAfterClick({rowData, rowIndex, rowKey, onClick: onRowDoubleClick})
	}

	const _rowSelectAfterClick = ({rowData, rowIndex, rowKey, onClick}) => {
		const checked = !_selectedRowKeys.includes(rowKey);
		const newRowObject = {
			rowData: {...rowData},
			rowIndex: rowIndex,
			rowKey: rowKey,
		};
		if (!selectable) {
			// console.log('_rowEventHandlers -> onClick', rowKey, rowIndex);
			// console.log('q onRowClick => ', rowData)
			// if(_selectedRowKeys)
			if(checked && !editMode)
				_setSelectedRowsHandler([rowKey], rowData);
			onSelectedRowsChange([rowKey], [rowData]);
		} else {
			onChangeSelectionCell({
				...newRowObject,
				column: _getSelectionColumnProps(),
				rows: _rows,
				checked: checked,
			})
		}
		onClick && onClick({ selected: checked, ...newRowObject });
	}

	const _rowEventHandlers = {
		onClick: _onRowClick,
		onDoubleClick: _onRowDoubleClick,

		// onClick: useSimpleAndDoubleClick(_onRowClick, _onRowDoubleClick),
		// onClick: simpleAndDoubleClick(_onRowClick, _onRowDoubleClick),

		// onDoubleClick: console.log('onDoubleClick'),
		// onContextMenu: console.log('context menu'),
		// onMouseEnter: console.log('mouse enter'),
		// onMouseLeave: console.log('mouse leave'),
	};


	/** Событие при сортировке */
	const _onColumnSort = (sortBy) => {
		// console.log("sortBy", sortBy);
		tableRef.current.scrollToRow(0, 'auto');
		let localSortBy = _sortBy.order === 'desc' ? {} : sortBy;
		setSortBy(localSortBy);

		// Для серверной сортировки - сбросить выделение
		// if (type !== 'localSide') {
		// setSelectedRowKeys([]);
		_setSelectedRowsHandler();
		// }
		const loadParams = {
			sortBy: localSortBy,
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
							{footerProps.leftCustomSideElement
								? Array.isArray(footerProps.leftCustomSideElement)
									? <FormItems items={footerProps.leftCustomSideElement} />
									: <footerProps.leftCustomSideElement/>
								: null}
						</div>
						<div key={'footer-center-custom-side'} className={'center-custom-side'}>
							{footerProps.centerCustomSideElement
								? Array.isArray(footerProps.centerCustomSideElement)
									? <FormItems items={footerProps.centerCustomSideElement} />
									: <footerProps.centerCustomSideElement/>
								: null}
						</div>
						<div key={'footer-right-custom-side'} className={'right-custom-side'}>
							{footerProps.rightCustomSideElement
								? Array.isArray(footerProps.rightCustomSideElement)
									? <FormItems items={footerProps.rightCustomSideElement} />
									: <footerProps.rightCustomSideElement/>
								: null}
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
		return [
			rowClassName,
			_selectedRowKeys.includes(rowData[rowKey]) && 'row-selected',
			zebraStyle ? (rowIndex % 2 === 0 ? 'even' : 'odd') : '',
			rowBordered ? 'bordered' : ''
		].join(' ')
	};

	// const _cellProps = () => ({ className: [cellBordered ? 'cellBordered' : ''].join(' ')})

	const _rowRenderer = (props) => {
		const { cells, rowData, rowIndex } = props;

		return (
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '100%'
				}}
				onClick={(e) =>
				simpleAndDoubleClick(_onRowClick, _onRowDoubleClick, {rowData, rowIndex, rowKey: rowData[rowKey]})(e)}
			>
				{cells}
			</div>
		)
	}

	const _rowProps = ({ columns, rowData, rowIndex }) => ({
		onClick: (e) =>
		simpleAndDoubleClick(_onRowClick, _onRowDoubleClick, {rowData, rowIndex, rowKey: rowData[rowKey]})(e)

})

	/** LOAD DATA FUNCTIONS */
	const onEndReached = () => {
		let selectAll;
		const selectLength = _selectedRowKeys.length;
		if (selectLength === 0) selectAll = false;
		else if (selectLength > 0) selectAll = null;

		setSelectAll(selectAll);
		// console.log('_filter', _filter);

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
		// console.group("_onChangeSelectHandler", _selectedRowKeys);
		// console.log("_selectedRowKeys", _selectedRowKeys);
		// console.log("_indeterminateRowKeys", _indeterminateRowKeys);
		// console.log("_selectAll", _selectAll);
		// console.groupEnd();

		// setSelectedRowKeys(_selectedRowKeys);
		// selectedDispatch(_selectedRowObjects);
		_setSelectedRowsHandler(_selectedRowKeys, _selectedRowObjects)
		setIndeterminateRowKeys(_indeterminateRowKeys);
		setSelectAll(_selectAll);
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

	const _getSelectionColumnProps = () => ({
		rowKey: rowKey,
		parentKey: expandParentKey,
		nodeAssociated: nodeAssociated,
		selectedRowKeys: _selectedRowKeys,
		indeterminateRowKeys: _indeterminateRowKeys,
		onChange: _onChangeSelectHandler,
	})

	const _getColumns = () => {
		const selectColumn = {
			key: '__selection__',
			headerRenderer: SelectionHead,
			cellRenderer: <SelectionCell/>,
			width: 40,
			flexShrink: 0,
			resizable: false,
			frozen: 'left',
			selectAll: selectAll,
			onSelectAll: _onSelectAllHandler,
			..._getSelectionColumnProps()
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
				let isValid = [];
				customFields.forEach((field) => {
					// Валидация по пользовательской логике функции validate
					if(field.validate)
						isValid.push(field.validate(sRow, _rows));

					// Создание или переобразование по пользовательской логике функции value
					if(field.value)
						sRow[field.name] = field.value(sRow, _rows);
				});
				// console.log('_addRows isValid', isValid);
				if(!isValid.includes(false))
					return sRow;
			});
		const _localRows = [..._rows, ...saveRows]
		_setRowsHandler(_localRows);
		onTableEventsDispatch('onAddRows', _localRows);
	}

	const _addRow = (row) => {
		let _row = {...row}
		let isValid = true;
		if (customFields) {
			let validations = [];
			customFields.forEach((field) => {
				if(field.validate)
					validations.push(field.validate(_row, _rows));

				if(field.value)
					_row[field.name] = field.value(_row, _rows)
			});
			isValid = !validations.includes(false)
		}
		if(isValid) {
			const _localRows = [..._rows, _row]
			_setRowsHandler(_localRows);
			onTableEventsDispatch('onAddRow', _localRows);
		}

	}

	const _addRowAsCopy = () => {
		// console.log("_onClickAddAsCopy", selectedRow);
		const _localRows = [..._rows, findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])]
		_setRowsHandler(_localRows);
		onTableEventsDispatch('onAddRowAsCopy', _localRows);

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
			onTableEventsDispatch('onEditRow', data);

			// setSelectedRowKeys([]);
		})
		// props.onClickEdit(event, selectedRow);
	};

	const _removeRow = (event) => {
		// console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
		const _localRows = _rows.filter(
			(item) => !_selectedRowKeys.includes(item[rowKey]) )
		_setRowsHandler(_localRows);
		_setSelectedRowsHandler();
		onTableEventsDispatch('onRemoveRow', _localRows);

		// setSelectedRowKeys([]);
		// if (selectable)
		// 	selectedDispatch([]);
		// else
		// 	selectedDispatch(undefined);
		// commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	// const _moveUpRow

	const _moveUpRow = (event) => {
		const data = [..._rows];
		const key = _selectedRowKeys[0];
		loop(data, key, (item, index, arr)  => {
			const newRowIndex = _getNewIndexRow(index, index - 1);
			_changeIndexRow(index, newRowIndex, arr, data, 'onMoveUpRow');
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
			_changeIndexRow(index, newRowIndex, arr, data, 'onMoveDownRow');
			// commandPanelProps.onClickDown(event, {
			// 	rowIndex: newRowIndex,
			// 	rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			// }, data);
		})
	};

	const _getNewIndexRow = (oldIndex, newIndex) =>
		newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;

	const _changeIndexRow = (oldIndex, newIndex, arr, data, nameEvent) => {
		if (newIndex >= 0 && newIndex < arr.length) {
			// let arr = [..._rows]; // Копируем массив
			const item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
			// console.log('_changeIndexRow => ',item);
			arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
			// console.log("_changeIndexRow", item[0]);
			_setRowsHandler(data);
			onTableEventsDispatch(nameEvent, data);

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
		<div className={`${rtPrefix}-table ${className}`} style={style}>
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
							// rowProps={_rowProps}
							// cellProps={_cellProps}
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
							editMode={editMode}
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

	/** Режим загрузки данных по скроллу */
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


	/** Дополнительные поля и валидация в объекты таблицы
	 * Данный параметр (props) осуществляет дополнительную обработку объекта таблицы после закрытия модалки, но перед добавлением в таблицу.
	 * Можно как изменить существующие поля объекта, так и добавить новые поля объекта.
	 * `customFields` - массив объектов для дополнения или изменения полей объектов таблицы
	 * ```json
	 * [
	 * 	{
	 * 		name: <String>,
	 * 		value: <func>,
	 * 		validate: <func>
	 * 	}
	 * ]
	 * ```
	 * `name` – Имя параметра в объекте
	 * `value` – Функция формирования значения - `(row, rows) => { return {} }`
	 * `validate` – Функция проверки значения - `(row, rows) => { return <Bool> }`
	 * Параметра **validate** работает **только** для модельного окна тип `select`.
	 * Validate можно наложить на любое кол-во полей объекта и если хотя бы один `validate` === `false`, то исключает строку из добавления.
	 */
	customFields: PropTypes.arrayOf(PropTypes.object),

	/**
	 * Данный параметр (props) позволяет добавить или переопределить пропсы для колонок, которые заданы конфигурацией на сервере
	 * `customColumnProps` - массив объектов `props` к `columns`. Один объект описывает доп. параметры для одной колонки
	 * ```json
	 * [
	 * 	{
	 * 		name: <String>,
	 * 		cellRenderer: <func>,
	 * 		...advancedColProps
	 * 	}
	 * ]
	 * ```
	 * `name` – key колонки к которой надо применить дополнительные пропсы
	 * `cellRenderer` – `({ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) => return <ReactNode>`
	 * `advancedColProps` – подолнительные свойства колонок тут -> [Column](https://autodesk.github.io/react-base-table/api/column)
	 */
	customColumnProps: PropTypes.arrayOf(PropTypes.object),

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
		leftCustomSideElement: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),

		/** Центральный кастомный элемент командной панели */
		centerCustomSideElement: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),

		/** Правый кастомный элемент командной панели */
		rightCustomSideElement: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),
	}),

	/** Высота заголовка таблицы */
	headerHeight: PropTypes.number,

	/** Высота строки таблицы */
	rowHeight: PropTypes.number,

	/** Custom row renderer
	 * Параметры - `({ isScrolling, cells, columns, rowData, rowIndex, depth })` */
	rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

	/** Строки будут в зебро-стиле */
	zebraStyle: PropTypes.bool,

	/** Высота расширения */
	estimatedRowHeight: PropTypes.number,

	/** Отображать ли разделители ячеек в строке */
	cellBordered: PropTypes.bool,

	/** Отобрадать ли разделители строк */
	rowBordered: PropTypes.bool,

	className: PropTypes.string,

	style: PropTypes.object,

	/**
	 * LOAD DATA PROPS
	 * */

	/** Порог в пикселях для вызова _onLoad.
	 * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
	loadThreshold: PropTypes.number,

	/** Размер страницы */
	pageSize: PropTypes.number,

	/** Функция запроса для конфигурации */
	requestLoadConfig: PropTypes.func,

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

	/** Родительский узел и дочерние узлы связаны (Работает только при `selectable`) */
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

	/** Событие при клике на строку (только при `selectable` = `false`)
	 * `({selected, rowData, rowIndex}) => {}` */
	onRowClick: PropTypes.func,

	/** Событие при двойном клике на строку.
	 * `({rowData, rowIndex, rowKey}) => {}` */
	onRowDoubleClick: PropTypes.func,

	/** События при открытии / закрытии ноды
	 * `({ expanded, rowData, rowIndex, rowKey }) => {}` */
	onRowExpand: PropTypes.func,

	/** Событие при выборе строки.
	 * `([rowKeys], [rowDatas]) => {}` */
	onSelectedRowsChange: PropTypes.func,

	/** События при открытии / закрытии ноды
	 * `(expandedRowKeys) => {}` - массив ключей открытых нод */
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
	infinityMode: false,
	editMode: false,
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
	headerHeight: 36,
	rowHeight: 36,
	zebraStyle: false,
	estimatedRowHeight: undefined,
	cellBordered: false,
	rowBordered: true,
	className: "",
	style: {},

	loadThreshold: 300,
	pageSize: 50,
	requestLoadRows: undefined,
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

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);