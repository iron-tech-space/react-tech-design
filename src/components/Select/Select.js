import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { notification, Select as AntSelect } from "antd";
import {
	generateUUID,
	getObjectExcludedProps,
	notificationError, useMounted
} from "../utils/baseUtils";

import { CheckOutlined } from '@ant-design/icons';

const excludeProps = [
	'componentType',
	'defaultSortBy',
	'defaultFilter',
	'defaultSearchValue',
	'sortBy',
	'filter',
	'searchValue',
	'searchParamName',
    'lostParamName',
	'infinityMode',
	'requestLoadRows',
	'optionConverter',
	'options',
	'widthControl',
	'pageSize'
];

/** Компонент выбора элемента(ов) из списка */
const Select = props => {

	const {
		// Rt Props
		defaultSortBy,
		defaultFilter,
		defaultSearchValue,
		sortBy,
		filter,
		searchValue,
		searchParamName,
		lostParamName,
		infinityMode,
		requestLoadRows,
		optionConverter,
		options,
		widthControl,
		pageSize,

		// Ant Props
		mode,
		onChange,
		value,
	} = props;

	/** Наличие на сервере еще данных */
	const [_hasMore, _setHasMore] = useState(true);
	/** Индикатор загрузки данных */
	const [_loading, _setLoading] = useState(false);
	/** Опции селекта */
	const [_options, _setOptions] = useState(options);
	const [tmpOption, setTmpOption] = useState({});

	/** Индикатор достижения низа окна */
	const [isEndReached, setIsEndReached] = useState(false);

	/** Объект сортировки */
	const [_sortBy, _setSortBy] = useState(undefined);
	/** Объект фильтрации */
	const [_filter, _setFilter] = useState({});
	/** Строка поиска */
	const [_searchValue, _setSearchValue] = useState(undefined);

	/** Состояние параметра выбрать все */
	const [_isSelectAll, _setIsSelectAll] = useState(false);

	const isMounted = useMounted()

	useEffect(() => {
		_setSearchValue(defaultSearchValue);
		_loadOptions({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchValue: defaultSearchValue,
			reload: true,
		});
	}, []);

	useEffect(() => {
		if(isMounted) {
			_setRowsHandler(options);
		}
	}, [options]);

	useEffect(() => {
		// console.log("Change sortBy, filter, searchValue", sortBy, filter, searchValue);
		if(isMounted) {
			const __sortBy = sortBy ? sortBy : _sortBy;
			const __filter = filter ? filter : _filter;
			const __searchValue = searchValue ? searchValue : _searchValue;
			_setSortBy(__sortBy);
			_setFilter(__filter);
			_setSearchValue(__searchValue);
			_loadOptions({
				sortBy: __sortBy,
				filter: __filter,
				searchLine: __searchValue,
				reload: true,
			});
		}
	}, [sortBy, filter, searchValue]);

	const _setRowsHandler = (options) => {
		_setOptions(options);
		// console.log('Select _setRowsHandler value => ', options)
		if(mode === 'multiple') {
			if(Array.isArray(value))
				if(options.reduce((preValue, item) => value.includes(item.value) ? preValue + 1 : preValue, 0) === options.length)
					_setIsSelectAll(true);
				else
					_setIsSelectAll(false);
			onChange(value);
		} else {
			if(options && options.findIndex(option => option.value === value) === -1){
				// console.log('Load tmpOption');
				_loadTmpOption();
			} else {
				// console.log('Clear tmpOption');
				setTmpOption(undefined)
			}
		}
		// setRows(rows);
		// rowsDispatch(rows);
	};

	const getPageNum = (reload) =>
		reload ? 0 : Math.floor(_options.length / pageSize);

	const getSort = (sortBy) =>
		sortBy && sortBy.key ? sortBy.key + ',' + sortBy.order : null;

	const getSearchValue = (searchValue) =>
		searchValue ? {[searchParamName]: searchValue} : null

	const _loadOptions = (params) => {
		// console.log('_dataProcessing', params);
		const {sortBy, filter, searchValue, reload} = params;
		if ((_hasMore || reload) && !_loading && requestLoadRows) {
			_setLoading(true);

			const requestOptions = {
				params: {
					page: getPageNum(reload),
					size: pageSize,
					sort: getSort(sortBy)
				},
				data: {
					...filter,
					...getSearchValue(searchValue)
				}
			}
			// console.log('dataQuery', dataQuery);

			requestLoadRows(requestOptions)
				.then((response) => {
					// console.log("infinity then response", response);
					const result = response.data;

					if (result && result.length < pageSize) {
						_setHasMore(false);
					} else {
						_setHasMore(true);
						setIsEndReached(false);
					}
					reload
						? _setRowsHandler(result.map(option => optionConverter(option))) // _setRows
						: _setRowsHandler(_options.concat(result.map(option => optionConverter(option)))); // _setRows

					// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);

					_setLoading(false);
				})
				.catch((error) => {
					notificationError(error, 'Ошибка загрузки данных')
					_setRowsHandler(_options); // _setRows
					// setHasMore(false);
					_setLoading(false);
				});
		}
	};

	const _loadTmpOption = () => {
		if(requestLoadRows){
			requestLoadRows({params: {}, data: {[lostParamName]: value}})
				.then((response) => {
					if(response.data){
						if(response.data.length === 1){
							setTmpOption(optionConverter(response.data[0]))
						} else {
							notification.error({ message: `Ошибка загрузки потерянного элемента` });
						}
					}
				})
				.catch((error) => {
					notificationError(error, 'Ошибка загрузки данных')
					setTmpOption(undefined)
				});
		}
	}

	const onScroll = (event) => {
		let scrollTopMax = event.nativeEvent.target.scrollTopMax
		let scrollTop = event.nativeEvent.target.scrollTop//.body.scrollTop

		const onEndReached = scrollTopMax - scrollTop;

		if(onEndReached < 300 && !isEndReached) {
			// console.log('Load Data');
			setIsEndReached(true);
			_setSearchValue(defaultSearchValue);
			if(infinityMode){
				_loadOptions({
					sortBy: defaultSortBy,
					filter: defaultFilter,
					searchValue: defaultSearchValue,
					reload: false,
				});
			}
		}

		// console.log("scrollTopMax / scrollTop", scrollTopMax, scrollTop, onEndReached);
		// const lastScrollTop = this._scroll.scrxollTop;
		// if (args.scrollTop > lastScrollTop) this._maybeCallOnEndReached();
	}

	const onSearch = (value) => {
		_setSearchValue(value);
		_loadOptions({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchValue: value,
			reload: true,
		});
	}

	const _onChangeSelectAll = () => {
		// console.log(`_onChangeSelectAll`, _isSelectAll);
		if(mode === 'multiple') {
			if (_isSelectAll) {
				const optionsValues = _options.map(item => item.value);
				onChange(value.filter(item => !optionsValues.includes(item)));
				_setIsSelectAll(false);
			} else {
				if (Array.isArray(value) && value.length > 0)
					onChange([...new Set([...value, ..._options.map(item => item.value)])]);
				else
					onChange([...new Set([..._options.map(item => item.value)])]);
				_setIsSelectAll(true);
			}
		} else
			onChange(undefined);
	}
    const _onChange = (value) => {
        // console.log(`_onChange selected`, value);
        if(Array.isArray(value))
        	if(_options.reduce((preValue, item) => value.includes(item.value) ? preValue + 1 : preValue, 0) === _options.length)
        		_setIsSelectAll(true);
        	else
				_setIsSelectAll(false);

		onChange(value);
    }

    const getSelectAllCls = () => {
		let cls = ['ant-select-item', 'ant-select-item-option', 'ant-select-item-option-select-all'];
		if(_isSelectAll)
			cls.push('ant-select-item-option-selected');
		return cls.join(' ');
	}

	const childProps = getObjectExcludedProps(props, excludeProps);
    return (
		<AntSelect
			showArrow={true}
			showSearch={true}
			allowClear={true}
			filterOption={false}
			autoClearSearchValue={true}

			{...childProps}

			searchValue={_searchValue}
			style={{ width: widthControl }}
			// listHeight={heightPopup}
			// defaultValue={['a10', 'c12']}
			onChange={_onChange}
			maxTagCount={0}
			maxTagPlaceholder={(omittedValues) => `Выбрано: ${omittedValues.length}`}
			// dropdownMatchSelectWidth={200}
			// listItemHeight={10} listHeight={250}
			onPopupScroll={onScroll}
			onSearch={onSearch}
			dropdownRender={menu => (
				<React.Fragment>
					{mode === 'multiple' ?
						<div className={getSelectAllCls()} onClick={_onChangeSelectAll}>
							<div className="ant-select-item-option-content">
								<span>Выбрать все</span>
							</div>
							{_isSelectAll ?
								<span className="ant-select-item-option-state"><CheckOutlined/></span> : null}
						</div>
						: null
					}
					{menu}
				</React.Fragment>
			)}
		>
    		{_options && _options.map(({ label, value, className, disabled }, i) =>
				<AntSelect.Option key={i.toString(36) + i} value={value} className={className} disabled={disabled}>{label}</AntSelect.Option>)}
			{tmpOption &&
				<AntSelect.Option key={generateUUID()} value={tmpOption.value} className={tmpOption.className} disabled={tmpOption.disabled}>{tmpOption.label}</AntSelect.Option>}
    	</AntSelect>
    );
};

