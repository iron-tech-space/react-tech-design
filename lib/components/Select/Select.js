import "antd/es/select/style";
import _Select from "antd/es/select";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getObjectExcludedProps, notificationError, useMounted } from "../utils/baseUtils";

import { CheckOutlined } from '@ant-design/icons';

var Select = function Select(props) {
	var defaultSortBy = props.defaultSortBy,
	    defaultFilter = props.defaultFilter,
	    defaultSearchValue = props.defaultSearchValue,
	    sortBy = props.sortBy,
	    filter = props.filter,
	    searchValue = props.searchValue,
	    infinityMode = props.infinityMode,
	    requestLoadRows = props.requestLoadRows,
	    optionConverter = props.optionConverter,
	    options = props.options,
	    widthControl = props.widthControl,
	    _props$subscribe = props.subscribe,
	    subscribe = _props$subscribe === undefined ? [] : _props$subscribe,
	    pageSize = props.pageSize,
	    searchParamName = props.searchParamName,
	    mode = props.mode,
	    onChange = props.onChange,
	    value = props.value;

	/** Наличие на сервере еще данных */

	var _useState = useState(true),
	    _useState2 = _slicedToArray(_useState, 2),
	    _hasMore = _useState2[0],
	    _setHasMore = _useState2[1];
	/** Индикатор загрузки данных */


	var _useState3 = useState(false),
	    _useState4 = _slicedToArray(_useState3, 2),
	    _loading = _useState4[0],
	    _setLoading = _useState4[1];
	/** Опции селекта */


	var _useState5 = useState(options),
	    _useState6 = _slicedToArray(_useState5, 2),
	    _options = _useState6[0],
	    _setOptions = _useState6[1];
	/** Индикатор достижения низа окна */


	var _useState7 = useState(false),
	    _useState8 = _slicedToArray(_useState7, 2),
	    isEndReached = _useState8[0],
	    setIsEndReached = _useState8[1];

	/** Объект сортировки */


	var _useState9 = useState(undefined),
	    _useState10 = _slicedToArray(_useState9, 2),
	    _sortBy = _useState10[0],
	    _setSortBy = _useState10[1];
	/** Объект фильтрации */


	var _useState11 = useState({}),
	    _useState12 = _slicedToArray(_useState11, 2),
	    _filter = _useState12[0],
	    _setFilter = _useState12[1];
	/** Строка поиска */


	var _useState13 = useState(undefined),
	    _useState14 = _slicedToArray(_useState13, 2),
	    _searchValue = _useState14[0],
	    _setSearchValue = _useState14[1];

	/** Состояние параметра выбрать все */


	var _useState15 = useState(false),
	    _useState16 = _slicedToArray(_useState15, 2),
	    _isSelectAll = _useState16[0],
	    _setIsSelectAll = _useState16[1];

	var excludeProps = ['componentType', 'defaultSortBy', 'defaultFilter', 'defaultSearchValue', 'infinityMode', 'requestLoadRows', 'optionConverter', 'options', 'widthControl', 'pageSize', 'searchParamName', 'subscribe'].concat(_toConsumableArray(subscribe.map(function (item) {
		return item.name;
	})), ['dispatch', 'dispatchExtraData']);

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
		_setRowsHandler(options);
	}, [options]);

	useEffect(function () {
		// console.log("Change sortBy, filter, searchValue", sortBy, filter, searchValue);
		if (isMounted) {
			var __sortBy = sortBy ? sortBy : _sortBy;
			var __filter = filter ? filter : _filter;
			var __searchValue = searchValue ? searchValue : _searchValue;
			_setSortBy(__sortBy);
			_setFilter(__filter);
			_setSearchValue(__searchValue);
			_loadOptions({
				sortBy: __sortBy,
				filter: __filter,
				searchLine: __searchValue,
				reload: true
			});
		}
	}, [sortBy, filter, searchValue]);

	var _setRowsHandler = function _setRowsHandler(options) {
		_setOptions(options);
		// console.log('_setRowsHandler value => ', value)
		if (mode === 'multiple') {
			if (Array.isArray(value)) if (options.reduce(function (preValue, item) {
				return value.includes(item.value) ? preValue + 1 : preValue;
			}, 0) === options.length) _setIsSelectAll(true);else _setIsSelectAll(false);
			onChange(value);
		}
		// setRows(rows);
		// rowsDispatch(rows);
	};

	var getPageNum = function getPageNum(reload) {
		return reload ? 0 : Math.floor(_options.length / pageSize);
	};

	var getSort = function getSort(sortBy) {
		return sortBy && sortBy.key ? sortBy.key + ',' + sortBy.order : null;
	};

	var getSearchValue = function getSearchValue(searchValue) {
		return searchValue ? _defineProperty({}, searchParamName, searchValue) : null;
	};

	var _loadOptions = function _loadOptions(params) {
		// console.log('_dataProcessing', params);
		var sortBy = params.sortBy,
		    filter = params.filter,
		    searchValue = params.searchValue,
		    reload = params.reload;

		if ((_hasMore || reload) && !_loading && requestLoadRows) {
			_setLoading(true);

			var requestOptions = {
				params: {
					page: getPageNum(reload),
					size: pageSize,
					sort: getSort(sortBy)
				},
				data: _extends({}, filter, getSearchValue(searchValue))
				// console.log('dataQuery', dataQuery);

			};requestLoadRows(requestOptions).then(function (response) {
				// console.log("infinity then response", response);
				var result = response.data;

				if (result && result.length < pageSize) {
					_setHasMore(false);
				} else {
					_setHasMore(true);
					setIsEndReached(false);
				}
				reload ? _setRowsHandler(result.map(function (option) {
					return optionConverter(option);
				})) // _setRows
				: _setRowsHandler(_options.concat(result.map(function (option) {
					return optionConverter(option);
				}))); // _setRows

				// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);

				_setLoading(false);
			}).catch(function (error) {
				notificationError(error, 'Ошибка загрузки данных');
				_setRowsHandler(_options); // _setRows
				// setHasMore(false);
				_setLoading(false);
			});
		}
	};

	var onScroll = function onScroll(event) {
		var scrollTopMax = event.nativeEvent.target.scrollTopMax;
		var scrollTop = event.nativeEvent.target.scrollTop; //.body.scrollTop

		var onEndReached = scrollTopMax - scrollTop;

		if (onEndReached < 300 && !isEndReached) {
			// console.log('Load Data');
			setIsEndReached(true);
			_setSearchValue(defaultSearchValue);
			if (infinityMode) {
				_loadOptions({
					sortBy: defaultSortBy,
					filter: defaultFilter,
					searchValue: defaultSearchValue,
					reload: false
				});
			}
		}

		// console.log("scrollTopMax / scrollTop", scrollTopMax, scrollTop, onEndReached);
		// const lastScrollTop = this._scroll.scrxollTop;
		// if (args.scrollTop > lastScrollTop) this._maybeCallOnEndReached();
	};

	var onSearch = function onSearch(value) {
		_setSearchValue(value);
		_loadOptions({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchValue: value,
			reload: true
		});
	};

	var _onChangeSelectAll = function _onChangeSelectAll() {
		// console.log(`_onChangeSelectAll`, _isSelectAll);
		if (mode === 'multiple') {
			if (_isSelectAll) {
				var optionsValues = _options.map(function (item) {
					return item.value;
				});
				onChange(value.filter(function (item) {
					return !optionsValues.includes(item);
				}));
				_setIsSelectAll(false);
			} else {
				if (Array.isArray(value) && value.length > 0) onChange([].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(value), _toConsumableArray(_options.map(function (item) {
					return item.value;
				})))))));else onChange([].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(_options.map(function (item) {
					return item.value;
				})))))));
				_setIsSelectAll(true);
			}
		} else onChange(undefined);
	};
	var _onChange = function _onChange(value) {
		// console.log(`_onChange selected`, value);
		if (Array.isArray(value)) if (_options.reduce(function (preValue, item) {
			return value.includes(item.value) ? preValue + 1 : preValue;
		}, 0) === _options.length) _setIsSelectAll(true);else _setIsSelectAll(false);

		onChange(value);
	};

	var getSelectAllCls = function getSelectAllCls() {
		var cls = ['ant-select-item', 'ant-select-item-option', 'ant-select-item-option-select-all'];
		if (_isSelectAll) cls.push('ant-select-item-option-selected');
		return cls.join(' ');
	};

	var childProps = getObjectExcludedProps(props, excludeProps);
	return React.createElement(
		_Select,
		_extends({}, childProps, {
			searchValue: _searchValue,
			style: { width: widthControl }
			// listHeight={heightPopup}
			// defaultValue={['a10', 'c12']}
			, onChange: _onChange,
			maxTagCount: 0,
			maxTagPlaceholder: function maxTagPlaceholder(omittedValues) {
				return "\u0412\u044B\u0431\u0440\u0430\u043D\u043E: " + omittedValues.length;
			}
			// dropdownMatchSelectWidth={200}
			// listItemHeight={10} listHeight={250}
			, onPopupScroll: onScroll,
			onSearch: onSearch,
			dropdownRender: function dropdownRender(menu) {
				return React.createElement(
					React.Fragment,
					null,
					mode === 'multiple' ? React.createElement(
						"div",
						{ className: getSelectAllCls(), onClick: _onChangeSelectAll },
						React.createElement(
							"div",
							{ className: "ant-select-item-option-content" },
							React.createElement(
								"span",
								null,
								"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435"
							)
						),
						_isSelectAll ? React.createElement(
							"span",
							{ className: "ant-select-item-option-state" },
							React.createElement(CheckOutlined, null)
						) : null
					) : null,
					menu
				);
			}
		}),
		_options && _options.map(function (_ref2, i) {
			var label = _ref2.label,
			    value = _ref2.value,
			    className = _ref2.className,
			    disabled = _ref2.disabled;
			return React.createElement(
				_Select.Option,
				{ key: i.toString(36) + i, value: value, className: className, disabled: disabled },
				label
			);
		})
	);
};

