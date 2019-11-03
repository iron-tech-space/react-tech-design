import 'antd/es/notification/style';
import _notification from 'antd/es/notification';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import SortOrder from 'react-base-table/lib/SortOrder';
import BaseTable, { AutoResizer, Column, callOrReturn } from 'react-base-table';
import 'antd/es/spin/style';
import _Spin from 'antd/es/spin';
import { LoadingOutlined, PlusOutlined, CopyOutlined, FolderAddOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, SettingOutlined, FilterOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/popconfirm/style';
import _Popconfirm from 'antd/es/popconfirm';
import 'antd/es/tooltip/style';
import _Tooltip from 'antd/es/tooltip';
import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';
import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'antd/es/typography/style';
import _Typography from 'antd/es/typography';

var empty = React.createElement(
	'div',
	{ className: 'BaseTable__overlay' },
	' ',
	React.createElement(
		'span',
		null,
		'\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445'
	),
	' '
);

var overlay = React.createElement(
	'div',
	{ className: 'BaseTable__overlay' },
	' ',
	React.createElement(_Spin, {
		tip: '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...',
		indicator: React.createElement(LoadingOutlined, { style: { fontSize: 24 }, spin: true })
	}),
	' '
);

var noop = function noop() {};

var flatten = function flatten(arrayOfArrays) {
	return arrayOfArrays.reduce(function (flattened, item) {
		return flattened.concat(Array.isArray(item) ? flatten(item) : [item]);
	}, []);
};

var getTableRowObjects = function getTableRowObjects(data) {
	var rowKeys = data.map(function (item) {
		if (item.children && item.children.length) {
			return [item, getTableRowObjects(item.children)];
		}
		return item;
	});
	return rowKeys;
};

var getTableRowKeys = function getTableRowKeys(data, rowKey) {
	var rowKeys = data.map(function (item) {
		if (item.children && item.children.length) {
			return [item[rowKey], getTableRowKeys(item.children, rowKey)];
		}
		return item[rowKey];
	});
	return rowKeys;
};

var findNodeByRowKey = function findNodeByRowKey(data, rowKey, rowValue) {
	var node = {};
	var item = {};
	for (var i = 0; i < data.length; i++) {
		item = _findNodeByRowKey(data[i], rowKey, rowValue);
		if (item !== false) return item;
	}
	return node;
};

var _findNodeByRowKey = function _findNodeByRowKey(currentNode, rowKey, value) {
	var i = void 0,
	    currentChild = void 0,
	    result = void 0;

	if (value === currentNode[rowKey]) {
		return currentNode;
	} else {
		if (currentNode.children) {
			for (i = 0; i < currentNode.children.length; i += 1) {
				currentChild = currentNode.children[i];
				result = _findNodeByRowKey(currentChild, rowKey, value);
				if (result !== false) return result;
			}
		}
		return false;
	}
};

var generateUUID = function generateUUID() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
		return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
	});
};

