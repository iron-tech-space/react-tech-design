import "antd/es/typography/style";
import _Typography from "antd/es/typography";

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
    rowKey: 'id',
    pageSize: 50,
    requestLoadConfig: noop,
    expandColumnKey: undefined,
    expandLazyLoad: false,
    expandParentKey: 'parentId',
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
        rowKey = _defaultProps$props.rowKey,
        pageSize = _defaultProps$props.pageSize,
        requestLoadConfig = _defaultProps$props.requestLoadConfig,
        expandColumnKey = _defaultProps$props.expandColumnKey,
        expandLazyLoad = _defaultProps$props.expandLazyLoad,
        expandParentKey = _defaultProps$props.expandParentKey,
        customColumnProps = _defaultProps$props.customColumnProps,
        cellBordered = _defaultProps$props.cellBordered;

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
                                            configParser(response.data);
                                        }
                                    }).catch(function (error) {
                                        return notificationError(error, 'Ошибка получения конфигурации');
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
    }, []);

    var configParser = function configParser(config) {
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
                    hidden: !item.visible,
                    className: [cellBordered ? 'bordered' : ''].join(' '),
                    headerClassName: [cellBordered ? 'bordered' : ''].join(' ')
                }, colProps, {
                    cellRenderer: function cellRenderer(object) {
                        if (colProps && colProps.cellRenderer) return React.createElement(colProps.cellRenderer, object);
                        // return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';
                        else return object.cellData ? React.createElement(
                                _Typography.Text,
                                { ellipsis: true, style: { width: '100%' }, className: 'rt-table-cell' },
                                object.cellData
                            ) : React.createElement(
                                _Typography.Text,
                                { ellipsis: true, style: { width: '100%' }, className: 'rt-table-cell' },
                                "---"
                            );
                        // return object.cellData ? object.cellData : '---';
                    }
                });
            });
        }

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

    if (tableConfig) return React.createElement(Table, _extends({}, props, tableConfig));else return null;
};

export default ConfigLoader;