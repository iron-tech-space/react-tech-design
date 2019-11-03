import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { noop } from '../utils/baseUtils';
import { getMomentFromStringByFormat, getMomentWithOffsetTruncateDay } from '../utils/datesUtils';

var SingleDate = function SingleDate(props) {
	/** Состояние первоначалной настройки компонента */
	var _useState = useState(false),
	    _useState2 = _slicedToArray(_useState, 2),
	    mounted = _useState2[0],
	    setMounted = _useState2[1];

	var _useState3 = useState(null),
	    _useState4 = _slicedToArray(_useState3, 2),
	    _value = _useState4[0],
	    setValue = _useState4[1];

	var dateFormat = props.dateFormat,
	    defaultValue = props.defaultValue,
	    name = props.name,
	    onChange = props.onChange,
	    title = props.title,
	    value = props.value,
	    className = props.className;


	useEffect(function () {
		if (!mounted) {
			// console.log("DateRange mounted :", nameFrom, props.defaultValueFrom);
			if (defaultValue) {
				_onChange(name, getMomentFromStringByFormat(defaultValue, dateFormat));
				setValue(getMomentFromStringByFormat(defaultValue, dateFormat));
			}
			setMounted(true);
		}
	}, [mounted]);

	useEffect(function () {
		if (value) {
			setValue(moment(value));
		} else if (!defaultValue) setValue(null);
	}, [value]);

	var _onChangePicker = function _onChangePicker(date) {
		setValue(date);
		_onChange(name, date);
	};

	var _onChange = function _onChange(name, value) {
		if (value) onChange(name, getMomentWithOffsetTruncateDay(value));else onChange(name, value);
	};

	return React.createElement(
		'div',
		{ className: 'single-date-container ' + className },
		React.createElement(
			'div',
			{ className: 'title' },
			title
		),
		React.createElement(_DatePicker, {
			size: 'small',
			style: { width: '135px' },
			onChange: _onChangePicker,
			format: dateFormat,
			placeholder: 'Выберите дату',
			value: _value
		})
	);
};

SingleDate.propTypes = {
	/** Формат отображения даты (не влияет на формат в onChange) */
	dateFormat: PropTypes.string,

	/** Значение по умолчанию */
	defaultValue: PropTypes.string,

	/** Наименование параметра */
	name: PropTypes.string,

	/** Дополнительное имя класса для элемента */
	className: PropTypes.string,

	/** Событие при изменении пикера */
	onChange: PropTypes.func,

	/** Заголовок */
	title: PropTypes.string,

	/** Значение даты */
	value: PropTypes.string
};

SingleDate.defaultProps = {
	name: 'date',
	dateFormat: 'DD.MM.YYYY',
	onChange: noop,
	title: 'Дата'
};

export default SingleDate;