var SelectionHead = function SelectionHead(props) {
	var column = props.column,
	    container = props.container;
	var onSelectAll = column.onSelectAll,
	    selectedRowKeys = column.selectedRowKeys,
	    selectAll = column.selectAll;


	var _handleChange = function _handleChange(e) {
		var rowKeys = flatten(getTableRowKeys(container.props.data, column.rowKey));
		var totalLength = rowKeys.length;
		var selectLength = selectedRowKeys.length;
		var checked = !(totalLength === selectLength);

		// const newRowKeys = container.props.data.map((item) => { return item[column.rowKey] });
		onSelectAll({ selected: checked, rowKeys: rowKeys });
	};

	return React.createElement(_Checkbox, {
		indeterminate: selectAll === null,
		onChange: _handleChange,
		checked: selectAll
	});
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var getRowChildren = function getRowChildren(data, rowKey) {
	return data.map(function (item) {
		if (item.children && item.children.length) {
			return [item[rowKey], getRowChildren(item.children, rowKey)];
		}
		return item[rowKey];
	});
};

var findBrothers = function findBrothers(data, selfItem, rowKey, parentKey) {
	var rowKeys = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

	var arr = [];
	data.forEach(function (item) {
		if (item[parentKey] && item[parentKey] === selfItem[parentKey] && item[rowKey] !== selfItem[rowKey]) {
			if (rowKeys !== null) {
				if (rowKeys.includes(item[rowKey])) {
					arr.push(item[rowKey]);
				}
			} else {
				arr.push(item[rowKey]);
			}
		} else if (item.children && item.children.length) {
			arr.push(findBrothers(item.children, selfItem, rowKey, parentKey, rowKeys));
		}
	});
	return arr;
};

var parentAnalysis = function parentAnalysis(_ref) {
	var rowData = _ref.rowData,
	    rowKey = _ref.rowKey,
	    parentKey = _ref.parentKey,
	    checked = _ref.checked,
	    nodeAssociated = _ref.nodeAssociated,
	    treeData = _ref.treeData,
	    selectedRowKeys = _ref.selectedRowKeys,
	    indeterminateRowKeys = _ref.indeterminateRowKeys;

	var _selectedRowKeys = [].concat(toConsumableArray(selectedRowKeys));
	var _indeterminateRowKeys = [].concat(toConsumableArray(indeterminateRowKeys));

	var currentRowData = rowData;
	var parentExist = !!currentRowData[parentKey];
	var lastTypeSelect = checked ? 'checked' : 'square';
	var typeSelect = '';
	var nextSquare = false;

	/** Пока есть родитель */
	while (parentExist && nodeAssociated) {
		var indeterminateBrothers = flatten(findBrothers(treeData, currentRowData, rowKey, parentKey, _indeterminateRowKeys));
		var selectedBrothers = flatten(findBrothers(treeData, currentRowData, rowKey, parentKey, _selectedRowKeys));
		var allBrothers = flatten(findBrothers(treeData, currentRowData, rowKey, parentKey));

		if (checked) {
			if (lastTypeSelect === 'checked' && selectedBrothers.length === allBrothers.length) typeSelect = 'checked';else typeSelect = 'square';
		} else {
			if (!checked && !nextSquare && (selectedBrothers.length || indeterminateBrothers.length)) nextSquare = true;
			if (nextSquare) typeSelect = 'square';else typeSelect = 'none';
		}

		// console.log("allBrothers ", allBrothers);
		// console.log("findParentById ", treeData,
		//     rowKey,
		//     parentKey,
		//     currentRowData[parentKey]);
		//
		// console.log("findNodeByRowKey ", findNodeByRowKey(treeData, rowKey, currentRowData[parentKey]));

		// Найти родителя
		currentRowData = findNodeByRowKey(treeData, rowKey, currentRowData[parentKey]);

		if (typeSelect === 'checked') {
			// Выделить галкой
			// console.log("checked");
			lastTypeSelect = 'checked';
			if (!_selectedRowKeys.includes(currentRowData[rowKey])) _selectedRowKeys.push(currentRowData[rowKey]);
			var index = _indeterminateRowKeys.indexOf(currentRowData[rowKey]);
			if (index > -1) _indeterminateRowKeys.splice(index, 1);
		} else if (typeSelect === 'square') {
			// Выдлеить квадратом
			// console.log("square: ");
			lastTypeSelect = 'square';
			if (!_indeterminateRowKeys.includes(currentRowData[rowKey])) _indeterminateRowKeys.push(currentRowData[rowKey]);
			var _index = _selectedRowKeys.indexOf(currentRowData[rowKey]);
			if (_index > -1) _selectedRowKeys.splice(_index, 1);
		} else if (typeSelect === 'none') {
			// Снять выделение
			// console.log("none: ");
			lastTypeSelect = 'none';
			var indexS = _selectedRowKeys.indexOf(currentRowData[rowKey]);
			if (indexS > -1) _selectedRowKeys.splice(indexS, 1);
			var indexI = _indeterminateRowKeys.indexOf(currentRowData[rowKey]);
			if (indexI > -1) _indeterminateRowKeys.splice(indexI, 1);
		}

		parentExist = !!currentRowData[parentKey];
		// parentExist = проверка наличия след родителя
	}

	return [_selectedRowKeys, _indeterminateRowKeys];
};

var SelectionCell = function SelectionCell(props) {
	var _handleChange = function _handleChange(checked) {
		var rowData = props.rowData,
		    rowIndex = props.rowIndex,
		    column = props.column,
		    container = props.container;
		var onChange = column.onChange,
		    selectedRowKeys = column.selectedRowKeys,
		    indeterminateRowKeys = column.indeterminateRowKeys,
		    rowKey = column.rowKey,
		    parentKey = column.parentKey,
		    nodeAssociated = column.nodeAssociated;

		// const rowKeys = flatten(getTableRowKeys([rowData], column.rowKey));
		// const totalLength = container.props.data.length;
		// const checked = e.target.checked;
		// const currentRowKey = {[rowKey]: rowData[rowKey], checked};
		// console.log("_handleChange: ", selectedRowKeys);

		var _selectedRowKeys = [].concat(toConsumableArray(selectedRowKeys));
		var _indeterminateRowKeys = [].concat(toConsumableArray(indeterminateRowKeys));

		/** Обработка себя, поиск детей, выделение / снятие их */
		var rowChildren = [];
		if (checked) {
			if (rowData.children && nodeAssociated) rowChildren = flatten(getRowChildren(rowData.children, rowKey));

			_selectedRowKeys = _selectedRowKeys.concat([rowData[rowKey]]).concat(rowChildren);
			_indeterminateRowKeys = _indeterminateRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
		} else {
			if (rowData.children && nodeAssociated) rowChildren = flatten(getRowChildren(rowData.children, rowKey));

			_selectedRowKeys = _selectedRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
			_indeterminateRowKeys = _indeterminateRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
		}

		//return [...new Set(_disabledElements)]
		// onChange({ selected: checked, totalLength, rowData, rowIndex });

		/** Выясняем новое состояние галочки "Выделить все" */
		var _parentAnalysis = parentAnalysis({
			rowData: rowData,
			rowKey: rowKey,
			parentKey: parentKey,
			checked: checked,
			nodeAssociated: nodeAssociated,
			treeData: container.props.data,
			selectedRowKeys: _selectedRowKeys,
			indeterminateRowKeys: _indeterminateRowKeys
		});

		var _parentAnalysis2 = slicedToArray(_parentAnalysis, 2);

		_selectedRowKeys = _parentAnalysis2[0];
		_indeterminateRowKeys = _parentAnalysis2[1];
		var selectAll = void 0;
		var selectLength = _selectedRowKeys.length;
		var totalLength = flatten(getTableRowKeys(container.props.data, column.rowKey)).length;
		if (selectLength === 0) selectAll = false;else if (totalLength === selectLength) selectAll = true;else if (totalLength !== selectLength) selectAll = null;

		onChange({
			selected: checked,
			_selectedRow: {
				rowData: _extends({}, rowData),
				rowIndex: rowIndex,
				rowKey: rowKey
			},
			_selectAll: selectAll,
			_selectedRowKeys: [].concat(toConsumableArray(new Set(_selectedRowKeys))),
			_indeterminateRowKeys: [].concat(toConsumableArray(new Set(_indeterminateRowKeys)))
		});

		// let uniqIds = {};
		// onChange({selected: checked, rowKeys: rowKeys.filter(obj => !uniqIds[obj[rowKey]] && (uniqIds[obj[rowKey]] = true)) });
	};

	var rowData = props.rowData,
	    column = props.column;
	var selectedRowKeys = column.selectedRowKeys,
	    indeterminateRowKeys = column.indeterminateRowKeys,
	    rowKey = column.rowKey;

	var det = indeterminateRowKeys.includes(rowData[rowKey]);
	var checked = selectedRowKeys.includes(rowData[rowKey]);

	return React.createElement(_Checkbox, {
		indeterminate: det,
		onChange: function onChange(e) {
			return _handleChange(e.target.checked);
		},
		checked: checked
	});
};

var confirm = _Modal.confirm;


var CommandPanel = function CommandPanel(props) {
	var borderStyle = props.borderStyle,
	    defaultValueSearch = props.defaultValueSearch,
	    deleteConfirm = props.deleteConfirm,
	    deleteConfirmType = props.deleteConfirmType,
	    deleteConfirmTitle = props.deleteConfirmTitle,
	    deleteConfirmDescription = props.deleteConfirmDescription,
	    onClickAdd = props.onClickAdd,
	    onClickAddAsCopy = props.onClickAddAsCopy,
	    onClickAddGroup = props.onClickAddGroup,
	    onClickDelete = props.onClickDelete,
	    onClickEdit = props.onClickEdit,
	    onClickUp = props.onClickUp,
	    onClickDown = props.onClickDown,
	    onSearch = props.onSearch,
	    showElements = props.showElements,
	    disabledElements = props.disabledElements,
	    leftCustomSideElement = props.leftCustomSideElement,
	    centerCustomSideElement = props.centerCustomSideElement,
	    rightCustomSideElement = props.rightCustomSideElement;


	var _onClickDelete = function _onClickDelete(event) {
		if (deleteConfirmType === 'Modal') {
			deleteButtonModalConfirm();
		} else {
			onClickDelete(event);
		}
	};

	var deleteButton = function deleteButton(withOnClick) {
		return React.createElement(
			_Tooltip,
			{ title: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C' },
			React.createElement(
				'button',
				{
					disabled: disabledElements.includes('delete'),
					onClick: withOnClick ? _onClickDelete : null
				},
				React.createElement(DeleteOutlined, null)
			)
		);
	};

	var deleteButtonPopupConfirm = function deleteButtonPopupConfirm() {
		return React.createElement(
			_Popconfirm,
			{
				placement: 'top',
				title: deleteConfirmDescription,
				onConfirm: onClickDelete,
				okText: '\u0414\u0430',
				cancelText: '\u041D\u0435\u0442'
			},
			deleteButton(false)
		);
	};

	function deleteButtonModalConfirm() {
		confirm({
			title: deleteConfirmTitle,
			icon: React.createElement(ExclamationCircleOutlined, null),
			content: deleteConfirmDescription,
			centered: true,
			okText: 'Ок',
			cancelText: 'Отмена',
			onOk: function onOk() {
				onClickDelete();
			}
		});
	}

	return React.createElement(
		React.Fragment,
		null,
		showElements.length || leftCustomSideElement || centerCustomSideElement || rightCustomSideElement ? React.createElement(
			'div',
			{
				className: 'command-panel-container border-' + borderStyle
			},
			React.createElement(
				'div',
				{ className: 'left-system-side' },
				showElements.includes('add') ? React.createElement(
					_Tooltip,
					{ title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('add'),
							onClick: onClickAdd
						},
						React.createElement(PlusOutlined, null)
					)
				) : null,
				showElements.includes('addAsCopy') ? React.createElement(
					_Tooltip,
					{ title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('addAsCopy'),
							onClick: onClickAddAsCopy
						},
						React.createElement(CopyOutlined, null)
					)
				) : null,
				showElements.includes('addGroup') ? React.createElement(
					_Tooltip,
					{ title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('addGroup'),
							onClick: onClickAddGroup
						},
						React.createElement(FolderAddOutlined, null)
					)
				) : null,
				showElements.includes('edit') ? React.createElement(
					_Tooltip,
					{ title: '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('edit'),
							onClick: onClickEdit
						},
						React.createElement(EditOutlined, null)
					)
				) : null,
				showElements.includes('delete') ? deleteConfirm ? deleteConfirmType === 'Popup' ? deleteButtonPopupConfirm() : deleteButton(true) : deleteButton(true) : null,
				showElements.includes('up') ? React.createElement(
					_Tooltip,
					{ title: '\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('up'),
							onClick: onClickUp
						},
						React.createElement(ArrowUpOutlined, null)
					)
				) : null,
				showElements.includes('down') ? React.createElement(
					_Tooltip,
					{ title: '\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('down'),
							onClick: onClickDown
						},
						React.createElement(ArrowDownOutlined, null)
					)
				) : null
			),
			React.createElement(
				'div',
				{ className: 'left-custom-side' },
				leftCustomSideElement
			),
			React.createElement(
				'div',
				{ className: 'center-custom-side' },
				centerCustomSideElement
			),
			React.createElement(
				'div',
				{ className: 'right-custom-side' },
				rightCustomSideElement
			),
			React.createElement(
				'div',
				{ className: 'right-system-side' },
				showElements.includes('search') ? React.createElement(_Input.Search, {
					disabled: disabledElements.includes('search'),
					defaultValue: defaultValueSearch,
					size: 'small',
					placeholder: '\u041F\u043E\u0438\u0441\u043A',
					onSearch: onSearch,
					className: 'search'
				}) : null,
				showElements.includes('settings') ? React.createElement(
					_Tooltip,
					{
						title: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0442\u0430\u0431\u043B\u0438\u0446\u044B',
						placement: 'topRight'
					},
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('settings'),
							onClick: function onClick() {}
						},
						React.createElement(SettingOutlined, null)
					)
				) : null,
				showElements.includes('filter') ? React.createElement(
					_Tooltip,
					{
						title: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432',
						placement: 'topRight'
					},
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('filter'),
							onClick: function onClick() {}
						},
						React.createElement(FilterOutlined, null)
					)
				) : null
			)
		) : null
	);
};

