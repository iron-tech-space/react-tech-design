import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {DatePicker} from 'antd';
import moment from 'moment';
import {noop} from '../utils/baseUtils';
import {
	getMomentFromStringByFormat,
	getMomentWithOffsetTruncateDay,
} from '../utils/datesUtils';

const SingleDate = (props) => {
	/** Состояние первоначалной настройки компонента */
	const [mounted, setMounted] = useState(false);
	const [_value, setValue] = useState(null);

	const {dateFormat, defaultValue, name, onChange, title, value, className} = props;

	useEffect(() => {
		if (!mounted) {
			// console.log("DateRange mounted :", nameFrom, props.defaultValueFrom);
			if (defaultValue) {
				_onChange(
					name,
					getMomentFromStringByFormat(defaultValue, dateFormat)
				);
				setValue(getMomentFromStringByFormat(defaultValue, dateFormat));
			}
			setMounted(true);
		}
	}, [mounted]);

	useEffect(() => {
		if (value) {
			setValue(moment(value));
		} else if (!defaultValue) setValue(null);
	}, [value]);

	const _onChangePicker = (date) => {
		setValue(date);
		_onChange(name, date);
	};

	const _onChange = (name, value) => {
		if (value) onChange(name, getMomentWithOffsetTruncateDay(value));
		else onChange(name, value);
	};

	return (
		<div className={`single-date-container ${className}`}>
			<div className={'title'}>{title}</div>
			<DatePicker
				size={'small'}
				style={{width: '135px'}}
				onChange={_onChangePicker}
				format={dateFormat}
				placeholder={'Выберите дату'}
				value={_value}
			/>
		</div>
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
	value: PropTypes.string,
};

SingleDate.defaultProps = {
	name: 'date',
	dateFormat: 'DD.MM.YYYY',
	onChange: noop,
	title: 'Дата',
};

export default SingleDate;
