var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { forwardRef, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { rtPrefix } from '../utils/variables';
import BaseTable, { AutoResizer, callOrReturn, Column } from 'react-base-table';
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import { noop, notificationError } from "../utils/baseUtils";
import SelectionHead from "../deprecated/Table/Selectable/SelectionHead";
import SelectionCell from "../deprecated/Table/Selectable/SelectionCell";

var defaultProps = {

    config: undefined,
    customColumnProps: [],

    requestLoadConfig: noop,
    requestLoadRows: noop,
    requestLoadCount: noop,
    loadThreshold: 300,
    pageSize: 50,

    dispatchPath: undefined,
    subscribe: {},

    defaultFilter: {},

    rowKey: 'id',

    selectable: false,

    nodeAssociated: true,
    expandColumnKey: undefined,
    expandDefaultAll: true,
    expandLazyLoad: false,
    expandParentKey: 'parentId'
};

var Table = forwardRef(function (props, ref) {
    var baseTableRef = useRef();

    /** Конфигурация таблицы */

    var _useState = useState({}),
        _useState2 = _slicedToArray(_useState, 2),
        tableConfig = _useState2[0],
        setTableConfig = _useState2[1];

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

    /** Колонки таблицы */
    // const [_columns, _setColumns] = useState([]);
    /** Данные таблицы */


    var _useState7 = useState([]),
        _useState8 = _slicedToArray(_useState7, 2),
        _rows = _useState8[0],
        _setRows = _useState8[1];
    /** Ключи выделенных строк */


    var _useState9 = useState([]),
        _useState10 = _slicedToArray(_useState9, 2),
        _selectedRowKeys = _useState10[0],
        _setSelectedRowKeys = _useState10[1];

    /** Selectable States */


    var _useState11 = useState(false),
        _useState12 = _slicedToArray(_useState11, 2),
        _selectAll = _useState12[0],
        _setSelectAll = _useState12[1];

    /** Tree States */


    var _useState13 = useState([]),
        _useState14 = _slicedToArray(_useState13, 2),
        _indeterminateRowKeys = _useState14[0],
        _setIndeterminateRowKeys = _useState14[1];

    var _useState15 = useState([]),
        _useState16 = _slicedToArray(_useState15, 2),
        _expandedRowKeys = _useState16[0],
        _setExpandedRowKeys = _useState16[1];

    var _defaultProps$props = _extends({}, defaultProps, props),
        config = _defaultProps$props.config,
        customColumnProps = _defaultProps$props.customColumnProps,
        requestLoadConfig = _defaultProps$props.requestLoadConfig,
        requestLoadRows = _defaultProps$props.requestLoadRows,
        requestLoadCount = _defaultProps$props.requestLoadCount,
        loadThreshold = _defaultProps$props.loadThreshold,
        pageSize = _defaultProps$props.pageSize,
        dispatchPath = _defaultProps$props.dispatchPath,
        subscribe = _defaultProps$props.subscribe,
        defaultFilter = _defaultProps$props.defaultFilter,
        rowKey = _defaultProps$props.rowKey,
        selectable = _defaultProps$props.selectable,
        nodeAssociated = _defaultProps$props.nodeAssociated,
        expandColumnKey = _defaultProps$props.expandColumnKey,
        expandDefaultAll = _defaultProps$props.expandDefaultAll,
        expandLazyLoad = _defaultProps$props.expandLazyLoad,
        expandParentKey = _defaultProps$props.expandParentKey;

    var selectedDispatchPath = dispatchPath && dispatchPath + ".selected";
    var rowsDispatchPath = dispatchPath && dispatchPath + ".rows";

    var selectColumn = {
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
        selectAll: _selectAll,
        onSelectAll: _onSelectAllHandler
    };

    /** Config Loader */
    useEffect(function () {
        var cleanupFunction = false;
        var loadData = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (requestLoadConfig) {
                                    // console.log('requestLoadConfig => ', typeof requestLoadConfig);
                                    // console.log('requestLoadRows => ', typeof props.requestLoadRows);
                                    requestLoadConfig().then(function (response) {
                                        // let result = response.data;
                                        // console.log('requestLoadConfig -> ', response.data);
                                        if (!cleanupFunction) {
                                            // setTableConfig(response.data);
                                            parseTableConfig(response.data);
                                        }
                                    }).catch(function (error) {
                                        return notificationError(error, 'Ошибка получения конфигурации');
                                    });
                                } else {
                                    if (!cleanupFunction) {
                                        // setTableConfig(config);
                                        parseTableConfig(config);
                                    }
                                }

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this);
            }));

            return function loadData() {
                return _ref.apply(this, arguments);
            };
        }();
        loadData().then(function (r) {
            return r;
        });
        return function () {
            return cleanupFunction = true;
        };
    }, []);

    /** BASE FUNCTIONS */

    var parseTableConfig = function parseTableConfig(config) {
        var _columns = [];
        if (config && config.fields) {
            _columns = config.fields.map(function (item) {
                var colProps = customColumnProps && customColumnProps.find(function (render) {
                    return render.name === item.name || render.name === item.alias;
                });
                return _extends({
                    key: item.name,
                    title: item.header ? item.header : item.name,
                    dataKey: item.alias ? item.alias : item.name,
                    align: item.align,
                    width: item.width,
                    resizable: item.resizable,
                    sortable: item.sortable,
                    hidden: !item.visible
                }, colProps, {
                    cellRenderer: function cellRenderer(object) {
                        if (colProps && colProps.cellRenderer) return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';else return object.cellData ? object.cellData : '---';
                    }
                });
            });
        }

        if (selectable) _columns.unshift(selectColumn);

        var _defaultFilter = void 0;
        if (config && config.hierarchical && config.hierarchyLazyLoad) {
            var parentKey = config.hierarchyField ? config.hierarchyField.split('/')[1] : expandParentKey;
            _defaultFilter = _extends({}, defaultFilter, _defineProperty({}, parentKey, null));
        } else _defaultFilter = defaultFilter;

        setTableConfig({
            columns: _columns,
            defaultFilter: _defaultFilter,
            rowKey: config && config.hierarchical && config.hierarchyField ? config.hierarchyField.split('/')[0] : rowKey,
            expandParentKey: config && config.hierarchical && config.hierarchyField ? config.hierarchyField.split('/')[1] : expandParentKey,
            expandColumnKey: config && config.hierarchical && config.hierarchyView ? config.hierarchyView : expandColumnKey,
            expandLazyLoad: config && config.hierarchical && config.hierarchyLazyLoad ? config.hierarchyLazyLoad : expandLazyLoad,
            pageSize: config && config.hierarchical ? 1 : pageSize
        });
    };

    var _setRowsHandler = function _setRowsHandler(rows) {
        _setRows(rows);
        rowsDispatch(rows);
    };
    var rowsDispatch = function rowsDispatch(rows) {
        rowsDispatchPath && props.setDateStore && props.setDateStore(rowsDispatchPath, rows);
    };

    return React.createElement(
        "div",
        { className: rtPrefix + "-table" },
        React.createElement(
            AutoResizer,
            null,
            function (_ref2) {
                var width = _ref2.width,
                    height = _ref2.height;
                return React.createElement(BaseTable, {
                    ref: baseTableRef
                    /** Required */
                    , columns: tableConfig.columns,
                    data: _rows
                    /** Control Props */
                    , sortBy: _sortBy
                    /** Base Props */
                    , width: width,
                    height: height,
                    rowKey: tableConfig.rowKey
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
                    onEndReached: type === 'infinity' ? onEndReached : undefined,
                    disabled: loading
                    /** Tree Props */
                    , expandColumnKey: tableConfig.expandColumnKey,
                    expandedRowKeys: _expandedRowKeys
                    /** Events */
                    , onColumnSort: _onColumnSort,
                    rowEventHandlers: _rowEventHandlers,
                    onExpandedRowsChange: _onExpandedRowsChange,
                    onRowExpand: _onRowExpand
                });
            }
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

    /** Конфигурация таблицы */
    config: PropTypes.object,

    /** Дополнительные пропсы для колонок */
    customColumnProps: PropTypes.arrayOf(PropTypes.object),

    /** Функция запроса на получение конфига для таблицы */
    requestLoadConfig: PropTypes.func,

    /** Функция запроса для загрузки данных */
    requestLoadRows: PropTypes.func,

    /** Функция запроса для загрузки количества данных */
    requestLoadCount: PropTypes.func,

    /** Порог в пикселях для вызова _onLoad.
     * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
    loadThreshold: PropTypes.number,

    /** Размер страницы */
    pageSize: PropTypes.number,

    /** Путь в сторе куда класть выбранную строку таблицы */
    dispatchPath: PropTypes.string,

    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.object,

    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.object,

    /**
     * BASE PROPS
     * */

    /** Поле для уникальной идентификации строки */
    rowKey: PropTypes.string,

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
    expandParentKey: PropTypes.string

};

var mapStateToProps = function mapStateToProps(store, ownProps) {
    var subscribe = ownProps.subscribe;

    if (subscribe) {
        var name = subscribe.name,
            path = subscribe.path;

        if (name && path) return _defineProperty({}, name, objectPath.get(store, path));
    }

    return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);