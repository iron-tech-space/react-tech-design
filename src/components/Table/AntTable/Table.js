import React, { useState, useEffect } from "react";
import { rtPrefix } from "../../utils/variables";
import { connect } from "react-redux";
import { AutoResizer } from "react-base-table";
import {
    findNodeByRowKey,
    flatten,
    getObjectExcludedProps, getTableRowKeys, getTableRowObjects, noop,
    notificationError,
    useMounted
} from "../../utils/baseUtils";
import { Space, Table as AntTable } from "antd";
import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined } from "@ant-design/icons";
import { empty, overlay } from "../ReactBaseTable/defaultSettings";
import HeaderCell from "./HeaderCell";
import HeaderRow from "./HeaderRow";
import PropTypes from "prop-types";
import FormItems from "../../Form/FormItems";
import moment from "moment";
import BodyCell from "./BodyCell";
import { getExtraData, mapDispatchToProps, mapStateToProps } from "../../utils/storeUtils";

const excludeProps = [
    "defaultRows",
    "defaultSelectedRowKeys",
    "defaultSearchValue",
    "defaultFilter",
    "defaultSortBy",
    "rows",
    "requestLoadRows",
    "pageSize",
    "searchParamName",
    "onRowClick",
    "onRowDoubleClick",
    "nullDash",
];

