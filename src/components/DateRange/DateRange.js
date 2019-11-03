import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {DatePicker} from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import {noop} from '../utils/baseUtils';
import {
	getMomentWithOffsetTruncateDay,
	getMomentFromStringByFormat,
} from '../utils/datesUtils';

const DateRange = (props) => {
	/** Состояние первоначалной настройки компонента */
	const [mounted, setMounted] = useState(false);
	const [startValue, setStartValue] = useState();
	const [endValue, setEndValue] = useState();

	const {
        className,
		nameStart,
		nameEnd,
		dateFormat,
		onChange,
		title,
		valueStart,
		valueEnd,
	} = props;

	useEffect(() => {
		if (!mounted) {
			// console.log("DateRange mounted :", nameStart, props.defaultValueStart);
			if (props.defaultValueStart) {
				_onChange(
					nameStart,
					getMomentFromStringByFormat(
						props.defaultValueStart,
						dateFormat
					)
				);
				setStartValue(
					getMomentFromStringByFormat(
						props.defaultValueStart,
						dateFormat
					)
				);
			}
			if (props.defaultValueEnd) {
				_onChange(
					nameEnd,
					getMomentFromStringByFormat(
						props.defaultValueEnd,
						dateFormat
					)
				);
				setEndValue(
					getMomentFromStringByFormat(
						props.defaultValueEnd,
						dateFormat
					)
				);
			}
			setMounted(true);
		}
	}, [mounted]);

	useEffect(() => {
		if (valueStart) {
			setStartValue(moment(valueStart));
			// console.log('useEffect -> valueStart', valueStart);
		} else if (!props.defaultValueStart) setStartValue(null);
	}, [valueStart]);
	useEffect(() => {
		if (valueEnd) {
			setEndValue(moment(valueEnd));
			// console.log('useEffect -> valueEnd', valueEnd);
		} else if (!props.defaultValueEnd) setEndValue(null);
	}, [valueEnd]);

	const disabledStartDate = (startValue) => {
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	};

	const disabledEndDate = (endValue) => {
		if (!endValue || !startValue) {
			return false;
		}
		return endValue.valueOf() <= startValue.valueOf();
	};

	const onStartChange = (date) => {
		setStartValue(date);
		_onChange(nameStart, date);
	};

	const onEndChange = (date) => {
		setEndValue(date);
		_onChange(nameEnd, date);
	};

	const _onChange = (name, value) => {
		if (value) onChange(name, getMomentWithOffsetTruncateDay(value));
		else onChange(name, value);
	};

	return (
		<div className={`date-range-container ${className}`}>
			<div>
				<div className={'title'}>{title}</div>
				<span className={'subtitleStart'}>c</span>
				<DatePicker
					locale={locale}
					// defaultValue={ checkDefValue(props.defaultValueStart) }
					size={'small'}
					style={{width: '135px'}}
					disabledDate={disabledStartDate}
					onChange={onStartChange}
					format={dateFormat}
					placeholder={'Выберите дату'}
					value={startValue}
				/>
			</div>
			<div>
				<span className={'subtitleEnd'}>по</span>
				<DatePicker
					locale={locale}
					// defaultValue={ checkDefValue(props.defaultValueEnd) }
					size={'small'}
					style={{width: '135px'}}
					disabledDate={disabledEndDate}
					onChange={onEndChange}
					format={dateFormat}
					placeholder={'Выберите дату'}
					value={endValue}
				/>
			</div>
		</div>
	);
};

DateRange.propTypes = {
	/** Формат отображения даты (не влияет на формат в onChange) */
	dateFormat: PropTypes.string,

	/** Значение по умолчанию для первого пикера */
	defaultValueStart: PropTypes.string,

	/** Значение по умолчанию для второго пикера */
	defaultValueEnd: PropTypes.string,

    /** Дополнительное имя класса для элемента */
    className: PropTypes.string,

	/** Наименование параметра для первого пикера */
	nameStart: PropTypes.string,

	/** Наименование параметра для второго пикера */
	nameEnd: PropTypes.string,

	/** Событие при изменении любого из пикеров */
	onChange: PropTypes.func,

	/** Заголовок */
	title: PropTypes.string,

	/** Значение даты первого пикера (используется для управления датой из родительного компонента) */
	valueStart: PropTypes.string,

	/** Значение даты второго пикера (используется для управления датой из родительного компонента) */
	valueEnd: PropTypes.string,
};

DateRange.defaultProps = {
	nameStart: 'dateStart',
	nameEnd: 'dateEnd',
	dateFormat: 'DD.MM.YYYY',
	onChange: noop,
	title: 'Период',
};

export default DateRange;
