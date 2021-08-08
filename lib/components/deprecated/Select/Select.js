import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/typography/style';
import _Typography from 'antd/es/typography';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flatten, getTableRowKeys, noop, notificationError } from "../../utils/baseUtils";
import { rtPrefix } from '../../utils/variables';

import { DownOutlined, UpOutlined, CloseCircleFilled } from '@ant-design/icons';
import Table from '../Table/Table';
import { setDataStore } from "../../../redux/rtd.actions";
var Paragraph = _Typography.Paragraph;


var Select = function Select(props) {
	var _useState = useState([]),
	    _useState2 = _slicedToArray(_useState, 2),
	    _selectedRowKeys = _useState2[0],
	    setSelectedRowKeys = _useState2[1];

	var _useState3 = useState(null),
	    _useState4 = _slicedToArray(_useState3, 2),
	    _selectedRowData = _useState4[0],
	    _setSelectedRowData = _useState4[1];

	var _useState5 = useState(false),
	    _useState6 = _slicedToArray(_useState5, 2),
	    isSelectOpened = _useState6[0],
	    setIsSelectOpened = _useState6[1];

	var _useState7 = useState(false),
	    _useState8 = _slicedToArray(_useState7, 2),
	    isClickInSelect = _useState8[0],
	    setIsClickInSelect = _useState8[1];

	var name = props.name,
	    rowRender = props.rowRender,
	    className = props.className,
	    type = props.type,
	    title = props.title,
	    placeholder = props.placeholder,
	    selectedRowKeys = props.selectedRowKeys,
	    size = props.size,
	    widthControl = props.widthControl,
	    widthPopup = props.widthPopup,
	    heightPopup = props.heightPopup,
	    onChangeKeys = props.onChangeKeys,
	    defaultValue = props.defaultValue,
	    value = props.value,
	    defaultSelectedRowKeys = props.defaultSelectedRowKeys,
	    rowKey = props.rowKey,
	    expandColumnKey = props.expandColumnKey,
	    showSelection = props.showSelection,
	    requestLoadRows = props.requestLoadRows,
	    requestLoadDefault = props.requestLoadDefault,
	    commandPanelProps = props.commandPanelProps,
	    rows = props.rows,
	    dispatchPath = props.dispatchPath;


	var selectedDispatchPath = dispatchPath && dispatchPath + '.selected';
	var searchable = commandPanelProps && commandPanelProps.showElements && commandPanelProps.showElements.includes('search');
	var node = useRef(null);

	var setSelectedRowData = function setSelectedRowData(rowData) {
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, rowData);
		_setSelectedRowData(rowData);
	};

	var loadSelectedObject = function loadSelectedObject(_ref) {
		var selectedRowKeys = _ref.selectedRowKeys;

		if (selectedRowKeys) {
			var _selectedRowKeys2 = void 0;
			if (Array.isArray(selectedRowKeys)) {
				setSelectedRowKeys(selectedRowKeys);
				_selectedRowKeys2 = selectedRowKeys;
			} else {
				setSelectedRowKeys([selectedRowKeys]);
				_selectedRowKeys2 = [selectedRowKeys];
			}

			// console.log("setSelectedRowKeys[70] -> ", _selectedRowKeys);

			var request = requestLoadDefault ? requestLoadDefault : requestLoadRows;

			if (!!request && !rows && _selectedRowKeys2.length > 0) {
				// console.log('defaultSelectedRowKeys ', defaultSelectedRowKeys, defaultSelectedRowKeys.length);
				request({
					data: _defineProperty({}, rowKey, _selectedRowKeys2)
				}).then(function (response) {
					var result = response.data;
					// console.log("setSelectedRowData[84] => ", response.data);
					if (result.length > 0) setSelectedRowData(result[0]);
				}).catch(function (error) {
					return notificationError(error, 'Ошибка загрузки данных в Select');
				});
			} else if (rows && _selectedRowKeys2 && type === 'SingleSelect') {
				var srk = _selectedRowKeys2[0];
				// if(Array.isArray(selectedRowKeys) && selectedRowKeys.length > 0)
				// 	srk = selectedRowKeys[0];
				// else
				// 	srk = selectedRowKeys;

				var findRow = rows.find(function (row) {
					return row[rowKey] === srk;
				});
				// console.log("setSelectedRowData[98] => ", findRow, rows, srk);
				setSelectedRowData(findRow);
			} else {
				setSelectedRowData(null);
			}
		}
	};

	useEffect(function () {
		loadSelectedObject({ selectedRowKeys: defaultSelectedRowKeys });
		window.addEventListener('mousedown', handleMouseClick, false);
		return function () {
			window.removeEventListener('mousedown', handleMouseClick, false);
		};
	}, []);

	useEffect(function () {
		// console.log("selectedRowKeys", selectedRowKeys);
		loadSelectedObject({ selectedRowKeys: selectedRowKeys });
	}, [selectedRowKeys]);

	useEffect(function () {
		if (_selectedRowKeys !== undefined && _selectedRowData === undefined) {
			// console.log("useEffect rows", _selectedRowKeys, _selectedRowData, rows);
			loadSelectedObject({ selectedRowKeys: _selectedRowKeys });
		}
	}, [rows]);

	useEffect(function () {
		// console.log("isClickInSelect ", isClickInSelect);
		// console.log("isSelectOpened ", isSelectOpened);
		if (!isClickInSelect && isSelectOpened) onClosePopup();
	}, [isClickInSelect]);

	// useEffect(() => {
	// 	// console.log("setSelectedRowData[117] => ", props.value, props.defaultValue);
	// }, [props])

	var columns = [{
		key: rowKey,
		title: title,
		dataKey: rowKey,
		width: 500,
		cellRenderer: typeof rowRender === 'function' ? rowRender : function (_ref2) {
			var rowData = _ref2.rowData;
			return React.createElement(
				'div',
				{ className: 'rt-table-cell' },
				rowData[rowRender]
			);
		}
	}];

	var _getHeadCls = function _getHeadCls() {
		var cls = [rtPrefix + '-select-header'];

		if (isSelectOpened) cls.push('opened');

		if (_selectedRowKeys && _selectedRowKeys.length > 0) cls.push('selected');

		switch (size) {
			case 'small':
				cls.push(rtPrefix + '-select-header-sm');
				break;
			case 'large':
				cls.push(rtPrefix + '-select-header-lg');
				break;
			default:
				break;
		}

		return cls.join(' ');
	};

	var _getHeadText = function _getHeadText() {
		if (type === 'SingleSelect') {
			if (_selectedRowData) {
				if (typeof rowRender === 'function') return rowRender({ rowData: _selectedRowData });else return '' + _selectedRowData[rowRender];
			} else return '' + placeholder;
		} else {
			return _selectedRowKeys.length > 0 ? '\u0412\u044B\u0431\u0440\u0430\u043D\u043E: ' + _selectedRowKeys.length : '' + placeholder;
		}
	};

	var _getPopupCls = function _getPopupCls() {
		// console.log('_getPopupCls _selectedRowKeys => ', _selectedRowKeys);
		var cls = [rtPrefix + '-select-popup'];

		if (title) cls.push(rtPrefix + '-select-popup-with-title');

		return cls.join(' ');
	};
	var _getPopupStyle = function _getPopupStyle() {
		// if (heightPopup)
		// 	return {height: `${heightPopup}px`, width: `${widthPopup}px`};

		var height = {};
		var defRowsLen = 0;

		if (!requestLoadRows && rows) if (expandColumnKey) defRowsLen = flatten(getTableRowKeys(rows, rowKey)).length;else defRowsLen = rows.length;

		// console.log('_getPopupStyle', defRowsLen);
		if (defRowsLen && defRowsLen > 0) {
			height = defRowsLen * 30 + ( // Кол-во строк * высоту строки
			searchable ? 46 : 0) + ( // Размер поисковой строки или 0
			type === 'MultiSelect' ? 65 : 0) + ( // Размер футтера (30) + размер кнопки 35 или 0
			showSelection ? 200 : 0) + // Размер панели выбранных элементов или 0
			22; // Паддинги и бордер
			// console.log('heightPopup', height);
			if (height > heightPopup) height = heightPopup + 'px';else height = height + 'px';
		} else {
			// console.log("heightPopup", heightPopup);
			height = heightPopup + 'px';
		}

		// console.log("heightPopup, widthPopup", heightPopup, widthPopup);
		return { height: height, width: widthPopup + 'px' };
	};

	var getEvents = function getEvents() {
		return commandPanelProps && commandPanelProps.systemBtnProps && Object.keys(commandPanelProps.systemBtnProps) || [];
	};

	var _onChange = function _onChange(selectedKeys) {
		// console.log('_onChange [176]', selectedKeys);
		setSelectedRowKeys(selectedKeys);
		// setSelectedRowData(selectedObjects);
		onChangeKeys(name, selectedKeys.length ? selectedKeys : null);
		// onChangeObjects(name, selectedObjects.length ? selectedObjects : null);
		// setCountSelect(selectedKeys.length);
		if (type === 'SingleSelect') {
			setIsSelectOpened(false);
		}
	};

	var _SingleSelectRow = function _SingleSelectRow(_ref3) {
		var selected = _ref3.selected,
		    rowData = _ref3.rowData,
		    rowIndex = _ref3.rowIndex;

		// console.log("_SingleSelectRow => ", rowData);
		setSelectedRowData(rowData);
		// selected ? setSingleSelectRowData(rowData) : setSingleSelectRowData({})
	};

	var handleMouseClick = function handleMouseClick(e) {
		node && node.current && setIsClickInSelect(node.current.contains(e.target));
	};

	var onClosePopup = function onClosePopup() {
		setIsSelectOpened(false);
	};

	var onOpenPopup = function onOpenPopup() {
		if (!isSelectOpened) setIsSelectOpened(true);else setIsSelectOpened(false);
	};

	var onClickClear = function onClickClear() {
		// console.log("delete Selected");
		setSelectedRowData(null);
		_onChange([]);
	};

	return React.createElement(
		'div',
		{
			className: rtPrefix + '-select ' + (className ? className : ''),
			ref: node
		},
		title ? React.createElement(
			'div',
			{ className: 'title' },
			title
		) : null,
		React.createElement(
			'div',
			{
				className: _getHeadCls(),
				style: {
					width: widthControl === 0 ? '100%' : widthControl + 'px'
				}

			},
			React.createElement(
				'div',
				{ className: rtPrefix + '-select-selector'
					// onFocus={ () => {setIsSelectOpened(true)} }
					, onClick: onOpenPopup
				},
				React.createElement(
					Paragraph,
					{ ellipsis: true },
					' ',
					_getHeadText(),
					' '
				)
			),
			isSelectOpened ? React.createElement(UpOutlined, { onClick: onOpenPopup, className: rtPrefix + '-select-header-icon' }) : React.createElement(DownOutlined, { onClick: onOpenPopup, className: rtPrefix + '-select-header-icon' }),
			_selectedRowKeys.length > 0 ? React.createElement(CloseCircleFilled, { onClick: onClickClear, className: rtPrefix + '-select-header-clear' }) : null
		),
		isSelectOpened ? React.createElement(
			'div',
			{ className: _getPopupCls(), style: _getPopupStyle() },
			React.createElement(Table, _extends({}, props, {
				commandPanelProps: _extends({}, props.commandPanelProps, {
					showElements: getEvents() // getShowElements(),
				}),
				defaultSelectedRowKeys: _selectedRowKeys,
				selectedRowKeys: _selectedRowKeys,
				headerHeight: 0,
				columns: columns,
				type: !!requestLoadRows ? 'serverSide' : 'localSide'
				// showElements={searchable ? ['search'] : undefined}
				, selectable: type === 'MultiSelect',
				footerShow: type === 'MultiSelect',
				showSelection: showSelection,
				rowRenderShowSelection: rowRender,
				onRowClick: _SingleSelectRow,
				onSelectedRowsChange: _onChange
			})),
			type === 'MultiSelect' ? React.createElement(
				'div',
				{ className: 'close-panel' },
				React.createElement(
					_Button,
					{
						onClick: function onClick() {
							return setIsSelectOpened(false);
						},
						size: 'small'
					},
					'Ok'
				)
			) : null
		) : null
	);
};

