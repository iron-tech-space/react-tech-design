import "antd/es/tree-select/style";
import _TreeSelect from "antd/es/tree-select";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getObjectExcludedProps, notificationError, useMounted } from "../utils/baseUtils";

var excludeProps = ['componentType', 'defaultSortBy', 'defaultFilter', 'defaultSearchValue', 'sortBy', 'filter', 'searchValue', 'searchParamName', 'requestLoadRows', 'optionConverter', 'treeData'];

/** Компонент выбора элемента(ов) из древовидного списка */
var TreeSelect = function TreeSelect(props) {
    var defaultSortBy = props.defaultSortBy,
        defaultFilter = props.defaultFilter,
        defaultSearchValue = props.defaultSearchValue,
        sortBy = props.sortBy,
        filter = props.filter,
        searchValue = props.searchValue,
        searchParamName = props.searchParamName,
        requestLoadRows = props.requestLoadRows,
        optionConverter = props.optionConverter,
        treeData = props.treeData;
    /** Индикатор загрузки данных */

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        _loading = _useState2[0],
        _setLoading = _useState2[1];
    /** Опции селекта */


    var _useState3 = useState(treeData),
        _useState4 = _slicedToArray(_useState3, 2),
        _treeData = _useState4[0],
        _setTreeData = _useState4[1];
    /** Строка поиска */


    var _useState5 = useState(undefined),
        _useState6 = _slicedToArray(_useState5, 2),
        _searchValue = _useState6[0],
        _setSearchValue = _useState6[1];

    var isMounted = useMounted();

    useEffect(function () {
        _setSearchValue(defaultSearchValue);
        _loadOptions({
            sortBy: defaultSortBy,
            filter: defaultFilter,
            searchValue: defaultSearchValue,
            reload: true
        });
    }, []);

    useEffect(function () {
        // console.log("Change sortBy, filter, searchValue", sortBy, filter, searchValue);
        if (isMounted) {
            _setSearchValue(searchValue);
            _loadOptions({
                sortBy: sortBy,
                filter: filter,
                searchLine: searchValue,
                reload: true
            });
        }
    }, [sortBy, filter, searchValue]);

    var onSearch = function onSearch(value) {
        // console.log('TreeSelect onSearch => ', value);
        _setSearchValue(value);
        _loadOptions({
            sortBy: defaultSortBy,
            filter: defaultFilter,
            searchValue: value,
            reload: true
        });
    };

    var getSort = function getSort(sortBy) {
        return sortBy && sortBy.key ? sortBy.key + ',' + sortBy.order : null;
    };

    var getSearchValue = function getSearchValue(searchValue) {
        return searchValue ? _defineProperty({}, searchParamName, searchValue) : null;
    };

    var _optionConverter = function _optionConverter(options) {
        if (Array.isArray(options)) return options.map(function (option) {
            if (option.children && Array.isArray(option.children)) option.children = _optionConverter(option.children);
            return optionConverter(option);
        });
    };

    var _loadOptions = function _loadOptions(params) {
        var sortBy = params.sortBy,
            filter = params.filter,
            searchValue = params.searchValue;

        if (!_loading && requestLoadRows) {
            _setLoading(true);
            var requestOptions = {
                params: {
                    page: 0,
                    size: 1,
                    sort: getSort(sortBy)
                },
                data: _extends({}, filter, getSearchValue(searchValue))
            };
            requestLoadRows(requestOptions).then(function (response) {
                // console.log("infinity then response", response);
                var result = response.data;
                _setTreeData(_optionConverter(result));
                _setLoading(false);
            }).catch(function (error) {
                notificationError(error, 'Ошибка загрузки данных');
                // _setRowsHandler(_options); // _setRows
                // setHasMore(false);
                _setLoading(false);
            });
        }
    };

    var childProps = getObjectExcludedProps(props, excludeProps);
    return React.createElement(_TreeSelect, _extends({
        showArrow: true,
        showSearch: true,
        allowClear: true,
        filterTreeNode: false,
        autoClearSearchValue: true,
        treeDefaultExpandAll: true

    }, childProps, {

        searchValue: _searchValue,
        onSearch: onSearch,
        maxTagCount: 0,
        maxTagPlaceholder: function maxTagPlaceholder(omittedValues) {
            return "\u0412\u044B\u0431\u0440\u0430\u043D\u043E: " + omittedValues.length;
        },
        treeData: _treeData
        // loadData={onLoadData}
    }));
};

TreeSelect.propTypes = {
    /** Сортировка по умолчанию */
    defaultSortBy: PropTypes.shape({
        /** Ключ поля для сортировки */
        key: PropTypes.string,
        /** Направление сортировки */
        order: PropTypes.oneOf(['asc', 'desc'])
    }),

    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.object,

    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue: PropTypes.string,

    /** Сортировка */
    sortBy: PropTypes.object,

    /** Фильтр */
    filter: PropTypes.object,

    /** Значение строки поиска */
    searchValue: PropTypes.string,

    /** Имя параметра для поиска */
    searchParamName: PropTypes.string,

    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.func,

    /** Функция преобразования загруженных объектов в объекты для селекта.
     * Сигнатура `(option) => ({})`
     * Требоваеть вернуть объект с параметрам
     * `{ label: ReactNode, value: any, children: any, checkable: bool, selectable: bool }`
     * ##### Example:
     * ``` JS
     * (option) => ({
     * 	label: (<span><MehOutlined />{option.name}</span>),
     * 	value: option.id,
     * 	children: option.children,
     * 	checkable: !option.isGroup,
     * 	selectable: !option.isGroup,
     * })
     * ```*/
    optionConverter: PropTypes.func.isRequired,

    /** Select options `[{ label, value, children, checkable, selectable }]` */
    options: PropTypes.arrayOf(PropTypes.object)
};

TreeSelect.defaultProps = {
    // Rt Props
    defaultSortBy: undefined,
    defaultFilter: {},
    defaultSearchValue: undefined,
    requestLoadRows: undefined,
    searchParamName: 'name'
};

export default TreeSelect;