const Table = props => {
    /** Индикатор загрузки данных */
    const [loading, setLoading] = useState(false);

    /** TABLE STATES */
    /** Столбцы таблицы */
    const [_columns, _setColumns] = useState([]);
    /** Строки таблицы */
    const [_rows, _setRows] = useState([]);
    /** Ключи выделенных строк */
    const [_selectedRowKeys, setSelectedRowKeys] = useState([]);
    /** Значение строки поиска */
    const [_searchValue, setSearchValue] = useState("");
    /** Объект фильтра */
    const [_filter, setFilter] = useState({});
    /** Объект соритировки */
    const [_sortBy, setSortBy] = useState({});

    /** TREE STATES */
    /** Ключи строк с кубиками при selectable = true */
    // const [_indeterminateRowKeys, setIndeterminateRowKeys] = useState([]);
    /** Ключи раскрытых строк при selectable = true */
    const [_expandedRowKeys, setExpandedRowKeys] = useState([]);

    /** FOOTER STATES */
    /** Отображать ли footer */
    const [_footerShow, _setFooterShow] = useState(false);
    /** Всего строк по фильтру в таблице */
    const [_totalCountRows, setTotalCountRows] = useState(0);

    const [subscribeProps, setSubscribeProps] = useState({});

    const [headerHeight, setHeaderHeight] = useState(0);

    const isMounted = useMounted();

    const {
        /** Required */
        columns,
        // type,
        // infinityMode, // no use
        editMode, // need Props.types

        /** Def values */
        defaultRows,
        defaultSelectedRowKeys,
        defaultSearchValue,
        defaultFilter,
        defaultSortBy,

        /** Outdoor control */
        rows,
        // setRows, // ???
        // selectedRowKeys,
        // searchValue,
        // filter,
        // sortBy,

        /** Base Props */
        rowKey,
        customFields,

        /** View Props */
        // empty,
        // overlay,
        // fixWidthColumn,
        // footerProps,
        // headerHeight,
        // rowHeight,
        // rowRenderer,
        zebraStyle,
        // estimatedRowHeight,
        className,
        style,
        // cellBordered, // need Props.types
        // rowBordered,  // need Props.types

        /** Load Data Props */
        pageSize,
        requestLoadRows,
        requestLoadCount,
        searchParamName,

        /** Selectable Props */
        rowSelection,
        selectable,

        /** Tree Props */
        expandable,
        nodeAssociated,
        expandColumnKey,
        expandDefaultAll,
        // expandLazyLoad, // no use
        // expandParentKey, // no use

        /** Events */
        onRowClick,
        onRowDoubleClick,
        // onRowExpand,
        // onSelectedRowsChange,
        onExpandedRowsChange,

        /** SELECTED PANEL */
        // showSelection,
        // rowRenderShowSelection,

        /** REDUX PROPS */
        dispatchPath,
        dispatch,
        subscribe,

        value,
        onChange
    } = { ...props, ...subscribeProps };

    const footerProps = {
        ...Table.defaultProps.footerProps,
        ...props.footerProps
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
        if (defaultRows.length > 0) _setRowsHandler(defaultRows);
        else if (rows.length > 0) _setRowsHandler(rows);
        if (selectable && props.value && props.value.length > 0)
            _setSelectedRowsHandler(props.value.map(item => item[rowKey]), props.value);
        else
            _setSelectedRowsHandler(defaultSelectedRowKeys, undefined, defaultRows);
        setSearchValue(defaultSearchValue);
        setFilter(defaultFilter);
        setSortBy(defaultSortBy);

        // Определение нужно ли отображать подвал
        _setFooterShow(
            (footerProps.showElements.length ||
                footerProps.leftCustomSideElement ||
                footerProps.centerCustomSideElement ||
                footerProps.rightCustomSideElement));

        _loadRows({
            sortBy: defaultSortBy,
            filter: defaultFilter,
            searchLine: defaultSearchValue,
            reload: true
        });
        // console.log("tableRef", tableRef);
    }, []);

    useEffect(() => {
        _setColumns(columns);
    }, [columns]);

    useEffect(() => {
        if(value && Array.isArray(value) && !requestLoadRows)
            _setRowsHandler(value)
    }, [value])

    /** Подписка на изменение props[subscribe.name] в сторе */
    subscribe.map(item => {
        return useEffect(() => {
            if ((item.withMount || isMounted) && item.name) {
                // console.log("Table => useEffect => ", props); //item.name, props[item.name]
                const onChangeObject = {
                    value: props[item.name],
                    extraData: getExtraData(item, props), //props[`${item.name}ExtraData`],
                    reloadTable: reloadData,
                    addRows: _addRows,
                    addRow: _addRow,
                    addRowAsCopy: _addRowAsCopy,
                    editRow: _editRow,
                    removeRow: _removeRow,
                    moveUpRow: _moveUpSelectedRow,
                    moveUpRowByKey: _moveUpRowByKey,
                    moveDownRow: _moveDownSelectedRow,
                    moveDownRowByKey: _moveDownRowByKey,
                    setSubscribeProps: _setSubscribeProps
                };
                item.onChange && item.onChange(onChangeObject);
            }
        }, [props[item.name]]);
    });

    /** BASE FUNCTIONS */
    const _setSubscribeProps = (props) => {
        setSubscribeProps({ ...subscribeProps, ...props });
    };

    const _setLoadedRowsHandler = (rows) => {
        _setRowsHandler(rows);
        // !selectable && onChange && onChange(rows);
    };
    const _setRowsHandler = (rows) => {
        // console.log('_setRowsHandler onChange');
        _setRows(rows);
        // setRows(rows);
        rowsDispatch(rows);
    };

    const _setSelectedRowsHandler = (selectedKeys = [], selectedObjects = undefined, rows = []) => {
        // console.log('_setSelectedRowsHandler => ', selectedKeys)
        if(!editMode) {
            setSelectedRowKeys(selectedKeys);
            if (selectedKeys.length === 0)
                if (selectable)
                    selectedDispatch([]);
                else
                    selectedDispatch(undefined);
            else if (selectedKeys.length > 0 && !selectedObjects)
                if (selectable)
                    selectedDispatch(flatten(getTableRowObjects(rows, rowKey)).filter((item) => selectedKeys.includes(item[rowKey])));
                else
                    selectedDispatch(findNodeByRowKey(rows, rowKey, selectedKeys[0]));
            else
                selectedDispatch(selectedObjects);
        }
    };

    const rowsDispatch = (rows) => {
        // console.log('rowsDispatch ', rowsDispatchPath);
        rowsDispatchPath && props.setDataStore && props.setDataStore(rowsDispatchPath, rows);
        !selectable && onChange && onChange(rows);
    };

    const selectedDispatch = (data) => {
        selectedDispatchPath && props.setDataStore && props.setDataStore(selectedDispatchPath, data);
        selectable && onChange && onChange(data);
    };

    const onTableEventsDispatch = (nameEvent, value) => {
        const dp = dispatch && dispatch.path
            ? `${dispatch.path}.events.${nameEvent}`
            : dispatchPath && `${dispatchPath}.events.${nameEvent}`;

        dp && props.setDataStore && props.setDataStore(dp, {
            timestamp: moment(),
            value: value
        });
        // console.log('onTableEventsDispatch onChange');
        Array.isArray(value) && onChange && onChange(value);
    };

    const reloadData = ({ sortBy, filter, searchValue }, appendParams) => {
        // console.log("reloadData params ", sortBy, filter, searchValue, loading);
        if (selectable && props.value && props.value.length > 0)
            _setSelectedRowsHandler(props.value.map(item => item[rowKey]), props.value);
        else
            _setSelectedRowsHandler();

        const __sortBy = appendParams ? (sortBy ? sortBy : _sortBy) : sortBy;
        const __filter = appendParams ? { ..._filter, ...filter } : filter;
        const __searchValue = appendParams ? (searchValue ? searchValue : _searchValue) : searchValue;
        setSortBy(__sortBy);
        setFilter(__filter);
        setSearchValue(__searchValue);
        // console.log("reloadData params ", sortBy, filter, searchValue, loading);
        _loadRows({
            sortBy: __sortBy,
            filter: __filter,
            searchLine: __searchValue,
            reload: true
        });
    };

    const _loadRows = (params) => {
        const { sortBy, filter, searchLine, expandRow, reload } = params;
        if (!loading && requestLoadRows) {
            setLoading(true);
            const pageNum = 0;
            const params = {
                page: 0,
                size: pageSize,
                sort:
                    sortBy && sortBy.key
                        ? sortBy.key + "," + sortBy.order
                        : null
            };
            const dataQuery = {
                ...filter,
                ...(searchLine
                    ? { [searchParamName]: searchLine }
                    : null)
            };
            if(reload && requestLoadCount !== noop && !expandColumnKey) {
                requestLoadCount({ params, data: dataQuery, })
                    .then((response) => {
                        // console.log("infinity then response", response);
                        setTotalCountRows(response.data);
                    })
                    .catch(error =>
                        notificationError(error, 'Ошибка получения количества записей по фильтру') );
            }
            requestLoadRows({ params, data: dataQuery })
                .then((response) => {
                    // console.log("infinity then response", response);
                    const result = response.data;
                    _setLoadedRowsHandler(result); // _setRows

                    if (expandColumnKey) {
                        expandDefaultAll &&
                        setExpandedRowKeys(flatten(getTableRowKeys(result, rowKey)));
                    }

                    setLoading(false);
                })
                .catch((error) => {
                    notificationError(error, "Ошибка загрузки данных");
                    _setLoadedRowsHandler(_rows); // _setRows
                    // setHasMore(false);
                    setLoading(false);
                });
        }
    };

    const onChangeTable = (pagination, filters, sorter, extra) => {
        // console.log('Table onChange', pagination, filters, sorter, extra)
        switch (extra.action) {
            case "paginate":
                break;
            case "sort":
                onSort(sorter);
                break;
            case "filter":
                break;
            default:
                break;
        }
    };

    const onSort = (sorter) => {
        // console.log("Table onSort from RT", sorter);
        const sortBy = sorter.order
            ? { key: sorter.field, order: sorter.order === "ascend" ? "asc" : "desc" }
            : {};
        setSortBy(sortBy);
        _loadRows({
            sortBy: sortBy,
            filter: _filter,
            searchLine: _searchValue,
            reload: true
        });
    };

    const _onRowClick = ({ rowData, rowIndex, rowKey }) => {
        // console.log('onClick', onRowClick, rowData, rowIndex, rowKey)
        // console.log('onClick', _selectedRowKeys)
        onTableEventsDispatch("onRowClick", rowData);
        _rowSelectAfterClick({ rowData, rowIndex, rowKey, onClick: onRowClick });
    };
    const _onRowDoubleClick = ({ rowData, rowIndex, rowKey }) => {
        // console.log('onDoubleClick', onRowDoubleClick, rowData, rowIndex, rowKey);
        // console.log('actionDoubleClick')
        onTableEventsDispatch("onRowDoubleClick", rowData);
        _rowSelectAfterClick({ rowData, rowIndex, rowKey, onClick: onRowDoubleClick });
    };

    const _rowSelectAfterClick = ({ rowData, rowIndex, rowKey, onClick }) => {
        const checked = !_selectedRowKeys.includes(rowKey);
        const newRowObject = {
            rowData: { ...rowData },
            rowIndex: rowIndex,
            rowKey: rowKey
        };
        // _setSelectedRowsHandler([rowKey], rowData);
        // if (!expandColumnKey) {
        // setSelectedRowKeys([rowKey]);
        if (selectable) {
            // console.log('_rowSelectAfterClick ', checked);
            if (checked && !expandColumnKey)
                _setSelectedRowsHandler([..._selectedRowKeys, rowKey], undefined, _rows);
            else {
                // console.log('_rowSelectAfterClick', _selectedRowKeys.filter(row => row !== rowKey), rowKey);
                _setSelectedRowsHandler(_selectedRowKeys.filter(row => row !== rowKey), undefined, _rows);
            }

        } else {
            if(checked)
                _setSelectedRowsHandler([rowKey], rowData);
        }
        // onSelectedRowsChange([rowKey], [rowData]);
        // console.log('onRowDoubleClick = ', onClick);
        onClick && onClick({ selected: checked, ...newRowObject });
    };

    const onHeaderRowProps = () => ({ headerHeight, setHeaderHeight })

    const onRowEvents = (rowData, rowIndex) => {
        return {
            onClick: event => _onRowClick({ rowData, rowIndex, rowKey: rowData[rowKey] }), // click row
            onDoubleClick: event => _onRowDoubleClick({ rowData, rowIndex, rowKey: rowData[rowKey] }), // double click row
            // onScroll: console.log
            // onContextMenu: event => {}, // right button click row
            // onMouseEnter: event => {}, // mouse enter row
            // onMouseLeave: event => {}, // mouse leave row
        };
    };


    const onResizeHandler = (index) => ({ key }, width) => {
        // console.log('handleResize index ', index, width)
        _setColumns((columns) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: width
            };
            return nextColumns;
        });
    };

    /** Utile function
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

    /** ROW CHANGE FUNCTIONS */
    const _addRows = (rows) => {
        let saveRows = [...rows];
        if(!expandColumnKey)
            saveRows = saveRows.map(row => { row.children = undefined; return row; });
        if (customFields) {
            // Фильтрация по пользовательским параметрам
            saveRows = saveRows.filter((sRow) => {
                let isValid = [];
                customFields.forEach((field) => {
                    // Валидация по пользовательской логике функции validate
                    if (field.validate)
                        isValid.push(field.validate(sRow, _rows));

                    // Создание или переобразование по пользовательской логике функции value
                    if (field.value)
                        sRow[field.name] = field.value(sRow, _rows);
                });
                // console.log("_addRows isValid", isValid);
                if (!isValid.includes(false))
                    return sRow;
            });
        }
        const _localRows = [..._rows, ...saveRows];
        _setRowsHandler(_localRows);
        onTableEventsDispatch("onAddRows", _localRows);
    };

    const _addRow = (row) => {
        let _row = { ...row };
        if(!expandColumnKey)
            _row.children = undefined;
        let isValid = true;
        if (customFields) {
            let validations = [];
            customFields.forEach((field) => {
                if (field.validate)
                    validations.push(field.validate(_row, _rows));

                if (field.value)
                    _row[field.name] = field.value(_row, _rows);
            });
            isValid = !validations.includes(false);
        }
        if (isValid) {
            const _localRows = [..._rows, _row];
            _setRowsHandler(_localRows);
            onTableEventsDispatch("onAddRow", _localRows);
        }
    };

    const _addRowAsCopy = () => {
        // console.log("_onClickAddAsCopy", selectedRow);
        const _localRows = [..._rows, findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])];
        _setRowsHandler(_localRows);
        onTableEventsDispatch("onAddRowAsCopy", _localRows);

    };

    const _editRow = (row) => {
        // console.log("_onClickEdit", selectedRow);
        const data = [..._rows];
        const key = row[rowKey];
        loop(data, key, (item, index, arr) => {
            data[index] = row;
            _setRowsHandler(data);
            _setSelectedRowsHandler(_selectedRowKeys, undefined, data);
            onTableEventsDispatch("onEditRow", data);
        });
    };

    const _removeRow = (event) => {
        // console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
        const _localRows = _rows.filter(
            (item) => !_selectedRowKeys.includes(item[rowKey]));
        _setRowsHandler(_localRows);
        _setSelectedRowsHandler();
        onTableEventsDispatch("onRemoveRow", _localRows);
    };

    const _moveUpSelectedRow = () => {
        _moveUpRowByKey(_selectedRowKeys[0])
    }

    const _moveUpRowByKey = (rowKey) => {
        const data = [..._rows];
        loop(data, rowKey, (item, index, arr) => {
            const newRowIndex = _getNewIndexRow(index, index - 1);
            _changeIndexRow(index, newRowIndex, arr, data, "onMoveUpRow");
        });
    };

    const _moveDownSelectedRow = () => {
        _moveDownRowByKey(_selectedRowKeys[0])
    }

    const _moveDownRowByKey = (rowKey) => {
        const data = [..._rows];
        loop(data, rowKey, (item, index, arr) => {
            const newRowIndex = _getNewIndexRow(index, index + 1);
            _changeIndexRow(index, newRowIndex, arr, data, "onMoveDownRow");
        });
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

    /** TREE FUNCTIONS */
    const _onExpandedRowsChange = (expandedRowKeys) => {
        setExpandedRowKeys(expandedRowKeys);
        onExpandedRowsChange(expandedRowKeys);
    };

    /** SELECTABLE FUNCTIONS */
    const onChangeSelectedHandler = (selectedRowKeys, selectedRows) => {
        // console.log("onChangeSelectedHandler");
        _setSelectedRowsHandler(selectedRowKeys, selectedRows);
    };

    const onSelectAllHandler = (selected, selectedRows, changeRows) => {
        // console.log("onSelectAllHandler");
        const selectedKeys = selected ? selectedRows.map(row => row[rowKey]) : [];
        _setSelectedRowsHandler(selectedKeys, selectedRows);
    };

    /** VIEW FUNCTIONS */
    const _rowClassName = (rowData, rowIndex) => {
        // const {rowClassName} = props;
        return [
            // rowClassName,
            _selectedRowKeys.includes(rowData[rowKey]) && "ant-table-row-selected", //
            zebraStyle ? (rowIndex % 2 === 0 ? "even" : "odd") : ""
            // rowBordered ? 'bordered' : ''
        ].join(" ");
    };

    const ExpandIcon = ({ Icon, ...restProps }) =>
        <span {...restProps} className={`${rtPrefix}-table-expand-icon`}><Icon /></span>;

    const expandIconRender = ({ expanded, onExpand, record }) =>
        record.children && record.children.length === 0
            ? <ExpandIcon Icon={CaretUpOutlined} style={{ visibility: "hidden" }} />
            : expanded
            ? <ExpandIcon Icon={CaretDownOutlined} onClick={e => onExpand(record, e)} />
            : <ExpandIcon Icon={CaretRightOutlined} onClick={e => onExpand(record, e)} />;

    const _footer = (currentPageData) => {
        // console.log('_footer => ', currentPageData);
        return (
            _footerShow ? (
                <div style={{display: 'flex', flex: 'auto', height: `${footerProps.height}px`}}>
                    {/*className={'BaseTable__footer__counter'}>*/}
                    <div key={"footer-left-custom-side"} className={`${rtPrefix}-footer-left-custom-side`}>
                        {footerProps.leftCustomSideElement
                            ? Array.isArray(footerProps.leftCustomSideElement)
                                ? <FormItems items={footerProps.leftCustomSideElement} />
                                : <footerProps.leftCustomSideElement />
                            : null}
                    </div>
                    <div key={"footer-center-custom-side"} className={`${rtPrefix}-footer-center-custom-side`}>
                        {footerProps.centerCustomSideElement
                            ? Array.isArray(footerProps.centerCustomSideElement)
                                ? <FormItems items={footerProps.centerCustomSideElement} />
                                : <footerProps.centerCustomSideElement />
                            : null}
                    </div>
                    <div key={"footer-right-custom-side"} className={`${rtPrefix}-footer-right-custom-side`}>
                        {footerProps.rightCustomSideElement
                            ? Array.isArray(footerProps.rightCustomSideElement)
                                ? <FormItems items={footerProps.rightCustomSideElement} />
                                : <footerProps.rightCustomSideElement />
                            : null}
                    </div>
                    <div className={`${rtPrefix}-footer-right-system-side`}>
                        <Space>
                            {selectable ? (
                                <React.Fragment>
                                    {footerProps.showElements.includes("selected")
                                        ? <span>{footerProps.selectedTitle} {_selectedRowKeys.length}</span>
                                        : null}
                                    {footerProps.showElements.includes("loaded")
                                        ? <span>{footerProps.loadedTitle} {flatten(getTableRowKeys(_rows, rowKey)).length}</span>
                                        : null}
                                </React.Fragment>
                            ) : null}

                            {footerProps.showElements.includes("total")
                                ? requestLoadCount !== noop && !expandColumnKey
                                    ? <span>{footerProps.totalTitle} {_totalCountRows}</span>
                                    : <span>{footerProps.totalTitle} {flatten(getTableRowKeys(_rows, rowKey)).length}</span>
                                : null}
                        </Space>
                    </div>
                </div>
            ) : undefined
        );
    };

    const getColumns = () => {
        return _columns.map((col, index) => ({
            ...col,
            onHeaderCell: (column) =>
                ({
                    column,
                    // resizable: column.resizable,
                    // width: column.width,
                    onResize: onResizeHandler(index)
                })
        }));
    };

    const restProps = getObjectExcludedProps(props, excludeProps);
    const expandableProps = expandColumnKey
        ? {
            defaultExpandAllRows: expandDefaultAll,
            expandIcon: expandIconRender,
            ...expandable,
            expandedRowKeys: _expandedRowKeys,
            onExpandedRowsChange: _onExpandedRowsChange
        } : {};

    const rowSelectionProps = selectable
        ? {
            type: "checkbox",
            fixed: true,
            checkStrictly: !nodeAssociated,
            selectedRowKeys: _selectedRowKeys,
            onChange: onChangeSelectedHandler,
            onSelectAll: onSelectAllHandler,
            ...rowSelection
        } : undefined;

    return (
        <div className={`${rtPrefix}-table ${className}`} style={style}>
            <div className={`${rtPrefix}-baseTable`}>
                <AutoResizer
                    // onResize={({ height, width }) => {setHeight(height); setWidth(width)} }
                >
                    {({ height, width }) => (
                        <div style={{ width: width, height: height }}>
                            <AntTable
                                {...restProps}

                                /** Required */
                                columns={getColumns()}
                                dataSource={_rows}
                                // scroll={{ x: width, y: height - headerHeight }} // 16 (paddings) + 2 + 2 borders
                                scroll={{ y: height - headerHeight - (_footerShow ? (footerProps.height + 20) : 0) }}
                                pagination={{ position: ["none", "none"], ...restProps.pagination, pageSize: _rows.length }}

                                /** Base Props */
                                loading={loading}

                                /** Tree Props */
                                expandable={{ ...expandableProps }}
                                /** Selection Props */
                                rowSelection={rowSelectionProps}

                                /** View Props */
                                rowClassName={_rowClassName}
                                footer={_footerShow ? _footer : undefined}
                                components={{
                                    header: {
                                        row: HeaderRow,
                                        cell: HeaderCell
                                    },
                                    body: {
                                        cell: BodyCell,
                                    }
                                }}

                                /** Events */
                                onChange={onChangeTable}
                                onHeaderRow={onHeaderRowProps}
                                onRow={onRowEvents}
                            />
                        </div>
                    )}
                </AutoResizer>
            </div>
        </div>
    );
};

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

    /** Содержимое ячейки при значении null */
    nullDash: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),

    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.object,

    /** Сортировка по умолчанию */
    defaultSortBy: PropTypes.shape({
        /** Ключ поля для сортировки */
        key: PropTypes.string,
        /** Направление сортировки */
        order: PropTypes.oneOf(["asc", "desc"])
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
        order: PropTypes.oneOf(["asc", "desc"])
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
     *  {
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
     *  {
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
        rightCustomSideElement: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)])
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
        PropTypes.string
    ]),

    /** Путь в сторе куда класть выбранную строку таблицы */
    dispatchPath: PropTypes.string,

    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.arrayOf(PropTypes.object)
};


