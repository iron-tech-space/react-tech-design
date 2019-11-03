import 'antd/es/tooltip/style';
import _Tooltip from 'antd/es/tooltip';
import 'antd/es/button/style';
import _Button from 'antd/es/button';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { noop } from '../utils/baseUtils';
import DateRange from '../DateRange/DateRange';
import SingleDate from '../SingleDate/SingleDate';
import Select from '../Select/Select';

var FilterPanel = function FilterPanel(props) {
	/**
  * Период с, по (день / месяц / год)
  * Множественный выбор (дерево с галочками с поиском) (ajax / const)
  * Множественный выбор (список с поиском) (ajax / const)
  * Единственный выбор (список с поиском) (ajax / const)
  */

	var _useState = useState(props.defaultFilter),
	    _useState2 = _slicedToArray(_useState, 2),
	    filter = _useState2[0],
	    setFilter = _useState2[1];
	// const [multiSelectObjects, setMultiSelectObjects] = useState([]);

	var applyFilterRender = props.applyFilterRender,
	    borderStyle = props.borderStyle,
	    onChangeFilter = props.onChangeFilter,
	    onApplyFilter = props.onApplyFilter,
	    configFilter = props.configFilter,
	    resetFilterRender = props.resetFilterRender;


	var _onChangeData = function _onChangeData(name, value) {
		// console.log("FilterPanel -> onChangeData", name, value);
		var _filter = _extends({}, filter);
		if (value === null) {
			delete _filter[name];
		} else {
			_filter = _extends({}, _filter, _defineProperty({}, name, value));
		}
		// console.log("onChangeData:", _filter);
		setFilter(_filter);
		onChangeFilter(_filter);
	};

	var _applyFilter = function _applyFilter() {
		// console.log("_applyFilter:", filter);
		onApplyFilter(filter);
	};
	var _resetFilter = function _resetFilter() {
		setFilter(props.defaultFilter);
		onChangeFilter(props.defaultFilter);
		onApplyFilter(props.defaultFilter);
		// setMultiSelectObjects([]);
	};

	// const _onChangeObjects = (name, value) => {
	// 	let _multiSelectObjects = {...multiSelectObjects};
	// 	if (value === null) {
	// 		delete _multiSelectObjects[name];
	// 	} else {
	// 		_multiSelectObjects = {..._multiSelectObjects, ...{[name]: value}};
	// 	}
	// 	// console.log("onChangeData:", _filter);
	// 	setMultiSelectObjects(_multiSelectObjects);
	// };

	return React.createElement(
		React.Fragment,
		null,
		configFilter && configFilter.length ? React.createElement(
			'div',
			{ className: 'filter-panel-container border-' + borderStyle },
			configFilter.map(function (item, index) {
				// console.log("item.defaultRows", item.defaultRows);
				switch (item.type) {
					case 'DateRange':
						return React.createElement(DateRange, _extends({
							key: index
						}, item, {
							className: 'filter-panel-item ' + item.className,
							defaultValueStart: filter[item.nameStart] ? filter[item.nameStart] : null,
							defaultValueEnd: filter[item.nameEnd] ? filter[item.nameEnd] : null,
							onChange: _onChangeData,
							valueStart: filter[item.nameStart],
							valueEnd: filter[item.nameEnd]
						}));
					case 'SingleDate':
						return React.createElement(SingleDate, _extends({
							key: index
						}, item, {
							className: 'filter-panel-item ' + item.className,
							dateFormat: item.dateFormat ? item.dateFormat : undefined,
							defaultValue: filter[item.name] ? filter[item.name] : null,
							onChange: _onChangeData,
							value: filter[item.name]
						}));
					case 'MultiSelect':
					case 'SingleSelect':
						return React.createElement(Select, _extends({
							key: index
						}, item, {
							className: 'filter-panel-item ' + item.className,
							onChangeKeys: _onChangeData
						}));
					default:
						return null;
				}
			}),
			React.createElement(
				_Tooltip,
				{ title: '\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440' },
				React.createElement(
					_Button,
					{
						type: 'primary',
						size: 'small',
						style: { marginLeft: 'auto' },
						onClick: _applyFilter
					},
					applyFilterRender
				)
			),
			React.createElement(
				_Tooltip,
				{ title: '\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440' },
				React.createElement(
					_Button,
					{
						size: 'small',
						style: { marginLeft: '10px' },
						onClick: _resetFilter
					},
					resetFilterRender
				)
			)
		) : null
	);
};

FilterPanel.propTypes = {
	/** Строка / функция / элемент для отображения в кнопке "Применить фильтр" */
	applyFilterRender: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.string]),

	/** Тип бордера панели (по умолчанию 'none')
  * ['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right'] */
	borderStyle: PropTypes.oneOf(['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right']),

	/** Объект фильтра по умолчанию */
	defaultFilter: PropTypes.object,

	/** Конфигурация панели фильтров */
	configFilter: PropTypes.arrayOf(PropTypes.object),

	/** Событие по кнопке выполнить фильтр */
	onApplyFilter: PropTypes.func,

	/** Событие по изменение объекта фильтра */
	onChangeFilter: PropTypes.func,

	/** Строка / функция / элемент для отображения в кнопке "Сбросить фильтр" */
	resetFilterRender: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.string])
};

FilterPanel.defaultProps = {
	borderStyle: 'none',
	defaultFilter: {},
	configFilter: [],
	onApplyFilter: noop,
	onChangeFilter: noop,
	applyFilterRender: 'Применить',
	resetFilterRender: 'Сбросить'
};

export default FilterPanel;