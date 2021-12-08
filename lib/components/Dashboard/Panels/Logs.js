import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/cascader/style';
import _Cascader from 'antd/es/cascader';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

import { CaretRightOutlined, StopOutlined } from '@ant-design/icons';
import moment from 'moment';

var styles = {
	row: {
		display: 'flex',
		borderBottom: '1px solid #d9d9d9'
	},
	inputUrl: {
		flexBasis: '200px',
		borderRight: '1px solid #d9d9d9'
	},
	inputQuery: {
		flex: '1',
		borderRight: '1px solid #d9d9d9'
	},
	autoScroll: {
		padding: '0 8px',
		display: 'flex',
		borderRight: '1px solid #d9d9d9'
	},
	buttonStart: { color: 'green' },
	buttonStop: { color: 'red' },
	pre: {
		// height: '100%',
		overflow: 'auto',
		marginBottom: 0
	}
};

var scrollToBottom = function scrollToBottom(block) {
	var scrollHeight = block.scrollHeight;
	var height = block.clientHeight;
	var maxScrollTop = scrollHeight - height;
	block.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
};

var Logs = function Logs(props) {
	var _useState = useState(null),
	    _useState2 = _slicedToArray(_useState, 2),
	    ws = _useState2[0],
	    setWs = _useState2[1];

	var _useState3 = useState([]),
	    _useState4 = _slicedToArray(_useState3, 2),
	    Logs = _useState4[0],
	    setLogs = _useState4[1];

	var _useState5 = useState(null),
	    _useState6 = _slicedToArray(_useState5, 2),
	    logsRef = _useState6[0],
	    setLogsRef = _useState6[1];

	var _useState7 = useState({ url: props.loki.url, query: props.loki.query }),
	    _useState8 = _slicedToArray(_useState7, 2),
	    wsParams = _useState8[0],
	    setWsParams = _useState8[1];

	var _useState9 = useState(true),
	    _useState10 = _slicedToArray(_useState9, 2),
	    autoScroll = _useState10[0],
	    setAutoScroll = _useState10[1];

	var onOpen = function onOpen() {
		// setWs(new W3CWebSocket("ws://10.5.121.117:3100/loki/api/v1/tail?query={dynamicdq=\"oauth.dias-dev.ru\"}", 'echo-protocol'));
		setWs(new W3CWebSocket('ws://' + wsParams.url + '/loki/api/v1/tail?query=' + wsParams.query, 'echo-protocol'));
		setLogs([]);
		console.log('onCreate ws => ', ws);
	};
	var onClose = function onClose() {
		console.log('onClose ws => ', ws);
		ws && ws.close();
		setWs(undefined);
	};

	if (ws != null) {
		ws.onmessage = function (msg) {
			var streams = JSON.parse(msg.data).streams;
			var data = streams.map(function (streamItem) {
				return streamItem.values.map(function (valueItem) {
					// console.log('valueItem[0].substr(0, 13) => ', moment(valueItem[0].substr(0, 13),"x").format("YYYY-MM-DD hh:mm:ss") ); //
					return React.createElement(
						'div',
						{ key: valueItem[0] },
						React.createElement(
							'span',
							null,
							moment(valueItem[0].substr(0, 13), 'x').format('YYYY-MM-DD hh:mm:ss')
						),
						React.createElement(
							'span',
							null,
							valueItem[1]
						)
					);
				});
			});
			setLogs(function (state) {
				return [].concat(_toConsumableArray(state), [data]);
			});
			if (logsRef && autoScroll) scrollToBottom(logsRef);
			// console.log('Logs => ', streams)
		};
	}

	var onChangeApp = function onChangeApp(value) {
		// console.log(value);
		onClose();
		setWsParams(_extends({}, wsParams, { query: '{server="' + value[0] + '", app="' + value[1] + '"}' }));
	};

	return React.createElement(
		React.Fragment,
		null,
		React.createElement(
			'div',
			{ style: styles.row },
			React.createElement(
				'div',
				{ style: styles.inputUrl },
				React.createElement(_Cascader, { options: props.servers, onChange: onChangeApp, placeholder: '\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435', bordered: false })
			),
			React.createElement(
				'div',
				{ style: styles.inputQuery },
				React.createElement(_Input, { value: wsParams.query, bordered: false, disabled: true })
			),
			React.createElement(
				'div',
				{ style: styles.autoScroll },
				React.createElement(
					_Checkbox,
					{
						style: { margin: 'auto' },
						checked: autoScroll,
						onChange: function onChange(e) {
							return setAutoScroll(e.target.checked);
						}
					},
					'Auto scroll'
				)
			),
			ws != null ? React.createElement(
				'div',
				null,
				React.createElement(_Button, {
					onClick: onClose,
					type: 'text',
					icon: React.createElement(StopOutlined, null),
					style: styles.buttonStop
				})
			) : React.createElement(
				'div',
				null,
				React.createElement(_Button, {
					onClick: onOpen,
					type: 'text',
					icon: React.createElement(CaretRightOutlined, null),
					style: styles.buttonStart
				})
			)
		),
		React.createElement(
			'pre',
			{ style: styles.pre, ref: function ref(_ref) {
					return setLogsRef(_ref);
				} },
			Logs
		)
	);
};

export default Logs;