Select.propTypes = {
	/** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
	name: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]).isRequired,

	/** Строка или функция для отображения элементов списка
  * Строка - имя поля
  * Функция - рендер строк. Параметры v
  * { rowData, rowIndex }) */
	rowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,

	/** Тип селекта (SingleSelect и MultiSelect) */
	type: PropTypes.oneOf(['SingleSelect', 'MultiSelect']).isRequired,

	/** Дополнительное имя класса для элемента */
	className: PropTypes.string,

	/** Заголовок фильтра */
	title: PropTypes.string,

	/** Строка, когда ничего не выбрано */
	placeholder: PropTypes.string,

	/** Запрос на загрузку дефолтных данных */
	requestLoadDefault: PropTypes.func,

	/** Массив выбранных значений */
	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Размер селектора ['small', 'middle', 'large'] */
	size: PropTypes.oneOf(['small', 'middle', 'large']),

	// /** Показывать ли поисковую строку */
	// searchable: PropTypes.bool,

	/** Ширина поля выбора в пикселях */
	widthControl: PropTypes.number,

	/** Ширина выпадающего меню */
	widthPopup: PropTypes.number,

	/** Высота выпадающего меню (по умолчанию считается сама) */
	heightPopup: PropTypes.number,

	/** Событие об изменении состояния селектора */
	onChangeKeys: PropTypes.func,

	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/** Высота строки таблицы */
	rowHeight: PropTypes.number,

	/** Строки будут в зебро-стиле */
	zebraStyle: PropTypes.bool,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadRows: PropTypes.func,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadCount: PropTypes.func,

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Имя параметра для поиска */
	searchParamName: PropTypes.string,

	/** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
	nodeAssociated: PropTypes.bool,

	/** Ключ колонки по которой строить иерархию */
	expandColumnKey: PropTypes.string,

	/** Открыть по умолчанию вложенность до уровня N или 'All' */
	expandDefaultAll: PropTypes.bool,

	/** Загружать ноды иерархии по одной */
	expandLazyLoad: PropTypes.bool,

	/** Поле в котором хранится ссылка на родителя */
	expandParentKey: PropTypes.string
};

Select.defaultProps = {
	onChangeKeys: noop,
	// onChangeObjects: noop,
	placeholder: 'Выбрать',
	// searchable: false,
	size: 'middle',
	widthControl: 110,
	widthPopup: 400,
	heightPopup: 600,
	rowKey: 'id',
	rowHeight: 30,
	zebraStyle: false,

	requestLoadDefault: undefined,
	requestLoadRows: undefined,
	requestLoadCount: undefined,
	searchValue: '',
	searchParamName: 'searchLine',

	nodeAssociated: true,
	expandColumnKey: undefined,
	expandDefaultAll: true,
	expandLazyLoad: false,
	expandParentKey: 'parentId'
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setDateStore: setDataStore }, dispatch);
};

export default connect(null, mapDispatchToProps)(Select);