var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { useEffect, useState } from "react";
import { noop, notificationError } from "../../utils/baseUtils";
import Table from "./Table";

var defaultProps = {
    defaultFilter: {},
    rowKey: "id",
    pageSize: 50,
    requestLoadConfig: noop,
    expandColumnKey: undefined,
    expandLazyLoad: false,
    expandParentKey: "parentId",
    customColumnProps: []
};

var ConfigLoader = function ConfigLoader(props) {

    /** Конфигурация таблицы */
    var _useState = useState(undefined),
        _useState2 = _slicedToArray(_useState, 2),
        tableConfig = _useState2[0],
        setTableConfig = _useState2[1];

    var _defaultProps$props = _extends({}, defaultProps, props),
        defaultFilter = _defaultProps$props.defaultFilter,
        defaultSortBy = _defaultProps$props.defaultSortBy,
        rowKey = _defaultProps$props.rowKey,
        pageSize = _defaultProps$props.pageSize,
        requestLoadConfig = _defaultProps$props.requestLoadConfig,
        expandColumnKey = _defaultProps$props.expandColumnKey,
        expandParentKey = _defaultProps$props.expandParentKey,
        customColumnProps = _defaultProps$props.customColumnProps,
        fixWidthColumn = _defaultProps$props.fixWidthColumn,
        selectable = _defaultProps$props.selectable;

    useEffect(function () {
        var cleanupFunction = false;
        var loadData = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (requestLoadConfig) {
                                    // console.log("requestLoadConfig => ", typeof requestLoadConfig);
                                    // console.log("requestLoadRows => ", typeof props.requestLoadRows);
                                    requestLoadConfig().then(function (response) {
                                        // let result = response.data;
                                        // console.log('requestLoadConfig -> ', response.data);
                                        if (!cleanupFunction) {
                                            // setTableConfig(response.data);
                                            configParser(response.data);
                                        }
                                    }).catch(function (error) {
                                        return notificationError(error, "Ошибка получения конфигурации");
                                    });
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
    }, [props]);

    var configParser = function configParser(config) {
        var _expandColumnKey = config && config.hierarchical && config.hierarchyView ? config.hierarchyView : expandColumnKey;

        var visibleIndex = 0;
        var expandIconColumnIndex = -1;

        var _columns = [];
        if (config && config.fields) {
            // for(let i = 0; i < config.fields.length; i++) {
            //     const item = config.fields[i];
            // _columns = config.fields.map((item) => {
            config.fields.forEach(function (item, index) {
                // console.log('configParser item => ', item);
                // if(item.visible) {
                var dataIndex = item.alias ? item.alias : item.name;

                var defaultSortOrder = defaultSortBy && defaultSortBy.key === dataIndex ? defaultSortBy.order === 'asc' ? 'ascend' : 'descend' : undefined;

                var colProps = customColumnProps && customColumnProps.find(function (render) {
                    return render.name === item.name || render.name === item.alias;
                });
                var widthCol = fixWidthColumn ? { width: item.width, maxWidth: 1000 } : {};
                if (item.visible) {
                    visibleIndex++;
                    if (_expandColumnKey === dataIndex) expandIconColumnIndex = visibleIndex + (selectable ? 1 : -1);
                    _columns.push(_extends({
                        key: item.name,
                        title: item.header ? item.header : item.name,
                        dataIndex: item.alias ? item.alias : item.name,
                        align: item.align,
                        resizable: item.resizable,
                        sorter: item.sortable ? item.sortable : undefined,
                        ellipsis: true,
                        defaultSortOrder: defaultSortOrder
                    }, widthCol, colProps, {
                        // className: [cellBordered ? 'bordered' : ''].join(' '),
                        // headerClassName: [cellBordered ? 'bordered' : ''].join(' '),
                        // cellRenderer: cellR && cellR.cellRender,
                        render: function render(cellData, rowData, rowIndex) {
                            if (colProps && colProps.cellRenderer) return React.createElement(colProps.cellRenderer, { cellData: cellData, rowData: rowData,
                                rowIndex: rowIndex });else return item.typeData === 'json' ? JSON.stringify(cellData) : cellData ? cellData : '---';
                        }

                        // render: (cellData, rowData, rowIndex) => {
                        //     if (colProps && colProps.cellRenderer)
                        //         return <colProps.cellRenderer cellData={cellData} rowData={rowData} rowIndex={rowIndex}/>
                        //         // return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';
                        //     else
                        //         if (cellData)
                        //             if (item.typeData === 'json')
                        //                 return <BodyCell cellData={JSON.stringify(cellData)}/>;
                        //             else
                        //                 return <BodyCell cellData={cellData}/>;
                        //         else
                        //             return <BodyCell cellData={'---'}/>;
                        //
                        //         // return object.cellData ? object.cellData : '---';
                        // },
                    }));
                }
            });
        }

        var _defaultFilter = void 0;
        if (config && config.hierarchical && config.hierarchyLazyLoad) {
            var parentKey = config.hierarchyField ? config.hierarchyField.split("/")[1] : expandParentKey;
            _defaultFilter = _extends({}, defaultFilter, _defineProperty({}, parentKey, null));
        } else _defaultFilter = defaultFilter;

        // console.log('expandIconColumnIndex => ', _expandColumnKey, expandIconColumnIndex);
        setTableConfig({
            columns: _columns,
            defaultFilter: _defaultFilter,
            rowKey: config && config.hierarchical && config.hierarchyField ? config.hierarchyField.split("/")[0] : rowKey,
            // expandParentKey:
            //     config && config.hierarchical && config.hierarchyField
            //         ? config.hierarchyField.split('/')[1]
            //         : expandParentKey,
            expandColumnKey: _expandColumnKey,
            expandable: { expandIconColumnIndex: expandIconColumnIndex },
            // expandLazyLoad:
            //     config && config.hierarchical && config.hierarchyLazyLoad
            //         ? config.hierarchyLazyLoad
            //         : expandLazyLoad,
            pageSize: config && config.hierarchical ? 1 : pageSize
        });
    };

    if (tableConfig) return React.createElement(Table, _extends({}, props, tableConfig));else return null;
};

export default ConfigLoader;