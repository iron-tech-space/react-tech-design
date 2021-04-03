import 'antd/es/spin/style';
import _Spin from 'antd/es/spin';

import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

export var empty = React.createElement(
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

export var overlay = React.createElement(
	'div',
	{ className: 'BaseTable__overlay' },
	' ',
	React.createElement(_Spin, {
		tip: '\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...',
		indicator: React.createElement(LoadingOutlined, { style: { fontSize: 24 }, spin: true })
	}),
	' '
);