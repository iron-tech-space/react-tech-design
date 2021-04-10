import React from 'react';
import {notification} from 'antd';
import moment from "moment";

export const noop = () => {};

export const flatten = (arrayOfArrays) =>
	arrayOfArrays.reduce(
		(flattened, item) =>
			flattened.concat(Array.isArray(item) ? flatten(item) : [item]),
		[]
	);

export const getTableRowObjects = (data) => {
	const rowKeys = data.map((item) => {
		if (item.children && item.children.length) {
			return [item, getTableRowObjects(item.children)];
		}
		return item;
	});
	return rowKeys;
};

export const getTableRowKeys = (data, rowKey) => {
	const rowKeys = data.map((item) => {
		if (item.children && item.children.length) {
			return [item[rowKey], getTableRowKeys(item.children, rowKey)];
		}
		return item[rowKey];
	});
	return rowKeys;
};

export const findNodeByRowKey = (data, rowKey, rowValue) => {
	let node = {};
	let item = {};
	for (let i = 0; i < data.length; i++) {
		item = _findNodeByRowKey(data[i], rowKey, rowValue);
		if (item !== false) return item;
	}
	return node;
};

const _findNodeByRowKey = (currentNode, rowKey, value) => {
	let i, currentChild, result;

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

export const generateUUID = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(
			c ^
			(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
		).toString(16)
	);
};


export const getValueFromSingleSelect = (name, keys) => (keys && keys.length > 0) ? keys[0] : null;

export const getValueFromMultiSelect = (name, keys) => (keys && keys.length > 0) ? keys : null;

export const getValueFromSelectTable = (rows) => {
    if (rows && rows.length > 0) return rows[0];
    else return null;
};

export const getObjectExcludedProps = (object, exclude) => {
    let returnObject = {};
    Object.keys(object).forEach((key) =>
        !exclude.includes(key) ? (returnObject[key] = object[key]) : undefined // было null
    );
    return returnObject;
};

export const notificationError = (error, message) => {
	if (error.response) {
		console.error(error.response.status, error.response.data);
		const errorDescription = (error.response.data && error.response.data.error)
			? error.response.data.error
			: "Нет описания ошибки";
		notification.error({
			message: `[${error.response.status}] ${message}`,
			description: errorDescription,
		});
	} else {
		console.error(error);
		notification.error({
			message: 'Не удалось детектировать ошибку. См. console.error',
		});
	}
};

export const dispatchToStore = ({dispatch, setDateStore, value, extraData}) => {
	if(dispatch.path) {
		// console.log("storeHOC => dispatchToStore", dispatch, setDateStore);
		if(dispatch.type === 'event')
			setDateStore && setDateStore(dispatch.path,  {
				timestamp: moment(),
				// type: dispatch.type,
				value: value,
				extraData: extraData
			});
		else
			setDateStore && setDateStore(dispatch.path, value);
	}
}

export function useMounted() {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
	}, [])
	return isMounted
}
