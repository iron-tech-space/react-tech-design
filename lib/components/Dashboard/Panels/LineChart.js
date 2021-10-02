var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useEffect, useState } from 'react';
import { LineChart as LC, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { notificationError } from "../../utils/baseUtils";

// interface LineChartProps {
//     size: {width: number; height: number}
//     configName?: string;
//     grid?: CartesianGridProps | undefined;
//     tooltip?: object;
//     legend?: LegendProps;
//     xAxis?: XAxisProps;
//     yAxes?: YAxisProps[];
//     lines?: LineProps[];
// }

var LineChart = function LineChart(props) {
	var size = props.size,
	    configName = props.configName,
	    requestLoadRows = props.requestLoadRows,
	    grid = props.grid,
	    tooltip = props.tooltip,
	    legend = props.legend,
	    xAxis = props.xAxis,
	    yAxes = props.yAxes,
	    lines = props.lines;

	var _useState = useState([]),
	    _useState2 = _slicedToArray(_useState, 2),
	    data = _useState2[0],
	    setData = _useState2[1];

	useEffect(function () {
		requestLoadRows(configName)({
			data: {
				from: '2021-09-29T16:00:00.000Z',
				to: '2021-09-30T20:00:00.000Z'
			},
			params: {}
		}).then(function (res) {
			return setData(res.data);
		}).catch(function (error) {
			return notificationError(error, 'Ошибка загрузки данных');
		});
	}, []);

	if (data.length > 0) {
		// console.log("data.length / 105 => ", Math.floor(data.length / 105))
		return React.createElement(
			LC,
			{ width: size.width, height: size.height - 32, data: data },
			grid ? React.createElement(CartesianGrid, grid) : null,
			tooltip ? React.createElement(Tooltip, tooltip) : null,
			legend ? React.createElement(Legend, legend) : null,
			xAxis ? React.createElement(XAxis, _extends({}, xAxis, {
				interval: Math.floor(data.length / xAxis.interval)
			})) : null,
			yAxes && Array.isArray(yAxes) && yAxes.map(function (yAxis) {
				return React.createElement(YAxis, yAxis);
			}),
			lines && Array.isArray(lines) && lines.map(function (line) {
				return React.createElement(Line, line);
			})
		);
	} else return null;
};

export default LineChart;