CommandPanel.propTypes = {
	/** Центральный кастомный элемент командной панели */
	centerCustomSideElement: PropTypes.element,

	/** Тип бордера панели (по умолчанию 'bottom')
  * ['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right'] */
	borderStyle: PropTypes.oneOf(['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right']),

	/** Значение по умолчанию для строки поиска */
	defaultValueSearch: PropTypes.string,

	/** Нужно ли делать подтверждение на кнопке удалить */
	deleteConfirm: PropTypes.bool,

	/** Тип подтверждения удаления 'Popup' / 'Modal' */
	deleteConfirmType: PropTypes.oneOf(['Popup', 'Modal']),

	/** Текст подтверждения на удаление элемента */
	deleteConfirmTitle: PropTypes.string,

	/** Текст подтверждения на удаление элемента */
	deleteConfirmDescription: PropTypes.string,

	/** Массив элементов командной панели для блокировки
     ['add', 'addAsCopy', 'addGroup', 'delete', 'edit', 'up', 'down', 'search', 'settings', 'filter'] */
	disabledElements: PropTypes.arrayOf(PropTypes.string),

	/** Левый кастомный элемент командной панели */
	leftCustomSideElement: PropTypes.element,

	/** Событие при нажатии на кнопку "Добавить" */
	onClickAdd: PropTypes.func,

	/** Событие при нажатии на кнопку "Добавить копированием" */
	onClickAddAsCopy: PropTypes.func,

	/** Событие при нажатии на кнопку "Добавить группу" */
	onClickAddGroup: PropTypes.func,

	/** Событие при нажатии на кнопку "Удалить" */
	onClickDelete: PropTypes.func,

	/** Событие при нажатии на кнопку "Переместить вниз" */
	onClickDown: PropTypes.func,

	/** Событие при нажатии на кнопку "Изменить" */
	onClickEdit: PropTypes.func,

	/** Событие при нажатии на кнопку "Переместить вверх" */
	onClickUp: PropTypes.func,

	/** Событие при поиске */
	onSearch: PropTypes.func,

	/** Правый кастомный элемент командной панели */
	rightCustomSideElement: PropTypes.element,

	/** Массив элементов командной панели, которые надо отобразить
     ['add', 'addAsCopy', 'addGroup', 'delete', 'edit', 'up', 'down', 'search', 'settings', 'filter'] */
	showElements: PropTypes.arrayOf(PropTypes.string)
};

CommandPanel.defaultProps = {
	centerCustomSideElement: undefined,
	borderStyle: 'bottom',
	defaultValueSearch: undefined,
	deleteConfirm: true,
	deleteConfirmType: 'Modal',
	deleteConfirmTitle: 'Подтвержение удаления',
	deleteConfirmDescription: 'Вы действительно хотите удалить?',
	disabledElements: [],
	leftCustomSideElement: undefined,
	onClickAdd: noop,
	onClickAddAsCopy: noop,
	onClickAddGroup: noop,
	onClickDelete: noop,
	onClickEdit: noop,
	onClickUp: noop,
	onClickDown: noop,
	onSearch: noop,
	rightCustomSideElement: undefined,
	showElements: []
};

var APP_TIME_OFFSET = 3;

var getMomentFromStringByFormat = function getMomentFromStringByFormat(date, format) {
	return date ? moment(date, format).utcOffset(APP_TIME_OFFSET) : null;
};

var getMomentWithOffset = function getMomentWithOffset(date) {
	return moment(date).utcOffset(APP_TIME_OFFSET);
};

var getMomentWithOffsetTruncateDay = function getMomentWithOffsetTruncateDay(date) {
	return getMomentWithOffset(date).hours(0).minutes(0).seconds(0).milliseconds(0).format();
};

var toFormat = function toFormat(dateString, format) {
	if (!dateString) {
		return '';
	}
	var mom = moment(dateString);
	return mom.isValid() ? mom.format(format) : dateString;
};

var toDDMMYYYYdot = function toDDMMYYYYdot(dateString) {
	return toFormat(dateString, 'DD.MM.YYYY');
};

var toDDMMYYYYdotAltDashDash = function toDDMMYYYYdotAltDashDash(dateString) {
	return toDDMMYYYYdot(dateString) || '--';
};

var toDDMMYYYYHHMMSS = function toDDMMYYYYHHMMSS(dateString) {
	return toFormat(dateString, 'DD.MM.YYYY HH:mm:ss') || '--';
};

var toDDMMYYYYdash = function toDDMMYYYYdash(dateString) {
	return toFormat(dateString, 'DD-MM-YYYY');
};

var getISO = function getISO(date) {
	return moment(date).utcOffset(APP_TIME_OFFSET).toISOString();
};

