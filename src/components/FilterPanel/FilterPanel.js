import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Tooltip} from 'antd';
import {noop} from '../utils/baseUtils';
import DateRange from '../DateRange/DateRange';
import SingleDate from '../SingleDate/SingleDate';
import Select from '../Select/Select';

const FilterPanel = (props) => {
	/**
	 * Период с, по (день / месяц / год)
	 * Множественный выбор (дерево с галочками с поиском) (ajax / const)
	 * Множественный выбор (список с поиском) (ajax / const)
	 * Единственный выбор (список с поиском) (ajax / const)
	 */

	const [filter, setFilter] = useState(props.defaultFilter);
	// const [multiSelectObjects, setMultiSelectObjects] = useState([]);

	const {
		applyFilterRender,
		borderStyle,
		onChangeFilter,
		onApplyFilter,
		configFilter,
		resetFilterRender,
	} = props;

	const _onChangeData = (name, value) => {
		// console.log("FilterPanel -> onChangeData", name, value);
		let _filter = {...filter};
		if (value === null) {
			delete _filter[name];
		} else {
			_filter = {..._filter, ...{[name]: value}};
		}
		// console.log("onChangeData:", _filter);
		setFilter(_filter);
		onChangeFilter(_filter);
	};

	const _applyFilter = () => {
		// console.log("_applyFilter:", filter);
		onApplyFilter(filter);
	};
	const _resetFilter = () => {
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

	return (
		<React.Fragment>
			{configFilter && configFilter.length ? (
				<div className={`filter-panel-container border-${borderStyle}`}>
					{configFilter.map((item, index) => {
						// console.log("item.defaultRows", item.defaultRows);
						switch (item.type) {
							case 'DateRange':
								return (
									<DateRange
										key={index}
										{...item}
                                        className={`filter-panel-item ${item.className}`}
										defaultValueStart={
											filter[item.nameStart]
												? filter[item.nameStart]
												: null
										}
										defaultValueEnd={
											filter[item.nameEnd]
												? filter[item.nameEnd]
												: null
										}
										onChange={_onChangeData}
										valueStart={filter[item.nameStart]}
										valueEnd={filter[item.nameEnd]}
									/>
								);
							case 'SingleDate':
								return (
									<SingleDate
										key={index}
										{...item}
                                        className={`filter-panel-item ${item.className}`}
										dateFormat={
											item.dateFormat
												? item.dateFormat
												: undefined
										}
										defaultValue={
											filter[item.name]
												? filter[item.name]
												: null
										}
										onChange={_onChangeData}
										value={filter[item.name]}
									/>
								);
							case 'MultiSelect':
							case 'SingleSelect':
								return (
									<Select
										key={index}
										{...item}
                                        className={`filter-panel-item ${item.className}`}
										onChangeKeys={_onChangeData}
									/>
								);
							default:
								return null;
						}
					})}
					<Tooltip title='Применить фильтр'>
						<Button
							type='primary'
							size={'small'}
							style={{marginLeft: 'auto'}}
							onClick={_applyFilter}
						>
							{applyFilterRender}
						</Button>
					</Tooltip>
					<Tooltip title='Сбросить фильтр'>
						<Button
							size={'small'}
							style={{marginLeft: '10px'}}
							onClick={_resetFilter}
						>
							{resetFilterRender}
						</Button>
					</Tooltip>
				</div>
			) : null}
		</React.Fragment>
	);
};

FilterPanel.propTypes = {
	/** Строка / функция / элемент для отображения в кнопке "Применить фильтр" */
	applyFilterRender: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.element,
		PropTypes.string,
	]),

	/** Тип бордера панели (по умолчанию 'none')
	 * ['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right'] */
	borderStyle: PropTypes.oneOf([
		'all',
		'none',
		'top',
		'left',
		'bottom',
		'right',
		'top-bottom',
		'left-right',
	]),

	/** Объект фильтра по умолчанию */
	defaultFilter: PropTypes.object,

	/** Конфигурация панели фильтров */
	configFilter: PropTypes.arrayOf(PropTypes.object),

	/** Событие по кнопке выполнить фильтр */
	onApplyFilter: PropTypes.func,

	/** Событие по изменение объекта фильтра */
	onChangeFilter: PropTypes.func,

	/** Строка / функция / элемент для отображения в кнопке "Сбросить фильтр" */
	resetFilterRender: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.element,
		PropTypes.string,
	]),
};

FilterPanel.defaultProps = {
	borderStyle: 'none',
	defaultFilter: {},
	configFilter: [],
	onApplyFilter: noop,
	onChangeFilter: noop,
	applyFilterRender: 'Применить',
	resetFilterRender: 'Сбросить',
};

export default FilterPanel;
