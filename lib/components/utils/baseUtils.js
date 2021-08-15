import 'antd/es/notification/style';
import _notification from 'antd/es/notification';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React from 'react';

import moment from "moment";
import { setDataStore } from '../../redux/rtd.actions';

export var noop = function noop() {};

export var flatten = function flatten(arrayOfArrays) {
	return arrayOfArrays.reduce(function (flattened, item) {
		return flattened.concat(Array.isArray(item) ? flatten(item) : [item]);
	}, []);
};

export var getTableRowObjects = function getTableRowObjects(data) {
	var rowKeys = data.map(function (item) {
		if (item.children && item.children.length) {
			return [item, getTableRowObjects(item.children)];
		}
		return item;
	});
	return rowKeys;
};

export var getTableRowKeys = function getTableRowKeys(data, rowKey) {
	var rowKeys = data.map(function (item) {
		if (item.children && item.children.length) {
			return [item[rowKey], getTableRowKeys(item.children, rowKey)];
		}
		return item[rowKey];
	});
	return rowKeys;
};

export var findNodeByRowKey = function findNodeByRowKey(data, rowKey, rowValue) {
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

export var generateUUID = function generateUUID() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
		return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
	});
};

export var getValueFromSingleSelect = function getValueFromSingleSelect(name, keys) {
	return keys && keys.length > 0 ? keys[0] : null;
};

export var getValueFromMultiSelect = function getValueFromMultiSelect(name, keys) {
	return keys && keys.length > 0 ? keys : null;
};

export var getValueFromSelectTable = function getValueFromSelectTable(rows) {
	if (rows && rows.length > 0) return rows[0];else return null;
};

export var getObjectExcludedProps = function getObjectExcludedProps(object, exclude) {
	var returnObject = {};
	Object.keys(object).forEach(function (key) {
		return !exclude.includes(key) ? returnObject[key] = object[key] : undefined;
	} // было null
	);
	return returnObject;
};

export var notificationError = function notificationError(error, message) {
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

export var dispatchToStore = function dispatchToStore(_ref) {
	var dispatch = _ref.dispatch,
	    setDataStore = _ref.setDataStore,
	    value = _ref.value,
	    extraData = _ref.extraData;

	if (dispatch.path) {
		// console.log("storeHOC => dispatchToStore", dispatch, setDataStore);
		if (dispatch.type === 'event') setDataStore && setDataStore(dispatch.path, {
			timestamp: moment(),
			// type: dispatch.type,
			value: value,
			extraData: extraData
		});else setDataStore && setDataStore(dispatch.path, value);
	}
};
export var dispatchToStoreEx = function dispatchToStoreEx(_ref2) {
	var dispatch = _ref2.dispatch,
	    path = _ref2.path,
	    type = _ref2.type,
	    value = _ref2.value;

	if (type === 'event') {
		dispatch(setDataStore(path, {
			timestamp: moment(),
			value: value
		}));
	}
	dispatch(setDataStore(path, value));
};

export function useMounted() {
	var _React$useState = React.useState(false),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    isMounted = _React$useState2[0],
	    setIsMounted = _React$useState2[1];

	React.useEffect(function () {
		setIsMounted(true);
	}, []);
	return isMounted;
}

export var getSortBy = function getSortBy(clientSortBy, serverSortBy, dataIndex) {
	if (clientSortBy && clientSortBy.key === dataIndex) {
		return [clientSortBy, clientSortBy.order === "asc" ? "ascend" : "descend"];
	} else if (serverSortBy) {
		return [{ key: dataIndex, order: serverSortBy }, serverSortBy === "asc" ? "ascend" : "descend"];
	} else return [undefined, undefined];
};