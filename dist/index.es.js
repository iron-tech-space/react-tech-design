import 'antd/es/typography/style';
import _Typography from 'antd/es/typography';
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import 'antd/es/notification/style';
import _notification from 'antd/es/notification';
import moment from 'moment';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BaseTable, { AutoResizer, callOrReturn } from 'react-base-table';
import 'antd/es/spin/style';
import _Spin from 'antd/es/spin';
import { LoadingOutlined, CloseCircleOutlined, PlusOutlined, CopyOutlined, FolderAddOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, SettingOutlined, FilterOutlined, ExclamationCircleOutlined, UpOutlined, DownOutlined, CloseCircleFilled, HomeOutlined, RollbackOutlined, FileOutlined, FileZipOutlined, FileTextOutlined, FilePptOutlined, FilePdfOutlined, FileMarkdownOutlined, FileImageOutlined, FileExcelOutlined, FileWordOutlined, FolderFilled, CheckOutlined } from '@ant-design/icons';
import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import objectPath from 'object-path';
import 'antd/es/form/style';
import _Form from 'antd/es/form';
import 'antd/es/radio/style';
import _Radio from 'antd/es/radio';
import 'antd/es/tabs/style';
import _Tabs from 'antd/es/tabs';
import 'antd/es/col/style';
import _Col from 'antd/es/col';
import 'antd/es/row/style';
import _Row from 'antd/es/row';
import 'antd/es/switch/style';
import _Switch from 'antd/es/switch';
import 'antd/es/input-number/style';
import _InputNumber from 'antd/es/input-number';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';
import 'antd/es/divider/style';
import _Divider from 'antd/es/divider';
import 'antd/es/button/style';
import _Button from 'antd/es/button';
import SortOrder from 'react-base-table/lib/SortOrder';
import 'antd/es/tooltip/style';
import _Tooltip from 'antd/es/tooltip';
import 'antd/es/popconfirm/style';
import _Popconfirm from 'antd/es/popconfirm';
import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';
import locale from 'antd/es/date-picker/locale/ru_RU';
import 'antd/es/upload/style';
import _Upload from 'antd/es/upload';
import 'antd/es/space/style';
import _Space from 'antd/es/space';
import 'antd/es/select/style';
import _Select from 'antd/es/select';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
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

var getValueFromSingleSelect = function getValueFromSingleSelect(name, keys) {
	return keys && keys.length > 0 ? keys[0] : null;
};

var getValueFromMultiSelect = function getValueFromMultiSelect(name, keys) {
	return keys && keys.length > 0 ? keys : null;
};

var getObjectExcludedProps = function getObjectExcludedProps(object, exclude) {
	var returnObject = {};
	Object.keys(object).forEach(function (key) {
		return !exclude.includes(key) ? returnObject[key] = object[key] : undefined;
	} // было null
	);
	return returnObject;
};

var notificationError = function notificationError(error, message) {
	if (error.response) {
		console.error(error.response.status, error.response.data);
		var errorDescription = error.response.data && error.response.data.error ? error.response.data.error : "Нет описания ошибки";
		_notification.error({
			message: '[' + error.response.status + '] ' + message,
			description: errorDescription
		});
	} else {
		console.error(error);
		_notification.error({
			message: 'Не удалось детектировать ошибку. См. console.error'
		});
	}
};

var dispatchToStore = function dispatchToStore(_ref) {
	var dispatch = _ref.dispatch,
	    setDateStore = _ref.setDateStore,
	    value = _ref.value,
	    extraData = _ref.extraData;

	if (dispatch.path) {
		// console.log("storeHOC => dispatchToStore");
		if (dispatch.type === 'event') setDateStore && setDateStore(dispatch.path, {
			timestamp: moment(),
			// type: dispatch.type,
			value: value,
			extraData: extraData
		});else setDateStore && setDateStore(dispatch.path, value);
	}
};

function useMounted() {
	var _React$useState = React.useState(false),
	    _React$useState2 = slicedToArray(_React$useState, 2),
	    isMounted = _React$useState2[0],
	    setIsMounted = _React$useState2[1];

	React.useEffect(function () {
		setIsMounted(true);
	}, []);
	return isMounted;
}

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

