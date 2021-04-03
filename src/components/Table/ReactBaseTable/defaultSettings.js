import {Spin} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import React from 'react';

export const empty = (
	<div className={'BaseTable__overlay'}>
		{' '}
		<span>Нет данных</span>{' '}
	</div>
);

export const overlay = (
	<div className={'BaseTable__overlay'}>
		{' '}
		<Spin
			tip='Загрузка...'
			indicator={<LoadingOutlined style={{fontSize: 24}} spin />}
		/>{' '}
	</div>
);
