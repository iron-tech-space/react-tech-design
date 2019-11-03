import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {flatten, getTableRowKeys, noop} from '../utils/baseUtils';
import {SelectContainer} from '../Select/SelectContainer';
import {Button, Typography} from 'antd';
import Table from '../Table/Table';
const {Paragraph} = Typography;

const Select = (props) => {
	const [_selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [_selectedRowData, setSelectedRowData] = useState(null);
	const [isSelectOpened, setIsSelectOpened] = useState(false);

	const {
		name,
		rowRender,
        className,
		type,
		title,
		placeholder,
        selectedRowKeys,
		// searchable,
		widthControl,
		widthPopup,
		heightPopup,

		onChangeKeys,

		/** Table Props */
		defaultSelectedRowKeys,
		rowKey,
		expandColumnKey,
		showSelection,
		requestLoadRows,
		requestLoadDefault,
        commandPanelProps,
		rows,
	} = props;

	const searchable = commandPanelProps && commandPanelProps.showElements && commandPanelProps.showElements.includes('search');

	useEffect(() => {
		if (defaultSelectedRowKeys) {
			const request = requestLoadDefault
				? requestLoadDefault
				: requestLoadRows;

			if (!!request && !rows && defaultSelectedRowKeys.length > 0) {
				// console.log('defaultSelectedRowKeys ', defaultSelectedRowKeys, defaultSelectedRowKeys.length);
				request({
					data: {
						[rowKey]: defaultSelectedRowKeys,
					},
				})
					.then((response) => {
						let result = response.data;
						if (result.length > 0) setSelectedRowData(result[0]);
					})
					.catch((error) => {});
			} else if (rows && defaultSelectedRowKeys.length > 0 && type === 'SingleSelect') {
			    const findRow = rows.find((row) => row[rowKey] === defaultSelectedRowKeys[0]);
			    // console.log("setSelectedRowData => ", findRow);
                setSelectedRowData(findRow);
            }
			// console.log("setSelectedRowKeys[65] -> ", defaultSelectedRowKeys);
			setSelectedRowKeys(defaultSelectedRowKeys);
		}
	}, []);

	useEffect(() => {
	    if(selectedRowKeys && selectedRowKeys.length === 0) {
            // console.log("setSelectedRowKeys[72] -> ", selectedRowKeys);
            setSelectedRowKeys(selectedRowKeys);
        }
        if (rows && selectedRowKeys.length > 0 && type === 'SingleSelect') {
            const findRow = rows.find((row) => row[rowKey] === selectedRowKeys[0]);
            // console.log("setSelectedRowData => ", findRow);
            setSelectedRowData(findRow);
        }
    }, [selectedRowKeys]);

	const columns = [
		{
			key: rowKey,
			title: title,
			dataKey: rowKey,
			width: 500,
			cellRenderer:
				typeof rowRender === 'function'
					? rowRender
					: ({rowData}) => <div>{rowData[rowRender]}</div>,
		},
	];

	const _getHeadText = () => {
		if (type === 'SingleSelect') {
			return _selectedRowData && _selectedRowData[rowRender]
				? `${_selectedRowData[rowRender]}`
				: `${placeholder}`;
		} else {
			return _selectedRowKeys.length > 0
				? `Выбрано: ${_selectedRowKeys.length}`
				: `${placeholder}`;
		}
	};

	const _getPopupStyle = () => {
		// if (heightPopup)
		// 	return {height: `${heightPopup}px`, width: `${widthPopup}px`};

		let height = {};
		let defRowsLen = 0;

		if (!requestLoadRows && rows)
			if (expandColumnKey)
				defRowsLen = flatten(getTableRowKeys(rows, rowKey)).length;
			else defRowsLen = rows.length;

		// console.log('_getPopupStyle', defRowsLen);
		if (defRowsLen && defRowsLen > 0) {
			height =
				defRowsLen * 30 + // Кол-во строк * высоту строки
				(searchable ? 46 : 0) + // Размер поисковой строки или 0
				(type === 'MultiSelect' ? 65 : 0) + // Размер футтера (30) + размер кнопки 35 или 0
				(showSelection ? 200 : 0) + // Размер панели выбранных элементов или 0
				22; // Паддинги и бордер
			// console.log('heightPopup', height);
			if (height > heightPopup) height = `${heightPopup}px`;
			else height = `${height}px`;
		} else {
			// console.log("heightPopup", heightPopup);
			height = `${heightPopup}px`;
		}

		// console.log("heightPopup, widthPopup", heightPopup, widthPopup);
		return {height, width: `${widthPopup}px`};
	};

	const _onChange = (selectedKeys) => {
		// console.log('_onChange', selectedObjects);
		setSelectedRowKeys(selectedKeys);
		// setSelectedRowData(selectedObjects);
		onChangeKeys(name, selectedKeys.length ? selectedKeys : null);
		// onChangeObjects(name, selectedObjects.length ? selectedObjects : null);
		// setCountSelect(selectedKeys.length);
		if (type === 'SingleSelect') {
			setIsSelectOpened(false);
		}
	};

	const _SingleSelectRow = ({selected, rowData, rowIndex}) => {
		// console.log("_SingleSelectRow => ", rowData);
		setSelectedRowData(rowData);
		// selected ? setSingleSelectRowData(rowData) : setSingleSelectRowData({})
	};

	return (
		<SelectContainer
			handleOpen={() => setIsSelectOpened(true)}
			handleClose={() => setIsSelectOpened(false)}
			isOpened={isSelectOpened}
            className={className}
		>
			{title ? <div className={'title'}>{title}</div> : null}
			<div
				className={[
					'select-header',
					isSelectOpened ? 'opened' : '',
                    _selectedRowKeys && _selectedRowKeys.length > 0 ? 'selected' : '',
				].join(' ')}
				style={{
					width: widthControl === 0 ? '100%' : `${widthControl}px`,
				}}
			>
				<Paragraph ellipsis> {_getHeadText()} </Paragraph>
			</div>
			{isSelectOpened ? (
				<div className='select-popup' style={_getPopupStyle()}>
					<Table
						{...props}
						defaultSelectedRowKeys={_selectedRowKeys}
						selectedRowKeys={_selectedRowKeys}
						headerHeight={0}
						columns={columns}
						type={!!requestLoadRows ? 'serverSide' : 'localSide'}
						// showElements={searchable ? ['search'] : undefined}
						selectable={type === 'MultiSelect'}
						footerShow={type === 'MultiSelect'}
						showSelection={showSelection}
						rowRenderShowSelection={rowRender}
						onRowClick={_SingleSelectRow}
						onSelectedRowsChange={_onChange}
					/>
					{type === 'MultiSelect' ? (
						<div className={'close-panel'}>
							<Button
								onClick={() => setIsSelectOpened(false)}
								size={'small'}
							>
								Ok
							</Button>
						</div>
					) : null}
				</div>
			) : null}
		</SelectContainer>
	);
};

Select.propTypes = {
	/** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
	name: PropTypes.string.isRequired,

	/** Строка или функция для отображения элементов списка
	 * Строка - имя поля
	 * Функция - рендер строк. Параметры v
	 * { rowData, rowIndex }) */
	rowRender: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
		.isRequired,

	/** Тип селекта (SingleSelect и MultiSelect) */
	type: PropTypes.oneOf(['SingleSelect', 'MultiSelect']).isRequired,

    /** Дополнительное имя класса для элемента */
    className: PropTypes.string,

	/** Заголовок фильтра */
	title: PropTypes.string,

	/** Строка, когда ничего не выбрано */
	placeholder: PropTypes.string,

	/** Запрос на загрузку дефолтных данных */
	requestLoadDefault: PropTypes.func,

    selectedRowKeys: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

	// /** Показывать ли поисковую строку */
	// searchable: PropTypes.bool,

	/** Ширина поля выбора в пикселях */
	widthControl: PropTypes.number,

	/** Ширина выпадающего меню */
	widthPopup: PropTypes.number,

	/** Высота выпадающего меню (по умолчанию считается сама) */
	heightPopup: PropTypes.number,

    /** Событие об изменении состояния селектора */
	onChangeKeys: PropTypes.func,
};

Select.defaultProps = {
	onChangeKeys: noop,
	// onChangeObjects: noop,
	placeholder: 'Выбрать',
	// searchable: false,
	widthControl: 110,
	widthPopup: 400,
	heightPopup: 600,
    rowKey: 'id',
};

export default Select;