Table.defaultProps = {
    size: "small",
    bordered: true,
    infinityMode: false,
    editMode: false,
    defaultRows: [],
    defaultSelectedRowKeys: [],
    defaultSearchValue: "",
    defaultFilter: {},
    defaultSortBy: {},

    rows: [],
    setRows: noop,
    selectedRowKeys: [],
    searchValue: "",
    filter: {},
    sortBy: {},

    rowKey: "id",
    nullDash: "---",

    empty: empty,
    overlay: overlay,
    fixWidthColumn: false,
    footerProps: {
        height: 30,
        showElements: [],
        selectedTitle: "Выделено:",
        loadedTitle: "Загружено записей:",
        totalTitle: "Всего записей:",
        leftCustomSideElement: null,
        centerCustomSideElement: null,
        rightCustomSideElement: null
    },
    headerHeight: 30,
    rowHeight: 30,
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
    searchParamName: "searchLine",

    selectable: false,

    nodeAssociated: true,
    expandColumnKey: undefined,
    expandDefaultAll: true,
    expandLazyLoad: false,
    expandParentKey: "parentId",

    onRowClick: noop,
    onRowDoubleClick: noop,
    onRowExpand: noop,
    onSelectedRowsChange: noop,
    onExpandedRowsChange: noop,

    showSelection: false,

    dispatchPath: undefined,
    subscribe: []
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);

