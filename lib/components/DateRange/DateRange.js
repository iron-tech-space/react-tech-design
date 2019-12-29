import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import locale from 'antd/es/date-picker/locale/ru_RU';
import { noop } from '../utils/baseUtils';
import { rtPrefix } from '../utils/variables';
import { getMomentWithOffset, getMomentWithOffsetTruncateDay, getMomentFromStringByFormat } from '../utils/datesUtils';

var DateRange = function DateRange(props) {
	/** Состояние первоначалной настройки компонента */
	var _useState = useState(false),
	    _useState2 = _slicedToArray(_useState, 2),
	    mounted = _useState2[0],
	    setMounted = _useState2[1];

	var _useState3 = useState(undefined),
	    _useState4 = _slicedToArray(_useState3, 2),
	    startValue = _useState4[0],
	    setStartValue = _useState4[1];

	var _useState5 = useState(undefined),
	    _useState6 = _slicedToArray(_useState5, 2),
	    endValue = _useState6[0],
	    setEndValue = _useState6[1];

	var className = props.className,
	    nameStart = props.nameStart,
	    nameEnd = props.nameEnd,
	    dateFormat = props.dateFormat,
	    onChange = props.onChange,
	    size = props.size,
	    title = props.title,
	    valueStart = props.valueStart,
	    valueEnd = props.valueEnd,
	    showTime = props.showTime;


	useEffect(function () {
		if (!mounted) {
			if (props.defaultValueStart) {
				// console.log("DateRange mounted :", nameStart, props.defaultValueStart);
				_onChange(nameStart, getMomentFromStringByFormat(props.defaultValueStart, dateFormat));
				setStartValue(getMomentFromStringByFormat(props.defaultValueStart, dateFormat));
			}
			if (props.defaultValueEnd) {
				_onChange(nameEnd, getMomentFromStringByFormat(props.defaultValueEnd, dateFormat));
				setEndValue(getMomentFromStringByFormat(props.defaultValueEnd, dateFormat));
			}
			setMounted(true);
		}
	}, [mounted]);

	useEffect(function () {
		if (valueStart) {
			setStartValue(moment(valueStart));
			// console.log('useEffect -> valueStart', valueStart);
		} else if (!props.defaultValueStart) setStartValue(null);
	}, [valueStart]);
	useEffect(function () {
		if (valueEnd) {
			setEndValue(moment(valueEnd));
			// console.log('useEffect -> valueEnd', valueEnd);
		} else if (!props.defaultValueEnd) setEndValue(null);
	}, [valueEnd]);

	var disabledStartDate = function disabledStartDate(startValue) {
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	var disabledEndDate = function disabledEndDate(endValue) {
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};

	var onStartChange = function onStartChange(date) {
		setStartValue(date);
		_onChange(nameStart, date);
	};

	var onEndChange = function onEndChange(date) {
		setEndValue(date);
		_onChange(nameEnd, date);
	};

	var _onChange = function _onChange(name, value) {
		if (value) {
			if (showTime) onChange(name, getMomentWithOffset(value));else onChange(name, getMomentWithOffsetTruncateDay(value));
		} else onChange(name, value);
	};

	return React.createElement(
		'div',
		{ className: className + ' ' + rtPrefix + '-date-range' },
		React.createElement(
			'div',
			null,
			title ? React.createElement(
				'div',
				{ className: 'title' },
				title
			) : null,
			React.createElement(
				'span',
				{ className: 'subtitleStart' },
				'c'
			),
			React.createElement(_DatePicker, {
				locale: locale
				// defaultValue={ checkDefValue(props.defaultValueStart) }
				, size: size,
				style: { width: !!showTime ? '160px' : '135px' },
				disabledDate: disabledStartDate,
				onChange: onStartChange,
				format: dateFormat,
				placeholder: 'Выберите дату',
				value: startValue,
				showTime: showTime
			})
		),
		React.createElement(
			'div',
			null,
			React.createElement(
				'span',
				{ className: 'subtitleEnd' },
				'\u043F\u043E'
			),
			React.createElement(_DatePicker, {
				locale: locale
				// defaultValue={ checkDefValue(props.defaultValueEnd) }
				, size: size,
				style: { width: showTime ? '160px' : '135px' },
				disabledDate: disabledEndDate,
				onChange: onEndChange,
				format: dateFormat,
				placeholder: 'Выберите дату',
				value: endValue,
				showTime: showTime
			})
		)
	);
};

DateRange.propTypes = {
	/** Формат отображения даты (не влияет на формат в onChange) */
	dateFormat: PropTypes.string,

	/** Значение по умолчанию для первого пикера */
	// defaultValueStart: PropTypes.string,

	/** Значение по умолчанию для второго пикера */
	// defaultValueEnd: PropTypes.string,

	/** Дополнительное имя класса для элемента */
	className: PropTypes.string,

	/** Наименование параметра для первого пикера */
	nameStart: PropTypes.string,

	/** Наименование параметра для второго пикера */
	nameEnd: PropTypes.string,

	/** Событие при изменении любого из пикеров */
	onChange: PropTypes.func,

	/** Размер пикера ['small', 'middle', 'large'] */
	size: PropTypes.oneOf(['small', 'middle', 'large']),

	/** Заголовок */
	title: PropTypes.string

	/** Значение даты первого пикера (используется для управления датой из родительного компонента) */
	// valueStart: PropTypes.string,

	/** Значение даты второго пикера (используется для управления датой из родительного компонента) */
	// valueEnd: PropTypes.string,
};

DateRange.defaultProps = {
	className: '',
	nameStart: 'dateStart',
	nameEnd: 'dateEnd',
	dateFormat: 'DD.MM.YYYY',
	onChange: noop,
	size: 'middle'
	// title: 'Период',
};

export default DateRange;