var SelectionHead = function SelectionHead(props) {
	var column = props.column,
	    container = props.container;
	var rowKey = column.rowKey,
	    onSelectAll = column.onSelectAll,
	    selectedRowKeys = column.selectedRowKeys,
	    selectAll = column.selectAll;


	var _handleChange = function _handleChange(e) {
		var rowKeys = flatten(getTableRowKeys(container.props.data, column.rowKey));
		var rowObjects = flatten(getTableRowObjects(container.props.data)).filter(function (item) {
			return rowKeys.includes(item[rowKey]);
		});
		var totalLength = rowKeys.length;
		var selectLength = selectedRowKeys.length;
		var checked = !(totalLength === selectLength);

		// const newRowKeys = container.props.data.map((item) => { return item[column.rowKey] });
		onSelectAll({ selected: checked, rowKeys: rowKeys, rowObjects: rowObjects });
	};

	return React.createElement(_Checkbox, {
		indeterminate: selectAll === null,
		onChange: _handleChange,
		checked: selectAll
	});
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

var onChangeSelectionCell = function onChangeSelectionCell(props) {
	var rowData = props.rowData,
	    rowIndex = props.rowIndex,
	    column = props.column,
	    rows = props.rows,
	    checked = props.checked;
	var rowKey = column.rowKey,
	    parentKey = column.parentKey,
	    nodeAssociated = column.nodeAssociated,
	    selectedRowKeys = column.selectedRowKeys,
	    indeterminateRowKeys = column.indeterminateRowKeys,
	    onChange = column.onChange;

	// const rowKeys = flatten(getTableRowKeys([rowData], column.rowKey));
	// const totalLength = container.props.data.length;
	// const checked = e.target.checked;
	// const currentRowKey = {[rowKey]: rowData[rowKey], checked};
	// console.log("_handleChange: ", container);

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

	var _parentAnalysis = parentAnalysis({
		rowData: rowData,
		rowKey: rowKey,
		parentKey: parentKey,
		checked: checked,
		nodeAssociated: nodeAssociated,
		treeData: rows,
		selectedRowKeys: _selectedRowKeys,
		indeterminateRowKeys: _indeterminateRowKeys
	});

	var _parentAnalysis2 = slicedToArray(_parentAnalysis, 2);

	_selectedRowKeys = _parentAnalysis2[0];
	_indeterminateRowKeys = _parentAnalysis2[1];


	var keys = [].concat(toConsumableArray(new Set(_selectedRowKeys)));
	var _selectedRowObjects = flatten(getTableRowObjects(rows)).filter(function (item) {
		return keys.includes(item[rowKey]);
	});
	//return [...new Set(_disabledElements)]
	// onChange({ selected: checked, totalLength, rowData, rowIndex });

	/** Выясняем новое состояние галочки "Выделить все" */
	var selectAll = void 0;
	var selectLength = keys.length;
	var totalLength = flatten(getTableRowKeys(rows, column.rowKey)).length;

	if (selectLength === 0) selectAll = false;else if (totalLength === selectLength) selectAll = true;else if (totalLength !== selectLength) selectAll = null;

	onChange({
		selected: checked,
		_selectedRow: {
			rowData: _extends({}, rowData),
			rowIndex: rowIndex,
			rowKey: rowKey
		},
		_selectAll: selectAll,
		_selectedRowKeys: keys, //[...new Set(_selectedRowKeys)],
		_selectedRowObjects: _selectedRowObjects,
		_indeterminateRowKeys: [].concat(toConsumableArray(new Set(_indeterminateRowKeys)))
	});

	// let uniqIds = {};
	// onChange({selected: checked, rowKeys: rowKeys.filter(obj => !uniqIds[obj[rowKey]] && (uniqIds[obj[rowKey]] = true)) });
};

var SelectionCell = function SelectionCell(props) {
	var rowData = props.rowData,
	    column = props.column;
	var selectedRowKeys = column.selectedRowKeys,
	    indeterminateRowKeys = column.indeterminateRowKeys,
	    rowKey = column.rowKey;

	var det = indeterminateRowKeys.includes(rowData[rowKey]);
	var checked = selectedRowKeys.includes(rowData[rowKey]);

	return React.createElement(_Checkbox, {
		indeterminate: det
		// onChange={(e) => _onChangeHandler(e.target.checked)}
		, checked: checked
	});
};

var rtPrefix = 'rt';

var SelectionList = function SelectionList(props) {
	var selectedRowObjects = props.selectedRowObjects,
	    rowRender = props.rowRender,
	    onClickDropSelect = props.onClickDropSelect;

	// console.log("SelectionList typeof -> ", typeof(rowRender));

	return React.createElement(
		'div',
		{ className: rtPrefix + '-table-selected-rows' },
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

var types = {
    INIT_STORE: 'INIT_STORE',
    SET_DATA_STORE: 'SET_DATA_STORE'
};

var setDateStore = function setDateStore(path, row) {
    return {
        type: types.SET_DATA_STORE,
        payload: { path: path, row: row }
    };
};

var empty$1 = React.createElement(
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

var overlay$1 = React.createElement(
	'div',
	{ className: 'BaseTable__overlay' },
	' ',
	React.createElement(_Spin, {
		tip: '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...',
		indicator: React.createElement(LoadingOutlined, { style: { fontSize: 24 }, spin: true })
	}),
	' '
);

var SelectionHead$1 = function SelectionHead(props) {
	var column = props.column,
	    container = props.container;
	var rowKey = column.rowKey,
	    onSelectAll = column.onSelectAll,
	    selectedRowKeys = column.selectedRowKeys,
	    selectAll = column.selectAll;


	var _handleChange = function _handleChange(e) {
		var rowKeys = flatten(getTableRowKeys(container.props.data, column.rowKey));
		var rowObjects = flatten(getTableRowObjects(container.props.data)).filter(function (item) {
			return rowKeys.includes(item[rowKey]);
		});
		var totalLength = rowKeys.length;
		var selectLength = selectedRowKeys.length;
		var checked = !(totalLength === selectLength);

		// const newRowKeys = container.props.data.map((item) => { return item[column.rowKey] });
		onSelectAll({ selected: checked, rowKeys: rowKeys, rowObjects: rowObjects });
	};

	return React.createElement(_Checkbox, {
		indeterminate: selectAll === null,
		onChange: _handleChange,
		checked: selectAll
	});
};

var getRowChildren$1 = function getRowChildren(data, rowKey) {
	return data.map(function (item) {
		if (item.children && item.children.length) {
			return [item[rowKey], getRowChildren(item.children, rowKey)];
		}
		return item[rowKey];
	});
};

var findBrothers$1 = function findBrothers(data, selfItem, rowKey, parentKey) {
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

var parentAnalysis$1 = function parentAnalysis(_ref) {
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
		var indeterminateBrothers = flatten(findBrothers$1(treeData, currentRowData, rowKey, parentKey, _indeterminateRowKeys));
		var selectedBrothers = flatten(findBrothers$1(treeData, currentRowData, rowKey, parentKey, _selectedRowKeys));
		var allBrothers = flatten(findBrothers$1(treeData, currentRowData, rowKey, parentKey));

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

var SelectionCell$1 = function SelectionCell(props) {
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
			if (rowData.children && nodeAssociated) rowChildren = flatten(getRowChildren$1(rowData.children, rowKey));

			_selectedRowKeys = _selectedRowKeys.concat([rowData[rowKey]]).concat(rowChildren);
			_indeterminateRowKeys = _indeterminateRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
		} else {
			if (rowData.children && nodeAssociated) rowChildren = flatten(getRowChildren$1(rowData.children, rowKey));

			_selectedRowKeys = _selectedRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
			_indeterminateRowKeys = _indeterminateRowKeys.filter(function (element) {
				return element !== rowData[rowKey] && !rowChildren.includes(element);
			});
		}

		var _parentAnalysis = parentAnalysis$1({
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


		var keys = [].concat(toConsumableArray(new Set(_selectedRowKeys)));
		var _selectedRowObjects = flatten(getTableRowObjects(container.props.data)).filter(function (item) {
			return keys.includes(item[rowKey]);
		});
		//return [...new Set(_disabledElements)]
		// onChange({ selected: checked, totalLength, rowData, rowIndex });

		/** Выясняем новое состояние галочки "Выделить все" */
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
			_selectedRowKeys: keys, //[...new Set(_selectedRowKeys)],
			_selectedRowObjects: _selectedRowObjects,
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
	    systemBtnProps = props.systemBtnProps,
	    disabledElements = props.disabledElements,
	    leftCustomSideElement = props.leftCustomSideElement,
	    centerCustomSideElement = props.centerCustomSideElement,
	    rightCustomSideElement = props.rightCustomSideElement;


	var defaultSystemBtnProps = {
		add: {
			tooltip: 'Добавить',
			onClick: onClickAdd,
			icon: React.createElement(PlusOutlined, null)
		},
		addAsCopy: {
			tooltip: 'Добавить копированием',
			onClick: onClickAddAsCopy,
			icon: React.createElement(CopyOutlined, null)
		},
		addGroup: {
			tooltip: 'Добавить группу',
			onClick: onClickAddGroup,
			icon: React.createElement(FolderAddOutlined, null)
		},
		edit: {
			tooltip: 'Изменить',
			onClick: onClickEdit,
			icon: React.createElement(EditOutlined, null)
		},
		delete: {
			tooltip: 'Удалить',
			icon: React.createElement(DeleteOutlined, null)
		},
		up: {
			tooltip: 'Переместить вверх',
			onClick: onClickUp,
			icon: React.createElement(ArrowUpOutlined, null)
		},
		down: {
			tooltip: 'Переместить вниз',
			onClick: onClickDown,
			icon: React.createElement(ArrowDownOutlined, null)
		},
		search: {
			placeholder: 'Поиск',
			onSearch: onSearch
		},
		settings: {
			tooltip: 'Настройки таблицы',
			tooltipPlacement: 'topRight',
			onClick: function onClick() {},
			icon: React.createElement(SettingOutlined, null)
		},
		filter: {
			tooltip: 'Настройки фильтров',
			tooltipPlacement: 'topRight',
			onClick: function onClick() {},
			icon: React.createElement(FilterOutlined, null)
		}
	};

	var _onClickDelete = function _onClickDelete(event) {
		if (deleteConfirmType === 'Modal') {
			deleteButtonModalConfirm();
		} else {
			onClickDelete(event);
		}
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
			renderDeleteBtn(false)
		);
	};

	var deleteButtonModalConfirm = function deleteButtonModalConfirm() {
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
	};

	var renderDeleteBtn = function renderDeleteBtn(withOnClick) {
		var genProps = _extends({}, defaultSystemBtnProps['all'], systemBtnProps['all']);
		var btnProps = _extends({}, defaultSystemBtnProps['delete'], systemBtnProps['delete']);

		return React.createElement(
			_Tooltip,
			{ title: btnProps.tooltip },
			React.createElement(_Button, _extends({}, genProps, {
				className: rtPrefix + '-btn',
				icon: btnProps.icon,
				onClick: withOnClick ? _onClickDelete : null,
				disabled: disabledElements.includes('delete')
			}))
		);
	};

	var renderBtn = function renderBtn(type) {
		var genProps = _extends({}, defaultSystemBtnProps['all'], systemBtnProps['all']);
		var btnProps = _extends({}, defaultSystemBtnProps[type], systemBtnProps[type]);

		if (showElements.includes(type)) {
			if (btnProps.render) return btnProps.render({
				disabled: disabledElements.includes(type),
				onClick: btnProps.onClick,
				onSearch: btnProps.onSearch
			});else if (type === 'search') return React.createElement(_Input.Search, {
				disabled: disabledElements.includes(type),
				defaultValue: defaultValueSearch,
				placeholder: btnProps.placeholder,
				onSearch: btnProps.onSearch,
				className: 'search'
			});else return React.createElement(
				_Tooltip,
				{ title: btnProps.tooltip, placement: btnProps.tooltipPlacement ? btnProps.tooltipPlacement : 'top' },
				React.createElement(_Button, _extends({}, genProps, {
					className: rtPrefix + '-btn',
					icon: btnProps.icon,
					onClick: btnProps.onClick,
					disabled: disabledElements.includes(type)
				}))
			);
		} else return null;
	};

	return React.createElement(
		React.Fragment,
		null,
		showElements.length || leftCustomSideElement || centerCustomSideElement || rightCustomSideElement ? React.createElement(
			'div',
			{
				className: rtPrefix + '-command-panel border-' + borderStyle
			},
			React.createElement(
				'div',
				{ className: 'left-system-side' },
				renderBtn('add'),
				renderBtn('addAsCopy'),
				renderBtn('addGroup'),
				renderBtn('edit'),
				showElements.includes('delete') ? deleteConfirm ? deleteConfirmType === 'Popup' ? deleteButtonPopupConfirm() : renderDeleteBtn(true) : renderDeleteBtn(true) : null,
				renderBtn('up'),
				renderBtn('down')
			),
			React.createElement(
				'div',
				{ className: 'left-custom-side' },
				leftCustomSideElement ? React.createElement(FormItems, { items: leftCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ className: 'center-custom-side' },
				centerCustomSideElement ? React.createElement(FormItems, { items: centerCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ className: 'right-custom-side' },
				rightCustomSideElement ? React.createElement(FormItems, { items: rightCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ className: 'right-system-side' },
				renderBtn('search'),
				renderBtn('settings'),
				renderBtn('filter')
			)
		) : null
	);
};

CommandPanel.propTypes = {
	/** Центральный кастомный элемент командной панели */
	centerCustomSideElement: PropTypes.arrayOf(PropTypes.object), // PropTypes.element,

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
	leftCustomSideElement: PropTypes.arrayOf(PropTypes.object),

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
	rightCustomSideElement: PropTypes.arrayOf(PropTypes.object),

	/** Массив элементов командной панели, которые надо отобразить
     ['add', 'addAsCopy', 'addGroup', 'delete', 'edit', 'up', 'down', 'search', 'settings', 'filter'] */
	showElements: PropTypes.arrayOf(PropTypes.string),

	/** Объект кастомизации системных кнопок
  { [btnType]: { tooltip: <String>, icon: <Icon />, render: ({disabled, onClick}) => <Component /> } } */
	systemBtnProps: PropTypes.object
};

CommandPanel.defaultProps = {
	centerCustomSideElement: null,
	borderStyle: 'bottom',
	defaultValueSearch: undefined,
	deleteConfirm: true,
	deleteConfirmType: 'Modal',
	deleteConfirmTitle: 'Подтвержение удаления',
	deleteConfirmDescription: 'Вы действительно хотите удалить?',
	disabledElements: [],
	leftCustomSideElement: null,
	onClickAdd: noop,
	onClickAddAsCopy: noop,
	onClickAddGroup: noop,
	onClickDelete: noop,
	onClickEdit: noop,
	onClickUp: noop,
	onClickDown: noop,
	onSearch: noop,
	rightCustomSideElement: null,
	showElements: [],
	systemBtnProps: {}
};

var APP_TIME_OFFSET = 3;

var getMomentFromStringByFormat = function getMomentFromStringByFormat(date, format) {
	return date ? moment(date, format).utcOffset(APP_TIME_OFFSET) : null;
};

// export const getMomentWithOffset = (date) =>
// 	moment(date).utcOffset(APP_TIME_OFFSET);
var getMomentWithOffset = function getMomentWithOffset(date) {
	return moment(date).format();
};

var getMomentWithOffsetTruncateDay = function getMomentWithOffsetTruncateDay(date) {
	return moment(date).startOf('day')
	// .hours(0)
	// .minutes(0)
	// .seconds(0)
	// .milliseconds(0)
	.format();
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

	var _useState3 = useState(undefined),
	    _useState4 = slicedToArray(_useState3, 2),
	    startValue = _useState4[0],
	    setStartValue = _useState4[1];

	var _useState5 = useState(undefined),
	    _useState6 = slicedToArray(_useState5, 2),
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

  var applyFilterTooltip = props.applyFilterTooltip,
      applyFilterSize = props.applyFilterSize,
      applyFilterRender = props.applyFilterRender,
      borderStyle = props.borderStyle,
      onChangeFilter = props.onChangeFilter,
      onApplyFilter = props.onApplyFilter,
      configFilter = props.configFilter,
      resetFilterRender = props.resetFilterRender,
      resetFilterTooltip = props.resetFilterTooltip,
      resetFilterSize = props.resetFilterSize;


  useEffect(function () {
    setFilter(props.defaultFilter);
  }, []);

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
    // console.log("_resetFilter:", props.defaultFilter);
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
  var getPanelCls = function getPanelCls() {
    var cls = [rtPrefix + "-filter-panel"];
    cls.push("border-" + borderStyle);
    if (configFilter.findIndex(function (item) {
      return !!item.title;
    }) === -1) cls.push(rtPrefix + "-filter-panel-no-title");
    return cls.join(" ");
  };

  return React.createElement(
    React.Fragment,
    null,
    configFilter && configFilter.length ? React.createElement(
      "div",
      { className: getPanelCls() },
      configFilter.map(function (item, index) {
        // console.log("item.defaultRows", item.defaultRows);
        var cls = [rtPrefix + "-filter-panel-item"];
        item.className && cls.push(item.className);
        switch (item.componentType) {
          case "DateRange":
            return React.createElement(DateRange, _extends({
              key: index
            }, item, {
              className: cls.join(" "),
              defaultValueStart: filter[item.nameStart] ? filter[item.nameStart] : null,
              defaultValueEnd: filter[item.nameEnd] ? filter[item.nameEnd] : null,
              onChange: _onChangeData,
              valueStart: filter[item.nameStart],
              valueEnd: filter[item.nameEnd]
            }));
          case "SingleDate":
            return React.createElement(SingleDate, _extends({
              key: index
            }, item, {
              className: cls.join(" "),
              dateFormat: item.dateFormat ? item.dateFormat : undefined,
              defaultValue: filter[item.name] ? filter[item.name] : null,
              onChange: _onChangeData,
              value: filter[item.name]
            }));
          case "MultiSelect":
          case "SingleSelect":
            return React.createElement(Select$1, _extends({
              key: index
            }, item, {
              type: item.componentType,
              defaultSelectedRowKeys: filter[item.name] ? filter[item.name] : null,
              selectedRowKeys: filter[item.name] ? filter[item.name] : [],
              className: cls.join(" "),
              onChangeKeys: _onChangeData,
              defaultValue: filter[item.name] ? filter[item.name] : null,
              value: filter[item.name]
            }));
          case "Custom":
            return React.createElement(
              React.Fragment,
              { key: index },
              item.render({
                onChange: _onChangeData,
                defaultValue: filter[item.name] ? filter[item.name] : null,
                value: filter[item.name]
              })
            );
          default:
            return null;
        }
      }),
      React.createElement(
        _Tooltip,
        { title: applyFilterTooltip },
        React.createElement(
          _Button,
          {
            type: "primary",
            size: applyFilterSize,
            style: { marginLeft: "auto" },
            onClick: _applyFilter
          },
          applyFilterRender
        )
      ),
      React.createElement(
        _Tooltip,
        { title: resetFilterTooltip },
        React.createElement(
          _Button,
          {
            size: resetFilterSize,
            style: { marginLeft: "10px" },
            onClick: _resetFilter
          },
          resetFilterRender
        )
      )
    ) : null
  );
};

FilterPanel.propTypes = {

  /** Тест Tooltip для кнопки "Применить фильтр" */
  applyFilterTooltip: PropTypes.string,

  /** Размер кнопки "Применить фильтр" ['small', 'middle', 'large'] */
  applyFilterSize: PropTypes.oneOf(["small", "middle", "large"]),

  /** Строка / функция / элемент для отображения в кнопке "Применить фильтр" */
  applyFilterRender: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.string]),

  /** Тип бордера панели (по умолчанию 'none')
   * ['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right'] */
  borderStyle: PropTypes.oneOf(["all", "none", "top", "left", "bottom", "right", "top-bottom", "left-right"]),

  /** Объект фильтра по умолчанию */
  defaultFilter: PropTypes.object,

  /** Конфигурация панели фильтров */
  configFilter: PropTypes.arrayOf(PropTypes.object),

  /** Событие по кнопке выполнить фильтр */
  onApplyFilter: PropTypes.func,

  /** Событие по изменение объекта фильтра */
  onChangeFilter: PropTypes.func,

  /** Тест Tooltip для кнопки "Сбросить фильтр" */
  resetFilterTooltip: PropTypes.string,

  /** Размер кнопки "Сбросить фильтр" ['small', 'middle', 'large'] */
  resetFilterSize: PropTypes.oneOf(["small", "middle", "large"]),

  /** Строка / функция / элемент для отображения в кнопке "Сбросить фильтр" */
  resetFilterRender: PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.string])
};

FilterPanel.defaultProps = {
  applyFilterTooltip: "Применить фильтр",
  applyFilterSize: "middle",
  applyFilterRender: "Применить",
  borderStyle: "none",
  defaultFilter: {},
  configFilter: [],
  onApplyFilter: noop,
  onChangeFilter: noop,
  resetFilterTooltip: "Сбросить фильтр",
  resetFilterSize: "middle",
  resetFilterRender: "Сбросить"
};

var SelectionList$1 = function SelectionList(props) {
	var selectedRowObjects = props.selectedRowObjects,
	    rowRender = props.rowRender,
	    onClickDropSelect = props.onClickDropSelect;

	// console.log("SelectionList typeof -> ", typeof(rowRender));

	return React.createElement(
		'div',
		{ className: rtPrefix + '-table-selected-rows' },
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

SelectionList$1.propTypes = {
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

SelectionList$1.defaultProps = {};

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

	var _useState25 = useState(false),
	    _useState26 = slicedToArray(_useState25, 2),
	    _footerShow = _useState26[0],
	    _setFooterShow = _useState26[1];

	var tableRef = useRef();

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
	    estimatedRowHeight = props.estimatedRowHeight,
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
	    rowRenderShowSelection = props.rowRenderShowSelection,
	    dispatchPath = props.dispatchPath,
	    subscribe = props.subscribe;

	// console.log('props.commandPanelProps => ', props.commandPanelProps);

	var commandPanelProps = _extends({}, CommandPanel.defaultProps, props.commandPanelProps);
	var filterPanelProps = _extends({}, FilterPanel.defaultProps, props.filterPanelProps);

	var footerProps = _extends({}, Table.defaultProps.footerProps, props.footerProps);

	var selectedDispatchPath = dispatchPath && dispatchPath + '.selected';
	var rowsDispatchPath = dispatchPath && dispatchPath + '.rows';

	useEffect(function () {
		// console.log("Инициализация дефолтных значений ");
		// console.log("Инициализация дефолтных значений defaultSelectedRowKeys > ", defaultSelectedRowKeys);

		// Инициализация дефолтных значений
		// _setRows(defaultRows);
		_setRowsHandler(defaultRows);
		setSelectedRowKeys(defaultSelectedRowKeys);
		setSearchValue(defaultSearchValue);
		setFilter(defaultFilter);
		setSortBy(defaultSortBy);
		setSelectAll(defaultRows.length > 0 && defaultRows.length === defaultSelectedRowKeys.length);
		// Определение нужно ли отображать подвал
		_setFooterShow(footerProps.showElements.length || footerProps.leftCustomSideElement || footerProps.centerCustomSideElement || footerProps.rightCustomSideElement);

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
					var _parentAnalysis = parentAnalysis$1({
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
		// console.log("Table => props ", props);
		setMounted(true);
		if (ref && typeof ref === 'function') ref({ reloadData: reloadData });else if (ref && (typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) === 'object') ref.current = { reloadData: reloadData };
	}, []);

	useEffect(function () {
		if (type === 'localSide') {
			// console.log("Control useEffect => ", rows, selectedRowKeys, searchValue, filter, sortBy);
			// _setRows(rows);
			_setRowsHandler(rows);
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

	/** Подписка на изменение props[subscribe.name] в сторе */
	useEffect(function () {
		if (subscribe.name) {
			// console.log("Table => useEffect => subscribe.value ", props[subscribe.name]);
			subscribe.onChange && subscribe.onChange({ value: props[subscribe.name], setReloadTable: reloadData });
		}
	}, [props[subscribe.name]]);

	/** BASE FUNCTIONS */
	var _setRowsHandler = function _setRowsHandler(rows) {
		_setRows(rows);
		rowsDispatch(rows);
	};
	var setRowsHandler = function setRowsHandler(rows) {
		setRows(rows);
		rowsDispatch(rows);
	};
	var rowsDispatch = function rowsDispatch(rows) {
		rowsDispatchPath && props.setDateStore && props.setDateStore(rowsDispatchPath, rows);
	};

	var reloadData = function reloadData(_ref) {
		var sortBy = _ref.sortBy,
		    filter = _ref.filter,
		    searchValue = _ref.searchValue;

		// console.log("reloadData params ", sortBy, filter, searchValue, loading);
		if (props.value && props.value.length > 0) setSelectedRowKeys(props.value.map(function (item) {
			return item[rowKey];
		}));else setSelectedRowKeys([]);
		// setSelectedRowKeys([]);
		if (sortBy) setSortBy(sortBy);
		if (filter) setFilter(filter);
		if (searchValue) setSearchValue(searchValue);
		_dataProcessing({
			sortBy: sortBy ? sortBy : _sortBy,
			filter: filter ? filter : _filter,
			searchLine: searchValue ? searchValue : _searchValue,
			reload: true
		});
		// console.log("reloadData loading ", loading);
	};

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
							return notificationError(error, 'Ошибка получения количества записей по фильтру');
						});
					}

					// console.log('requestLoadRows => ', typeof requestLoadRows);
					// if(typeof requestLoadRows !== 'function'){
					//     setLoading(false);
					// }
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
								// _setRows(result);
								_setRowsHandler(result);
							} else {
								var newRows = [].concat(toConsumableArray(_rows));
								// (data, rowKey, rowValue)
								result.forEach(function (child) {
									child.children = [defineProperty({}, rowKey, generateUUID())];
								});
								var node = findNodeByRowKey(newRows, rowKey, expandRow[rowKey]);
								node.children = result;
								// console.log('newRows -> ', newRows);
								// _setRows(newRows);
								_setRowsHandler(newRows);
							}
						} else {
							if (result && result.length < pageSize) {
								setHasMore(false);
							} else {
								setHasMore(true);
							}
							pageNum === 0 ? _setRowsHandler(result) // _setRows
							: _setRowsHandler(_rows.concat(result)); // _setRows

							// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);
							if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(result, rowKey)));
						}

						setLoading(false);
					}).catch(function (error) {
						notificationError(error, 'Ошибка загрузки данных');
						_setRowsHandler(_rows); // _setRows
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
				// console.log('_rowEventHandlers -> onClick', rowKey, rowIndex);
				var newRowObject = {
					rowData: _extends({}, rowData),
					rowIndex: rowIndex,
					rowKey: rowKey
				};
				// if(type !== 'localSide')
				setSelectedRowKeys([rowKey]);
				// setSelectedRow(newRowObject);
				// setSelectedRowObjects([newRowObject]);
				selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, rowData);
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
				headerRenderer: SelectionHead$1,
				cellRenderer: SelectionCell$1,
				width: 40,
				flexShrink: 0,
				resizable: false,
				frozen: 'left',
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
		React.Fragment,
		null,
		_footerShow ? React.createElement(
			React.Fragment,
			null,
			React.createElement(
				'div',
				{ key: 'footer-left-custom-side', className: 'left-custom-side' },
				footerProps.leftCustomSideElement ? React.createElement(FormItems, { items: footerProps.leftCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ key: 'footer-center-custom-side', className: 'center-custom-side' },
				footerProps.centerCustomSideElement ? React.createElement(FormItems, { items: footerProps.centerCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ key: 'footer-right-custom-side', className: 'right-custom-side' },
				footerProps.rightCustomSideElement ? React.createElement(FormItems, { items: footerProps.rightCustomSideElement }) : null
			),
			selectable ? React.createElement(
				React.Fragment,
				null,
				footerProps.showElements.includes('selected') ? React.createElement(
					'span',
					null,
					footerProps.selectedTitle,
					' ',
					_selectedRowKeys.length
				) : null,
				footerProps.showElements.includes('loaded') ? React.createElement(
					'span',
					null,
					footerProps.loadedTitle,
					' ',
					flatten(getTableRowKeys(_rows, rowKey)).length
				) : null
			) : null,
			footerProps.showElements.includes('total') ? type === 'infinity' && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad ? React.createElement(
				'span',
				null,
				footerProps.totalTitle,
				' ',
				_totalCountRows
			) : React.createElement(
				'span',
				null,
				footerProps.totalTitle,
				' ',
				flatten(getTableRowKeys(_rows, rowKey)).length
			) : null
		) : null
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
		    _selectedRowObjects = _ref8._selectedRowObjects,
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
		// console.log("_handleSelectChange", props);
		// dispatchPath && props.setTableSelectedRow && props.setTableSelectedRow(dispatchPath, _selectedRow.rowData);
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, _selectedRowObjects);
		onRowClick({
			selected: selected,
			rowData: _selectedRow.rowData,
			rowIndex: _selectedRow.rowIndex,
			rowKey: rowKey
		});
		onSelectedRowsChange(_selectedRowKeys, _selectedRowObjects);
	};

	/** Событие при изменении галочки "Выделить все" */
	var _onSelectAllHandler = function _onSelectAllHandler(_ref9) {
		var selected = _ref9.selected,
		    rowKeys = _ref9.rowKeys,
		    rowObjects = _ref9.rowObjects;

		var selectedKeys = selected ? rowKeys : [];
		setSelectedRowKeys(selectedKeys);
		setIndeterminateRowKeys([]);
		setSelectAll(selected);
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, selected ? rowObjects : []);
		// setSelectedRowObjects(rows);
		// console.log("_handleSelectAll", selectedKeys);
		onSelectedRowsChange(selectedKeys, rowObjects);
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
			// console.log('_getDisabledElementsOfCommandPanel => infinity');
		}
		if (selectable && _selectedRowKeys.length > 1) {
			_disabledElements.push('addAsCopy', 'edit', 'up', 'down');
			// console.log('_getDisabledElementsOfCommandPanel => selectable');
		}
		if (_selectedRowKeys.length === 0) {
			_disabledElements.push('addAsCopy', 'edit', 'delete', 'up', 'down');
			// console.log('_getDisabledElementsOfCommandPanel => NO select');
		}
		// if (expandColumnKey) {
		//|| !selectedRow) {
		// _disabledElements.push('up', 'down');
		// console.log('_getDisabledElementsOfCommandPanel => expandColumnKey');
		// }
		// console.log('_getDisabledElementsOfCommandPanel => ', _disabledElements, _selectedRowKeys);

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
				setRowsHandler(_rows.filter(function (item) {
					return !_selectedRowKeys.includes(item[rowKey]);
				}));
			} else {
				_setRowsHandler(_rows.filter(function (item) {
					return !_selectedRowKeys.includes(item[rowKey]);
				}));
			}
			setSelectedRowKeys([]);
		}
		commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	var loop = function loop(data, key, callback) {
		for (var i = 0; i < data.length; i++) {
			if (data[i][rowKey] === key) {
				// console.log(`Selected => index: [${i}], path: [${data[i].path}]`, data);
				return callback(data[i], i, data);
			}
			if (data[i].children) {
				loop(data[i].children, key, callback);
			}
		}
	};

	var _onClickUp = function _onClickUp(event) {
		var data = [].concat(toConsumableArray(_rows));
		var key = _selectedRowKeys[0];
		loop(data, key, function (item, index, arr) {
			var newRowIndex = _getNewIndexRow(index, index - 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			commandPanelProps.onClickUp(event, {
				rowIndex: newRowIndex,
				rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
			}, data);
		});
	};

	var _onClickDown = function _onClickDown(event) {
		var data = [].concat(toConsumableArray(_rows));
		var key = _selectedRowKeys[0];
		loop(data, key, function (item, index, arr) {
			var newRowIndex = _getNewIndexRow(index, index + 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			commandPanelProps.onClickDown(event, {
				rowIndex: newRowIndex,
				rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])
			}, data);
		});
	};

	var _getNewIndexRow = function _getNewIndexRow(oldIndex, newIndex) {
		return newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;
	};

	var _changeIndexRow = function _changeIndexRow(oldIndex, newIndex, arr, data) {
		if (newIndex >= 0 && newIndex < arr.length) {
			// let arr = [..._rows]; // Копируем массив
			var item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
			// console.log('_changeIndexRow => ',item);
			arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
			// console.log("_changeIndexRow", item[0]);
			if (type === 'localSide') {
				setRowsHandler(data);
			} else {
				_setRowsHandler(data);
			}
		}
	};

	var _onSearch = function _onSearch(searchLine, e) {
		e.preventDefault();
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
			className: rtPrefix + '-table',
			style: { width: '100%', height: '100%' }
		},
		React.createElement(
			'div',
			{ className: rtPrefix + '-table-top-panel' },
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
			{ className: rtPrefix + '-baseTable' },
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
						footerHeight: _footerShow ? footerProps.height : 0,
						headerHeight: headerHeight,
						rowHeight: rowHeight,
						overlayRenderer: loading ? overlay$1 : null,
						footerRenderer: _footer,
						rowRenderer: rowRenderer,
						estimatedRowHeight: estimatedRowHeight
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
		showSelection && selectable && !expandColumnKey ? React.createElement(SelectionList$1, {
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

	/** Столбцы таблицы */
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,

	/** Тип таблицы
  * **infinity** - загрузка данных по скроллу. Фильтрация, сортировка и поиск через сервер.
  * **serverSide** - первичная загрузка таблицы с сервера. Фильтрация, сортировка и поиск через сервер. Lazy Load для дерева тоже тут.
  * **localSide** - полностью локальная таблица. Фильтрация, сортировка и поиск через локальный rows */
	type: PropTypes.oneOf(['infinity', 'serverSide', 'localSide']).isRequired,

	/** Объект со свойствами Command Panel */
	commandPanelProps: PropTypes.object,

	/** Объект со свойствами Filter Panel */
	filterPanelProps: PropTypes.object,

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
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc'])
	}),

	/**
  * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
  * */

	/** Строки таблицы. Используется для контроля таблицы из вне. */
	rows: PropTypes.arrayOf(PropTypes.object),

	/** Функция задания строк таблицы. */
	setRows: PropTypes.func,

	/** Выделенные строки таблицы. */
	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Объект фильтрации */
	filter: PropTypes.object,

	/** Объект сортировки */
	sortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc'])
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

	/** Заголовки футтера */
	footerTitles: PropTypes.shape({
		/** Заголовок выделенных элементов */
		selectedRows: PropTypes.string,
		/** Заголовок загруженных элементов */
		loadedRows: PropTypes.string,
		/** Заголовок всего элементов */
		totalRows: PropTypes.string
	}),

	footerProps: PropTypes.shape({

		/** Высота подвала */
		height: PropTypes.number,

		/** Массив элементов футтера, которые надо отобразить
   * ['selected', 'loaded', 'total'] */
		showElements: PropTypes.arrayOf(PropTypes.string),

		/** Заколовок для кол-ва выбранных объектов */
		selectedTitle: PropTypes.string,

		/** Заколовок для кол-ва загруженны объектов */
		loadedTitle: PropTypes.string,

		/** Заколовок для кол-ва всего объектов */
		totalTitle: PropTypes.string,

		/** Левый кастомный элемент командной панели */
		leftCustomSideElement: PropTypes.arrayOf(PropTypes.object),

		/** Центральный кастомный элемент командной панели */
		centerCustomSideElement: PropTypes.arrayOf(PropTypes.object),

		/** Правый кастомный элемент командной панели */
		rightCustomSideElement: PropTypes.arrayOf(PropTypes.object)
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

	/** SELECTED PANEL */

	/** Отображать ли панель выбранных элементов */
	showSelection: PropTypes.bool,

	/** Строка или функция для отображения элементов списка выбранных
  * Строка - имя поля
  * Функция - рендер строк.
  * `({ rowData, rowIndex }) => { return <Component> }` */
	rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

	/** Путь в сторе куда класть выбранную строку таблицы */
	dispatchPath: PropTypes.string,

	/** Объект для подписки на изменения в STORE */
	subscribe: PropTypes.object
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

	empty: empty$1,
	overlay: overlay$1,
	fixWidthColumn: false,
	footerHeight: 30,
	footerShow: false,
	footerTitles: {
		selectedRows: 'Выделено:',
		loadedRows: 'Загружено записей:',
		totalRows: 'Всего записей:'
	},
	footerProps: {
		height: 30,
		showElements: [],
		selectedTitle: 'Выделено:',
		loadedTitle: 'Загружено записей:',
		totalTitle: 'Всего записей:',
		leftCustomSideElement: null,
		centerCustomSideElement: null,
		rightCustomSideElement: null
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

	showSelection: false,

	subscribe: {}
};

var mapStateToProps = function mapStateToProps(store, ownProps) {
	var subscribe = ownProps.subscribe;

	if (subscribe) {
		var name = subscribe.name,
		    path = subscribe.path;

		if (name && path) return defineProperty({}, name, objectPath.get(store, path));
	}

	return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

// const mapStateToProps = (store, ownProps) => {
//     // console.log("mapStateToProps -> store", store);
//     // const {match , section} = ownProps;
//     // const { path } = match;
//     // const rows = store.table[path] && store.table[path][section] ? store.table[path][section].rows : [];
//     // console.log("mapStateToProps -> rows", rows);
//     return { store: store };
// };
// const mapDispatchToProps = (dispatch, ownProps) => {
//     // console.log("mapDispatchToProps -> ownProps", ownProps);
//     // const {match , section} = ownProps;
//     // const { path } = match;
//     // initTableStore(path, section);
//     return bindActionCreators(
//         {
//             initTableStore,
//             setRows,
//         },
//         dispatch
//     );
// };
//
// export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);

/**
 * @deprecated [#1] since version 0.0.54 [#2].
 * */
var Table$1 = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);

var Paragraph = _Typography.Paragraph;


var Select = function Select(props) {
	var _useState = useState([]),
	    _useState2 = slicedToArray(_useState, 2),
	    _selectedRowKeys = _useState2[0],
	    setSelectedRowKeys = _useState2[1];

	var _useState3 = useState(null),
	    _useState4 = slicedToArray(_useState3, 2),
	    _selectedRowData = _useState4[0],
	    _setSelectedRowData = _useState4[1];

	var _useState5 = useState(false),
	    _useState6 = slicedToArray(_useState5, 2),
	    isSelectOpened = _useState6[0],
	    setIsSelectOpened = _useState6[1];

	var _useState7 = useState(false),
	    _useState8 = slicedToArray(_useState7, 2),
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
					data: defineProperty({}, rowKey, _selectedRowKeys2)
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
				null,
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
			React.createElement(Table$1, _extends({}, props, {
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
var mapDispatchToProps$1 = function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

var Select$1 = connect(null, mapDispatchToProps$1)(Select);

var _this = undefined;

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
		var cleanupFunction = false;
		var loadData = function () {
			var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
			return _extends({}, defaultFilter, defineProperty({}, parentKey, null));
		} else return defaultFilter;
	};

	if (config && config.fields) {
		// console.log('AdvancedTable render table -> ', config);
		return React.createElement(Table$1, _extends({}, props, {
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

var excludeProps = ["noPadding", "scrollable", "header", "body", "footer", "loadInitData", "autoSaveForm", "requestSaveForm", "methodSaveForm", "processBeforeSaveForm"];

var Form = function Form(props) {
    var loadInitData = props.loadInitData,
        header = props.header,
        body = props.body,
        footer = props.footer,
        autoSaveForm = props.autoSaveForm,
        requestSaveForm = props.requestSaveForm,
        methodSaveForm = props.methodSaveForm,
        processBeforeSaveForm = props.processBeforeSaveForm;

    /** Состояние первоначалной настройки компонента*/

    var _useState = useState(false),
        _useState2 = slicedToArray(_useState, 2),
        loaded = _useState2[0],
        setLoaded = _useState2[1];

    var _useState3 = useState({}),
        _useState4 = slicedToArray(_useState3, 2),
        antFormProps = _useState4[0],
        setAntFormProps = _useState4[1];

    var _useState5 = useState({}),
        _useState6 = slicedToArray(_useState5, 2),
        initFormData = _useState6[0],
        setInitFormData = _useState6[1];

    useEffect(function () {
        if (!loaded) {
            if (loadInitData !== noop) loadInitData(_setInitFormData);else setLoaded(true);
        }
    }, [loaded]);

    useEffect(function () {
        setAntFormProps(getObjectExcludedProps(props, excludeProps));
        // console.log('antFormProps props => ', getObjectExcludedProps(props, excludeProps));
    }, [props]);

    var _setInitFormData = function _setInitFormData(data) {
        // console.log("Form loaded init data => ", data);
        setInitFormData(data);
        setLoaded(true);
    };

    var antForm = void 0;
    if (props && props.form) {
        antForm = props.form;
    } else {
        var _AntForm$useForm = _Form.useForm(),
            _AntForm$useForm2 = slicedToArray(_AntForm$useForm, 1),
            form = _AntForm$useForm2[0];

        antForm = form;
    }

    var getBodyCls = function getBodyCls() {
        var cls = [rtPrefix + "-form-body"];
        props.noPadding && cls.push(rtPrefix + "-form-body-no-padding");
        props.scrollable && cls.push(rtPrefix + "-form-body-scrollable");
        return cls.join(" ");
    };

    var onFinish = function onFinish(rawValues) {
        var values = processBeforeSaveForm ? processBeforeSaveForm(rawValues) : rawValues;
        console.log("Success form [" + (props.name ? props.name : 'no name form') + "]: ", values);
        if (autoSaveForm && requestSaveForm) {
            var saveObject = _extends({}, initFormData, values);
            requestSaveForm({
                method: methodSaveForm,
                data: saveObject
            }).then(function (response) {
                _notification.success({
                    message: "Сохранение прошло успешно"
                });
                if (props.onFinish) props.onFinish(values);
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else if (props.onFinish) props.onFinish(values);
    };

    var onFinishFailed = function onFinishFailed(errorInfo) {
        console.error("Failed:", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    return React.createElement(
        React.Fragment,
        null,
        loaded ? React.createElement(
            _Form,
            _extends({
                form: antForm
            }, antFormProps, {
                className: antFormProps.className + " " + rtPrefix + "-form",
                style: _extends({}, antFormProps.style, { width: '100%', height: '100%' }),
                initialValues: _extends({}, antFormProps.initialValues, initFormData),
                onFinish: onFinish,
                onFinishFailed: onFinishFailed
            }),
            header ? React.createElement(
                "div",
                { className: rtPrefix + "-form-header" },
                React.createElement(FormItems, { items: header })
            ) : null,
            React.createElement(
                "div",
                { className: getBodyCls() },
                React.createElement(FormItems, { items: body })
            ),
            footer ? React.createElement(
                "div",
                { className: rtPrefix + "-form-footer" },
                React.createElement(FormItems, { items: footer })
            ) : null
        ) : null
    );
};

Form.propTypes = {

    /** Не делать отступы у формы от краев блока */
    noPadding: PropTypes.bool,

    /** scrollable
     */
    scrollable: PropTypes.bool,

    /** Массив объектов для шапки формы. Как правило только заголовок. */
    header: PropTypes.arrayOf(PropTypes.object),

    /** Массив объектов для тела формы */
    body: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
    footer: PropTypes.arrayOf(PropTypes.object),

    /** Ссылка на функцию загрузки значений по умолчанию
     * (callBack) => callBack(initObject) */
    loadInitData: PropTypes.func,

    /** Производить ли автоматическое сохранение по параметрам requestSaveForm и methodSaveForm */
    autoSaveForm: PropTypes.bool,

    /** Запрос для автоматического сохранения формы */
    requestSaveForm: PropTypes.func,

    /** HTTP Метод, передаваемый в запрос сохранения */
    methodSaveForm: PropTypes.string,

    /** Функция обработки перед сохранением формы */
    processBeforeSaveForm: PropTypes.func
};

Form.defaultProps = {
    noPadding: false,
    scrollable: false,
    loadInitData: noop,
    autoSaveForm: true
};

var excludeProps$1 = ['type', 'initialValues', 'form'];

var FormModal = function FormModal(props) {
    var modal = props.modal,
        selectedRow = props.selectedRow,
        visible = props.visible,
        setVisible = props.setVisible,
        saveRow = props.saveRow;


    var getDefaultFooterProps = function getDefaultFooterProps() {

        var okText = '';
        var cancelText = '';
        var modalTitle = '';

        switch (modal.type) {
            case 'addOnServer':
            case 'addGroupOnServer':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Сохранить на сервере';
                break;
            case 'addOnLocal':
            case 'addGroupOnLocal':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Сохранить локально';
                break;
            case 'editOnServer':
            case 'editGroupOnServer':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Измененить на сервере';
                break;
            case 'editOnLocal':
            case 'editGroupOnLocal':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Изменение локально';
                break;
            case 'select':
                okText = 'Добавить';
                cancelText = 'Отмена';
                modalTitle = 'Выбор';
                break;
            case 'viewGroup':
            case 'viewObject':
                okText = 'Закрыть';
                modalTitle = 'Просмотр';
                break;
        }

        if (modal.okText) okText = modal.okText;

        if (modal.cancelText) cancelText = modal.cancelText;

        if (modal.title) modalTitle = modal.title;

        return { okText: okText, cancelText: cancelText, title: modalTitle, okType: 'primary' };
    };

    var modalProps = _extends({}, getDefaultFooterProps(), getObjectExcludedProps(modal, excludeProps$1));

    var onFinish = function onFinish(values) {
        // console.log('FormModal Success:', values, selectedRow);
        var saveObj = {};
        if (modal.type.startsWith('add')) saveObj = _extends({}, values);else saveObj = _extends({}, selectedRow, values);

        saveRow({ type: modal.type, row: saveObj, requestSaveRow: modal.requestSaveRow });

        if (modalProps.onOk) modalProps.onOk(values);
        if (modalProps.onFinish) modalProps.onFinish(values);
    };

    var onFinishFailed = function onFinishFailed(errorInfo) {
        // console.log('FormModal Failed:', errorInfo);
        console.error("FormModal fields failed: ", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    var _onCancelHandler = function _onCancelHandler(e) {
        // setVisibleModals({ ...visibleModals, [modal.type]: false });
        // form.resetFields();
        setVisible(modal.type, false);
        if (modalProps.onCancel) modalProps.onCancel(e);
    };

    var _onLoadInitData = function _onLoadInitData(callBack) {
        // console.log("Modal => loadInitData", selectedRow);
        formConfig.loadInitData(callBack, selectedRow);
    };

    var defaultFooter = [{
        componentType: 'Item',
        child: _extends({
            componentType: 'Button',
            label: modalProps.cancelText,
            className: 'mr-8',
            onClick: _onCancelHandler
        }, modalProps.cancelButtonProps)
    }, {
        componentType: 'Item',
        child: _extends({
            componentType: 'Button',
            label: modalProps.okText,
            type: modalProps.okType,
            htmlType: 'submit'
        }, modalProps.okButtonProps)
    }];

    var formConfig = _extends({
        footer: defaultFooter
    }, modal.form);
    return React.createElement(
        _Modal,
        _extends({}, modalProps, {
            centered: true,
            destroyOnClose: true,
            visible: visible,
            onCancel: _onCancelHandler,
            bodyStyle: _extends({ padding: 0 }, modalProps.bodyStyle),
            footer: null
        }),
        React.createElement(Form, _extends({}, formConfig, {
            onFinish: onFinish,
            onFinishFailed: onFinishFailed,
            loadInitData: _onLoadInitData
        }))
    );
};

FormModal.propTypes = {
    /** Объект модального окна */
    modal: PropTypes.object,

    /** Выделенная строка таблицы */
    selectedRow: PropTypes.object,

    /** Состояние видимости модалки */
    visible: PropTypes.bool,

    /** Задание состояния видимости модалки */
    setVisible: PropTypes.func,

    /** CallBack функция для сохранения данных */
    saveRow: PropTypes.func
};

var _this$1 = undefined;

var excludeProps$2 = ['onChange', 'defaultValue', 'modals', 'events', 'history'];

var FormTable = forwardRef(function (props, ref) {

    /** Состояние первоначалной настройки компонента*/
    var _useState = useState(false),
        _useState2 = slicedToArray(_useState, 2),
        loading = _useState2[0],
        setLoading = _useState2[1];

    /** Состояние отображения модалок таблицы */


    var _useState3 = useState({
        addOnServer: false,
        editOnServer: false,
        addOnLocal: false,
        editOnLocal: false,
        addGroupOnServer: false,
        editGroupOnServer: false,
        addGroupOnLocal: false,
        editGroupOnLocal: false,
        select: false,
        viewGroup: false,
        viewObject: false }),
        _useState4 = slicedToArray(_useState3, 2),
        visibleModals = _useState4[0],
        setVisibleModals = _useState4[1];

    var _useState5 = useState([]),
        _useState6 = slicedToArray(_useState5, 2),
        tableRows = _useState6[0],
        setTableRows = _useState6[1];

    var _useState7 = useState([]),
        _useState8 = slicedToArray(_useState7, 2),
        tableSelectedRowKeys = _useState8[0],
        setTableSelectedRowKeys = _useState8[1];

    var _useState9 = useState({}),
        _useState10 = slicedToArray(_useState9, 2),
        tableSelectedRow = _useState10[0],
        setTableSelectedRow = _useState10[1];

    /** Ссылка на объект таблицы */


    var _useState11 = useState({}),
        _useState12 = slicedToArray(_useState11, 2),
        tableRef = _useState12[0],
        setTableRef = _useState12[1];

    var _setTableRef = function _setTableRef(_ref) {
        setTableRef(_ref);
        ref && ref(_ref);
    };

    var rowKey = props.rowKey,
        rowKeyType = props.rowKeyType,
        customFields = props.customFields,
        modals = props.modals,
        isGroupKey = props.isGroupKey,
        history = props.history,
        componentType = props.componentType,
        name = props.name,
        value = props.value,
        requestDeleteRow = props.requestDeleteRow,
        dataDeleteRow = props.dataDeleteRow;

    var cmdProps = props.commandPanelProps;

    // let advancedTableProps = getObjectExcludedProps(props, excludeProps);

    /** Аналог componentDidMounted */
    useEffect(function () {
        // Если таблица локальная, то пробуем загрузить исходные данные
        if (!loading && props.type === 'localSide') {
            var cleanupFunction = false;
            setLoading(true);
            var loadData = function () {
                var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!loading && props.requestLoadRows) {
                                        props.requestLoadRows({ params: { page: 0, size: 1 }, data: {} }).then(function (response) {
                                            // console.log('FormTable -> requestLoadRows -> response', response);
                                            // console.log('FormTable -> requestLoadRows -> value', value);
                                            if (!cleanupFunction) _addRowsToLocalTable(response.data, value);
                                        }).catch(function (error) {
                                            return notificationError(error, 'Ошибка загрузки данных');
                                        });
                                    }
                                    // console.log('FormTable -> setMounted ', advancedTableProps.type);
                                    setLoading(false);

                                case 2:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this$1);
                }));

                return function loadData() {
                    return _ref2.apply(this, arguments);
                };
            }();
            loadData();
            return function () {
                return cleanupFunction = true;
            };
        }
    }, [props.type]);

    useEffect(function () {
        if (props.selectable) {
            console.log("FormTable => useEffect => value: ", value);
            if (value && value.length > 0) setTableSelectedRowKeys(value.map(function (item) {
                return item[rowKey];
            }));else setTableSelectedRowKeys([]);
        }
    }, [value]);

    /** Получить список кнопок для Command Panel */
    var getEvents = function getEvents() {
        return cmdProps && cmdProps.systemBtnProps && Object.keys(cmdProps.systemBtnProps) || [];
    };

    /** Получить рендер модалок */
    var getModals = function getModals() {
        return modals.map(function (modal, index) {
            return React.createElement(FormModal, {
                key: index,
                modal: modal,
                selectedRow: tableSelectedRow,
                visible: visibleModals[modal.type],
                setVisible: function setVisible(type, value) {
                    return setVisibleModals(_extends({}, visibleModals, defineProperty({}, type, value)));
                },
                saveRow: _onSaveRow
            });
        });
    };

    /** Проверка существования кнопки в Command Panel */
    var isExistCmdBtn = function isExistCmdBtn(btnType) {
        return cmdProps && cmdProps.systemBtnProps && cmdProps.systemBtnProps[btnType];
    };

    /** Проверка соответствия типа кнопки и события ? (params) === (props) */
    var equalsActionTypeCmdBtn = function equalsActionTypeCmdBtn(btnType, actionType) {
        if (isExistCmdBtn(btnType)) {
            if (btnType === 'edit') {
                var aTypes = actionType.split('/');
                if (aTypes[0] === 'g') {
                    return !!(cmdProps.systemBtnProps[btnType].actionType && cmdProps.systemBtnProps[btnType].actionType.length === 2 && cmdProps.systemBtnProps[btnType].actionType[1] === aTypes[1]);
                } else if (aTypes[0] === 'i') {
                    return !!(cmdProps.systemBtnProps[btnType].actionType && cmdProps.systemBtnProps[btnType].actionType.length === 2 && cmdProps.systemBtnProps[btnType].actionType[0] === aTypes[1]);
                }
            } else {
                return !!(cmdProps.systemBtnProps[btnType].actionType && cmdProps.systemBtnProps[btnType].actionType === actionType);
            }
        }
        return false;
    };

    /** Command Panel Events */
    /** Добавить */
    var _onClickAddHandler = function _onClickAddHandler() {
        if (equalsActionTypeCmdBtn('add', 'modal')) {
            // console.log("FormTable => _onClickAddHandler => modal");
            if (props.type !== 'localSide') {
                setVisibleModals(_extends({}, visibleModals, { addOnServer: true }));
            } else {
                if (modals && modals.find(function (modal) {
                    return modal.type === 'select';
                }) !== undefined) {
                    setVisibleModals(_extends({}, visibleModals, { select: true }));
                    // console.log("FormTable => _onClickAddHandler => select", modals.find(modal => modal.type === 'select'));
                } else {
                    setVisibleModals(_extends({}, visibleModals, { addOnLocal: true }));
                    // console.log("FormTable => _onClickAddHandler => addOnLocal"); location.pathname
                }
            }
        } else if (equalsActionTypeCmdBtn('add', 'page')) {
            history.push(history.location.pathname + '/new');
        }
    };

    /** Добавить копированием */
    var _onClickAddAsCopyHandler = function _onClickAddAsCopyHandler(event, row) {
        _addRowToLocalTable(row);
    };

    /** Добавить группу */
    var _onClickAddGroupHandler = function _onClickAddGroupHandler() {
        if (equalsActionTypeCmdBtn('addGroup', 'modal')) {
            // console.log("FormTable => _onClickAddGroupHandler => modal");
            if (props.type !== 'localSide') setVisibleModals(_extends({}, visibleModals, { addGroupOnServer: true }));else setVisibleModals(_extends({}, visibleModals, { addGroupOnLocal: true }));
        } else if (equalsActionTypeCmdBtn('addGroup', 'page')) {
            // console.log("FormTable => _onClickAddGroupHandler => page");
            history.push(history.location.pathname + '/newGroup');
        }
    };

    /** Изменить */
    var _onClickEditHandler = function _onClickEditHandler(event, _ref3) {
        var rowData = _ref3.rowData;

        // console.log("FormTable -> _onClickEditHandler -> row ", rowData, props.type);
        if (rowData[isGroupKey]) {
            if (equalsActionTypeCmdBtn('edit', 'g/modal')) {
                // console.log("FormTable => _onClickEditHandler => g/modal");
                if (props.type !== 'localSide') setVisibleModals(_extends({}, visibleModals, { editGroupOnServer: true }));else setVisibleModals(_extends({}, visibleModals, { editGroupOnLocal: true }));
            } else if (equalsActionTypeCmdBtn('edit', 'g/page')) {
                // console.log("FormTable => _onClickEditHandler => g/page");
                history.push(history.location.pathname + '/' + rowData[rowKey]);
            }
        } else {
            if (equalsActionTypeCmdBtn('edit', 'i/modal')) {
                // console.log("FormTable => _onClickEditHandler => i/modal");
                if (props.type !== 'localSide') setVisibleModals(_extends({}, visibleModals, { editOnServer: true }));else setVisibleModals(_extends({}, visibleModals, { editOnLocal: true }));
            } else if (equalsActionTypeCmdBtn('edit', 'i/page')) {
                // console.log("FormTable => _onClickEditHandler => i/page");
                history.push(history.location.pathname + '/' + rowData[rowKey]);
            }
        }
    };

    /** Удалить */
    var _onClickDelete = function _onClickDelete(event, _selectedRowKeys) {
        if (props.type === 'localSide') {
            var _rows = tableRows.filter(function (item) {
                return !_selectedRowKeys.includes(item[rowKey]);
            });
            setTableRows(_rows);
            _onChange(_rows);
        } else {
            if (_selectedRowKeys && _selectedRowKeys.length > 0 && requestDeleteRow) {
                var deleteData = _selectedRowKeys.map(function (item) {
                    return _extends(defineProperty({}, rowKey, item), dataDeleteRow);
                });
                requestDeleteRow({ data: { deleteData: deleteData } }).then(function (response) {
                    _notification.success({ message: 'Успешное удаленение' });
                    tableRef && tableRef.reloadData({});
                }).catch(function (error) {
                    notificationError(error, 'Ошибка удаления записи');
                    tableRef && tableRef.reloadData({});
                });
            }
        }
        cmdProps.onClickDelete && cmdProps.onClickDelete(event, _selectedRowKeys);
    };

    /** Переместить вверх / вниз */
    var _onClickUpHandler = function _onClickUpHandler(event, row, rows) {
        _onChange(rows);
        cmdProps.onClickUp && cmdProps.onClickUp(event, row, rows);
    };

    var _onClickDownHandler = function _onClickDownHandler(event, row, rows) {
        _onChange(rows);
        cmdProps.onClickDown && cmdProps.onClickDown(event, row, rows);
    };

    /** Modal Events */
    var _onSaveRow = function _onSaveRow(_ref4) {
        var type = _ref4.type,
            row = _ref4.row,
            requestSaveRow = _ref4.requestSaveRow;

        // console.log("FormTable -> _saveRow -> row ", row);
        if (type === 'select') {
            // Получить массив строк из таблицы в модальной форме
            var selectRows = row[name];
            // console.log("FormTable -> _onSaveRow -> row [0]", row);
            // console.log("FormTable -> _onSaveRow -> saveRows [0]", selectRows);

            // Фильтрация выбранных строк, оставить только те которых еще нет в таблице
            var saveRows = selectRows.filter(function (sRow) {
                return tableRows.findIndex(function (tRow) {
                    return tRow[rowKey] === sRow[rowKey];
                }) === -1;
            });
            // console.log("FormTable -> _onSaveRow -> saveRows [1]", saveRows);
            if (customFields)
                // Фильтрация по пользовательским параметрам
                saveRows = saveRows.filter(function (sRow) {
                    var isValid = true;
                    customFields.forEach(function (field) {
                        // Валидация по пользовательской логике функции validate
                        if (field.validate) isValid = field.validate(sRow, tableRows);

                        // Создание или переобразование по пользовательской логике функции value
                        if (field.value) sRow[field.name] = field.value(sRow, tableRows);
                    });
                    if (isValid) return sRow;
                });
            setVisibleModals(_extends({}, visibleModals, defineProperty({}, type, false)));
            _notification.success({
                message: '\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ' + saveRows.length + ' \u0441\u0442\u0440\u043E\u043A'
            });
            // console.log("FormTable -> _onSaveRow -> saveRows [2]", saveRows);
            _addRowsToLocalTable([].concat(toConsumableArray(tableRows), toConsumableArray(saveRows)));
        } else {
            var saveRow = _extends({}, row);
            if (type.indexOf('Group') !== -1) saveRow[isGroupKey] = true;else saveRow[isGroupKey] = false;
            if (customFields) customFields.forEach(function (field) {
                return saveRow[field.name] = field.value(saveRow, tableRows);
            });
            switch (type) {
                case 'addOnServer':
                case 'editOnServer':
                case 'addGroupOnServer':
                case 'editGroupOnServer':
                    _addRowToServerTable({ requestSaveRow: requestSaveRow, type: type, saveRow: saveRow });
                    break;
                case 'addOnLocal':
                case 'addGroupOnLocal':
                    setVisibleModals(_extends({}, visibleModals, defineProperty({}, type, false)));
                    _addRowToLocalTable(saveRow);
                    break;
                case 'editOnLocal':
                case 'editGroupOnLocal':
                    setVisibleModals(_extends({}, visibleModals, defineProperty({}, type, false)));
                    _editRowToLocalTable(saveRow);
                    break;

                //            addGroupOnServer: false,
                //         editGroupOnServer: false,
                //         addGroupOnLocal: false,
                //         editGroupOnLocal: false,
                // case 'select':
                case 'viewGroup':
                case 'viewObject':
                    setVisibleModals(_extends({}, visibleModals, defineProperty({}, type, false)));
                    break;
            }
            // console.log("Modal Events => type: ", type, itemName, componentType, saveRow);
        }
    };

    var _addRowToLocalTable = function _addRowToLocalTable(row) {
        var saveObj = _extends({}, row);
        if (rowKeyType === 'uuid') saveObj[rowKey] = generateUUID();

        // console.log('_addRowToLocalTable', tableRows);
        _addRowsToLocalTable([].concat(toConsumableArray(tableRows), [saveObj]));
    };

    var _editRowToLocalTable = function _editRowToLocalTable(row) {
        var arr = [].concat(toConsumableArray(tableRows));
        var rowIndex = arr.findIndex(function (item) {
            return item[rowKey] === row[rowKey];
        });
        arr.splice(rowIndex, 1, row);
        setTableRows(arr);
        setTableSelectedRow(row);
        _onChange(arr);
    };

    var _addRowsToLocalTable = function _addRowsToLocalTable(rows, keys) {
        // console.log('FormTable -> _addRowsToLocalTable -> rows', rows, keys);
        setTableRows(rows);
        if (props.selectable) _onChange(keys);else _onChange(rows);
    };

    var _addRowToServerTable = function _addRowToServerTable(_ref5) {
        var requestSaveRow = _ref5.requestSaveRow,
            type = _ref5.type,
            saveRow = _ref5.saveRow;

        if (requestSaveRow && ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'].includes(type)) {
            var method = type === 'addOnServer' || type === 'addGroupOnServer' ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, itemName, componentType, saveRow);
            requestSaveRow({
                method: method,
                data: saveRow
            }).then(function (response) {
                _notification.success({
                    message: 'Сохранение прошло успешно'
                });
                setVisibleModals(_extends({}, visibleModals, defineProperty({}, type, false)));
                tableRef && tableRef.reloadData({ filter: props.defaultFilter });
                // ref && ref.current && ref.current.reloadData({ filter: props.defaultFilter});
                // console.log('_addRowToServerTable tableRef =>', tableRef);
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        }
    };

    var _onRowClick = function _onRowClick(_ref6) {
        var selected = _ref6.selected,
            rowData = _ref6.rowData,
            rowIndex = _ref6.rowIndex,
            rowKey = _ref6.rowKey;

        if (!props.selectable) {
            setTableSelectedRow(rowData);
            setTableSelectedRowKeys([rowKey]);
            if (componentType === 'SelectTable') _onChange([rowData]);
        }
        props.onRowClick && props.onRowClick({ selected: selected, rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
    };

    var _onRowDoubleClick = function _onRowDoubleClick(_ref7) {
        var rowData = _ref7.rowData,
            rowIndex = _ref7.rowIndex,
            rowKey = _ref7.rowKey;

        if (rowData[isGroupKey]) {
            setVisibleModals(_extends({}, visibleModals, { viewGroup: true }));
        } else {
            setVisibleModals(_extends({}, visibleModals, { viewObject: true }));
        }
        props.onRowDoubleClick && props.onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
    };

    var _onSelectedRowsChange = function _onSelectedRowsChange(keys, rows) {
        // console.log("_onSelectedRowsChange", keys, rows);
        if (props.selectable) {
            setTableSelectedRow(rows[0]);
            setTableSelectedRowKeys(keys);
            _onChange(rows);
        }
    };

    var _onChange = function _onChange(rows) {
        if (rows !== undefined) props.onChange(rows);else props.onChange(tableRows);
    };

    var getTableCls = function getTableCls() {
        var cls = [rtPrefix + '-form-table'];
        if (props.className) cls.push(props.className);
        return cls.join(' ');
    };

    return React.createElement(
        'div',
        { className: getTableCls(), style: props.style },
        React.createElement(AdvancedTable, _extends({
            ref: _setTableRef
        }, getObjectExcludedProps(props, excludeProps$2), {
            rows: tableRows,
            setRows: setTableRows
            // selectedRowKeys={tableSelectedRow[rowKey] ? [tableSelectedRow[rowKey]] : []}
            , selectedRowKeys: tableSelectedRowKeys,
            onRowClick: _onRowClick,
            onRowDoubleClick: _onRowDoubleClick,
            onSelectedRowsChange: _onSelectedRowsChange,
            autoDeleteRows: false,
            commandPanelProps: _extends({}, props.commandPanelProps, {
                showElements: getEvents(), // getShowElements(),
                onClickAdd: _onClickAddHandler,
                onClickAddAsCopy: _onClickAddAsCopyHandler,
                onClickAddGroup: _onClickAddGroupHandler,
                onClickEdit: _onClickEditHandler,
                onClickDelete: _onClickDelete,
                onClickDown: _onClickDownHandler,
                onClickUp: _onClickUpHandler
            }),
            filterPanelProps: _extends({}, props.filterPanelProps)
        })),
        modals && getModals()
    );
});

FormTable.propTypes = {
    /** Объект со свойствами Command Panel */
    commandPanelProps: PropTypes.object,

    /** Объект со свойствами Filter Panel */
    filterPanelProps: PropTypes.object,

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

    /** Тип поля для уникальной идентификации строки */
    rowKeyType: PropTypes.oneOf(['uuid', 'number']),

    /**
     * VIEW PROPS
     * */

    /** Вывод когда нет данных. JSX для заглушки "Нет данных".  */
    empty: PropTypes.element,

    /** Отображение загрузки данных. JSX для загрузки данных. */
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

    /** SELECTED PANEL */

    /** Отображать ли панель выбранных элементов */
    showSelection: PropTypes.bool,

    /** Строка или функция для отображения элементов списка выбранных
     * Строка - имя поля
     * Функция - рендер строк.
     * Параметры - ({ rowData, rowIndex }) */
    rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

    /** Дополнительные пропсы для колонок */
    customColumnProps: PropTypes.arrayOf(PropTypes.object),

    /** Дополнительные поля и валидация в объекты таблицы */
    customFields: PropTypes.arrayOf(PropTypes.object),

    /** Модальные окна */
    modals: PropTypes.arrayOf(PropTypes.object),

    /** Событие об изменении объектов таблицы
     * Параметр - (rows)*/
    onChange: PropTypes.func,

    /** implemented - только для (LocalTable + selectable) - Контроль значение из вне */
    // value: PropTypes.arrayOf(PropTypes.object),

    /** Not implemented - Задание значений по умолчанию */
    defaultValue: PropTypes.arrayOf(PropTypes.object),

    /** Классы стилей */
    className: PropTypes.string,

    /** Стили */
    style: PropTypes.object,

    /** Поле для идентификации группы */
    isGroupKey: PropTypes.string,

    /** Объект history для перемещения по путям */
    history: PropTypes.object,

    /** Функция запроса на получение конфига для таблицы */
    requestLoadConfig: PropTypes.func,

    /** Функция запроса на уделание данных */
    requestDeleteRow: PropTypes.func,

    /** Параметры объекта удаления */
    dataDeleteRow: PropTypes.object
};

FormTable.defaultProps = {
    defaultRows: [],
    defaultSelectedRowKeys: [],
    defaultSearchValue: '',
    defaultFilter: {},
    defaultSortBy: {},

    searchValue: '',
    filter: {},
    sortBy: {},

    autoDeleteRows: true,
    rowKey: 'id',

    empty: empty$1,
    overlay: overlay$1,
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

    showSelection: false,

    rowKeyType: 'uuid',
    onChange: noop,
    isGroupKey: 'isGroup'
};

var withStore = function withStore(Component, antFormItemProps) {

    var mapStateToProps = function mapStateToProps(store, ownProps) {
        var subscribe = ownProps.subscribe;

        if (subscribe) {
            var name = subscribe.name,
                path = subscribe.path;

            if (name && path) return defineProperty({}, name, objectPath.get(store, path));
        }

        return {};
    };
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return bindActionCreators({ setDateStore: setDateStore }, dispatch);
    };

    var defaultProps = {
        trigger: 'onChange',
        valuePropName: 'value'
    };

    var withStoreProps = _extends({}, defaultProps, antFormItemProps);

    return connect(mapStateToProps, mapDispatchToProps)(function (props) {
        var dispatchPath = props.dispatchPath;


        var subscribe = props.subscribe ? props.subscribe : {};

        var _useState = useState({}),
            _useState2 = slicedToArray(_useState, 2),
            subscribeProps = _useState2[0],
            setSubscribeProps = _useState2[1];

        var trigger = withStoreProps.trigger,
            getValueFromEvent = withStoreProps.getValueFromEvent,
            valuePropName = withStoreProps.valuePropName;


        var excludeProps = ['componentType', 'setDateStore', 'subscribe', subscribe.name, 'dispatchPath'];

        /** Подписка на изменение props[subscribe.name] в сторе */
        useEffect(function () {
            if (subscribe.name) {
                // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                subscribe.onChange && subscribe.onChange({ value: props[subscribe.name], setSubscribeProps: setSubscribeProps });
            }
            // console.log("Change Props[2]: ", props.subscribeЗф);
        }, [props[subscribe.name]]);

        useEffect(function () {
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, props.value);
            if (dispatchPath) {
                var newValue = props[valuePropName];
                // console.log("storeHOC => dispatch: ", newValue);
                dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            }
        }, [props]);

        useEffect(function () {
            if (subscribeProps.value) {
                // console.log('subscribeProps.value => ', subscribeProps.value);
                props[trigger] && props[trigger](subscribeProps.value);
            }
        }, [subscribeProps.value]);

        var onChange = function onChange() {
            // const newValue = getValue(...args);
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            props[trigger] && props[trigger].apply(props, arguments);
        };

        var childProps = getObjectExcludedProps(props, excludeProps);
        return React.createElement(Component, _extends({}, childProps, subscribeProps, defineProperty({}, trigger, onChange)));
    });
};

var DatePickerHOC = function DatePickerHOC(Component) {
    return function (props) {
        // console.log("DatePickerHOC => ", props);
        if (props.value) {
            if (typeof props.value === 'string') {
                // console.log("DatePickerHOC => onChange => string");
                props.onChange(moment(props.value), props.value);
            }
            // else {
            // 	console.log("DatePickerHOC => onChange => moment");
            // 	props.onChange(props.value, props.format ? toFormat(props.value,props.format) : getISO(props.value));
            // }
        }
        var value = props.value ? typeof props.value === 'string' ? moment(props.value) : props.value : null;
        return React.createElement(Component, _extends({}, props, { value: value }));
    };
};

var TypographyTitle = function TypographyTitle(props) {
    return React.createElement(
        _Typography.Title,
        props,
        ' ',
        props.label || props.value,
        ' '
    );
};

var TypographyText = function TypographyText(props) {
    return React.createElement(
        _Typography.Text,
        props,
        ' ',
        props.label || props.value,
        ' '
    );
};

var TypographyDate = function TypographyDate(props) {
    var label = props.label,
        value = props.value,
        format = props.format;

    var _value = value ? format ? toFormat(value, format) : getISO(value) : null;
    return React.createElement(
        _Typography.Text,
        props,
        ' ',
        label || _value,
        ' '
    );
};

var getTitle = function getTitle(type, element) {
    if (element === 'Group') {
        if (type === 'edit') return 'Изменение папки';else return 'Создание папки';
    } else return 'Изменение файла';
};

var Modal = function Modal(type, element, requestSaveRow, _processBeforeSaveForm, parentLoadHandler, requestLoadRows) {
    // console.log("FolderModal", type, requestSaveRow, processBeforeSaveForm, parentLoadHandler, requestLoadRows);
    var selectedRow = void 0;
    return {
        type: '' + type + element + 'OnServer',
        title: getTitle(type, element),
        requestSaveRow: requestSaveRow,
        width: 500,
        // bodyStyle: {height: 650},
        form: {
            name: 'FileManagerModalModal',
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
            processBeforeSaveForm: function processBeforeSaveForm(rawValues) {
                return _processBeforeSaveForm(rawValues, type, element);
            },
            loadInitData: function loadInitData(callBack, row) {
                selectedRow = row;
                callBack(type === 'edit' ? row : null);
            },
            body: [{
                componentType: 'Item',
                label: 'Наименование',
                name: 'name',
                rules: [{
                    message: '\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435',
                    required: true
                }],
                child: { componentType: 'Input' }
            }, type === 'edit' ? {
                componentType: 'Item',
                label: 'Родитель',
                name: 'parentId',
                child: {
                    componentType: 'SingleSelect',
                    widthControl: 0,
                    heightPopup: 300,
                    expandColumnKey: 'id',
                    rowRender: 'name',
                    nodeAssociated: false,
                    expandDefaultAll: true,
                    // (info) аналогично ({params, data})
                    // Но поскольку тут раскрывать объект не нужно, мы можем просто передать его дальше
                    requestLoadRows: function requestLoadRows(info) {
                        return parentLoadHandler(type, selectedRow, info);
                    },
                    requestLoadDefault: requestLoadRows
                }
            } : {}]
        }
    };
};

var AddFolderModal = function AddFolderModal() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return Modal.apply(undefined, ['add', 'Group'].concat(args));
};
var EditFolderModal = function EditFolderModal() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return Modal.apply(undefined, ['edit', 'Group'].concat(args));
};
var EditFileModal = function EditFileModal() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return Modal.apply(undefined, ['edit', ''].concat(args));
};

var copyTextToClipboard = function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(function () {
		openNotificationWithIcon('success', 'Успешно', '[' + text + '] \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
	}, function (err) {
		openNotificationWithIcon('error', 'Ошибка', '[' + text + '] \u041D\u0415 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
	});
};

var fallbackCopyTextToClipboard = function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement('textarea');
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand('copy');
		if (successful) {
			openNotificationWithIcon('success', 'Успешно', '[' + text + '] \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
		} else {
			openNotificationWithIcon('error', 'Ошибка', '[' + text + '] \u041D\u0415 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
		}
	} catch (err) {
		openNotificationWithIcon('error', 'Ошибка', '[' + text + '] \u041D\u0415 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430');
	}
	document.body.removeChild(textArea);
};

var openNotificationWithIcon = function openNotificationWithIcon(type, title, msg) {
	_notification[type]({
		message: title,
		description: msg
	});
};

var FileManager = function FileManager(props) {
    var _ref;

    var rowKey = props.rowKey,
        isGroupKey = props.isGroupKey,
        expandParentKey = props.expandParentKey;

    var _useState = useState({}),
        _useState2 = slicedToArray(_useState, 2),
        tableRef = _useState2[0],
        setTableRef = _useState2[1];

    var _setTableRef = function _setTableRef(ref) {
        return setTableRef(ref);
    };

    // const tableRef = React.createRef();

    var _useState3 = useState([(_ref = {}, defineProperty(_ref, rowKey, null), defineProperty(_ref, "name", React.createElement(HomeOutlined, null)), _ref)]),
        _useState4 = slicedToArray(_useState3, 2),
        breadcrumb = _useState4[0],
        setBreadcrumb = _useState4[1];

    var _useState5 = useState(defineProperty({ deleted: false }, expandParentKey, null)),
        _useState6 = slicedToArray(_useState5, 2),
        tableFilter = _useState6[0],
        setTableFilter = _useState6[1];

    /**
     * TABLE EVENTS
     */

    // Down to folder OR download file


    var _onRowDoubleClick = function _onRowDoubleClick(_ref2) {
        var rowData = _ref2.rowData,
            rowIndex = _ref2.rowIndex,
            rowKey = _ref2.rowKey;

        if (rowData.isGroup) {
            loadTable([].concat(toConsumableArray(breadcrumb), [rowData]), defineProperty({}, expandParentKey, rowKey));
        } else {
            props.requestDownloadFile(rowKey);
        }
        props.onRowDoubleClick && props.onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
    };

    // Jump to folder
    var _onClickBreadcrumb = function _onClickBreadcrumb(parentId, index) {
        loadTable(breadcrumb.slice(0, index), defineProperty({}, expandParentKey, parentId));
    };

    // Up to folder
    var _onClickBack = function _onClickBack() {
        if (breadcrumb.length > 1) {
            var newBreadcrumb = breadcrumb.slice(0, breadcrumb.length - 1);
            // setBreadcrumb(newBreadcrumb);
            // tableRef && tableRef.reloadData({ filter: { parentId: newBreadcrumb[newBreadcrumb.length - 1].id } });
            loadTable(newBreadcrumb, defineProperty({}, expandParentKey, newBreadcrumb[newBreadcrumb.length - 1][rowKey]));
        }
    };

    // Delete folder OR file
    var _onClickDelete = function _onClickDelete(event, _selectedRowKeys) {
        if (_selectedRowKeys && _selectedRowKeys.length > 0) {
            var _data;

            props.requestDeleteRow({ data: (_data = {}, defineProperty(_data, rowKey, _selectedRowKeys[0]), defineProperty(_data, "deleted", true), _data) }).then(function (response) {
                _notification.success({ message: 'Файл успешно удален' });
                tableRef && tableRef.reloadData({ filter: tableFilter });
            }).catch(function (error) {
                notificationError(error, 'Ошибка удаления файла');
                tableRef && tableRef.reloadData({ filter: tableFilter });
            });
        }
    };

    /**
     * TABLE FUNCs
     */
    var loadTable = function loadTable(breadcrumb, filter) {
        setBreadcrumb(breadcrumb);
        var newFilter = _extends({}, tableFilter, filter);
        setTableFilter(newFilter);
        tableRef && tableRef.reloadData({ filter: newFilter });
    };

    /**
     * MODAL FUNCs
     */
    var processBeforeSaveModal = function processBeforeSaveModal(rawValues, type, element) {
        var values = _extends({}, rawValues);
        if (type === 'add') values[expandParentKey] = breadcrumb[breadcrumb.length - 1][rowKey];

        if (element === 'Group') values.extension = 'dir';
        // console.log("FileManager values =>", values);
        return values;
    };

    var parentLoadHandler = function parentLoadHandler(type, selectedRow, _ref3) {
        var params = _ref3.params,
            data = _ref3.data;

        var newData = _extends({}, data, defineProperty({}, isGroupKey, true));
        if (type === 'edit') newData.owner = selectedRow && selectedRow[rowKey];
        return props.requestLoadParent({ params: params, data: newData });
    };

    // const _onChangeViewDeleted = (checked) => {
    //     const newFilter = {...tableFilter, deleted: checked };//? undefined : checked};
    //     setTableFilter(newFilter);
    //     tableRef && tableRef.reloadData({filter: newFilter});
    // };

    // console.log("EditFolderModal", EditFolderModal(props.requestSaveRow, processBeforeSaveForm));


    /**
     * UPLOAD FUNCs
     */

    var _uploadFile = function _uploadFile(file) {
        // console.log('beforeUpload fileList => ', fileList);
        notification(file, 'loading');
        if (props.requestUploadFile) {
            props.requestUploadFile(defineProperty({ file: file }, expandParentKey, breadcrumb[breadcrumb.length - 1][rowKey])).then(function (response) {
                notification(file, 'success');
                tableRef && tableRef.reloadData({ filter: tableFilter });
            }).catch(function () {
                notification(file, 'error');
                tableRef && tableRef.reloadData({ filter: tableFilter });
            });
        }
        return false;
    };

    var notification = function notification(file, type) {
        var notifProps = {
            key: file.uid,
            duration: type === 'loading' ? 0 : 5,
            icon: type === 'loading' ? React.createElement(_Spin, { indicator: React.createElement(LoadingOutlined, { style: { fontSize: 24 }, spin: true }) }) : null,
            message: React.createElement(
                "span",
                null,
                "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u0430\u0439\u043B\u0430: ",
                React.createElement(
                    _Typography.Text,
                    { code: true },
                    file.name
                )
            )
        };
        switch (type) {
            case 'loading':
                _notification.info(notifProps);
                break;
            case 'success':
                _notification.success(notifProps);
                break;
            case 'error':
                _notification.error(notifProps);
                break;
            case 'close':
                _notification.close(file.uid);
                break;
        }
    };

    /**
     * RENDER PARAMS
     */
    var customColumnProps = [{
        name: 'dateCreate',
        cellRenderer: function cellRenderer(_ref4) {
            var cellData = _ref4.cellData;
            return toDDMMYYYYHHMMSS(cellData);
        }
    }, {
        name: 'dateUpdate',
        cellRenderer: function cellRenderer(_ref5) {
            var cellData = _ref5.cellData;
            return toDDMMYYYYHHMMSS(cellData);
        }
    }, {
        name: 'path',
        cellRenderer: function cellRenderer(_ref6) {
            var rowData = _ref6.rowData;
            return rowData[isGroupKey] ? null : React.createElement(
                _Tooltip,
                { title: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0443\u0442\u044C \u043A \u0444\u0430\u0439\u043B\u0443" },
                React.createElement(CopyOutlined, { onClick: function onClick() {
                        return copyTextToClipboard(props.pathDownloadFile(rowData[rowKey]));
                    } })
            );
        }
    }, {
        name: 'name',
        cellRenderer: function cellRenderer(_ref7) {
            var rowData = _ref7.rowData;

            var styleDiv = { display: 'flex', alignItems: 'center' };
            var Icon = void 0;
            var styleIcon = { marginRight: '10px', fontSize: '16px' };
            switch (rowData.extension) {
                case 'dir':
                    Icon = FolderFilled;
                    styleIcon.color = '#3a88c9';
                    break;
                case 'doc':
                case 'docm':
                case 'docx':
                case 'dot':
                case 'dotx':
                    Icon = FileWordOutlined;
                    styleIcon.color = '#185abc';
                    break;
                case 'xlm':
                case 'xls':
                case 'xlsm':
                case 'xlt':
                case 'xltm':
                case 'xltx':
                case 'xlsx':
                    Icon = FileExcelOutlined;
                    styleIcon.color = '#1f7244';
                    break;
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'tiff':
                case 'bmp':
                case 'ico':
                case 'gif':
                case 'svg':
                    Icon = FileImageOutlined;
                    break;
                case 'markdown':
                case 'md':
                    Icon = FileMarkdownOutlined;
                    styleIcon.color = '#175987';
                    break;
                case 'pdf':
                    Icon = FilePdfOutlined;
                    styleIcon.color = '#bd1f07';
                    break;
                case 'ppt':
                    Icon = FilePptOutlined;
                    styleIcon.color = '#be5239';
                    break;
                case 'txt':
                    Icon = FileTextOutlined;
                    break;
                case 'zip':
                    Icon = FileZipOutlined;
                    break;
                default:
                    Icon = FileOutlined;
            }

            return React.createElement(
                "div",
                { style: styleDiv },
                React.createElement(Icon, { style: styleIcon }),
                rowData.name
            );
        }
    }];

    var uploadProps = {
        multiple: true,
        showUploadList: false,
        beforeUpload: _uploadFile
    };

    var uploadRender = function uploadRender() {
        return React.createElement(
            _Upload,
            uploadProps,
            React.createElement(_Button, { icon: React.createElement(PlusOutlined, null) })
        );
    };

    var breadcrumbRender = function breadcrumbRender() {
        return React.createElement(
            "span",
            { className: rtPrefix + "-file-manager-breadcrumb ml-8" },
            breadcrumb.map(function (item, index) {
                return React.createElement(
                    "span",
                    {
                        key: item[rowKey]
                        // type="text"
                        , className: rtPrefix + "-file-manager-breadcrumb-btn",
                        onClick: function onClick() {
                            return _onClickBreadcrumb(item[rowKey], index + 1);
                        }
                    },
                    React.createElement(
                        "span",
                        null,
                        "/"
                    ),
                    React.createElement(
                        "span",
                        null,
                        item.name
                    )
                );
            })
        );
    };

    return React.createElement(FormTable, _extends({}, props, {
        ref: _setTableRef,
        type: 'serverSide',
        componentType: 'FilesTable',
        onRowDoubleClick: _onRowDoubleClick,
        defaultFilter: tableFilter,
        customColumnProps: customColumnProps,
        commandPanelProps: _extends({}, props.commandPanelProps, {
            onClickDelete: _onClickDelete,
            systemBtnProps: {
                add: {
                    actionType: 'modal',
                    tooltip: 'Загрузить файл(ы)',
                    render: uploadRender
                },
                addGroup: { actionType: 'modal', tooltip: 'Создать папку' },
                edit: { actionType: ['modal', 'modal'] },
                delete: {}
            },
            leftCustomSideElement: [{
                componentType: 'Item',
                child: {
                    componentType: 'Button',
                    icon: React.createElement(RollbackOutlined, null),
                    label: 'Back',
                    className: 'ml-4',
                    disabled: breadcrumb.length === 1,
                    onClick: _onClickBack
                }
            }, {
                componentType: 'Item',
                child: {
                    componentType: 'Custom',
                    render: breadcrumbRender
                }
            }]
            // rightCustomSideElement: [
            //     {
            //         componentType: 'Item',
            //         label: 'View deleted',
            //         className: 'mb-0',
            //         child: {
            //             componentType: 'Switch',
            //             checked: tableFilter.deleted,
            //             onChange: _onChangeViewDeleted
            //         }
            //     },
            // ]
        }),
        modals: [AddFolderModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows), EditFolderModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows), EditFileModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows)]
    }));
};

FileManager.propTypes = {

    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.func,

    /** Функция запроса на получение конфига для таблицы */
    requestLoadConfig: PropTypes.func
};

FileManager.defaultProps = {
    rowKey: 'id',
    isGroupKey: 'isGroup',
    expandParentKey: 'parentId'
};

var Modal$1 = function Modal(props) {
    var buttonProps = props.buttonProps,
        modalConfig = props.modalConfig,
        modalData = props.modalData,
        dispatchPath = props.dispatchPath;

    var _useState = useState(false),
        _useState2 = slicedToArray(_useState, 2),
        visible = _useState2[0],
        setVisible = _useState2[1];

    var _useState3 = useState({}),
        _useState4 = slicedToArray(_useState3, 2),
        _modalData = _useState4[0],
        _setModalData = _useState4[1];

    var _useState5 = useState({}),
        _useState6 = slicedToArray(_useState5, 2),
        _buttonProps = _useState6[0],
        setButtonProps = _useState6[1];

    var subscribe = props.subscribe ? props.subscribe : {};

    var setModalData = function setModalData(value) {
        // console.log("setModalData: ", value);
        _setModalData && _setModalData(value);
    };

    useEffect(function () {
        _setModalData(modalData);
    }, []);

    /** Подписка на изменение props[subscribe.name] в сторе */
    useEffect(function () {
        if (subscribe.name) {
            // console.log("Modal => subscribe: ", props[subscribe.name]);
            subscribe.onChange && subscribe.onChange({ value: props[subscribe.name], setModalData: setModalData, setButtonProps: setButtonProps });
        }
        // console.log("Change Props[2]: ", props.subscribeЗф);
    }, [props[subscribe.name]]);

    var _onOpenModal = function _onOpenModal() {
        // console.log("Modal => _modalData: ", _modalData);
        setVisible(true);
    };

    var _onCloseModal = function _onCloseModal() {
        setVisible(false);
    };

    var _onSaveRow = function _onSaveRow(_ref) {
        var type = _ref.type,
            row = _ref.row,
            requestSaveRow = _ref.requestSaveRow;

        dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, row);

        if (requestSaveRow && ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'].includes(type)) {
            var method = type === 'addOnServer' || type === 'addGroupOnServer' ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, method, row, _modalData);
            requestSaveRow({
                method: method,
                data: row
            }).then(function (response) {
                _notification.success({
                    message: 'Сохранение прошло успешно'
                });
                _onCloseModal();
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else _onCloseModal();
    };

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            _Button,
            _extends({
                type: "primary"
            }, buttonProps, _buttonProps, {
                onClick: _onOpenModal
            }),
            buttonProps && buttonProps.label
        ),
        React.createElement(FormModal, {
            modal: modalConfig,
            selectedRow: _modalData,
            visible: visible,
            setVisible: _onCloseModal,
            saveRow: _onSaveRow
        })
    );
};

Modal$1.propTypes = {

    /** Свойства [Button](https://ant.design/components/button/) из Ant Design
     * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
    buttonProps: PropTypes.object,

    /** Объект модального окна. Стандартная конфигурация. */
    modalConfig: PropTypes.object,

    /** Данные для модального окна */
    modalData: PropTypes.object,

    /** Путь в сторе куда класть данных окна после закрытия */
    dispatchPath: PropTypes.string,

    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.object
};

var mapStateToProps$1 = function mapStateToProps(store, ownProps) {
    var subscribe = ownProps.subscribe;

    if (subscribe) {
        var name = subscribe.name,
            path = subscribe.path;

        if (name && path) return defineProperty({}, name, objectPath.get(store, path));
    }
    return {};
};
var mapDispatchToProps$2 = function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

var Modal$2 = connect(mapStateToProps$1, mapDispatchToProps$2)(Modal$1);

var excludeProps$3 = ['child', 'componentType', 'field'];

var FormItem = function FormItem(props) {
	var child = props.child,
	    field = props.field;

	var antFormItemProps = getObjectExcludedProps(props, excludeProps$3);

	// Если тип элемента Select -> добавить доп свойства к Form.Item
	if (child && child.componentType && (child.componentType === 'SingleSelect' || child.componentType === 'MultiSelect')) {
		antFormItemProps.valuePropName = 'defaultSelectedRowKeys';
		antFormItemProps.getValueFromEvent = child.componentType === 'SingleSelect' ? getValueFromSingleSelect : getValueFromMultiSelect;
		antFormItemProps.trigger = 'onChangeKeys';
	} else if (child && child.componentType && child.componentType === 'SelectTable') ;
	// antFormItemProps.getValueFromEvent = getValueFromSelectTable;
	// antFormItemProps.trigger = 'onRowClick';


	// console.log('FormItem props => ', props);

	var getItem = function getItem() {
		if (child) {
			// const childProps = getObjectExcludedProps(child, ['componentType']);
			var childProps = _extends({}, child);
			// console.log('FormItem childProps => ', childProps);
			var Component = void 0;
			var placeholder = void 0;
			switch (child.componentType) {
				case 'Button':
					Component = withStore(_Button, antFormItemProps);
					// console.log('Props field => ', field);
					var onClick = function onClick(e) {
						return childProps.onClick && childProps.onClick(e, field);
					};
					return React.createElement(
						Component,
						_extends({}, childProps, { onClick: onClick }),
						childProps && childProps.label
					);
				case 'Title':
					Component = withStore(TypographyTitle, antFormItemProps);
					return React.createElement(Component, _extends({}, child, { componentType: child.componentType }));
				case 'Text':
					Component = withStore(TypographyText, antFormItemProps);
					return React.createElement(Component, _extends({}, child, { componentType: true }));
				case 'Divider':
					Component = withStore(_Divider, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'Checkbox':
					Component = withStore(_Checkbox, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'DatePicker':
					Component = withStore(DatePickerHOC(_DatePicker), antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Выберите дату';
					var style = _extends({ width: '100%' }, childProps && childProps.style);
					return React.createElement(Component, _extends({}, childProps, { style: style, placeholder: placeholder }));
				case 'DateText':
					Component = withStore(TypographyDate, antFormItemProps);
					return React.createElement(Component, child);
				case 'Input':
					Component = withStore(_Input, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'TextArea':
					Component = withStore(_Input.TextArea, antFormItemProps);
					return React.createElement(Component, childProps);
				case 'Password':
					Component = withStore(_Input.Password, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите пароль';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'InputNumber':
					Component = withStore(_InputNumber, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return React.createElement(Component, _extends({}, childProps, { style: { width: '100%' }, placeholder: placeholder }));
				case 'Radio':
					Component = withStore(_Radio, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'RadioButton':
					Component = withStore(_Radio.Button, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'Switch':
					Component = withStore(_Switch, antFormItemProps);
					return React.createElement(Component, childProps);
				case "RadioGroup":
					Component = withStore(_Radio.Group, antFormItemProps);
					return React.createElement(Component, childProps);
				case 'SingleSelect':
				case 'MultiSelect':
					return React.createElement(Select$1, _extends({}, childProps, { type: child.componentType, name: antFormItemProps.name }));
				//'infinity', 'serverSide', 'localSide'
				case 'InfinityTable':
					childProps.type = 'infinity';
					return React.createElement(FormTable, _extends({}, childProps, { name: props.name, componentType: child.componentType }));
				case 'ServerTable':
					childProps.type = 'serverSide';
					return React.createElement(FormTable, _extends({}, childProps, { name: props.name, componentType: child.componentType }));
				case 'LocalTable':
					childProps.type = 'localSide';
					return React.createElement(FormTable, _extends({}, childProps, { name: props.name, componentType: child.componentType }));
				case 'SelectTable':
					childProps.type = 'localSide';
					return React.createElement(FormTable, _extends({}, childProps, { name: props.name, componentType: child.componentType }));
				case 'FileManager':
					return React.createElement(FileManager, _extends({}, childProps, { name: props.name }));
				case 'Modal':
					return React.createElement(Modal$2, _extends({}, childProps, { name: props.name }));
				case 'Custom':
					Component = withStore(child.render, antFormItemProps);
					return React.createElement(Component, childProps);
				default:
					return null;
			}
		}
	};

	if (!antFormItemProps.label) return React.createElement(
		_Form.Item,
		_extends({}, antFormItemProps, { noStyle: true }),
		getItem()
	);else return React.createElement(
		_Form.Item,
		antFormItemProps,
		getItem()
	);
};

FormItem.propTypes = {
	child: PropTypes.object.isRequired
};

var Layout = function Layout(props) {

    var itemProps = {};
    Object.keys(props).forEach(function (key) {
        return key !== 'children' ? itemProps[key] = props[key] : null;
    });

    var getCls = function getCls() {
        var cls = [rtPrefix + '-layout'];
        itemProps.className && cls.push(itemProps.className);
        return cls.join(' ');
    };

    return React.createElement(
        'div',
        _extends({}, itemProps, { className: getCls() }),
        props.children
    );
};

Layout.propTypes = {
    /** Строка класса */
    className: PropTypes.string,

    /** Объект стиля */
    style: PropTypes.object
};

var excludeProps$4 = ["children", "componentType"];

var FormItems = function FormItems(props) {
    var items = props.items;

    // console.log('FormItems props => ', props);

    var getItems = function getItems(data, antFormListParams) {

        return data && data.map(function (item, index) {
            var itemProps = getObjectExcludedProps(item, excludeProps$4);
            // console.log('FormItems index => ', index);

            switch (item.componentType) {
                case "Row":
                    return React.createElement(
                        _Row,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Col":
                    return React.createElement(
                        _Col,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Layout":
                    return React.createElement(
                        Layout,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Tabs":
                    return React.createElement(
                        _Tabs,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "TabPane":
                    return React.createElement(
                        _Tabs.TabPane,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "RadioGroup":
                    return React.createElement(
                        _Radio.Group,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Item":
                    var _item = _extends({}, item);
                    var _key = index;
                    if (antFormListParams && antFormListParams.field) {
                        if (_item.name) {
                            if (Array.isArray(_item.name)) {
                                _item.name = [antFormListParams.field.name].concat(toConsumableArray(_item.name));
                                _item.fieldKey = [antFormListParams.field.name].concat(toConsumableArray(_item.name));
                            } else {
                                _item.name = [antFormListParams.field.name, _item.name];
                                _item.fieldKey = [antFormListParams.field.name].concat(toConsumableArray(_item.name));
                            }
                        }
                    }
                    // console.log('_item ', _item.name);
                    return React.createElement(FormItem, _extends({ key: "" + _key }, _item, { field: _extends({}, antFormListParams) }));
                case "ListItems":
                    return React.createElement(
                        _Form.List,
                        _extends({ key: index }, itemProps),
                        function (fields, operation) {
                            var param = { fields: [].concat(toConsumableArray(fields)), operation: _extends({}, operation) };
                            return getItems(item.children, param);
                        }
                    );
                case "ListItem":
                    // console.log('antFormListParams => ', antFormListParams);
                    return React.createElement(
                        "div",
                        { key: index },
                        antFormListParams && antFormListParams.fields && antFormListParams.fields.map(function (field, fIndex) {
                            // console.log('index field.key', index, field);
                            var param = _extends({ field: _extends({}, field) }, antFormListParams);
                            return React.createElement(
                                "div",
                                { key: field.key },
                                getItems(item.children, param),
                                " "
                            );
                        })
                    );

                default:
                    return null;
            }
        }) || null;
    };

    return getItems(items);
};

FormItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

// import {Checkbox} from 'antd';

var Table$2 = forwardRef(function (props, ref) {

	/** Наличие на сервере еще данных */
	var _useState = useState(true),
	    _useState2 = slicedToArray(_useState, 2),
	    hasMore = _useState2[0],
	    setHasMore = _useState2[1];
	/** Индикатор загрузки данных */


	var _useState3 = useState(false),
	    _useState4 = slicedToArray(_useState3, 2),
	    loading = _useState4[0],
	    setLoading = _useState4[1];

	/** Indoor control */
	/** Колонки таблицы */
	// const [_columns, _setColumns] = useState([]);


	var _useState5 = useState([]),
	    _useState6 = slicedToArray(_useState5, 2),
	    _rows = _useState6[0],
	    _setRows = _useState6[1];

	var _useState7 = useState([]),
	    _useState8 = slicedToArray(_useState7, 2),
	    _selectedRowKeys = _useState8[0],
	    setSelectedRowKeys = _useState8[1];

	var _useState9 = useState({}),
	    _useState10 = slicedToArray(_useState9, 2),
	    _searchValue = _useState10[0],
	    setSearchValue = _useState10[1];

	var _useState11 = useState(false),
	    _useState12 = slicedToArray(_useState11, 2),
	    _filter = _useState12[0],
	    setFilter = _useState12[1];

	var _useState13 = useState({}),
	    _useState14 = slicedToArray(_useState13, 2),
	    _sortBy = _useState14[0],
	    setSortBy = _useState14[1];

	/** Selectable States */


	var _useState15 = useState(false),
	    _useState16 = slicedToArray(_useState15, 2),
	    selectAll = _useState16[0],
	    setSelectAll = _useState16[1];

	/** Tree States */


	var _useState17 = useState([]),
	    _useState18 = slicedToArray(_useState17, 2),
	    _indeterminateRowKeys = _useState18[0],
	    setIndeterminateRowKeys = _useState18[1];

	var _useState19 = useState([]),
	    _useState20 = slicedToArray(_useState19, 2),
	    _expandedRowKeys = _useState20[0],
	    setExpandedRowKeys = _useState20[1];

	var _useState21 = useState(0),
	    _useState22 = slicedToArray(_useState21, 2),
	    _totalCountRows = _useState22[0],
	    setTotalCountRows = _useState22[1];

	var _useState23 = useState(false),
	    _useState24 = slicedToArray(_useState23, 2),
	    _footerShow = _useState24[0],
	    _setFooterShow = _useState24[1];

	var tableRef = useRef();

	var isMounted = useMounted();

	var columns = props.columns,
	    infinityMode = props.infinityMode,
	    defaultRows = props.defaultRows,
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
	    rowKey = props.rowKey,
	    customFields = props.customFields,
	    empty = props.empty,
	    overlay = props.overlay,
	    fixWidthColumn = props.fixWidthColumn,
	    headerHeight = props.headerHeight,
	    rowHeight = props.rowHeight,
	    rowRenderer = props.rowRenderer,
	    zebraStyle = props.zebraStyle,
	    estimatedRowHeight = props.estimatedRowHeight,
	    loadThreshold = props.loadThreshold,
	    pageSize = props.pageSize,
	    requestLoadRows = props.requestLoadRows,
	    requestLoadCount = props.requestLoadCount,
	    searchParamName = props.searchParamName,
	    selectable = props.selectable,
	    nodeAssociated = props.nodeAssociated,
	    expandColumnKey = props.expandColumnKey,
	    expandDefaultAll = props.expandDefaultAll,
	    expandLazyLoad = props.expandLazyLoad,
	    expandParentKey = props.expandParentKey,
	    onRowClick = props.onRowClick,
	    onRowDoubleClick = props.onRowDoubleClick,
	    onRowExpand = props.onRowExpand,
	    onSelectedRowsChange = props.onSelectedRowsChange,
	    onExpandedRowsChange = props.onExpandedRowsChange,
	    showSelection = props.showSelection,
	    rowRenderShowSelection = props.rowRenderShowSelection,
	    dispatchPath = props.dispatchPath,
	    subscribe = props.subscribe;


	var footerProps = _extends({}, Table$2.defaultProps.footerProps, props.footerProps);

	var selectedDispatchPath = dispatchPath && dispatchPath + '.selected';
	var rowsDispatchPath = dispatchPath && dispatchPath + '.rows';
	var rowDoubleClickDispatchPath = dispatchPath && dispatchPath + '.events.onRowDoubleClick';

	useEffect(function () {
		// console.log("Инициализация дефолтных значений ", selectColumn, columns);
		// console.log("Инициализация дефолтных значений defaultSelectedRowKeys > ", defaultSelectedRowKeys);

		// Инициализация дефолтных значений
		// _setRows(defaultRows);
		_setRowsHandler(defaultRows);
		// setSelectedRowKeys(defaultSelectedRowKeys);
		_setSelectedRowsHandler(defaultSelectedRowKeys, undefined, defaultRows);
		setSearchValue(defaultSearchValue);
		setFilter(defaultFilter);
		setSortBy(defaultSortBy);
		setSelectAll(defaultRows.length > 0 && defaultRows.length === defaultSelectedRowKeys.length);
		// Определение нужно ли отображать подвал
		_setFooterShow(footerProps.showElements.length || footerProps.leftCustomSideElement || footerProps.centerCustomSideElement || footerProps.rightCustomSideElement);

		// Only tree table
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

		// if (type !== 'localSide') {
		_dataProcessing({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchLine: defaultSearchValue,
			reload: true
		});
		// }
		// console.log("Table => useEffect start ");
		// setMounted(true);
		if (ref && typeof ref === 'function') ref({ reloadData: reloadData });else if (ref && (typeof ref === 'undefined' ? 'undefined' : _typeof(ref)) === 'object') ref.current = { reloadData: reloadData };
	}, []);

	useEffect(function () {
		// if (type === 'localSide') {
		// 	console.log("Control useEffect => ", rows, selectedRowKeys, searchValue, filter, sortBy);
		// _setRows(rows);
		_setRowsHandler(rows);
		// setSelectedRowKeys(selectedRowKeys);
		_setSelectedRowsHandler(selectedRowKeys, undefined, rows);
		setSearchValue(searchValue);
		setFilter(filter);
		setSortBy(sortBy);
		if (!!expandColumnKey && !expandLazyLoad) {
			// Открытие всех нод
			if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(rows, rowKey)));
		}
		// }
	}, [rows, selectedRowKeys, searchValue, filter, sortBy]);

	/** Подписка на изменение props[subscribe.name] в сторе */
	subscribe.map(function (item) {
		return useEffect(function () {
			if (isMounted && item.name) {
				// console.log("Table => useEffect => [%s] ", item.name, props[item.name]);
				var onChangeObject = {
					value: props[item.name],
					extraData: props[item.name + 'ExtraData'],
					reloadTable: reloadData,
					addRows: _addRows,
					addRow: _addRow,
					addRowAsCopy: _addRowAsCopy,
					editRow: _editRow,
					removeRow: _removeRow,
					moveUpRow: _moveUpRow,
					moveDownRow: _moveDownRow
				};
				item.onChange && item.onChange(onChangeObject);
			}
		}, [props[item.name]]);
	});

	/** BASE FUNCTIONS */
	var _setRowsHandler = function _setRowsHandler(rows) {
		_setRows(rows);
		setRows(rows);
		rowsDispatch(rows);
	};

	var _setSelectedRowsHandler = function _setSelectedRowsHandler() {
		var selectedKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
		var selectedObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
		var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

		setSelectedRowKeys(selectedKeys);
		if (selectedKeys.length === 0) {
			if (selectable) selectedDispatch([]);else selectedDispatch(undefined);
		} else if (selectedKeys.length > 0 && !selectedObjects) {
			if (selectable) selectedDispatch(flatten(getTableRowObjects(rows)).filter(function (item) {
				return selectedKeys.includes(item[rowKey]);
			}));else selectedDispatch(findNodeByRowKey(rows, rowKey, selectedKeys[0]));
		} else selectedDispatch(selectedObjects);
	};

	var rowsDispatch = function rowsDispatch(rows) {
		rowsDispatchPath && props.setDateStore && props.setDateStore(rowsDispatchPath, rows);
	};

	var selectedDispatch = function selectedDispatch(data) {
		selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, data);
	};

	var rowDoubleClickDispatch = function rowDoubleClickDispatch(value) {
		rowDoubleClickDispatchPath && props.setDateStore && props.setDateStore(rowDoubleClickDispatchPath, {
			timestamp: moment(),
			value: value
		});
	};

	var reloadData = function reloadData(_ref, appendParams) {
		var sortBy = _ref.sortBy,
		    filter = _ref.filter,
		    searchValue = _ref.searchValue;

		// console.log("reloadData params ", sortBy, filter, searchValue, loading);
		tableRef.current && tableRef.current.scrollToRow(0, 'auto');
		if (props.value && props.value.length > 0) _setSelectedRowsHandler(props.value.map(function (item) {
			return item[rowKey];
		}), props.value);else _setSelectedRowsHandler();

		var __sortBy = appendParams ? sortBy ? sortBy : _sortBy : sortBy;
		var __filter = appendParams ? _extends({}, _filter, filter) : filter;
		var __searchValue = appendParams ? searchValue ? searchValue : _searchValue : searchValue;
		if (sortBy) setSortBy(__sortBy);
		if (filter) setFilter(__filter);
		if (searchValue) setSearchValue(__searchValue);
		_dataProcessing({
			sortBy: __sortBy,
			filter: __filter,
			searchLine: __searchValue,
			reload: true
		});
		// console.log("reloadData loading ", loading);
	};

	var _dataProcessing = function _dataProcessing(params) {
		// console.log('_dataProcessing', params);
		var sortBy = params.sortBy,
		    filter = params.filter,
		    searchLine = params.searchLine,
		    expandRow = params.expandRow,
		    reload = params.reload;

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

			if (infinityMode && reload && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad) {
				requestLoadCount({
					params: _params,
					data: dataQuery
				}).then(function (response) {
					// console.log("infinity then response", response);
					// const result = response.data;
					setTotalCountRows(response.data);
				}).catch(function (error) {
					return notificationError(error, 'Ошибка получения количества записей по фильтру');
				});
			}

			// console.log('requestLoadRows => ', typeof requestLoadRows);
			// if(typeof requestLoadRows !== 'function'){
			//     setLoading(false);
			// }
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
						// _setRows(result);
						_setRowsHandler(result);
					} else {
						var newRows = [].concat(toConsumableArray(_rows));
						// (data, rowKey, rowValue)
						result.forEach(function (child) {
							child.children = [defineProperty({}, rowKey, generateUUID())];
						});
						var node = findNodeByRowKey(newRows, rowKey, expandRow[rowKey]);
						node.children = result;
						// console.log('newRows -> ', newRows);
						// _setRows(newRows);
						_setRowsHandler(newRows);
					}
				} else {
					if (result && result.length < pageSize) {
						setHasMore(false);
					} else {
						setHasMore(true);
					}
					pageNum === 0 ? _setRowsHandler(result) // _setRows
					: _setRowsHandler(_rows.concat(result)); // _setRows

					// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);
					if (expandDefaultAll) setExpandedRowKeys(flatten(getTableRowKeys(result, rowKey)));
				}

				setLoading(false);
			}).catch(function (error) {
				notificationError(error, 'Ошибка загрузки данных');
				_setRowsHandler(_rows); // _setRows
				// setHasMore(false);
				setLoading(false);
			});
		}
	};

	/** Событие выделение одной строки в режиме без галочек */
	var useSimpleAndDoubleClick = function useSimpleAndDoubleClick(actionSimpleClick, actionDoubleClick) {
		var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

		var _useState25 = useState(0),
		    _useState26 = slicedToArray(_useState25, 2),
		    click = _useState26[0],
		    setClick = _useState26[1];

		var _useState27 = useState(undefined),
		    _useState28 = slicedToArray(_useState27, 2),
		    data = _useState28[0],
		    setData = _useState28[1];

		useEffect(function () {
			var timer = setTimeout(function () {
				// simple click
				if (click === 1) actionSimpleClick(data);
				setClick(0);
			}, delay);
			if (click === 2) actionDoubleClick(data);
			return function () {
				return clearTimeout(timer);
			};
		}, [click]);
		return function (_data) {
			setClick(function (prev) {
				return prev + 1;
			});setData(function () {
				return _data;
			});
		};
	};
	var _onRowClick = function _onRowClick(_ref5) {
		var rowData = _ref5.rowData,
		    rowIndex = _ref5.rowIndex,
		    rowKey = _ref5.rowKey,
		    event = _ref5.event;

		if (!selectable) {
			// console.log('_rowEventHandlers -> onClick', rowKey, rowIndex);
			// console.log('q onRowClick => ', rowData)
			var newRowObject = {
				rowData: _extends({}, rowData),
				rowIndex: rowIndex,
				rowKey: rowKey
			};
			_setSelectedRowsHandler([rowKey], rowData);
			onRowClick(_extends({
				selected: true
			}, newRowObject));
			onSelectedRowsChange([rowKey], [rowData]);
		} else {
			var checked = !_selectedRowKeys.includes(rowKey);
			onChangeSelectionCell({
				rowData: rowData,
				rowIndex: rowIndex,
				column: _getSelectionColumnProps(),
				rows: _rows,
				checked: checked
			});
		}
	};
	var _onDoubleClick = function _onDoubleClick(_ref6) {
		var rowData = _ref6.rowData,
		    rowIndex = _ref6.rowIndex,
		    rowKey = _ref6.rowKey;

		// console.log('onDoubleClick', rowData, rowIndex, rowKey);
		// console.log('q onRowDoubleClick => ', rowData)
		rowDoubleClickDispatch(rowData);
		onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
	};

	var _rowEventHandlers = {
		// onClick: _onRowClick,
		// onDoubleClick: _onDoubleClick,
		onClick: useSimpleAndDoubleClick(_onRowClick, _onDoubleClick)
		// onDoubleClick: console.log('onDoubleClick'),
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
		// if (type !== 'localSide') {
		// setSelectedRowKeys([]);
		_setSelectedRowsHandler();
		// }
		var loadParams = {
			sortBy: sortBy,
			filter: _filter,
			searchLine: _searchValue,
			reload: true
		};
		_dataProcessing(loadParams);
	};

	/** VIEW FUNCTIONS */

	var _footer = React.createElement(
		React.Fragment,
		null,
		_footerShow ? React.createElement(
			React.Fragment,
			null,
			React.createElement(
				'div',
				{ key: 'footer-left-custom-side', className: 'left-custom-side' },
				footerProps.leftCustomSideElement ? React.createElement(FormItems, { items: footerProps.leftCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ key: 'footer-center-custom-side', className: 'center-custom-side' },
				footerProps.centerCustomSideElement ? React.createElement(FormItems, { items: footerProps.centerCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ key: 'footer-right-custom-side', className: 'right-custom-side' },
				footerProps.rightCustomSideElement ? React.createElement(FormItems, { items: footerProps.rightCustomSideElement }) : null
			),
			selectable ? React.createElement(
				React.Fragment,
				null,
				footerProps.showElements.includes('selected') ? React.createElement(
					'span',
					null,
					footerProps.selectedTitle,
					' ',
					_selectedRowKeys.length
				) : null,
				footerProps.showElements.includes('loaded') ? React.createElement(
					'span',
					null,
					footerProps.loadedTitle,
					' ',
					flatten(getTableRowKeys(_rows, rowKey)).length
				) : null
			) : null,
			footerProps.showElements.includes('total') ? infinityMode && requestLoadCount !== noop && !expandColumnKey && !expandLazyLoad ? React.createElement(
				'span',
				null,
				footerProps.totalTitle,
				' ',
				_totalCountRows
			) : React.createElement(
				'span',
				null,
				footerProps.totalTitle,
				' ',
				flatten(getTableRowKeys(_rows, rowKey)).length
			) : null
		) : null
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

		if (infinityMode) {
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
		    _selectedRowObjects = _ref8._selectedRowObjects,
		    _indeterminateRowKeys = _ref8._indeterminateRowKeys;

		// console.group("_onChangeSelectHandler", _selectedRowKeys);
		// console.log("_selectedRowKeys", _selectedRowKeys);
		// console.log("_indeterminateRowKeys", _indeterminateRowKeys);
		// console.log("_selectAll", _selectAll);
		// console.groupEnd();

		// setSelectedRowKeys(_selectedRowKeys);
		// selectedDispatch(_selectedRowObjects);
		_setSelectedRowsHandler(_selectedRowKeys, _selectedRowObjects);
		setIndeterminateRowKeys(_indeterminateRowKeys);
		setSelectAll(_selectAll);
		onRowClick({
			selected: selected,
			rowData: _selectedRow.rowData,
			rowIndex: _selectedRow.rowIndex,
			rowKey: rowKey
		});
		onSelectedRowsChange(_selectedRowKeys, _selectedRowObjects);
	};

	/** Событие при изменении галочки "Выделить все" */
	var _onSelectAllHandler = function _onSelectAllHandler(_ref9) {
		var selected = _ref9.selected,
		    rowKeys = _ref9.rowKeys,
		    rowObjects = _ref9.rowObjects;

		var selectedKeys = selected ? rowKeys : [];
		// setSelectedRowKeys(selectedKeys);
		// selectedDispatch(selected ? rowObjects : []);
		_setSelectedRowsHandler(selectedKeys, selected ? rowObjects : []);
		setIndeterminateRowKeys([]);
		setSelectAll(selected);
		// setSelectedRowObjects(rows);
		// console.log("_handleSelectAll", selectedKeys);
		onSelectedRowsChange(selectedKeys, rowObjects);
	};
	//
	// const SelectionCell = (props) => {
	// 	const {rowData, column} = props;
	// 	const {selectedRowKeys, indeterminateRowKeys, rowKey} = column;
	// 	const det = indeterminateRowKeys.includes(rowData[rowKey]);
	// 	const checked = selectedRowKeys.includes(rowData[rowKey]);
	// 	React.useEffect(() => {
	// 		console.log("selectionCell", props);
	// 	}, []);
	//
	// 	const _handleChange = (checked) => {
	// 		console.log("_handleChange", checked);
	// 	}
	//
	// 	return (
	// 		<Checkbox
	// 			indeterminate={det}
	// 			onChange={(e) => _handleChange(e.target.checked)}
	// 			checked={checked}
	// 		/>
	// 	);
	// };

	var _getSelectionColumnProps = function _getSelectionColumnProps() {
		return {
			rowKey: rowKey,
			parentKey: expandParentKey,
			nodeAssociated: nodeAssociated,
			selectedRowKeys: _selectedRowKeys,
			indeterminateRowKeys: _indeterminateRowKeys,
			onChange: _onChangeSelectHandler
		};
	};

	var _getColumns = function _getColumns() {
		var selectColumn = _extends({
			key: '__selection__',
			headerRenderer: SelectionHead,
			cellRenderer: React.createElement(SelectionCell, null),
			width: 40,
			flexShrink: 0,
			resizable: false,
			frozen: 'left',
			selectAll: selectAll,
			onSelectAll: _onSelectAllHandler
		}, _getSelectionColumnProps());
		return selectable ? [selectColumn].concat(toConsumableArray(columns)) : [].concat(toConsumableArray(columns));
	};

	/** TREE FUNCTIONS */

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

	/** ROW CHANGE FUNCTIONS */

	/**
  * Find row by key
  * @param data - table rows
  * @param key - key row for find
  * @param callback - function for return result
  * @returns {*}
  */
	var loop = function loop(data, key, callback) {
		for (var i = 0; i < data.length; i++) {
			if (data[i][rowKey] === key) {
				// console.log(`Selected => index: [${i}], path: [${data[i].path}]`, data);
				return callback(data[i], i, data);
			}
			if (data[i].children) {
				loop(data[i].children, key, callback);
			}
		}
	};

	var _addRows = function _addRows(rows) {
		var saveRows = [].concat(toConsumableArray(rows));
		if (customFields)
			// Фильтрация по пользовательским параметрам
			saveRows = saveRows.filter(function (sRow) {
				var isValid = true;
				customFields.forEach(function (field) {
					// Валидация по пользовательской логике функции validate
					if (field.validate) isValid = field.validate(sRow, _rows);

					// Создание или переобразование по пользовательской логике функции value
					if (field.value) sRow[field.name] = field.value(sRow, _rows);
				});
				if (isValid) return sRow;
			});
		_setRowsHandler([].concat(toConsumableArray(_rows), toConsumableArray(saveRows)));
	};

	var _addRow = function _addRow(row) {
		var _row = _extends({}, row);
		if (customFields) customFields.forEach(function (field) {
			return _row[field.name] = field.value(_row, _rows);
		});
		_setRowsHandler([].concat(toConsumableArray(_rows), [_row]));
	};

	var _addRowAsCopy = function _addRowAsCopy() {
		// console.log("_onClickAddAsCopy", selectedRow);
		_setRowsHandler([].concat(toConsumableArray(_rows), [findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])]));
	};

	var _editRow = function _editRow(row) {
		// console.log("_onClickEdit", selectedRow);
		var data = [].concat(toConsumableArray(_rows));
		var key = row[rowKey];
		loop(data, key, function (item, index, arr) {
			data[index] = row;
			_setRowsHandler(data);
			// selectedDispatch(row)
			_setSelectedRowsHandler(_selectedRowKeys, undefined, data);
			// setSelectedRowKeys([]);
		});
		// props.onClickEdit(event, selectedRow);
	};

	var _removeRow = function _removeRow(event) {
		// console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
		_setRowsHandler(_rows.filter(function (item) {
			return !_selectedRowKeys.includes(item[rowKey]);
		}));
		_setSelectedRowsHandler();
		// setSelectedRowKeys([]);
		// if (selectable)
		// 	selectedDispatch([]);
		// else
		// 	selectedDispatch(undefined);
		// commandPanelProps.onClickDelete(event, _selectedRowKeys);
	};

	var _moveUpRow = function _moveUpRow(event) {
		var data = [].concat(toConsumableArray(_rows));
		var key = _selectedRowKeys[0];
		loop(data, key, function (item, index, arr) {
			var newRowIndex = _getNewIndexRow(index, index - 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			// commandPanelProps.onClickUp(event, {
			// 	rowIndex: newRowIndex,
			// 	rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			// }, data);
		});
	};

	var _moveDownRow = function _moveDownRow(event) {
		var data = [].concat(toConsumableArray(_rows));
		var key = _selectedRowKeys[0];
		loop(data, key, function (item, index, arr) {
			var newRowIndex = _getNewIndexRow(index, index + 1);
			_changeIndexRow(index, newRowIndex, arr, data);
			// commandPanelProps.onClickDown(event, {
			// 	rowIndex: newRowIndex,
			// 	rowData: findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0]),
			// }, data);
		});
	};

	var _getNewIndexRow = function _getNewIndexRow(oldIndex, newIndex) {
		return newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;
	};

	var _changeIndexRow = function _changeIndexRow(oldIndex, newIndex, arr, data) {
		if (newIndex >= 0 && newIndex < arr.length) {
			// let arr = [..._rows]; // Копируем массив
			var item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
			// console.log('_changeIndexRow => ',item);
			arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
			// console.log("_changeIndexRow", item[0]);
			_setRowsHandler(data);
		}
	};

	// const _onSearch = (searchLine, e) => {
	// 	e.preventDefault();
	// 	// console.log("_onSearch", searchLine);
	// 	tableRef.current.scrollToRow(0, 'auto');
	// 	setSearchValue(searchLine);
	// 	const loadParams = {
	// 		sortBy: _sortBy,
	// 		filter: _filter,
	// 		searchLine: searchLine,
	// 		reload: true,
	// 	};
	// 	_dataProcessing(loadParams);
	// 	commandPanelProps.onSearch(searchLine);
	// };

	/** SELECTED PANEL */

	var _onClickDropSelectHandler = function _onClickDropSelectHandler(dropObject) {
		var newSelectedKeys = _selectedRowKeys.filter(function (item) {
			return item !== dropObject[rowKey];
		});
		// setSelectedRowKeys(newSelectedKeys);
		_setSelectedRowsHandler(newSelectedKeys, undefined, _rows);
		setSelectAll(newSelectedKeys.length === 0 ? false : null);
		onSelectedRowsChange(newSelectedKeys);
	};

	return React.createElement(
		'div',
		{ className: rtPrefix + '-table' },
		React.createElement(
			'div',
			{ className: rtPrefix + '-baseTable' },
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
						footerHeight: _footerShow ? footerProps.height : 0,
						headerHeight: headerHeight,
						rowHeight: rowHeight,
						overlayRenderer: loading ? overlay : null,
						footerRenderer: _footer,
						rowRenderer: rowRenderer,
						estimatedRowHeight: estimatedRowHeight
						/** Load Data Props */
						, onEndReachedThreshold: loadThreshold,
						onEndReached: infinityMode ? onEndReached : undefined,
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

Table$2.propTypes = {
	/**
  * REQUIRED
  * */

	/** Столбцы таблицы */
	columns: PropTypes.arrayOf(PropTypes.object).isRequired,

	/** Тип таблицы
  * **infinity** - загрузка данных по скроллу. Фильтрация, сортировка и поиск через сервер.
  * **serverSide** - первичная загрузка таблицы с сервера. Фильтрация, сортировка и поиск через сервер. Lazy Load для дерева тоже тут.
  * **localSide** - полностью локальная таблица. Фильтрация, сортировка и поиск через локальный rows */
	// type: PropTypes.oneOf(['infinity', 'serverSide', 'localSide']).isRequired,
	infinityMode: PropTypes.bool,

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
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc'])
	}),

	/**
  * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
  * */

	/** Строки таблицы. Используется для контроля таблицы из вне. */
	rows: PropTypes.arrayOf(PropTypes.object),

	/** Функция задания строк таблицы. */
	setRows: PropTypes.func,

	/** Выделенные строки таблицы. */
	selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Объект фильтрации */
	filter: PropTypes.object,

	/** Объект сортировки */
	sortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc'])
	}),

	/**
  * BASE PROPS
  * */

	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/** Дополнительные поля и валидация в объекты таблицы */
	customFields: PropTypes.arrayOf(PropTypes.object),

	/**
  * VIEW PROPS
  * */

	/** Вывод когда нет данных */
	empty: PropTypes.element,

	/** Отображение загрузки данных */
	overlay: PropTypes.element,

	/** Фиксированная ширина столбцов. Появится боковой скрол */
	fixWidthColumn: PropTypes.bool,

	footerProps: PropTypes.shape({

		/** Высота подвала */
		height: PropTypes.number,

		/** Массив элементов футтера, которые надо отобразить
   * ['selected', 'loaded', 'total'] */
		showElements: PropTypes.arrayOf(PropTypes.string),

		/** Заколовок для кол-ва выбранных объектов */
		selectedTitle: PropTypes.string,

		/** Заколовок для кол-ва загруженны объектов */
		loadedTitle: PropTypes.string,

		/** Заколовок для кол-ва всего объектов */
		totalTitle: PropTypes.string,

		/** Левый кастомный элемент командной панели */
		leftCustomSideElement: PropTypes.arrayOf(PropTypes.object),

		/** Центральный кастомный элемент командной панели */
		centerCustomSideElement: PropTypes.arrayOf(PropTypes.object),

		/** Правый кастомный элемент командной панели */
		rightCustomSideElement: PropTypes.arrayOf(PropTypes.object)
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

	/** Высота расширения */
	estimatedRowHeight: PropTypes.number,

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

	/** SELECTED PANEL */

	/** Отображать ли панель выбранных элементов */
	showSelection: PropTypes.bool,

	/** Строка или функция для отображения элементов списка выбранных
  * Строка - имя поля
  * Функция - рендер строк.
  * `({ rowData, rowIndex }) => { return <Component> }` */
	rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

	/** Путь в сторе куда класть выбранную строку таблицы */
	dispatchPath: PropTypes.string,

	/** Объект для подписки на изменения в STORE */
	subscribe: PropTypes.arrayOf(PropTypes.object)
};

Table$2.defaultProps = {
	defaultRows: [],
	defaultSelectedRowKeys: [],
	defaultSearchValue: '',
	defaultFilter: {},
	defaultSortBy: {},

	rows: [],
	setRows: noop,
	selectedRowKeys: [],
	searchValue: '',
	filter: {},
	sortBy: {},

	rowKey: 'id',

	empty: empty,
	overlay: overlay,
	fixWidthColumn: false,
	footerProps: {
		height: 30,
		showElements: [],
		selectedTitle: 'Выделено:',
		loadedTitle: 'Загружено записей:',
		totalTitle: 'Всего записей:',
		leftCustomSideElement: null,
		centerCustomSideElement: null,
		rightCustomSideElement: null
	},
	headerHeight: 30,
	rowHeight: 30,
	zebraStyle: false,
	estimatedRowHeight: undefined,

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

	showSelection: false,

	dispatchPath: undefined,
	subscribe: []
};

var mapStateToProps$2 = function mapStateToProps(store, ownProps) {
	var subscribe = ownProps.subscribe;

	var state = {};
	if (subscribe && subscribe.length > 0) {
		subscribe.forEach(function (item) {
			var name = item.name,
			    path = item.path,
			    extraData = item.extraData;

			if (name && path) state[name] = objectPath.get(store, path);
			if (name && extraData) state[name + 'ExtraData'] = objectPath.get(store, extraData);
		});
	}
	return state;
};
var mapDispatchToProps$3 = function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

var Table$3 = connect(mapStateToProps$2, mapDispatchToProps$3, null, { forwardRef: true })(Table$2);

var _this$2 = undefined;


var defaultProps = {
    defaultFilter: {},
    rowKey: 'id',
    pageSize: 50,
    requestLoadConfig: noop,
    expandColumnKey: undefined,
    expandLazyLoad: false,
    expandParentKey: 'parentId',
    customColumnProps: []
};

var ConfigLoader = function ConfigLoader(props) {

    /** Конфигурация таблицы */
    var _useState = useState(undefined),
        _useState2 = slicedToArray(_useState, 2),
        tableConfig = _useState2[0],
        setTableConfig = _useState2[1];

    var _defaultProps$props = _extends({}, defaultProps, props),
        defaultFilter = _defaultProps$props.defaultFilter,
        rowKey = _defaultProps$props.rowKey,
        pageSize = _defaultProps$props.pageSize,
        requestLoadConfig = _defaultProps$props.requestLoadConfig,
        expandColumnKey = _defaultProps$props.expandColumnKey,
        expandLazyLoad = _defaultProps$props.expandLazyLoad,
        expandParentKey = _defaultProps$props.expandParentKey,
        customColumnProps = _defaultProps$props.customColumnProps;

    useEffect(function () {
        var cleanupFunction = false;
        var loadData = function () {
            var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
                                        if (!cleanupFunction) {
                                            // setTableConfig(response.data);
                                            configParser(response.data);
                                        }
                                    }).catch(function (error) {
                                        return notificationError(error, 'Ошибка получения конфигурации');
                                    });
                                }

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this$2);
            }));

            return function loadData() {
                return _ref.apply(this, arguments);
            };
        }();
        loadData().then(function (r) {
            return r;
        });
        return function () {
            return cleanupFunction = true;
        };
    }, []);

    var configParser = function configParser(config) {
        var _columns = [];
        if (config && config.fields) {
            _columns = config.fields.map(function (item) {
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
                        if (colProps && colProps.cellRenderer) return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';else return object.cellData ? React.createElement(
                            _Typography.Text,
                            { ellipsis: true, style: { width: '100%' } },
                            object.cellData
                        ) : '---';
                        // return object.cellData ? object.cellData : '---';
                    }
                });
            });
        }

        var _defaultFilter = void 0;
        if (config && config.hierarchical && config.hierarchyLazyLoad) {
            var parentKey = config.hierarchyField ? config.hierarchyField.split('/')[1] : expandParentKey;
            _defaultFilter = _extends({}, defaultFilter, defineProperty({}, parentKey, null));
        } else _defaultFilter = defaultFilter;

        setTableConfig({
            columns: _columns,
            defaultFilter: _defaultFilter,
            rowKey: config && config.hierarchical && config.hierarchyField ? config.hierarchyField.split('/')[0] : rowKey,
            expandParentKey: config && config.hierarchical && config.hierarchyField ? config.hierarchyField.split('/')[1] : expandParentKey,
            expandColumnKey: config && config.hierarchical && config.hierarchyView ? config.hierarchyView : expandColumnKey,
            expandLazyLoad: config && config.hierarchical && config.hierarchyLazyLoad ? config.hierarchyLazyLoad : expandLazyLoad,
            pageSize: config && config.hierarchical ? 1 : pageSize
        });
    };

    if (tableConfig) return React.createElement(Table$3, _extends({}, props, tableConfig));else return null;
};

var DateRange$1 = function DateRange(props) {
	/** Состояние первоначалной настройки компонента */
	var _useState = useState(false),
	    _useState2 = slicedToArray(_useState, 2),
	    mounted = _useState2[0],
	    setMounted = _useState2[1];

	var _useState3 = useState(undefined),
	    _useState4 = slicedToArray(_useState3, 2),
	    startValue = _useState4[0],
	    setStartValue = _useState4[1];

	var _useState5 = useState(undefined),
	    _useState6 = slicedToArray(_useState5, 2),
	    endValue = _useState6[0],
	    setEndValue = _useState6[1];

	var className = props.className,
	    nameStart = props.nameStart,
	    nameEnd = props.nameEnd,
	    dateFormat = props.dateFormat,
	    onChange = props.onChange,
	    size = props.size,
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

DateRange$1.propTypes = {
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

	/** Размер пикера ['small', 'middle', 'large'] */
	size: PropTypes.oneOf(['small', 'middle', 'large']),

	/** Значение даты первого пикера (используется для управления датой из родительного компонента) */
	valueStart: PropTypes.string,

	/** Значение даты второго пикера (используется для управления датой из родительного компонента) */
	valueEnd: PropTypes.string
};

DateRange$1.defaultProps = {
	className: '',
	nameStart: 'dateStart',
	nameEnd: 'dateEnd',
	dateFormat: 'DD.MM.YYYY', // HH:mm:ss
	onChange: noop,
	size: 'middle',
	showTime: false
	// title: 'Период',
};

var Layout$1 = function Layout(props) {

    var itemProps = {};
    Object.keys(props).forEach(function (key) {
        return key !== 'children' ? itemProps[key] = props[key] : null;
    });

    var getCls = function getCls() {
        var cls = [rtPrefix + '-layout'];
        itemProps.className && cls.push(itemProps.className);
        return cls.join(' ');
    };

    return React.createElement(
        'div',
        _extends({}, itemProps, { className: getCls() }),
        props.children
    );
};

Layout$1.propTypes = {
    /** Строка класса */
    className: PropTypes.string,

    /** Объект стиля */
    style: PropTypes.object
};

var withStore$1 = function withStore(Component, antFormItemProps) {

    var mapStateToProps = function mapStateToProps(store, ownProps) {
        var subscribe = ownProps.subscribe,
            dispatch = ownProps.dispatch;

        var state = {};
        if (subscribe && subscribe.length > 0) {
            subscribe.forEach(function (item) {
                var name = item.name,
                    path = item.path,
                    extraData = item.extraData;

                if (name && path) state[name] = objectPath.get(store, path);
                if (name && extraData) state[name + 'ExtraData'] = objectPath.get(store, extraData);
            });
        }
        if (dispatch && dispatch.extraData) {
            // console.log('subscribe to ', dispatch.extraData)
            state.dispatchExtraData = objectPath.get(store, dispatch.extraData);
        }

        return state;
    };
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return bindActionCreators({ setDateStore: setDateStore }, dispatch);
    };

    var defaultProps = {
        trigger: 'onChange',
        valuePropName: 'value'
    };

    var withStoreProps = _extends({}, defaultProps, antFormItemProps);

    return connect(mapStateToProps, mapDispatchToProps)(function (props) {
        var componentType = props.componentType,
            setDateStore = props.setDateStore,
            dispatchExtraData = props.dispatchExtraData;

        // Объект подписки на стор

        var subscribe = props.subscribe ? props.subscribe : [];

        // Объект публикации в стор
        var dispatch = props.dispatch ? props.dispatch : {};

        var _useState = useState({}),
            _useState2 = slicedToArray(_useState, 2),
            subscribeProps = _useState2[0],
            setSubscribeProps = _useState2[1];

        var trigger = withStoreProps.trigger,
            valuePropName = withStoreProps.valuePropName;


        var excludeProps = ['componentType', 'setDateStore', 'subscribe'].concat(toConsumableArray(subscribe.map(function (item) {
            return item.name;
        })), ['dispatch', 'dispatchExtraData']);

        var isMounted = useMounted();

        /** Подписка на изменение props[subscribe.name] в сторе */
        subscribe.map(function (item) {
            return useEffect(function () {
                if (isMounted && item.name) {
                    // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                    item.onChange && item.onChange({ value: props[item.name], extraData: props[item.name + 'ExtraData'], setSubscribeProps: setSubscribeProps });
                }
                // console.log("Change Props[2]: ", props.subscribeЗф);
            }, [props[item.name]]);
        });

        /** Подписка на изменение props и отправка данных в стор */
        useEffect(function () {
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, props.value);
            var _value = props[valuePropName];
            if (_value === null || _value === undefined || typeof _value === 'string' && _value.trim() === '') _value = undefined;

            // console.log(`storeHOC [${withStoreProps.name}] => `, _value);
            // console.log(`storeHOC => `, props);

            if (componentType !== 'Button' && componentType !== 'Search') dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: _value });
        }, [props]);

        /** Подписка на изменение subscribeProps.value и отправка данных в props[trigger] (как правило это onChange) */
        useEffect(function () {
            if (subscribeProps && subscribeProps.value) {
                // console.log('subscribeProps.value => ', subscribeProps.value);
                props[trigger] && props[trigger](subscribeProps.value);
            }
        }, [subscribeProps.value]);

        var onChange = function onChange() {
            // console.log('withStore [trigger] ', trigger)
            // const newValue = getValue(...args);
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            if (componentType === 'Button') dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: arguments.length <= 0 ? undefined : arguments[0], extraData: dispatchExtraData });
            // else if(componentType === 'Search')
            //     args[1].preventDefault();

            props[trigger] && props[trigger].apply(props, arguments);
        };

        var _onSearch = function _onSearch(searchLine, e) {
            e.preventDefault();
            // console.log("_onSearch", searchLine);
            dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: searchLine, extraData: dispatchExtraData });
        };

        var childProps = getObjectExcludedProps(props, excludeProps);
        var onSearchProps = componentType === 'Search' ? { onSearch: _onSearch } : {};
        return React.createElement(Component, _extends({}, childProps, subscribeProps, defineProperty({}, trigger, onChange), onSearchProps));
    });
};

var DatePickerHOC$1 = function DatePickerHOC(Component) {
    return function (props) {
        // console.log("DatePickerHOC => ", props);
        if (props.value) {
            if (typeof props.value === 'string') {
                // console.log("DatePickerHOC => onChange => string");
                props.onChange(moment(props.value), props.value);
            }
            // else {
            // 	console.log("DatePickerHOC => onChange => moment");
            // 	props.onChange(props.value, props.format ? toFormat(props.value,props.format) : getISO(props.value));
            // }
        }
        var value = props.value ? typeof props.value === 'string' ? moment(props.value) : props.value : undefined;
        // console.log("DatePickerHOC value => ", value);
        return React.createElement(Component, _extends({}, props, { value: value }));
    };
};

var TypographyTitle$1 = function TypographyTitle(props) {
    return React.createElement(
        _Typography.Title,
        props,
        ' ',
        props.label || props.value,
        ' '
    );
};

var TypographyText$1 = function TypographyText(props) {
    return React.createElement(
        _Typography.Text,
        props,
        ' ',
        props.label || props.value,
        ' '
    );
};

var TypographyDate$1 = function TypographyDate(props) {
    var label = props.label,
        value = props.value,
        format = props.format;

    var _value = value ? format ? toFormat(value, format) : getISO(value) : undefined;
    return React.createElement(
        _Typography.Text,
        props,
        ' ',
        label || _value,
        ' '
    );
};

var excludeProps$5 = ['type', 'initialValues', 'form'];

var FormModal$1 = function FormModal(props) {
    var modal = props.modal,
        selectedRow = props.selectedRow,
        visible = props.visible,
        setVisible = props.setVisible,
        saveRow = props.saveRow;


    var getDefaultFooterProps = function getDefaultFooterProps() {

        var okText = '';
        var cancelText = '';
        var modalTitle = '';

        switch (modal.type) {
            case 'addOnServer':
            case 'addGroupOnServer':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Сохранить на сервере';
                break;
            case 'addOnLocal':
            case 'addGroupOnLocal':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Сохранить локально';
                break;
            case 'editOnServer':
            case 'editGroupOnServer':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Измененить на сервере';
                break;
            case 'editOnLocal':
            case 'editGroupOnLocal':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Изменение локально';
                break;
            case 'select':
                okText = 'Добавить';
                cancelText = 'Отмена';
                modalTitle = 'Выбор';
                break;
            case 'viewGroup':
            case 'viewObject':
                okText = 'Закрыть';
                modalTitle = 'Просмотр';
                break;
        }

        if (modal.okText) okText = modal.okText;

        if (modal.cancelText) cancelText = modal.cancelText;

        if (modal.title) modalTitle = modal.title;

        return { okText: okText, cancelText: cancelText, title: modalTitle, okType: 'primary' };
    };

    var modalProps = _extends({}, getDefaultFooterProps(), getObjectExcludedProps(modal, excludeProps$5));

    var onFinish = function onFinish(values) {
        // console.log('FormModal Success:', values, selectedRow);
        var saveObj = {};
        if (modal.type.startsWith('add')) saveObj = _extends({}, values);else saveObj = _extends({}, selectedRow, values);

        saveRow({ type: modal.type, row: saveObj, requestSaveRow: modal.requestSaveRow });

        if (modalProps.onOk) modalProps.onOk(values);
        if (modalProps.onFinish) modalProps.onFinish(values);
    };

    var onFinishFailed = function onFinishFailed(errorInfo) {
        // console.log('FormModal Failed:', errorInfo);
        console.error("FormModal fields failed: ", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    var _onCancelHandler = function _onCancelHandler(e) {
        // setVisibleModals({ ...visibleModals, [modal.type]: false });
        // form.resetFields();
        setVisible(modal.type, false);
        if (modalProps.onCancel) modalProps.onCancel(e);
    };

    var _onLoadInitData = function _onLoadInitData(callBack) {
        // console.log("Modal => loadInitData", selectedRow);
        formConfig.loadInitData(callBack, selectedRow);
    };

    var defaultFooter = [{
        componentType: 'Item',
        child: _extends({
            componentType: 'Button',
            label: modalProps.cancelText,
            className: 'mr-8',
            onClick: _onCancelHandler
        }, modalProps.cancelButtonProps)
    }, {
        componentType: 'Item',
        child: _extends({
            componentType: 'Button',
            label: modalProps.okText,
            type: modalProps.okType,
            htmlType: 'submit'
        }, modalProps.okButtonProps)
    }];

    var formConfig = _extends({
        footer: defaultFooter
    }, modal.form);
    return React.createElement(
        _Modal,
        _extends({}, modalProps, {
            centered: true,
            destroyOnClose: true,
            visible: visible,
            onCancel: _onCancelHandler,
            bodyStyle: _extends({ padding: 0 }, modalProps.bodyStyle),
            footer: null
        }),
        React.createElement(Form$1, _extends({}, formConfig, {
            onFinish: onFinish,
            onFinishFailed: onFinishFailed,
            loadInitData: _onLoadInitData
        }))
    );
};

FormModal$1.propTypes = {
    /** Объект модального окна */
    modal: PropTypes.object,

    /** Выделенная строка таблицы */
    selectedRow: PropTypes.object,

    /** Состояние видимости модалки */
    visible: PropTypes.bool,

    /** Задание состояния видимости модалки */
    setVisible: PropTypes.func,

    /** CallBack функция для сохранения данных */
    saveRow: PropTypes.func
};

var defaultProps$1 = {
    subscribe: [],
    dispatch: {}
};

var Modal$3 = function Modal(props) {
    var buttonProps = props.buttonProps,
        modalConfig = props.modalConfig,
        modalData = props.modalData,
        subscribe = props.subscribe,
        dispatch = props.dispatch;

    var _useState = useState(false),
        _useState2 = slicedToArray(_useState, 2),
        visible = _useState2[0],
        setVisible = _useState2[1];

    var _useState3 = useState({}),
        _useState4 = slicedToArray(_useState3, 2),
        _modalData = _useState4[0],
        _setModalData = _useState4[1];

    var _useState5 = useState({}),
        _useState6 = slicedToArray(_useState5, 2),
        _buttonProps = _useState6[0],
        setButtonProps = _useState6[1];

    var isMounted = useMounted();

    var setModalData = function setModalData(value) {
        // console.log("setModalData: ", value);
        _setModalData && _setModalData(value);
    };

    useEffect(function () {
        _setModalData(modalData);
    }, []);

    /** Подписка на изменение props[subscribe.name] в сторе */
    // useEffect( () => {
    //     if(subscribe.name) {
    //         // console.log("Modal => subscribe: ", props[subscribe.name]);
    //         subscribe.onChange && subscribe.onChange({value: props[subscribe.name], setModalData, setButtonProps});
    //     }
    //     // console.log("Change Props[2]: ", props.subscribeЗф);
    // }, [props[subscribe.name]]);

    /** Подписка на изменение props[subscribe.name] в сторе */
    subscribe.map(function (item) {
        return useEffect(function () {
            if (isMounted && item.name) {
                // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                item.onChange && item.onChange({
                    value: props[item.name],
                    extraData: props[item.name + "ExtraData"],
                    setModalData: setModalData,
                    setButtonProps: setButtonProps,
                    openModal: _onOpenModal,
                    closeModal: _onCloseModal
                });
            }
            // console.log("Change Props[2]: ", props.subscribeЗф);
        }, [props[item.name]]);
    });

    var _onOpenModal = function _onOpenModal() {
        // console.log("Modal => _modalData: ", _modalData);
        setVisible(true);
    };

    var _onCloseModal = function _onCloseModal() {
        setVisible(false);
    };

    var _onSaveRow = function _onSaveRow(_ref) {
        var type = _ref.type,
            row = _ref.row,
            requestSaveRow = _ref.requestSaveRow;

        // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, row);
        // console.log("Modal Events => before dispatchToStore: ", dispatch);
        dispatchToStore({ dispatch: dispatch, setDateStore: props.setDateStore, value: row });

        if (requestSaveRow && ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'].includes(type)) {
            var method = type === 'addOnServer' || type === 'addGroupOnServer' ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, method, row, _modalData);
            requestSaveRow({
                method: method,
                data: row
            }).then(function (response) {
                _notification.success({
                    message: 'Сохранение прошло успешно'
                });
                _onCloseModal();
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else _onCloseModal();
    };

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            _Button,
            _extends({
                type: "primary"
            }, buttonProps, _buttonProps, {
                onClick: _onOpenModal
            }),
            buttonProps && buttonProps.label
        ),
        React.createElement(FormModal$1, {
            modal: modalConfig,
            selectedRow: _modalData,
            visible: visible,
            setVisible: _onCloseModal,
            saveRow: _onSaveRow
        })
    );
};

Modal$3.propTypes = {

    /** Свойства [Button](https://ant.design/components/button/) из Ant Design
     * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
    buttonProps: PropTypes.object,

    /** Объект модального окна. Стандартная конфигурация. */
    modalConfig: PropTypes.object,

    /** Данные для модального окна */
    modalData: PropTypes.object,

    /** Путь в сторе куда класть данных окна после закрытия */
    dispatch: PropTypes.object,

    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.arrayOf(PropTypes.object)
};

Modal$3.defaultProps = defaultProps$1;

var mapStateToProps$3 = function mapStateToProps(store, ownProps) {
    var subscribe = ownProps.subscribe;

    var state = {};
    if (subscribe && subscribe.length > 0) {
        subscribe.forEach(function (item) {
            var name = item.name,
                path = item.path,
                extraData = item.extraData;

            if (name && path) state[name] = objectPath.get(store, path);
            if (name && extraData) state[name + "ExtraData"] = objectPath.get(store, extraData);
        });
    }
    return state;
};
var mapDispatchToProps$4 = function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

var Modal$4 = connect(mapStateToProps$3, mapDispatchToProps$4)(Modal$3);

var Select$2 = function Select(props) {
	var defaultSortBy = props.defaultSortBy,
	    defaultFilter = props.defaultFilter,
	    defaultSearchValue = props.defaultSearchValue,
	    sortBy = props.sortBy,
	    filter = props.filter,
	    searchValue = props.searchValue,
	    infinityMode = props.infinityMode,
	    requestLoadRows = props.requestLoadRows,
	    optionConverter = props.optionConverter,
	    options = props.options,
	    widthControl = props.widthControl,
	    _props$subscribe = props.subscribe,
	    subscribe = _props$subscribe === undefined ? [] : _props$subscribe,
	    pageSize = props.pageSize,
	    searchParamName = props.searchParamName,
	    mode = props.mode,
	    onChange = props.onChange,
	    value = props.value;

	/** Наличие на сервере еще данных */

	var _useState = useState(true),
	    _useState2 = slicedToArray(_useState, 2),
	    _hasMore = _useState2[0],
	    _setHasMore = _useState2[1];
	/** Индикатор загрузки данных */


	var _useState3 = useState(false),
	    _useState4 = slicedToArray(_useState3, 2),
	    _loading = _useState4[0],
	    _setLoading = _useState4[1];
	/** Опции селекта */


	var _useState5 = useState(options),
	    _useState6 = slicedToArray(_useState5, 2),
	    _options = _useState6[0],
	    _setOptions = _useState6[1];
	/** Индикатор достижения низа окна */


	var _useState7 = useState(false),
	    _useState8 = slicedToArray(_useState7, 2),
	    isEndReached = _useState8[0],
	    setIsEndReached = _useState8[1];

	/** Объект сортировки */


	var _useState9 = useState(undefined),
	    _useState10 = slicedToArray(_useState9, 2),
	    _sortBy = _useState10[0],
	    _setSortBy = _useState10[1];
	/** Объект фильтрации */


	var _useState11 = useState({}),
	    _useState12 = slicedToArray(_useState11, 2),
	    _filter = _useState12[0],
	    _setFilter = _useState12[1];
	/** Строка поиска */


	var _useState13 = useState(undefined),
	    _useState14 = slicedToArray(_useState13, 2),
	    _searchValue = _useState14[0],
	    _setSearchValue = _useState14[1];

	/** Состояние параметра выбрать все */


	var _useState15 = useState(false),
	    _useState16 = slicedToArray(_useState15, 2),
	    _isSelectAll = _useState16[0],
	    _setIsSelectAll = _useState16[1];

	var excludeProps = ['componentType', 'defaultSortBy', 'defaultFilter', 'defaultSearchValue', 'infinityMode', 'requestLoadRows', 'optionConverter', 'options', 'widthControl', 'pageSize', 'searchParamName', 'subscribe'].concat(toConsumableArray(subscribe.map(function (item) {
		return item.name;
	})), ['dispatch', 'dispatchExtraData']);

	useEffect(function () {
		_setSearchValue(defaultSearchValue);
		_loadOptions({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchValue: defaultSearchValue,
			reload: true
		});
	}, []);

	useEffect(function () {
		_setRowsHandler(options);
	}, [options]);

	useEffect(function () {
		// console.log("Change sortBy, filter, searchValue", sortBy, filter, searchValue);
		var __sortBy = sortBy ? sortBy : _sortBy;
		var __filter = filter ? filter : _filter;
		var __searchValue = searchValue ? searchValue : _searchValue;
		_setSortBy(__sortBy);
		_setFilter(__filter);
		_setSearchValue(__searchValue);
		_loadOptions({
			sortBy: __sortBy,
			filter: __filter,
			searchLine: __searchValue,
			reload: true
		});
	}, [sortBy, filter, searchValue]);

	var _setRowsHandler = function _setRowsHandler(options) {
		_setOptions(options);
		// console.log('_setRowsHandler value => ', value)
		if (mode === 'multiple') {
			if (Array.isArray(value)) if (options.reduce(function (preValue, item) {
				return value.includes(item.value) ? preValue + 1 : preValue;
			}, 0) === options.length) _setIsSelectAll(true);else _setIsSelectAll(false);
			onChange(value);
		}
		// setRows(rows);
		// rowsDispatch(rows);
	};

	var getPageNum = function getPageNum(reload) {
		return reload ? 0 : Math.floor(_options.length / pageSize);
	};

	var getSort = function getSort(sortBy) {
		return sortBy && sortBy.key ? sortBy.key + ',' + sortBy.order : null;
	};

	var getSearchValue = function getSearchValue(searchValue) {
		return searchValue ? defineProperty({}, searchParamName, searchValue) : null;
	};

	var _loadOptions = function _loadOptions(params) {
		// console.log('_dataProcessing', params);
		var sortBy = params.sortBy,
		    filter = params.filter,
		    searchValue = params.searchValue,
		    reload = params.reload;

		if ((_hasMore || reload) && !_loading && requestLoadRows) {
			_setLoading(true);

			var requestOptions = {
				params: {
					page: getPageNum(reload),
					size: pageSize,
					sort: getSort(sortBy)
				},
				data: _extends({}, filter, getSearchValue(searchValue))
				// console.log('dataQuery', dataQuery);

			};requestLoadRows(requestOptions).then(function (response) {
				// console.log("infinity then response", response);
				var result = response.data;

				if (result && result.length < pageSize) {
					_setHasMore(false);
				} else {
					_setHasMore(true);
					setIsEndReached(false);
				}
				reload ? _setRowsHandler(result.map(function (option) {
					return optionConverter(option);
				})) // _setRows
				: _setRowsHandler(_options.concat(result.map(function (option) {
					return optionConverter(option);
				}))); // _setRows

				// console.log('expandDefaultAll ', expandDefaultAll, _expandedRowKeys);

				_setLoading(false);
			}).catch(function (error) {
				notificationError(error, 'Ошибка загрузки данных');
				_setRowsHandler(_options); // _setRows
				// setHasMore(false);
				_setLoading(false);
			});
		}
	};

	var onScroll = function onScroll(event) {
		var scrollTopMax = event.nativeEvent.target.scrollTopMax;
		var scrollTop = event.nativeEvent.target.scrollTop; //.body.scrollTop

		var onEndReached = scrollTopMax - scrollTop;

		if (onEndReached < 300 && !isEndReached) {
			// console.log('Load Data');
			setIsEndReached(true);
			_setSearchValue(defaultSearchValue);
			if (infinityMode) {
				_loadOptions({
					sortBy: defaultSortBy,
					filter: defaultFilter,
					searchValue: defaultSearchValue,
					reload: false
				});
			}
		}

		// console.log("scrollTopMax / scrollTop", scrollTopMax, scrollTop, onEndReached);
		// const lastScrollTop = this._scroll.scrxollTop;
		// if (args.scrollTop > lastScrollTop) this._maybeCallOnEndReached();
	};

	var onSearch = function onSearch(value) {
		_setSearchValue(value);
		_loadOptions({
			sortBy: defaultSortBy,
			filter: defaultFilter,
			searchValue: value,
			reload: true
		});
	};

	var _onChangeSelectAll = function _onChangeSelectAll() {
		// console.log(`_onChangeSelectAll`, _isSelectAll);
		if (mode === 'multiple') {
			if (_isSelectAll) {
				var optionsValues = _options.map(function (item) {
					return item.value;
				});
				onChange(value.filter(function (item) {
					return !optionsValues.includes(item);
				}));
				_setIsSelectAll(false);
			} else {
				if (Array.isArray(value) && value.length > 0) onChange([].concat(toConsumableArray(new Set([].concat(toConsumableArray(value), toConsumableArray(_options.map(function (item) {
					return item.value;
				})))))));else onChange([].concat(toConsumableArray(new Set([].concat(toConsumableArray(_options.map(function (item) {
					return item.value;
				})))))));
				_setIsSelectAll(true);
			}
		} else onChange(undefined);
	};
	var _onChange = function _onChange(value) {
		// console.log(`_onChange selected`, value);
		if (Array.isArray(value)) if (_options.reduce(function (preValue, item) {
			return value.includes(item.value) ? preValue + 1 : preValue;
		}, 0) === _options.length) _setIsSelectAll(true);else _setIsSelectAll(false);

		onChange(value);
	};

	var getSelectAllCls = function getSelectAllCls() {
		var cls = ['ant-select-item', 'ant-select-item-option', 'ant-select-item-option-select-all'];
		if (_isSelectAll) cls.push('ant-select-item-option-selected');
		return cls.join(' ');
	};

	var childProps = getObjectExcludedProps(props, excludeProps);
	return React.createElement(
		_Select,
		_extends({}, childProps, {
			searchValue: _searchValue,
			style: { width: widthControl }
			// listHeight={heightPopup}
			// defaultValue={['a10', 'c12']}
			, onChange: _onChange,
			maxTagCount: 0,
			maxTagPlaceholder: function maxTagPlaceholder(omittedValues) {
				return "\u0412\u044B\u0431\u0440\u0430\u043D\u043E: " + omittedValues.length;
			}
			// dropdownMatchSelectWidth={200}
			// listItemHeight={10} listHeight={250}
			, onPopupScroll: onScroll,
			onSearch: onSearch,
			dropdownRender: function dropdownRender(menu) {
				return React.createElement(
					React.Fragment,
					null,
					mode === 'multiple' ? React.createElement(
						"div",
						{ className: getSelectAllCls(), onClick: _onChangeSelectAll },
						React.createElement(
							"div",
							{ className: "ant-select-item-option-content" },
							React.createElement(
								"span",
								null,
								"\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435"
							)
						),
						_isSelectAll ? React.createElement(
							"span",
							{ className: "ant-select-item-option-state" },
							React.createElement(CheckOutlined, null)
						) : null
					) : null,
					menu
				);
			}
		}),
		_options && _options.map(function (_ref2, i) {
			var label = _ref2.label,
			    value = _ref2.value,
			    className = _ref2.className,
			    disabled = _ref2.disabled;
			return React.createElement(
				_Select.Option,
				{ key: i.toString(36) + i, value: value, className: className, disabled: disabled },
				label
			);
		})
	);
};

Select$2.propTypes = {
	/** Сортировка по умолчанию */
	defaultSortBy: PropTypes.shape({
		/** Ключ поля для сортировки */
		key: PropTypes.string,
		/** Направление сортировки */
		order: PropTypes.oneOf(['asc', 'desc'])
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

	/** Режим загружки по скроллу */
	infinityMode: PropTypes.bool,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadRows: PropTypes.func,

	/** Функция преобразования загруженных объектов
  * в объекты для селекта. (option) => ({})
  * Требоваеть вернуть объект с параметрам
  * { label: ReactNode, value: any, className: string, disabled: bool } */
	optionConverter: PropTypes.func,

	/** Select options [{ label, value, className, disabled }] */
	options: PropTypes.arrayOf(PropTypes.object),

	/** Ширина поля выбора в пикселях */
	widthControl: PropTypes.oneOfType(PropTypes.string, PropTypes.number),

	/** Объект для подписки на изменения в STORE */
	subscribe: PropTypes.arrayOf(PropTypes.object),

	/** Размер страницы */
	pageSize: PropTypes.number,

	/** Имя параметра для поиска */
	searchParamName: PropTypes.string
};

Select$2.defaultProps = {
	// Ant Props
	placeholder: "Выберите",

	// Rt Props
	defaultSortBy: undefined,
	defaultFilter: {},
	defaultSearchValue: undefined,
	infinityMode: false,
	requestLoadRows: undefined,
	options: [],
	widthControl: '100%',
	subscribe: [],

	pageSize: 50,
	searchParamName: 'searchValue'
};

var excludeProps$6 = ['child', 'componentType', 'field'];

var FormItem$1 = function FormItem(props) {
	var child = props.child,
	    field = props.field;

	var antFormItemProps = getObjectExcludedProps(props, excludeProps$6);

	// Если тип элемента Select -> добавить доп свойства к Form.Item
	if (child && child.componentType && (child.componentType === 'SingleSelect' || child.componentType === 'MultiSelect')) {
		antFormItemProps.valuePropName = 'defaultSelectedRowKeys';
		antFormItemProps.getValueFromEvent = child.componentType === 'SingleSelect' ? getValueFromSingleSelect : getValueFromMultiSelect;
		antFormItemProps.trigger = 'onChangeKeys';
	} else if (child && child.componentType && child.componentType === 'SelectTable') ;
	// antFormItemProps.getValueFromEvent = getValueFromSelectTable;
	// antFormItemProps.trigger = 'onRowClick';


	// console.log('FormItem props => ', props);

	var getItem = function getItem() {
		if (child) {
			// const childProps = getObjectExcludedProps(child, ['componentType']);
			var childProps = _extends({}, child);
			// console.log('FormItem childProps => ', childProps);
			var Component = void 0;
			var placeholder = void 0;
			switch (child.componentType) {
				case 'Button':
					antFormItemProps.trigger = 'onClick';
					Component = withStore$1(_Button, antFormItemProps);
					// console.log('Props field => ', field);
					// const onClick = (e) => childProps.onClick && childProps.onClick(e, field);
					var onClick = function onClick(e) {
						return childProps.onClick && childProps.onClick(e, field);
					};
					return React.createElement(
						Component,
						_extends({}, childProps, { onClick: onClick }),
						childProps && childProps.label
					);
				case 'Title':
					Component = withStore$1(TypographyTitle$1, antFormItemProps);
					return React.createElement(Component, _extends({}, childProps, { componentType: child.componentType }));
				case 'Text':
					Component = withStore$1(TypographyText$1, antFormItemProps);
					return React.createElement(Component, _extends({}, childProps, { componentType: true }));
				case 'Divider':
					Component = withStore$1(_Divider, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'Checkbox':
					Component = withStore$1(_Checkbox, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'DatePicker':
					Component = withStore$1(DatePickerHOC$1(_DatePicker), antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Выберите дату';
					var style = _extends({ width: '100%' }, childProps && childProps.style); // locale={locale}
					return React.createElement(Component, _extends({}, childProps, { style: style, placeholder: placeholder }));
				case 'DateText':
					Component = withStore$1(TypographyDate$1, antFormItemProps);
					return React.createElement(Component, childProps);
				case 'Input':
					Component = withStore$1(_Input, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'Search':
					Component = withStore$1(_Input.Search, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Поиск';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'TextArea':
					Component = withStore$1(_Input.TextArea, antFormItemProps);
					return React.createElement(Component, childProps);
				case 'Password':
					Component = withStore$1(_Input.Password, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите пароль';
					return React.createElement(Component, _extends({}, childProps, { placeholder: placeholder }));
				case 'InputNumber':
					Component = withStore$1(_InputNumber, antFormItemProps);
					placeholder = childProps && childProps.placeholder ? childProps.placeholder : 'Введите значение';
					return React.createElement(Component, _extends({}, childProps, { style: { width: '100%' }, placeholder: placeholder }));
				case 'Radio':
					Component = withStore$1(_Radio, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'RadioButton':
					Component = withStore$1(_Radio.Button, antFormItemProps);
					return React.createElement(
						Component,
						childProps,
						childProps && childProps.label
					);
				case 'Switch':
					Component = withStore$1(_Switch, antFormItemProps);
					return React.createElement(Component, childProps);
				case "RadioGroup":
					Component = withStore$1(_Radio.Group, antFormItemProps);
					return React.createElement(Component, childProps);
				// case 'SingleSelect':
				case 'Select':
					Component = withStore$1(Select$2, antFormItemProps);
					return React.createElement(Component, childProps);
				// return <Select {...childProps} name={antFormItemProps.name}/>;
				//'infinity', 'serverSide', 'localSide'
				case 'Table':
					return React.createElement(ConfigLoader, _extends({}, childProps, { name: props.name, componentType: child.componentType }));
				// case 'FileManager':
				// 	return <FileManager {...childProps} name={props.name} />;
				case 'Modal':
					return React.createElement(Modal$4, _extends({}, childProps, { name: props.name }));
				case 'Custom':
					Component = withStore$1(child.render, antFormItemProps);
					return React.createElement(Component, childProps);
				default:
					return null;
			}
		}
	};

	if (!antFormItemProps.label) return React.createElement(
		_Form.Item,
		_extends({}, antFormItemProps, { noStyle: true }),
		getItem()
	);else return React.createElement(
		_Form.Item,
		antFormItemProps,
		getItem()
	);
};

FormItem$1.propTypes = {
	child: PropTypes.object.isRequired
};

var Switcher = function Switcher(props) {
    var value = props.value;

    var _useState = useState(0),
        _useState2 = slicedToArray(_useState, 2),
        _value = _useState2[0],
        _setValue = _useState2[1];

    useEffect(function () {
        if (value !== undefined && value < props.children.length) {
            _setValue(value);
        }
    }, [value]);

    return props.children[_value];
};

var excludeProps$7 = ["children", "componentType"];

var FormItems$1 = function FormItems(props) {
    var items = props.items;

    // console.log('FormItems props => ', props);

    var getItems = function getItems(data, antFormListParams) {

        return data && data.map(function (item, index) {
            var itemProps = getObjectExcludedProps(item, excludeProps$7);
            // console.log('FormItems index => ', index);

            switch (item.componentType) {
                case "Space":
                    return React.createElement(
                        _Space,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Row":
                    return React.createElement(
                        _Row,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Col":
                    return React.createElement(
                        _Col,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Layout":
                    return React.createElement(
                        Layout$1,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Tabs":
                    return React.createElement(
                        _Tabs,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "TabPane":
                    return React.createElement(
                        _Tabs.TabPane,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case 'Switcher':
                    var Component = withStore$1(Switcher, antFormListParams);
                    // return (<Component {...childProps} />);
                    return React.createElement(
                        Component,
                        _extends({ key: index }, itemProps),
                        item.children && item.children.length > 0 && getItems(item.children, antFormListParams)
                    );
                case "Item":
                    var _item = _extends({}, item);
                    var _key = index;
                    if (antFormListParams && antFormListParams.field) {
                        if (_item.name) {
                            if (Array.isArray(_item.name)) {
                                _item.name = [antFormListParams.field.name].concat(toConsumableArray(_item.name));
                                _item.fieldKey = [antFormListParams.field.name].concat(toConsumableArray(_item.name));
                            } else {
                                _item.name = [antFormListParams.field.name, _item.name];
                                _item.fieldKey = [antFormListParams.field.name].concat(toConsumableArray(_item.name));
                            }
                        }
                    }
                    // console.log('_item ', _item.name);
                    return React.createElement(FormItem$1, _extends({ key: "" + _key }, _item, { field: _extends({}, antFormListParams) }));
                case "ListItems":
                    return React.createElement(
                        _Form.List,
                        _extends({ key: index }, itemProps),
                        function (fields, operation) {
                            var param = { fields: [].concat(toConsumableArray(fields)), operation: _extends({}, operation) };
                            return getItems(item.children, param);
                        }
                    );
                case "ListItem":
                    // console.log('antFormListParams => ', antFormListParams);
                    return React.createElement(
                        "div",
                        { key: index },
                        antFormListParams && antFormListParams.fields && antFormListParams.fields.map(function (field, fIndex) {
                            // console.log('index field.key', index, field);
                            var param = _extends({ field: _extends({}, field) }, antFormListParams);
                            return React.createElement(
                                "div",
                                { key: field.key },
                                getItems(item.children, param),
                                " "
                            );
                        })
                    );

                default:
                    return null;
            }
        }) || null;
    };

    return getItems(items);
};

FormItems$1.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

var excludeProps$8 = ["noPadding", "scrollable", "header", "body", "footer", "loadInitData", "autoSaveForm", "requestSaveForm", "methodSaveForm", "processBeforeSaveForm"];

var Form$1 = function Form(props) {
    var loadInitData = props.loadInitData,
        header = props.header,
        body = props.body,
        footer = props.footer,
        autoSaveForm = props.autoSaveForm,
        requestSaveForm = props.requestSaveForm,
        methodSaveForm = props.methodSaveForm,
        processBeforeSaveForm = props.processBeforeSaveForm;

    /** Состояние первоначалной настройки компонента*/

    var _useState = useState(false),
        _useState2 = slicedToArray(_useState, 2),
        loaded = _useState2[0],
        setLoaded = _useState2[1];

    var _useState3 = useState({}),
        _useState4 = slicedToArray(_useState3, 2),
        antFormProps = _useState4[0],
        setAntFormProps = _useState4[1];

    var _useState5 = useState({}),
        _useState6 = slicedToArray(_useState5, 2),
        initFormData = _useState6[0],
        setInitFormData = _useState6[1];

    useEffect(function () {
        if (!loaded) {
            if (loadInitData !== noop) loadInitData(_setInitFormData);else setLoaded(true);
        }
    }, [loaded]);

    useEffect(function () {
        setAntFormProps(getObjectExcludedProps(props, excludeProps$8));
        // console.log('antFormProps props => ', getObjectExcludedProps(props, excludeProps));
    }, [props]);

    var _setInitFormData = function _setInitFormData(data) {
        // console.log("Form loaded init data => ", data);
        setInitFormData(data);
        setLoaded(true);
    };

    var antForm = void 0;
    if (props && props.form) {
        antForm = props.form;
    } else {
        var _AntForm$useForm = _Form.useForm(),
            _AntForm$useForm2 = slicedToArray(_AntForm$useForm, 1),
            form = _AntForm$useForm2[0];

        antForm = form;
    }

    var getBodyCls = function getBodyCls() {
        var cls = [rtPrefix + "-form-body"];
        props.noPadding && cls.push(rtPrefix + "-form-body-no-padding");
        props.scrollable && cls.push(rtPrefix + "-form-body-scrollable");
        return cls.join(" ");
    };

    var onFinish = function onFinish(rawValues) {
        var values = processBeforeSaveForm ? processBeforeSaveForm(rawValues) : rawValues;
        console.log("Success form [" + (props.name ? props.name : 'no name form') + "]: ", values);
        if (autoSaveForm && requestSaveForm) {
            var saveObject = _extends({}, initFormData, values);
            requestSaveForm({
                method: methodSaveForm,
                data: saveObject
            }).then(function (response) {
                _notification.success({
                    message: "Сохранение прошло успешно"
                });
                if (props.onFinish) props.onFinish(values);
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else if (props.onFinish) props.onFinish(values);
    };

    var onFinishFailed = function onFinishFailed(errorInfo) {
        console.error("Failed:", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    return React.createElement(
        React.Fragment,
        null,
        loaded ? React.createElement(
            _Form,
            _extends({
                form: antForm
            }, antFormProps, {
                className: antFormProps.className + " " + rtPrefix + "-form",
                style: _extends({}, antFormProps.style, { width: '100%', height: '100%' }),
                initialValues: _extends({}, antFormProps.initialValues, initFormData),
                onFinish: onFinish,
                onFinishFailed: onFinishFailed
            }),
            header ? React.createElement(
                "div",
                { className: rtPrefix + "-form-header" },
                React.createElement(FormItems$1, { items: header })
            ) : null,
            React.createElement(
                "div",
                { className: getBodyCls() },
                React.createElement(FormItems$1, { items: body })
            ),
            footer ? React.createElement(
                "div",
                { className: rtPrefix + "-form-footer" },
                React.createElement(FormItems$1, { items: footer })
            ) : null
        ) : null
    );
};

Form$1.propTypes = {

    /** Не делать отступы у формы от краев блока */
    noPadding: PropTypes.bool,

    /** Разрешит скролл внтри формы */
    scrollable: PropTypes.bool,

    /** Массив объектов для шапки формы. Как правило только заголовок. */
    header: PropTypes.arrayOf(PropTypes.object),

    /** Массив объектов для тела формы */
    body: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
    footer: PropTypes.arrayOf(PropTypes.object),

    /** Ссылка на функцию загрузки значений по умолчанию
     * (callBack) => callBack(initObject) */
    loadInitData: PropTypes.func,

    /** Производить ли автоматическое сохранение по параметрам requestSaveForm и methodSaveForm */
    autoSaveForm: PropTypes.bool,

    /** Запрос для автоматического сохранения формы */
    requestSaveForm: PropTypes.func,

    /** HTTP Метод, передаваемый в запрос сохранения */
    methodSaveForm: PropTypes.string,

    /** Функция обработки перед сохранением формы */
    processBeforeSaveForm: PropTypes.func
};

Form$1.defaultProps = {
    noPadding: false,
    scrollable: false,
    loadInitData: noop,
    autoSaveForm: true
};

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
	return React.createElement(Table$1, _extends({}, props, { columns: columns, headerHeight: title ? 30 : 0 }));
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

var rtdReducer = function rtdReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case types.INIT_STORE:
            {
                var path = action.payload.path;
                // console.log("INIT_TABLE_STORE: ", path);

                var newState = _extends({}, state);
                objectPath.set(newState, path, {});
                return newState;
            }
        case types.SET_DATA_STORE:
            {
                var _action$payload = action.payload,
                    _path = _action$payload.path,
                    row = _action$payload.row;


                var _newState = _extends({}, state);
                objectPath.set(_newState, _path, row); // obj.a is now {}

                // console.group("Store");
                // console.log("Store: ", newState);
                // console.log("New Data: ", path, row);
                // console.groupEnd();

                return _newState;
            }
        default:
            return state;
    }
};

var components = {
    Table: ConfigLoader,
    DateRange: DateRange$1,
    Layout: Layout$1,
    Form: Form$1,
    Select: Select$2
};

export { APP_TIME_OFFSET, AdvancedTable, CommandPanel, DateRange, FileManager, FilterPanel, Form, List, Modal$2 as Modal, Select$1 as Select, SingleDate, Table$1 as Table, components, getISO, getMomentFromStringByFormat, getMomentWithOffset, getMomentWithOffsetTruncateDay, notificationError, rtdReducer, setDateStore, toDDMMYYYYHHMMSS, toDDMMYYYYdash, toDDMMYYYYdot, toDDMMYYYYdotAltDashDash, toFormat };
//# sourceMappingURL=index.es.js.map