var DateRange = function DateRange(props) {
	/** Состояние первоначалной настройки компонента */
	var _useState = useState(false),
	    _useState2 = slicedToArray(_useState, 2),
	    mounted = _useState2[0],
	    setMounted = _useState2[1];

	var _useState3 = useState(),
	    _useState4 = slicedToArray(_useState3, 2),
	    startValue = _useState4[0],
	    setStartValue = _useState4[1];

	var _useState5 = useState(),
	    _useState6 = slicedToArray(_useState5, 2),
	    endValue = _useState6[0],
	    setEndValue = _useState6[1];

	var className = props.className,
	    nameStart = props.nameStart,
	    nameEnd = props.nameEnd,
	    dateFormat = props.dateFormat,
	    onChange = props.onChange,
	    title = props.title,
	    valueStart = props.valueStart,
	    valueEnd = props.valueEnd;


	useEffect(function () {
		if (!mounted) {
			// console.log("DateRange mounted :", nameStart, props.defaultValueStart);
			if (props.defaultValueStart) {
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
		if (value) onChange(name, getMomentWithOffsetTruncateDay(value));else onChange(name, value);
	};

	return React.createElement(
		'div',
		{ className: 'date-range-container ' + className },
		React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'title' },
				title
			),
			React.createElement(
				'span',
				{ className: 'subtitleStart' },
				'c'
			),
			React.createElement(_DatePicker, {
				locale: locale
				// defaultValue={ checkDefValue(props.defaultValueStart) }
				, size: 'small',
				style: { width: '135px' },
				disabledDate: disabledStartDate,
				onChange: onStartChange,
				format: dateFormat,
				placeholder: 'Выберите дату',
				value: startValue
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
				, size: 'small',
				style: { width: '135px' },
				disabledDate: disabledEndDate,
				onChange: onEndChange,
				format: dateFormat,
				placeholder: 'Выберите дату',
				value: endValue
			})
		)
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
	valueEnd: PropTypes.string
};

DateRange.defaultProps = {
	nameStart: 'dateStart',
	nameEnd: 'dateEnd',
	dateFormat: 'DD.MM.YYYY',
	onChange: noop,
	title: 'Период'
};

var SingleDate = function SingleDate(props) {
	/** Состояние первоначалной настройки компонента */
	var _useState = useState(false),
	    _useState2 = slicedToArray(_useState, 2),
	    mounted = _useState2[0],
	    setMounted = _useState2[1];

	var _useState3 = useState(null),
	    _useState4 = slicedToArray(_useState3, 2),
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

var SelectContainer = function SelectContainer(props) {
	var handleOpen = props.handleOpen,
	    handleClose = props.handleClose,
	    isOpened = props.isOpened,
	    className = props.className;

	var node = useRef(null);

	useEffect(function () {
		window.addEventListener('mousedown', handleMouseClick, false);
		return function () {
			window.removeEventListener('mousedown', handleMouseClick, false);
		};
	}, []);

	var handleMouseClick = function handleMouseClick(e) {
		node && node.current.contains(e.target) && !isOpened ? handleOpen() : handleClose();
	};

	return React.createElement(
		'div',
		{
			className: 'select-container ' + className,
			style: { position: 'relative' },
			ref: node
		},
		props.children
	);
};

var Paragraph = _Typography.Paragraph;


var Select = function Select(props) {
	var _useState = useState([]),
	    _useState2 = slicedToArray(_useState, 2),
	    _selectedRowKeys = _useState2[0],
	    setSelectedRowKeys = _useState2[1];

	var _useState3 = useState(null),
	    _useState4 = slicedToArray(_useState3, 2),
	    _selectedRowData = _useState4[0],
	    setSelectedRowData = _useState4[1];

	var _useState5 = useState(false),
	    _useState6 = slicedToArray(_useState5, 2),
	    isSelectOpened = _useState6[0],
	    setIsSelectOpened = _useState6[1];

	var name = props.name,
	    rowRender = props.rowRender,
	    className = props.className,
	    type = props.type,
	    title = props.title,
	    placeholder = props.placeholder,
	    selectedRowKeys = props.selectedRowKeys,
	    widthControl = props.widthControl,
	    widthPopup = props.widthPopup,
	    heightPopup = props.heightPopup,
	    onChangeKeys = props.onChangeKeys,
	    defaultSelectedRowKeys = props.defaultSelectedRowKeys,
	    rowKey = props.rowKey,
	    expandColumnKey = props.expandColumnKey,
	    showSelection = props.showSelection,
	    requestLoadRows = props.requestLoadRows,
	    requestLoadDefault = props.requestLoadDefault,
	    commandPanelProps = props.commandPanelProps,
	    rows = props.rows;


	var searchable = commandPanelProps && commandPanelProps.showElements && commandPanelProps.showElements.includes('search');

	useEffect(function () {
		if (defaultSelectedRowKeys) {
			var request = requestLoadDefault ? requestLoadDefault : requestLoadRows;

			if (!!request && !rows && defaultSelectedRowKeys.length > 0) {
				// console.log('defaultSelectedRowKeys ', defaultSelectedRowKeys, defaultSelectedRowKeys.length);
				request({
					data: defineProperty({}, rowKey, defaultSelectedRowKeys)
				}).then(function (response) {
					var result = response.data;
					if (result.length > 0) setSelectedRowData(result[0]);
				}).catch(function (error) {});
			} else if (rows && defaultSelectedRowKeys.length > 0 && type === 'SingleSelect') {
				var findRow = rows.find(function (row) {
					return row[rowKey] === defaultSelectedRowKeys[0];
				});
				// console.log("setSelectedRowData => ", findRow);
				setSelectedRowData(findRow);
			}
			// console.log("setSelectedRowKeys[65] -> ", defaultSelectedRowKeys);
			setSelectedRowKeys(defaultSelectedRowKeys);
		}
	}, []);

	useEffect(function () {
		if (selectedRowKeys && selectedRowKeys.length === 0) {
			// console.log("setSelectedRowKeys[72] -> ", selectedRowKeys);
			setSelectedRowKeys(selectedRowKeys);
		}
		if (rows && selectedRowKeys.length > 0 && type === 'SingleSelect') {
			var findRow = rows.find(function (row) {
				return row[rowKey] === selectedRowKeys[0];
			});
			// console.log("setSelectedRowData => ", findRow);
			setSelectedRowData(findRow);
		}
	}, [selectedRowKeys]);

	var columns = [{
		key: rowKey,
		title: title,
		dataKey: rowKey,
		width: 500,
		cellRenderer: typeof rowRender === 'function' ? rowRender : function (_ref) {
			var rowData = _ref.rowData;
			return React.createElement(
				'div',
				null,
				rowData[rowRender]
			);
		}
	}];

	var _getHeadText = function _getHeadText() {
		if (type === 'SingleSelect') {
			return _selectedRowData && _selectedRowData[rowRender] ? '' + _selectedRowData[rowRender] : '' + placeholder;
		} else {
			return _selectedRowKeys.length > 0 ? '\u0412\u044B\u0431\u0440\u0430\u043D\u043E: ' + _selectedRowKeys.length : '' + placeholder;
		}
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

	var _onChange = function _onChange(selectedKeys) {
		// console.log('_onChange', selectedObjects);
		setSelectedRowKeys(selectedKeys);
		// setSelectedRowData(selectedObjects);
		onChangeKeys(name, selectedKeys.length ? selectedKeys : null);
		// onChangeObjects(name, selectedObjects.length ? selectedObjects : null);
		// setCountSelect(selectedKeys.length);
		if (type === 'SingleSelect') {
			setIsSelectOpened(false);
		}
	};

	var _SingleSelectRow = function _SingleSelectRow(_ref2) {
		var selected = _ref2.selected,
		    rowData = _ref2.rowData,
		    rowIndex = _ref2.rowIndex;

		// console.log("_SingleSelectRow => ", rowData);
		setSelectedRowData(rowData);
		// selected ? setSingleSelectRowData(rowData) : setSingleSelectRowData({})
	};

	return React.createElement(
		SelectContainer,
		{
			handleOpen: function handleOpen() {
				return setIsSelectOpened(true);
			},
			handleClose: function handleClose() {
				return setIsSelectOpened(false);
			},
			isOpened: isSelectOpened,
			className: className
		},
		title ? React.createElement(
			'div',
			{ className: 'title' },
			title
		) : null,
		React.createElement(
			'div',
			{
				className: ['select-header', isSelectOpened ? 'opened' : '', _selectedRowKeys && _selectedRowKeys.length > 0 ? 'selected' : ''].join(' '),
				style: {
					width: widthControl === 0 ? '100%' : widthControl + 'px'
				}
			},
			React.createElement(
				Paragraph,
				{ ellipsis: true },
				' ',
				_getHeadText(),
				' '
			)
		),
		isSelectOpened ? React.createElement(
			'div',
			{ className: 'select-popup', style: _getPopupStyle() },
			React.createElement(Table, _extends({}, props, {
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
	name: PropTypes.string.isRequired,

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

	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	// /** Показывать ли поисковую строку */
	// searchable: PropTypes.bool,

	/** Ширина поля выбора в пикселях */
	widthControl: PropTypes.number,

	/** Ширина выпадающего меню */
	widthPopup: PropTypes.number,

	/** Высота выпадающего меню (по умолчанию считается сама) */
	heightPopup: PropTypes.number,

	/** Событие об изменении состояния селектора */
	onChangeKeys: PropTypes.func
};

Select.defaultProps = {
	onChangeKeys: noop,
	// onChangeObjects: noop,
	placeholder: 'Выбрать',
	// searchable: false,
	widthControl: 110,
	widthPopup: 400,
	heightPopup: 600,
	rowKey: 'id'
};

var FilterPanel = function FilterPanel(props) {
	/**
  * Период с, по (день / месяц / год)
  * Множественный выбор (дерево с галочками с поиском) (ajax / const)
  * Множественный выбор (список с поиском) (ajax / const)
  * Единственный выбор (список с поиском) (ajax / const)
  */

	var _useState = useState(props.defaultFilter),
	    _useState2 = slicedToArray(_useState, 2),
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
			_filter = _extends({}, _filter, defineProperty({}, name, value));
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

var SelectionList = function SelectionList(props) {
	var selectedRowObjects = props.selectedRowObjects,
	    rowRender = props.rowRender,
	    onClickDropSelect = props.onClickDropSelect;

	// console.log("SelectionList typeof -> ", typeof(rowRender));

	return React.createElement(
		'div',
		{ className: 'show-selection-container' },
		selectedRowObjects && selectedRowObjects.length > 0 ? React.createElement(
			'ul',
			null,
			selectedRowObjects.map(function (item, index) {
				return React.createElement(
					'li',
					{ key: index },
					typeof rowRender === 'function' ? rowRender({ rowData: item, rowIndex: index }) : React.createElement(
						'div',
						null,
						item[rowRender]
					),
					React.createElement(
						'div',
						{ onClick: function onClick() {
								return onClickDropSelect(item);
							} },
						React.createElement(CloseCircleOutlined, null)
					)
				);
			})
		) : React.createElement(
			'div',
			null,
			'\u041D\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439'
		)
	);
};

SelectionList.propTypes = {
	/** Строка или функция для отображения элементов списка
  * Строка - имя поля
  * Функция - рендер строк. Параметры v
  * { rowData, rowIndex }) */
	rowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

	/** Список выделенных объектов */
	selectedRowObjects: PropTypes.arrayOf(PropTypes.object).isRequired,

	/** Событие удаления элемента */
	onClickDropSelect: PropTypes.func.isRequired
};

SelectionList.defaultProps = {};

/**
 *
 * Таблица с редактированием с первичной загрузкой с сервера
 *
 * Таблица с редактированием с подачей строк снаружи
 *
 * Таблица с автозагрузкой по скроллу
 *
 * Таблица с фильтрацией (внутренняя / внешняя)
 *
 * Таблица деревом
 *
 * Множественный выбор в любой таблица
 *
 * Значения по умолчанию
 *      Строки
 *      Выделенные строки
 *      Сортировка
 *      Фильтрация
 *
 * Создание строки
 * Изменение
 * Удаление
 *
 * Контролируемы из вне параметры (приоритетнее внутренних)
 *      Строки  (только при localSide)
 *      Выделенные строки (при любом режиме)
 *      Сортировка (при любом режиме)
 *      Фильтрация (при любом режиме)
 *
 * Управление строками (исключает функции изменения)
 *
 * Функция получения выделенных строк
 * Функция задания выделенных строк
 *
 *
 *  'infinity', 'serverSide', 'localSide'
 *
 * Загрузка по скроллу --- не доступно: добавить / удалить / изменить
 * Загрузка с сервера 1 раз + по сортировкам, фильтрациям и поискам --- доступно: добавить / удалить / изменить
 * Без загрузки с сервера --- доступно: добавить / удалить / изменить
 *
 *
 * Загрузка по скроллу
 * Загрузка при старте плоской
 * Загрузка при старте иерархии
 * Загрузка при старте плоской с обработкой lazyLoad
 * Обработка локальных данных
 *
 *
 * /** Локальная обработка запроса

 // console.log("manual table", localRows, rows);
 if (localRows.length === 0) {
    setLocalRows(rows);
}
 let _rows = localRows.length > 0 ? [...localRows] : [...rows];
 if (sortBy.key && sortBy.order) {
    _rows.sort((a, b) => {
        let x = a[sortBy.key].toLowerCase();
        let y = b[sortBy.key].toLowerCase();
        // console.log("sort", x, y);
        if (x > y) {
            return sortBy.order === 'asc' ? 1 : -1;
        }
        if (x < y) {
            return sortBy.order === 'asc' ? -1 : 1;
        }
        return 0;
    });
    // console.log("_rows", sortBy);
}
 if (searchLine) {
    _rows = _rows.filter((item, index) => {
        for (let propName in item) {
            if (item[propName]) {
                const val = item[propName].toString().toLowerCase();
                if (val.includes(searchLine.toLowerCase()))
                    return true;
            }
        }
        return false;
    });
}
 setRows(section, _rows);

 *
 *
 *
 */

var Table = forwardRef(function (props, ref) {
	/** Состояние первоначалной настройки компонента*/
	var _useState = useState(false),
	    _useState2 = slicedToArray(_useState, 2),
	    mounted = _useState2[0],
	    setMounted = _useState2[1];
	/** Наличие на сервере еще данных */


	var _useState3 = useState(true),
	    _useState4 = slicedToArray(_useState3, 2),
	    hasMore = _useState4[0],
	    setHasMore = _useState4[1];
	/** Индикатор загрузки данных */


	var _useState5 = useState(false),
	    _useState6 = slicedToArray(_useState5, 2),
	    loading = _useState6[0],
	    setLoading = _useState6[1];

	/** Indoor control */


	var _useState7 = useState([]),
	    _useState8 = slicedToArray(_useState7, 2),
	    _rows = _useState8[0],
	    _setRows = _useState8[1];

	var _useState9 = useState([]),
	    _useState10 = slicedToArray(_useState9, 2),
	    _selectedRowKeys = _useState10[0],
	    setSelectedRowKeys = _useState10[1];

	var _useState11 = useState({}),
	    _useState12 = slicedToArray(_useState11, 2),
	    _searchValue = _useState12[0],
	    setSearchValue = _useState12[1];

	var _useState13 = useState(false),
	    _useState14 = slicedToArray(_useState13, 2),
	    _filter = _useState14[0],
	    setFilter = _useState14[1];

	var _useState15 = useState(false),
	    _useState16 = slicedToArray(_useState15, 2),
	    _sortBy = _useState16[0],
	    setSortBy = _useState16[1];

	/** Selectable States */


	var _useState17 = useState(false),
	    _useState18 = slicedToArray(_useState17, 2),
	    selectAll = _useState18[0],
	    setSelectAll = _useState18[1];

	/** Tree States */


	var _useState19 = useState([]),
	    _useState20 = slicedToArray(_useState19, 2),
	    _indeterminateRowKeys = _useState20[0],
	    setIndeterminateRowKeys = _useState20[1];

	var _useState21 = useState([]),
	    _useState22 = slicedToArray(_useState21, 2),
	    _expandedRowKeys = _useState22[0],
	    setExpandedRowKeys = _useState22[1];

	var _useState23 = useState(0),
	    _useState24 = slicedToArray(_useState23, 2),
	    _totalCountRows = _useState24[0],
	    setTotalCountRows = _useState24[1];

	var tableRef = React.useRef();

	var defaultRows = props.defaultRows,
	    defaultSelectedRowKeys = props.defaultSelectedRowKeys,
	    defaultSearchValue = props.defaultSearchValue,
	    defaultFilter = props.defaultFilter,
	    defaultSortBy = props.defaultSortBy,
	    rows = props.rows,
	    setRows = props.setRows,
	    selectedRowKeys = props.selectedRowKeys,
	    searchValue = props.searchValue,
	    filter = props.filter,
	    sortBy = props.sortBy,
	    columns = props.columns,
	    type = props.type,
	    autoDeleteRows = props.autoDeleteRows,
	    rowKey = props.rowKey,
	    empty = props.empty,
	    fixWidthColumn = props.fixWidthColumn,
	    footerHeight = props.footerHeight,
	    footerShow = props.footerShow,
	    footerTitles = props.footerTitles,
	    headerHeight = props.headerHeight,
	    rowHeight = props.rowHeight,
	    zebraStyle = props.zebraStyle,
	    rowRenderer = props.rowRenderer,
	    loadThreshold = props.loadThreshold,
	    pageSize = props.pageSize,
	    requestLoadRows = props.requestLoadRows,
	    requestLoadCount = props.requestLoadCount,
	    searchParamName = props.searchParamName,
	    selectable = props.selectable,
	    nodeAssociated = props.nodeAssociated,
	    expandColumnKey = props.expandColumnKey,
	    expandParentKey = props.expandParentKey,
	    expandLazyLoad = props.expandLazyLoad,
	    expandDefaultAll = props.expandDefaultAll,
	    onRowClick = props.onRowClick,
	    onRowDoubleClick = props.onRowDoubleClick,
	    onRowExpand = props.onRowExpand,
	    onSelectedRowsChange = props.onSelectedRowsChange,
	    onExpandedRowsChange = props.onExpandedRowsChange,
	    showSelection = props.showSelection,
	    rowRenderShowSelection = props.rowRenderShowSelection;


	var commandPanelProps = _extends({}, CommandPanel.defaultProps, props.commandPanelProps);
	var filterPanelProps = _extends({}, FilterPanel.defaultProps, props.filterPanelProps);

	useEffect(function () {
		// console.log("Инициализация дефолтных значений ");

		// Инициализация дефолтных значений
		_setRows(defaultRows);
		setSelectedRowKeys(defaultSelectedRowKeys);
		setSearchValue(defaultSearchValue);
		setFilter(defaultFilter);
		setSortBy(defaultSortBy);
		setSelectAll(defaultRows.length > 0 && defaultRows.length === defaultSelectedRowKeys.length);

		if (!!expandColumnKey && !expandLazyLoad) {
			// Открытие всех нод
			if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(defaultRows, rowKey)));
			// Установка квадратиков на нужных нодах
			if (defaultSelectedRowKeys && defaultSelectedRowKeys.length > 0) {
				var flatRows = flatten(getTableRowKeys(defaultRows, rowKey));
				var selectedRow = flatRows.filter(function (item) {
					return defaultSelectedRowKeys.includes(item[rowKey]);
				});
				var _indeterminateRowKeys2 = [];
				selectedRow.forEach(function (item) {
					var _parentAnalysis = parentAnalysis({
						rowData: item,
						rowKey: rowKey,
						parentKey: expandParentKey,
						checked: true,
						nodeAssociated: nodeAssociated,
						treeData: defaultRows,
						selectedRowKeys: defaultSelectedRowKeys,
						indeterminateRowKeys: _indeterminateRowKeys2
					}),
					    _parentAnalysis2 = slicedToArray(_parentAnalysis, 2),
					    ss = _parentAnalysis2[0],
					    ii = _parentAnalysis2[1];

					_indeterminateRowKeys2.push.apply(_indeterminateRowKeys2, toConsumableArray(ii));
				});
				setIndeterminateRowKeys([].concat(toConsumableArray(new Set(_indeterminateRowKeys2))));
			}
		}

		if (type !== 'localSide') {
			_dataProcessing({
				sortBy: defaultSortBy,
				filter: defaultFilter,
				searchLine: defaultSearchValue,
				reload: true
			});
		}
		setMounted(true);
		if (ref && typeof ref === 'function') ref({ reloadData: reloadData });else if (ref && (typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) === 'object') ref.current = { reloadData: reloadData };
	}, []);

	var reloadData = function reloadData(_ref) {
		var sortBy = _ref.sortBy,
		    filter = _ref.filter,
		    searchValue = _ref.searchValue;

		// console.log("reloadData params ", sortBy, filter, searchValue);
		setSelectedRowKeys([]);
		if (sortBy) setSortBy(sortBy);
		if (filter) setFilter(filter);
		if (searchValue) setSearchValue(searchValue);
		_dataProcessing({
			sortBy: sortBy ? sortBy : _sortBy,
			filter: filter ? filter : _filter,
			searchLine: searchValue ? searchValue : _searchValue,
			reload: true
		});
	};

	useEffect(function () {
		if (type === 'localSide') {
			// console.log("Control useEffect => ", rows, selectedRowKeys, searchValue, filter, sortBy);
			_setRows(rows);
			setSelectedRowKeys(selectedRowKeys);
			setSearchValue(searchValue);
			setFilter(filter);
			setSortBy(sortBy);
			if (!!expandColumnKey && !expandLazyLoad) {
				// Открытие всех нод
				if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(rows, rowKey)));
			}
		}
	}, [rows, selectedRowKeys, searchValue, filter, sortBy]);

	/** BASE FUNCTIONS */
	var _dataProcessing = function _dataProcessing(params) {
		// console.log('_dataProcessing', params);
		var sortBy = params.sortBy,
		    filter = params.filter,
		    searchLine = params.searchLine,
		    expandRow = params.expandRow,
		    reload = params.reload;

		switch (type) {
			case 'infinity':
			case 'serverSide':
				if ((hasMore || reload) && !loading) {
					setLoading(true);
					var pageNum = reload ? 0 : Math.floor(_rows.length / pageSize);
					var _params = {
						page: pageNum,
						size: pageSize,
						sort: sortBy && sortBy.key ? sortBy.key + ',' + sortBy.order : null
					};
					var dataQuery = _extends({}, filter, searchLine ? defineProperty({}, searchParamName, searchLine) : null);
					// console.log('dataQuery', dataQuery);

					if (type === 'infinity' && reload && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad) {
						requestLoadCount({
							params: _params,
							data: dataQuery
						}).then(function (response) {
							// console.log("infinity then response", response);
							// const result = response.data;
							setTotalCountRows(response.data);
						}).catch(function (error) {
							console.log('RequestLoadCount catch: ', error);
						});
					}

					requestLoadRows({
						params: _params,
						data: dataQuery
					}).then(function (response) {
						// console.log("infinity then response", response);
						var result = response.data;
						// Если иерархия и ленивая, то ищим кому добавть полученные записи
						if (!!expandColumnKey && expandLazyLoad) {
							// lastExpandRow//, setLastExpandRow
							// console.log('!!expandColumnKey && expandLazyLoad', result);
							if (pageNum === 0) {
								result.forEach(function (child) {
									child.children = [defineProperty({}, rowKey, generateUUID())];
								});
								_setRows(result);
							} else {
								var newRows = [].concat(toConsumableArray(_rows));
								// (data, rowKey, rowValue)
								result.forEach(function (child) {
									child.children = [defineProperty({}, rowKey, generateUUID())];
								});
								var node = findNodeByRowKey(newRows, rowKey, expandRow[rowKey]);
								node.children = result;
								// console.log('newRows -> ', newRows);
								_setRows(newRows);
							}
						} else {
							if (result && result.length < pageSize) {
								setHasMore(false);
							} else {
								setHasMore(true);
							}
							pageNum === 0 ? _setRows(result) : _setRows(_rows.concat(result));

							// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);
							if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(result, rowKey)));
						}

						setLoading(false);
					}).catch(function (error) {
						// console.log('loadData catch: ', error);
						if (error.response) {
							_notification.error({
								message: '\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 [' + error.response.status + ']',
								description: error.response.data.message
							});
						} else _notification.error({
							message: 'Не удалось детектировать ошибку. См. console.log'
						});
						_setRows(_rows);
						// setHasMore(false);
						setLoading(false);
					});
				}
				break;
		}
	};

	/** Событие выделение одной строки в режиме без галочек */
	var _rowEventHandlers = {
		onClick: function onClick(_ref5) {
			var rowData = _ref5.rowData,
			    rowIndex = _ref5.rowIndex,
			    rowKey = _ref5.rowKey,
			    event = _ref5.event;

			if (!selectable) {
				// if (_selectedRowKeys.includes(rowKey)) {
				//     setSelectedRowKeys([]);
				//     // setSelectedRow([]);
				//     // setSelectedRowObjects([]);
				//     onRowClick({
				//         selected: false,
				//         rowData,
				//         rowIndex,
				//         rowKey,
				//     });
				//     onSelectedRowsChange([]);
				// } else {
				// console.log('_rowEventHandlers -> onClick', rowKey);
				var newRowObject = {
					rowData: _extends({}, rowData),
					rowIndex: rowIndex,
					rowKey: rowKey
				};
				// if(type !== 'localSide')
				setSelectedRowKeys([rowKey]);
				// setSelectedRow(newRowObject);
				// setSelectedRowObjects([newRowObject]);
				onRowClick(_extends({
					selected: true
				}, newRowObject));
				onSelectedRowsChange([rowKey], [rowData]);
				// }
			}
		},
		onDoubleClick: function onDoubleClick(_ref6) {
			var rowData = _ref6.rowData,
			    rowIndex = _ref6.rowIndex,
			    rowKey = _ref6.rowKey;

			// console.log('onDoubleClick', rowData, rowIndex, rowKey);
			onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
		}
		// onContextMenu: console.log('context menu'),
		// onMouseEnter: console.log('mouse enter'),
		// onMouseLeave: console.log('mouse leave'),
	};

	/** Событие при сортировке */
	var _onColumnSort = function _onColumnSort(sortBy) {
		// console.log("sortBy", sortBy);
		tableRef.current.scrollToRow(0, 'auto');
		setSortBy(sortBy);

		// Для серверной сортировки - сбросить выделение
		if (type !== 'localSide') {
			setSelectedRowKeys([]);
		}
		var loadParams = {
			sortBy: sortBy,
			filter: _filter,
			searchLine: _searchValue,
			reload: true
		};
		_dataProcessing(loadParams);
	};

	/** Получение колонок таблицы */
	var _getColumns = function _getColumns() {
		var _columns = [].concat(toConsumableArray(columns));

		/** Создаем колонку с галочками (если надо) */
		if (selectable) {
			var selectColumn = {
				key: '__selection__',
				headerRenderer: SelectionHead,
				cellRenderer: SelectionCell,
				width: 40,
				flexShrink: 0,
				resizable: false,
				frozen: Column.FrozenDirection.LEFT,
				rowKey: rowKey,
				parentKey: expandParentKey,
				selectedRowKeys: _selectedRowKeys,
				indeterminateRowKeys: _indeterminateRowKeys,
				nodeAssociated: nodeAssociated,
				onChange: _onChangeSelectHandler,
				selectAll: selectAll,
				onSelectAll: _onSelectAllHandler
			};
			_columns.unshift(selectColumn);
		}
		return _columns;
	};

	/** VIEW FUNCTIONS */

	var _footer = React.createElement(
		'div',
		{ className: 'BaseTable__footer__counter' },
		selectable ? React.createElement(
			React.Fragment,
			null,
			React.createElement(
				'span',
				null,
				footerTitles.selectedRows,
				' ',
				_selectedRowKeys.length
			),
			React.createElement(
				'span',
				null,
				footerTitles.loadedRows,
				' ',
				flatten(getTableRowKeys(_rows, rowKey)).length
			)
		) : null,
		type === 'infinity' && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad ? React.createElement(
			'span',
			null,
			footerTitles.totalRows,
			' ',
			_totalCountRows
		) : React.createElement(
			'span',
			null,
			footerTitles.totalRows,
			' ',
			flatten(getTableRowKeys(_rows, rowKey)).length
		)
	);

	/** Событие при рендере для стилизации */
	var _rowClassName = function _rowClassName(_ref7) {
		var rowData = _ref7.rowData,
		    rowIndex = _ref7.rowIndex;
		var rowClassName = props.rowClassName;

		var rowClass = rowClassName ? callOrReturn(rowClassName, { rowData: rowData, rowIndex: rowIndex }) : '';
		// const key = {[rowKey]: rowData[rowKey], checked: true};
		// selectedRowKeys.some((item) => (item[rowKey] === rowData[rowKey] && item.checked))
		return [rowClass, _selectedRowKeys.includes(rowData[rowKey]) && 'row-selected'].filter(Boolean).concat(zebraStyle ? rowIndex % 2 === 0 ? 'even' : 'odd' : '').concat(' ');
	};

	/** LOAD DATA FUNCTIONS */
	var onEndReached = function onEndReached() {
		var selectAll = void 0;
		var selectLength = _selectedRowKeys.length;
		if (selectLength === 0) selectAll = false;else if (selectLength > 0) selectAll = null;

		setSelectAll(selectAll);

		if (type === 'infinity') {
			var loadParams = {
				sortBy: _sortBy,
				filter: _filter,
				searchLine: _searchValue,
				reload: false
			};
			_dataProcessing(loadParams);
		}
	};

	/** SELECTABLE FUNCTIONS */

	/** Событие при изменении галочки одной строки */
	var _onChangeSelectHandler = function _onChangeSelectHandler(_ref8) {
		var selected = _ref8.selected,
		    _selectedRow = _ref8._selectedRow,
		    _selectAll = _ref8._selectAll,
		    _selectedRowKeys = _ref8._selectedRowKeys,
		    _indeterminateRowKeys = _ref8._indeterminateRowKeys;

		setSelectedRowKeys(_selectedRowKeys);
		setIndeterminateRowKeys(_indeterminateRowKeys);
		setSelectAll(_selectAll);
		// setSelectedRow(_selectedRow);

		// let newSelectedObjects = [];
		// if (selected) {
		// 	if (!!expandColumnKey)
		// 		newSelectedObjects = flatten(
		// 			getTableRowObjects(rows, rowKey)
		// 		).filter((item) => _selectedRowKeys.includes(item[rowKey]));
		// 	else
		// 		newSelectedObjects = selectedRowObjects.concat([
		// 			_selectedRow.rowData,
		// 		]);
		// 	// setSelectedRowObjects(newSelectedObjects);
		// } else {
		// 	newSelectedObjects = selectedRowObjects.filter(
		// 		(item) => item[rowKey] !== _selectedRow.rowData[rowKey]
		// 	);
		// 	// setSelectedRowObjects(newSelectedObjects);
		// }
		// console.log("_handleSelectChange", _selectedRowKeys, newSelectedObjects);
		onRowClick({
			selected: selected,
			rowData: _selectedRow.rowData,
			rowIndex: _selectedRow.rowIndex,
			rowKey: rowKey
		});
		onSelectedRowsChange(_selectedRowKeys);
	};

	/** Событие при изменении галочки "Выделить все" */
	var _onSelectAllHandler = function _onSelectAllHandler(_ref9) {
		var selected = _ref9.selected,
		    rowKeys = _ref9.rowKeys;

		var selectedKeys = selected ? rowKeys : [];
		setSelectedRowKeys(selectedKeys);
		setIndeterminateRowKeys([]);
		setSelectAll(selected);
		// setSelectedRowObjects(rows);
		// console.log("_handleSelectAll", selectedKeys);
		onSelectedRowsChange(selectedKeys);
	};

	/** TREE FUNCTIONS */

	/** Анализ дерева на пердмет квадратиков
  * Нужно для выделения по умолчанию свернутых элементов */
	// const _postLoadTreeAnalysis = () => {
	//     if (!!expandColumnKey && !expandLazyLoad) {
	//         let _indeterminateRowKeys = [];
	//         // console.log("mounted->selectedRowObjects: ", selectedRowObjects);
	//         selectedRowObjects.map((item) => {
	//             const [ss, ii] = parentAnalysis({
	//                 rowData: item,
	//                 rowKey,
	//                 parentKey: expandParentKey,
	//                 checked: true,
	//                 nodeAssociated,
	//                 treeData: _rows,
	//                 selectedRowKeys: _selectedRowKeys,
	//                 indeterminateRowKeys: _indeterminateRowKeys,
	//             });
	//             _indeterminateRowKeys.push(...ii);
	//         });
	//         setIndeterminateRowKeys([...new Set(_indeterminateRowKeys)]);
	//     }
	// }

	var _onExpandedRowsChange = function _onExpandedRowsChange(expandedRowKeys) {
		// console.log("_onExpandedRowsChange", expandedRowKeys);
		onExpandedRowsChange(expandedRowKeys);
	};
	var _onRowExpand = function _onRowExpand(_ref10) {
		var expanded = _ref10.expanded,
		    rowData = _ref10.rowData,
		    rowIndex = _ref10.rowIndex,
		    rowKey = _ref10.rowKey;

		// console.log("_onRowExpand", rowData, expanded, rowIndex, rowKey);
		if (expanded) {
			setExpandedRowKeys([].concat(toConsumableArray(_expandedRowKeys), [rowKey]));

			if (expandLazyLoad) {
				var loadParams = {
					sortBy: _sortBy,
					filter: _extends({}, _filter, defineProperty({}, expandParentKey, rowKey)),
					searchLine: _searchValue,
					reload: false,
					expandRow: rowData
				};
				// _callPropsOnLoad(loadParams);
				_dataProcessing(loadParams);
			}
		} else {
			var expandedRowKeys = [].concat(toConsumableArray(_expandedRowKeys));
			var allChildKeys = flatten(getTableRowKeys(rowData.children, props.rowKey));
			allChildKeys.push(rowKey);
			// console.log('allChildKeys', allChildKeys);
			setExpandedRowKeys(expandedRowKeys.filter(function (item) {
				return !allChildKeys.includes(item);
			}));
		}
		onRowExpand({ expanded: expanded, rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
	};

	/** COMMAND PANEL FUNCTIONS */

	var _getDisabledElementsOfCommandPanel = function _getDisabledElementsOfCommandPanel() {
		// console.log('commandPanelProps', commandPanelProps);
		var _disabledElements = [].concat(toConsumableArray(commandPanelProps.disabledElements));
		if (type === 'infinity') {
			_disabledElements.push('up', 'down');
		}
		if (selectable && _selectedRowKeys.length > 1) {
			_disabledElements.push('addAsCopy', 'edit', 'up', 'down');
		}
		if (_selectedRowKeys.length === 0) {
			_disabledElements.push('addAsCopy', 'edit', 'delete', 'up', 'down');
		}
		if (expandColumnKey) {
			//|| !selectedRow) {
			_disabledElements.push('up', 'down');
		}
		return [].concat(toConsumableArray(new Set(_disabledElements)));
	};

	var _onClickAddAsCopy = function _onClickAddAsCopy(event) {
		// console.log("_onClickAddAsCopy", selectedRow);
		commandPanelProps.onClickAddAsCopy(event, findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]));
	};

	var _onClickEdit = function _onClickEdit(event) {
		// console.log("_onClickEdit", selectedRow);
		commandPanelProps.onClickEdit(event, {
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
		});
		// props.onClickEdit(event, selectedRow);
	};

	var _onClickDelete = function _onClickDelete(event) {
		// console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
		if (autoDeleteRows) {
			if (type === 'localSide') {
				setRows(_rows.filter(function (item) {
					return !_selectedRowKeys.includes(item[rowKey]);
				}));
			} else {
				_setRows(_rows.filter(function (item) {
					return !_selectedRowKeys.includes(item[rowKey]);
				}));
			}
			setSelectedRowKeys([]);
		}
		commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	var _onClickUp = function _onClickUp(event) {
		// console.log("_onClickUp", selectedRow);
		var rowIndex = _rows.findIndex(function (item) {
			return item[rowKey] === _selectedRowKeys[0];
		});
		var newRowIndex = _getNewIndexRow(rowIndex, rowIndex - 1);
		_changeIndexRow(rowIndex, newRowIndex);
		// console.log("_onClickUp", rowIndex, newRowIndex);
		commandPanelProps.onClickUp(event, {
			rowIndex: newRowIndex,
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
		});
	};

	var _onClickDown = function _onClickDown(event) {
		var rowIndex = _rows.findIndex(function (item) {
			return item[rowKey] === _selectedRowKeys[0];
		});
		var newRowIndex = _getNewIndexRow(rowIndex, rowIndex + 1);
		_changeIndexRow(rowIndex, newRowIndex);
		// console.log("_onClickDown", rowIndex, newRowIndex);
		commandPanelProps.onClickDown(event, {
			rowIndex: newRowIndex,
			rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
		});
	};

	var _getNewIndexRow = function _getNewIndexRow(oldIndex, newIndex) {
		return newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;
	};

	var _changeIndexRow = function _changeIndexRow(oldIndex, newIndex) {
		if (newIndex >= 0 && newIndex < _rows.length) {
			var arr = [].concat(toConsumableArray(_rows)); // Копируем массив
			var item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
			// console.log('_changeIndexRow => ',item);
			arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
			// console.log("_changeIndexRow", item[0]);
			if (type === 'localSide') {
				setRows(arr);
			} else {
				_setRows(arr);
			}
		}
	};

	var _onSearch = function _onSearch(searchLine) {
		// console.log("_onSearch", searchLine);
		tableRef.current.scrollToRow(0, 'auto');
		setSearchValue(searchLine);
		var loadParams = {
			sortBy: _sortBy,
			filter: _filter,
			searchLine: searchLine,
			reload: true
		};
		_dataProcessing(loadParams);
		commandPanelProps.onSearch(searchLine);
	};

	/** FILTER PANEL FUNCTIONS */

	var _onChangeFilter = function _onChangeFilter(filter) {
		// console.log('_onChangeFilter', filter);
		setHasMore(true);
		setFilter(filter);
		filterPanelProps.onChangeFilter(filter);
	};
	var _onApplyFilter = function _onApplyFilter(filter) {
		// console.log('_onApplyFilter', filter);
		var loadParams = {
			sortBy: _sortBy,
			filter: filter,
			searchLine: _searchValue,
			reload: true
		};
		_dataProcessing(loadParams);
		filterPanelProps.onApplyFilter(filter);
	};

	/** SELECTED PANEL */

	var _onClickDropSelectHandler = function _onClickDropSelectHandler(dropObject) {
		var newSelectedKeys = _selectedRowKeys.filter(function (item) {
			return item !== dropObject[rowKey];
		});
		setSelectedRowKeys(newSelectedKeys);
		onSelectedRowsChange(newSelectedKeys);
	};

	// const rowProps = {
	//     // tagName: 'button',
	//     // onClick: e => {
	//     //     e.preventDefault();
	//     //     e.stopPropagation();
	//     //     console.log(`You clicked row onClick`)
	//     // },
	//     onDoubleClick: e => {
	//         e.preventDefault();
	//         e.stopPropagation();
	//         console.log(`You clicked row onDoubleClick`)
	//     }
	// };

	return React.createElement(
		'div',
		{
			className: 'Table__container',
			style: { width: '100%', height: '100%' }
		},
		React.createElement(
			'div',
			{ className: 'Table__Top-panel' },
			React.createElement(CommandPanel, _extends({}, commandPanelProps, {
				defaultValueSearch: defaultSearchValue,
				disabledElements: _getDisabledElementsOfCommandPanel(),
				onClickAddAsCopy: _onClickAddAsCopy,
				onClickDelete: _onClickDelete,
				onClickDown: _onClickDown,
				onClickEdit: _onClickEdit,
				onClickUp: _onClickUp,
				onSearch: _onSearch
			})),
			React.createElement(FilterPanel, _extends({}, filterPanelProps, {
				defaultFilter: defaultFilter,
				onChangeFilter: _onChangeFilter,
				onApplyFilter: _onApplyFilter
			}))
		),
		React.createElement(
			'div',
			{ className: 'BaseTable__container' },
			React.createElement(
				AutoResizer,
				null,
				function (_ref11) {
					var width = _ref11.width,
					    height = _ref11.height;
					return React.createElement(BaseTable, {
						ref: tableRef
						/** Required */
						, columns: _getColumns(),
						data: _rows
						/** Control Props */
						, sortBy: _sortBy
						/** Base Props */
						, width: width,
						height: height,
						rowKey: rowKey
						// rowProps={rowProps}

						/** View Props */
						, rowClassName: _rowClassName,
						emptyRenderer: empty,
						fixed: fixWidthColumn,
						footerHeight: footerShow ? footerHeight : 0,
						headerHeight: headerHeight,
						rowHeight: rowHeight,
						overlayRenderer: loading ? overlay : null,
						footerRenderer: _footer,
						rowRenderer: rowRenderer
						/** Load Data Props */
						, onEndReachedThreshold: loadThreshold,
						onEndReached: type === 'infinity' ? onEndReached : undefined,
						disabled: loading
						/** Tree Props */
						, expandColumnKey: expandColumnKey,
						expandedRowKeys: _expandedRowKeys
						/** Events */
						, onColumnSort: _onColumnSort,
						rowEventHandlers: _rowEventHandlers,
						onExpandedRowsChange: _onExpandedRowsChange,
						onRowExpand: _onRowExpand
					});
				}
			)
		),
		showSelection && selectable && !expandColumnKey ? React.createElement(SelectionList, {
			onClickDropSelect: _onClickDropSelectHandler,
			selectedRowObjects: flatten(getTableRowObjects(_rows)).filter(function (item) {
				return _selectedRowKeys.includes(item[rowKey]);
			}),
			rowRender: rowRenderShowSelection
		}) : null
	);
});

Table.propTypes = {
	/**
  * REQUIRED
  * */

	/** Столбцы таблицы (обязательно) */
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,

	/** Тип таблицы.
  * 'infinity' - загрузка данных по скроллу. Фильтрация, сортировка и поиск через сервер.
  * 'serverSide' - первичная загрузка таблицы с сервера. Фильтрация, сортировка и поиск через сервер. Lazy Load для дерева тоже тут.
  * 'localSide' - полностью локальная таблица. Фильтрация, сортировка и поиск через локальный rows
  */
	type: PropTypes.oneOf(['infinity', 'serverSide', 'localSide']).isRequired,

	/**
  * ПРОПСЫ ЗАДАНИЯ ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ
  * */

	/** Строки по умолчанию */
	defaultRows: PropTypes.arrayOf(PropTypes.object),

	/** Ключи выделенных по умолчанию строк */
	defaultSelectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Значение строки поиска по умолчанию строк */
	defaultSearchValue: PropTypes.string,

	/** Объект фильтрации по умолчанию */
	defaultFilter: PropTypes.object,

	/** Сортировка по умолчанию */
	defaultSortBy: PropTypes.shape({
		key: PropTypes.string,
		order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
	}),

	/**
  * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
  * */

	/** Строки таблицы. Используется для контроля таблицы из вне. */
	rows: PropTypes.arrayOf(PropTypes.object),

	/** Выделенные строки таблицы. */
	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Фильтр */
	filter: PropTypes.object,

	/** Объект сортировки ({ key: 'string', order: 'asc' }).
  * key - поле по которому сотрировать,
  * order - направление сортировки ("asc", "desc")
  * */
	sortBy: PropTypes.shape({
		key: PropTypes.string,
		order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
	}),

	/**
  * BASE PROPS
  * */

	/** Автоудаление строк из таблицы по кнопке в командной панели*/
	autoDeleteRows: PropTypes.bool,

	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/**
  * VIEW PROPS
  * */

	/** Вывод когда нет данных */
	empty: PropTypes.element,

	/** Отображение загрузки данных */
	overlay: PropTypes.element,

	/** Фиксированная ширина столбцов. Появится боковой скрол */
	fixWidthColumn: PropTypes.bool,

	/** Высота подвала */
	footerHeight: PropTypes.number,

	/** Отображать ли подвал */
	footerShow: PropTypes.bool,

	/** Названия футтера */
	footerTitles: PropTypes.shape({
		selectedRows: PropTypes.string,
		loadedRows: PropTypes.string,
		totalRows: PropTypes.string
	}),

	/** Высота заголовка таблицы */
	headerHeight: PropTypes.number,

	/** Высота строки таблицы */
	rowHeight: PropTypes.number,

	/** Custom row renderer
  * Параметры - ({ isScrolling, cells, columns, rowData, rowIndex, depth }) */
	rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

	/** Строки будут в зебро-стиле */
	zebraStyle: PropTypes.bool,

	/**
  * LOAD DATA PROPS
  * */

	/** Порог в пикселях для вызова _onLoad.
  * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
	loadThreshold: PropTypes.number,

	/** Размер страницы */
	pageSize: PropTypes.number,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadRows: PropTypes.func,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadCount: PropTypes.func,

	/** Имя параметра для поиска */
	searchParamName: PropTypes.string,

	/**
  * SELECTABLE PROPS
  * */

	/** Таблица с возможностью выбора строки */
	selectable: PropTypes.bool,

	/**
  * TREE PROPS
  * */

	/** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
	nodeAssociated: PropTypes.bool,

	/** Ключ колонки по которой строить иерархию */
	expandColumnKey: PropTypes.string,

	/** Открыть по умолчанию вложенность до уровня N или 'All' */
	expandDefaultAll: PropTypes.bool,

	/** Загружать ноды иерархии по одной */
	expandLazyLoad: PropTypes.bool,

	/** Поле в котором хранится ссылка на родителя */
	expandParentKey: PropTypes.string,

	/**
  * EVENTS
  * */

	/** Событие при клике на строку (только при selectable = false)
  * Параметр - ({selected, rowData, rowIndex}) */
	onRowClick: PropTypes.func,

	/** Событие при двойном клике на строку.
  * Параметр - ({rowData, rowIndex, rowKey}) */
	onRowDoubleClick: PropTypes.func,

	/** События при открытии / закрытии ноды
  * Парметры - ({ expanded, rowData, rowIndex, rowKey }) */
	onRowExpand: PropTypes.func,

	/** Событие при выборе строки.
  * Параметр - массив выбранных строе (только rowKey) */
	onSelectedRowsChange: PropTypes.func,

	/** События при открытии / закрытии ноды
  * Парметры - (expandedRowKeys) - массив ключей открытых нод */
	onExpandedRowsChange: PropTypes.func,

	/**
  *
  *
  */
	// commandPanelProps: PropTypes.shape(CommandPanel.propTypes),
	//
	// filterPanelProps: PropTypes.shape(FilterPanel.propTypes),

	/** SELECTED PANEL */

	/** Отображать ли панель выбранных элементов */
	showSelection: PropTypes.bool,

	/** Строка или функция для отображения элементов списка выбранных
  * Строка - имя поля
  * Функция - рендер строк.
  * Параметры - ({ rowData, rowIndex }) */
	rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

Table.defaultProps = {
	defaultRows: [],
	defaultSelectedRowKeys: [],
	defaultSearchValue: '',
	defaultFilter: {},
	defaultSortBy: {},

	rows: [],
	selectedRowKeys: [],
	searchValue: '',
	filter: {},
	sortBy: {},

	autoDeleteRows: true,
	rowKey: 'id',

	empty: empty,
	overlay: overlay,
	fixWidthColumn: false,
	footerHeight: 30,
	footerShow: false,
	footerTitles: {
		selectedRows: 'Выделено:',
		loadedRows: 'Загружено записей:',
		totalRows: 'Всего записей:'
	},
	headerHeight: 30,
	rowHeight: 30,
	zebraStyle: false,

	loadThreshold: 300,
	pageSize: 50,
	requestLoadRows: noop,
	requestLoadCount: noop,
	searchParamName: 'searchLine',

	selectable: false,

	nodeAssociated: true,
	expandColumnKey: undefined,
	expandDefaultAll: true,
	expandLazyLoad: false,
	expandParentKey: 'parentId',

	onRowClick: noop,
	onRowDoubleClick: noop,
	onRowExpand: noop,
	onSelectedRowsChange: noop,
	onExpandedRowsChange: noop,

	showSelection: false
};

var AdvancedTable = forwardRef(function (props, ref) {
	var _useState = useState({}),
	    _useState2 = slicedToArray(_useState, 2),
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
		if (requestLoadConfig) {
			requestLoadConfig().then(function (response) {
				// let result = response.data;
				// console.log('requestLoadConfig -> ', response.data);
				setConfig(response.data);
			}).catch(function (error) {
				console.log('error -> ', error);
				_notification.error({
					message: 'Произошла ошибка получения конфигурации'
				});
			});
		} else {
			setConfig(configData);
		}
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
			return _extends({}, defaultFilter, defineProperty({}, parentKey, null));
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

/**
 * ### Список / Дерево.
 */
var List = function List(props) {
	var rowKey = props.rowKey,
	    rowRender = props.rowRender,
	    title = props.title;


	var columns = [{
		key: rowKey,
		title: title,
		dataKey: rowKey,
		width: 500,
		cellRenderer: typeof rowRender === 'function' ? rowRender : function (_ref) {
			var rowData = _ref.rowData;
			return React.createElement(
				'div',
				null,
				rowData[rowRender]
			);
		}
	}];
	return React.createElement(Table, _extends({}, props, { columns: columns, headerHeight: title ? 30 : 0 }));
};

List.propTypes = {
	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/** Строка или функция для отображения элементов списка
  * Строка - имя поля
  * Функция - рендер строк. Параметры v
  * { cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) */
	rowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

	/** Заголовок списка (по умолчанию скрыт)*/
	title: PropTypes.string
};

List.defaultProps = {
	rowKey: 'id',
	rowRender: 'id',
	title: undefined
};

export { APP_TIME_OFFSET, AdvancedTable, CommandPanel, DateRange, FilterPanel, List, Select, SingleDate, Table, getISO, getMomentFromStringByFormat, getMomentWithOffset, getMomentWithOffsetTruncateDay, toDDMMYYYYHHMMSS, toDDMMYYYYdash, toDDMMYYYYdot, toDDMMYYYYdotAltDashDash, toFormat };
//# sourceMappingURL=index.es.js.map