Select.propTypes = {
	/** Сортировка по умолчанию */
	defaultSortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc']),
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

	lostParamName: PropTypes.string,

	/** Режим загружки по скроллу */
	infinityMode: PropTypes.bool,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadRows: PropTypes.func,

	/** Функция преобразования загруженных объектов в объекты для селекта.
	 * Сигнатура `(option) => ({})`
	 * Требоваеть вернуть объект с параметрам
	 * `{ label: ReactNode, value: any, className: string, disabled: bool }`
	 * ##### Example:
	 * ``` JS
	 * (option) => ({
	 * 	label: (<span><MehOutlined />{option.name}</span>),
	 * 	value: option.id,
	 * 	className: 'some-class',
	 * 	disabled: false,
	 * })
	 * ```
	 */
	optionConverter: PropTypes.func,

	/** Select options `[{ label, value, className, disabled }]` */
	options: PropTypes.arrayOf(PropTypes.object),

	/** Ширина поля выбора в пикселях */
	widthControl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

	/** Размер страницы */
	pageSize: PropTypes.number,
};

Select.defaultProps = {
	// Rt Props
	defaultSortBy: undefined,
	defaultFilter: {},
	defaultSearchValue: undefined,
	infinityMode: false,
	requestLoadRows: undefined,
	options: [],
	widthControl: '100%',
	pageSize: 50,
	searchParamName: 'name',
	lostParamName: 'id',
}

export default Select;
