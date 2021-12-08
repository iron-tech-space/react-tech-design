var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { useEffect, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import Logs from './Panels/Logs';
import LineChart from './Panels/LineChart';
import { notificationError } from "../utils/baseUtils";

var ReactGridLayout = WidthProvider(RGL);
var startGridWidth = 1200;

var contents = {
	logs: Logs,
	lineChart: LineChart
};

var DashboardPanel = sizeMe.withSize({ monitorHeight: true })(function (_ref) {
	var size = _ref.size,
	    title = _ref.title,
	    type = _ref.type,
	    params = _ref.params;

	// console.log('DashboardPanel', size)
	var Content = contents[type];
	return React.createElement(
		'div',
		{ className: 'dashboard-panel' },
		React.createElement(
			'div',
			{ className: 'dashboard-panel-header' },
			title
		),
		React.createElement(
			'div',
			{ className: 'dashboard-panel-content' },
			React.createElement(Content, _extends({ size: size }, params))
		)
	);
});

var DashboardGrid = sizeMe.withSize()(function (_ref2) {
	var size = _ref2.size,
	    panels = _ref2.panels;

	var width = size.width > 0 ? size.width : startGridWidth;
	// console.log('Grid dashboard', size)
	var renderPanels = panels && panels.map(function (_ref3, index) {
		var gridPos = _ref3.gridPos,
		    panel = _objectWithoutProperties(_ref3, ['gridPos']);

		return React.createElement(
			'div',
			{ key: index, 'data-grid': gridPos },
			React.createElement(DashboardPanel, panel)
		);
	});
	return React.createElement(
		ReactGridLayout,
		{
			className: 'layout',
			rowHeight: 30,
			cols: 12,
			width: width,
			draggableHandle: '.dashboard-panel-header'
		},
		renderPanels
	);
});

var Dashboard = function Dashboard(props) {
	var id = props.id,
	    requestLoadConfig = props.requestLoadConfig;

	var _useState = useState(props.dashboard),
	    _useState2 = _slicedToArray(_useState, 2),
	    dashboard = _useState2[0],
	    setDashboard = _useState2[1];

	useEffect(function () {
		requestLoadConfig && requestLoadConfig({
			data: { id: id },
			params: {}
		}).then(function (res) {
			return res.data && res.data.dashboard && setDashboard(JSON.parse(res.data.dashboard));
		}).catch(function (err) {
			return notificationError("Ошибка загрузки dashboard", err);
		});
	}, [id]);

	console.log('dashboard => ', dashboard);
	return React.createElement(
		'div',
		{
			style: {
				backgroundColor: '#f0f2f5',
				width: '100%',
				height: '100%',
				overflow: 'auto'
			}
		},
		React.createElement(DashboardGrid, { panels: dashboard.panels })
	);
};

export default Dashboard;