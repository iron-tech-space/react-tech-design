import React, {useState} from 'react';
import {w3cwebsocket as W3CWebSocket} from 'websocket';
import { Button, Cascader, Checkbox, Input } from "antd";
import {
	CaretRightOutlined,
	StopOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const styles = {
	row: {
		display: 'flex',
		borderBottom: '1px solid #d9d9d9',
	},
	inputUrl: {
		flexBasis: '200px',
		borderRight: '1px solid #d9d9d9',
	},
	inputQuery: {
		flex: '1',
		borderRight: '1px solid #d9d9d9',
	},
	autoScroll: {
		padding: '0 8px',
		display: 'flex',
		borderRight: '1px solid #d9d9d9',
	},
	buttonStart: {color: 'green'},
	buttonStop: {color: 'red'},
	pre: {
		// height: '100%',
		overflow: 'auto',
		marginBottom: 0,
	},
};

const scrollToBottom = (block) => {
	const scrollHeight = block.scrollHeight;
	const height = block.clientHeight;
	const maxScrollTop = scrollHeight - height;
	block.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
};

const Logs = (props) => {
	const [ws, setWs] = useState(null);
	const [Logs, setLogs] = useState([]);
	const [logsRef, setLogsRef] = useState(null);
	const [wsParams, setWsParams] = useState({url: props.loki.url, query: props.loki.query});
	const [autoScroll, setAutoScroll] = useState(true);

	const onOpen = () => {
		// setWs(new W3CWebSocket("ws://10.5.121.117:3100/loki/api/v1/tail?query={dynamicdq=\"oauth.dias-dev.ru\"}", 'echo-protocol'));
		setWs(
			new W3CWebSocket(
				`ws://${wsParams.url}/loki/api/v1/tail?query=${wsParams.query}`,
				'echo-protocol'
			)
		);
		setLogs([]);
		console.log('onCreate ws => ', ws);
	};
	const onClose = () => {
		console.log('onClose ws => ', ws);
		ws && ws.close();
		setWs(undefined);
	};

	if (ws != null) {
		ws.onmessage = (msg) => {
			const streams = JSON.parse(msg.data).streams;
			const data = streams.map((streamItem) => {
				return streamItem.values.map((valueItem) => {
					// console.log('valueItem[0].substr(0, 13) => ', moment(valueItem[0].substr(0, 13),"x").format("YYYY-MM-DD hh:mm:ss") ); //
					return (
						<div key={valueItem[0]}>
							<span>
								{moment(valueItem[0].substr(0, 13), 'x').format(
									'YYYY-MM-DD hh:mm:ss'
								)}
							</span>
							<span>{valueItem[1]}</span>
						</div>
					);
				});
			});
			setLogs((state) => [...state, data]);
			if (logsRef && autoScroll) scrollToBottom(logsRef);
			// console.log('Logs => ', streams)
		};
	}

	const onChangeApp = (value) => {
		// console.log(value);
		onClose();
		setWsParams({...wsParams, query: `{server="${value[0]}", app="${value[1]}"}`})
	}

	return (
		<React.Fragment>
			<div style={styles.row}>
				{/*<div style={styles.inputUrl}>*/}
				{/*	<Input value={wsParams.url} bordered={false} />*/}
				{/*</div>*/}
				<div style={styles.inputUrl}>
					<Cascader options={props.servers} onChange={onChangeApp} placeholder="Выберите приложение"  bordered={false} />
				</div>
				<div style={styles.inputQuery}>
					<Input value={wsParams.query} bordered={false} disabled={true} />
				</div>
				<div style={styles.autoScroll}>
					<Checkbox
						style={{margin: 'auto'}}
						checked={autoScroll}
						onChange={(e) => setAutoScroll(e.target.checked)}
					>
						Auto scroll
					</Checkbox>
				</div>
				{ws != null ? (
					<div>
						<Button
							onClick={onClose}
							type='text'
							icon={<StopOutlined />}
							style={styles.buttonStop}
						/>
					</div>
				) : (
					<div>
						<Button
							onClick={onOpen}
							type='text'
							icon={<CaretRightOutlined />}
							style={styles.buttonStart}
						/>
					</div>
				)}
				{/*<div><Button type="text" icon={<StopOutlined />} style={styles.buttonStop}/></div>*/}
				{/*<Col span={3}><Button>Close connect</Button></Col>*/}
			</div>
			<pre style={styles.pre} ref={(ref) => setLogsRef(ref)}>
				{Logs}
			</pre>
		</React.Fragment>
	);
};

export default Logs;
