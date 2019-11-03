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