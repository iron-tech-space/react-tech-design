import React, {useEffect, useState} from 'react';
import {
	LineChart as LC,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';
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

const LineChart = (props) => {
	const {size, configName, requestLoadRows, grid, tooltip, legend, xAxis, yAxes, lines} =
		props;
	const [data, setData] = useState([]);

	useEffect(() => {
		requestLoadRows(configName)({
			data: {
				from: '2021-09-29T16:00:00.000Z',
				to: '2021-09-30T20:00:00.000Z',
			},
			params: {},
		})
			.then((res) => setData(res.data))
			.catch((error) =>
				notificationError(error, 'Ошибка загрузки данных')
			);
	}, []);

	if (data.length > 0) {
		// console.log("data.length / 105 => ", Math.floor(data.length / 105))
		return (
			<LC width={size.width} height={size.height - 32} data={data}>
				{grid ? <CartesianGrid {...grid} /> : null}
				{tooltip ? <Tooltip {...tooltip} /> : null}
				{legend ? <Legend {...legend} /> : null}
				{xAxis ? (
					<XAxis
						{...xAxis}
						interval={Math.floor(data.length / xAxis.interval)}
					/>
				) : null}
				{yAxes &&
					Array.isArray(yAxes) &&
					yAxes.map((yAxis) => <YAxis {...yAxis} />)}
				{lines &&
					Array.isArray(lines) &&
					lines.map((line) => <Line {...line} />)}
			</LC>
		);
	} else return null;
};

export default LineChart;
