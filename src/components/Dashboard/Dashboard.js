import React, {useEffect, useState} from 'react';
import RGL, {WidthProvider} from 'react-grid-layout';
import sizeMe from 'react-sizeme';
import Logs from './Panels/Logs';
import LineChart from './Panels/LineChart';
import { notificationError } from "../utils/baseUtils";

const ReactGridLayout = WidthProvider(RGL);
const startGridWidth = 1200;

const contents = {
	logs: Logs,
	lineChart: LineChart,
};

const DashboardPanel = sizeMe.withSize({monitorHeight: true})(
	({size, title, type, params}) => {
		// console.log('DashboardPanel', size)
		const Content = contents[type];
		return (
			<div className={'dashboard-panel'}>
				<div className={'dashboard-panel-header'}>{title}</div>
				<div className={'dashboard-panel-content'}>
					<Content size={size} {...params} />
				</div>
			</div>
		);
	}
);

const DashboardGrid = sizeMe.withSize()(({size, panels}) => {
	const width = size.width > 0 ? size.width : startGridWidth;
	// console.log('Grid dashboard', size)
	const renderPanels =
		panels &&
		panels.map(({gridPos, ...panel}, index) => (
			<div key={index} data-grid={gridPos}>
				<DashboardPanel {...panel} />
			</div>
		));
	return (
		<ReactGridLayout
			className='layout'
			rowHeight={30}
			cols={12}
			width={width}
			draggableHandle={'.dashboard-panel-header'}
		>
			{renderPanels}
		</ReactGridLayout>
	);
});

const Dashboard = (props) => {
	const {id, requestLoadConfig} = props
	const [dashboard, setDashboard] = useState(props.dashboard);

	useEffect(() => {
		requestLoadConfig && requestLoadConfig({
			data: {id: id},
			params: {},
		})
			.then(res => res.data && res.data.dashboard && setDashboard(JSON.parse(res.data.dashboard)))
			.catch(err => notificationError("Ошибка загрузки dashboard", err));
	}, [id]);

	console.log('dashboard => ', dashboard);
	return (
		<div
			style={{
				backgroundColor: '#f0f2f5',
				width: '100%',
				height: '100%',
				overflow: 'auto',
			}}
		>
			<DashboardGrid panels={dashboard.panels} />
		</div>
	);
};

export default Dashboard;
