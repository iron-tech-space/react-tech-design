var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';

import { notificationError } from "../../utils/baseUtils";

var AdvancedTable = forwardRef(function (props, ref) {
	var _useState = useState({}),
	    _useState2 = _slicedToArray(_useState, 2),
	    config = _useState2[0],
	    setConfig = _useState2[1];

	var configData = props.configData,
	    customColumnProps = props.customColumnProps,
	    defaultFilter = props.defaultFilter,
	    expandColumnKey = props.expandColumnKey,
	    expandLazyLoad = props.expandLazyLoad,
	    expandParentKey = props.expandParentKey,
	    pageSize = props.pageSize,
	    rowKey = props.rowKey,
	    requestLoadConfig = props.requestLoadConfig;


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
										if (!cleanupFunction) setConfig(response.data);
									}).catch(function (error) {
										return notificationError(error, 'Ошибка получения конфигурации');
									});
								} else {
									if (!cleanupFunction) setConfig(configData);
								}

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, _this);
			}));

			return function loadData() {
				return _ref.apply(this, arguments);
			};
		}();
		loadData();
		return function () {
			return cleanupFunction = true;
		};
	}, []);

	var columnsByConfig = function columnsByConfig() {
		return config && config.fields && config.fields.map(function (item) {

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
	};

	var getDefaultFilter = function getDefaultFilter() {
		if (config && config.hierarchical && config.hierarchyLazyLoad) {
			var parentKey = config.hierarchyField ? config.hierarchyField.split('/')[1] : expandParentKey;
			return _extends({}, defaultFilter, _defineProperty({}, parentKey, null));
		} else return defaultFilter;
	};

	if (config && config.fields) {
		// console.log('AdvancedTable render table -> ', config);
		return React.createElement(Table, _extends({}, props, {
			ref: ref,
			columns: columnsByConfig(),
			defaultFilter: getDefaultFilter(),
			rowKey: config && config.hierarchical && config.hierarchyField ? config.hierarchyField.split('/')[0] : rowKey,
			expandParentKey: config && config.hierarchical && config.hierarchyField ? config.hierarchyField.split('/')[1] : expandParentKey,
			expandColumnKey: config && config.hierarchical && config.hierarchyView ? config.hierarchyView : expandColumnKey,
			expandLazyLoad: config && config.hierarchical && config.hierarchyLazyLoad ? config.hierarchyLazyLoad : expandLazyLoad,
			pageSize: config && config.hierarchical ? 1 : pageSize
		}));
	} else return null;
});

AdvancedTable.propTypes = {
	/** Функция запроса на получение конфига для таблицы */
	requestLoadConfig: PropTypes.func,

	/** Конфигурация внешнего вида таблицы */
	configData: PropTypes.shape({
		hierarchical: PropTypes.bool,
		hierarchyField: PropTypes.string,
		hierarchyView: PropTypes.string,
		hierarchyLazyLoad: PropTypes.bool,
		fields: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			alias: PropTypes.string,
			header: PropTypes.string,
			visible: PropTypes.bool,
			resizable: PropTypes.bool,
			sortable: PropTypes.bool,
			align: PropTypes.oneOf(['left', 'center', 'right']),
			width: PropTypes.number
		}))
	}),

	/** Дополнительные пропсы для колонок */
	customColumnProps: PropTypes.arrayOf(PropTypes.object)
};

AdvancedTable.defaultProps = {};

export default AdvancedTable;