Select.propTypes = {
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

	/** Режим загружки по скроллу */
	infinityMode: PropTypes.bool,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadRows: PropTypes.func,

	/** Функция преобразования загруженных объектов
  * в объекты для селекта. (option) => ({})
  * Требоваеть вернуть объект с параметрам
  * { label: ReactNode, value: any, className: string, disabled: bool } */
	optionConverter: PropTypes.func,

	/** Select options [{ label, value, className, disabled }] */
	options: PropTypes.arrayOf(PropTypes.object),

	/** Ширина поля выбора в пикселях */
	widthControl: PropTypes.oneOfType(PropTypes.string, PropTypes.number),

	/** Объект для подписки на изменения в STORE */
	subscribe: PropTypes.arrayOf(PropTypes.object),

	/** Размер страницы */
	pageSize: PropTypes.number,

	/** Имя параметра для поиска */
	searchParamName: PropTypes.string
};

Select.defaultProps = {
	// Ant Props
	placeholder: "Выберите",

	// Rt Props
	defaultSortBy: undefined,
	defaultFilter: {},
	defaultSearchValue: undefined,
	infinityMode: false,
	requestLoadRows: undefined,
	options: [],
	widthControl: '100%',
	subscribe: [],

	pageSize: 50,
	searchParamName: 'searchValue'
};

export default Select;