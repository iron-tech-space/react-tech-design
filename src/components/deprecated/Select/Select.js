import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { flatten, getTableRowKeys, noop, notificationError } from "../../utils/baseUtils";
import {rtPrefix} from '../../utils/variables';
import {Button, Typography} from 'antd';
import { DownOutlined, UpOutlined, CloseCircleFilled } from '@ant-design/icons'
import Table from '../Table/Table';
import { setDataStore } from "../../../redux/rtd.actions";
const {Paragraph} = Typography;

const Select = (props) => {
	const [_selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [_selectedRowData, _setSelectedRowData] = useState(null);
	const [isSelectOpened, setIsSelectOpened] = useState(false);
	const [isClickInSelect, setIsClickInSelect] = useState(false);

	const {
		name,
		rowRender,
        className,
		type,
		title,
		placeholder,
        selectedRowKeys,
		// searchable,
        size,
		widthControl,
		widthPopup,
		heightPopup,

		onChangeKeys,
        defaultValue,
        value,

		/** Table Props */
		defaultSelectedRowKeys,
		rowKey,
		expandColumnKey,
		showSelection,
		requestLoadRows,
		requestLoadDefault,
        commandPanelProps,
		rows,
		dispatchPath,
	} = props;

	const selectedDispatchPath = dispatchPath && `${dispatchPath}.selected`;
	const searchable = commandPanelProps && commandPanelProps.showElements && commandPanelProps.showElements.includes('search');
	const node = useRef(null);

	const setSelectedRowData = (rowData) => {
		selectedDispatchPath && props.setDataStore && props.setDataStore(selectedDispatchPath, rowData);
		_setSelectedRowData(rowData);
	}

	const loadSelectedObject = ({selectedRowKeys}) => {
        if(selectedRowKeys) {
            let _selectedRowKeys;
			if(Array.isArray(selectedRowKeys)) {
				setSelectedRowKeys(selectedRowKeys);
				_selectedRowKeys = selectedRowKeys
			}
            else {
            	setSelectedRowKeys([selectedRowKeys]);
				_selectedRowKeys = [selectedRowKeys]
			}

			// console.log("setSelectedRowKeys[70] -> ", _selectedRowKeys);

			const request = requestLoadDefault
                ? requestLoadDefault
                : requestLoadRows;

            if (!!request && !rows && _selectedRowKeys.length > 0) {
                // console.log('defaultSelectedRowKeys ', defaultSelectedRowKeys, defaultSelectedRowKeys.length);
                request({
                    data: {
                        [rowKey]:  _selectedRowKeys, //defaultSelectedRowKeys,
                    },
                })
                    .then((response) => {
                        let result = response.data;
						// console.log("setSelectedRowData[84] => ", response.data);
						if (result.length > 0) setSelectedRowData(result[0]);
                    })
					.catch(error => notificationError(error, 'Ошибка загрузки данных в Select') );

            } else if (rows && _selectedRowKeys && type === 'SingleSelect') {
            	let srk = _selectedRowKeys[0];
				// if(Array.isArray(selectedRowKeys) && selectedRowKeys.length > 0)
				// 	srk = selectedRowKeys[0];
            	// else
				// 	srk = selectedRowKeys;

                const findRow = rows.find((row) => row[rowKey] === srk);
                // console.log("setSelectedRowData[98] => ", findRow, rows, srk);
                setSelectedRowData(findRow);
            } else {
                setSelectedRowData(null);
            }
        }
	};

	useEffect(() => {
        loadSelectedObject({selectedRowKeys: defaultSelectedRowKeys});
		window.addEventListener('mousedown', handleMouseClick, false);
		return () => {
			window.removeEventListener('mousedown', handleMouseClick, false);
		};
	}, []);

	useEffect(() => {
		// console.log("selectedRowKeys", selectedRowKeys);
        loadSelectedObject({selectedRowKeys: selectedRowKeys});
    }, [selectedRowKeys]);

	useEffect(() => {
		if(_selectedRowKeys !== undefined && _selectedRowData === undefined){
			// console.log("useEffect rows", _selectedRowKeys, _selectedRowData, rows);
			loadSelectedObject({selectedRowKeys: _selectedRowKeys});
		}
	}, [rows])

	useEffect(() => {
		// console.log("isClickInSelect ", isClickInSelect);
		// console.log("isSelectOpened ", isSelectOpened);
		if(!isClickInSelect && isSelectOpened)
			onClosePopup();
	}, [isClickInSelect]);

	// useEffect(() => {
	// 	// console.log("setSelectedRowData[117] => ", props.value, props.defaultValue);
	// }, [props])

	const columns = [
		{
			key: rowKey,
			title: title,
			dataKey: rowKey,
			width: 500,
			cellRenderer:
				typeof rowRender === 'function'
					? rowRender
					: ({rowData}) => <div className={'rt-table-cell'}>{rowData[rowRender]}</div>,
		},
	];

	const _getHeadCls = () => {
	    let cls = [`${rtPrefix}-select-header`];

	    if(isSelectOpened)
            cls.push('opened');

	    if(_selectedRowKeys && _selectedRowKeys.length > 0)
	        cls.push('selected');

	    switch (size) {
            case 'small':
                cls.push(`${rtPrefix}-select-header-sm`);
                break;
            case 'large':
                cls.push(`${rtPrefix}-select-header-lg`);
                break;
            default: break;
        }

	    return cls.join(' ');
    };

	const _getHeadText = () => {
		if (type === 'SingleSelect') {
				if(_selectedRowData)
					if(typeof rowRender === 'function')
						return rowRender({rowData: _selectedRowData});
					else
						return `${_selectedRowData[rowRender]}`;
				else
					return `${placeholder}`;
		} else {
			return _selectedRowKeys.length > 0
				? `Выбрано: ${_selectedRowKeys.length}`
				: `${placeholder}`;
		}
	};

    const _getPopupCls = () => {
    	// console.log('_getPopupCls _selectedRowKeys => ', _selectedRowKeys);
        let cls = [`${rtPrefix}-select-popup`];

        if(title)
            cls.push(`${rtPrefix}-select-popup-with-title`);

        return cls.join(' ');
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

	const getEvents = () => {
		return (commandPanelProps && commandPanelProps.systemBtnProps && Object.keys(commandPanelProps.systemBtnProps)) || [];
	};

	const _onChange = (selectedKeys) => {
		// console.log('_onChange [176]', selectedKeys);
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

	const handleMouseClick = (e) => {
		node && node.current && setIsClickInSelect(node.current.contains(e.target))
	};

	const onClosePopup  = () => {
		setIsSelectOpened(false);
	};

	const onOpenPopup = () => {
		if(!isSelectOpened)
			setIsSelectOpened(true);
		else
			setIsSelectOpened(false);
	};

	const onClickClear = () => {
		// console.log("delete Selected");
		setSelectedRowData(null);
		_onChange([]);
	};

	return (
		<div
            className={`${rtPrefix}-select ${className ? className : ''}`}
			ref={node}
		>
			{title ? <div className={'title'}>{title}</div> : null}
			<div
				className={_getHeadCls()}
				style={{
					width: widthControl === 0 ? '100%' : `${widthControl}px`,
				}}

			>
				<div className={`${rtPrefix}-select-selector`}
					 // onFocus={ () => {setIsSelectOpened(true)} }
					 onClick={ onOpenPopup }
				>
					<Paragraph ellipsis> {_getHeadText()} </Paragraph>
				</div>
                {isSelectOpened ? <UpOutlined onClick={ onOpenPopup } className={`${rtPrefix}-select-header-icon`} /> : <DownOutlined onClick={ onOpenPopup } className={`${rtPrefix}-select-header-icon`}/> }
				{/*<Button shape="circle" icon={<CloseCircleFilled />} onClick={() => console.log("delete Selected")} className={`${rtPrefix}-select-header-clear`} />*/}
				{_selectedRowKeys.length > 0 ? <CloseCircleFilled onClick={onClickClear} className={`${rtPrefix}-select-header-clear`}/> : null }
			</div>

			{isSelectOpened ? (
				<div className={_getPopupCls()} style={_getPopupStyle()}>
					<Table
						{...props}
						commandPanelProps={{
							...props.commandPanelProps,
							showElements: getEvents(),// getShowElements(),
						}}
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
		</div>
	);
};

Select.propTypes = {
	/** Имя параметра селекта (вернется в onChangeKeys и onChangeObjects) */
	name: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.arrayOf(
			PropTypes.oneOfType(
				[PropTypes.string, PropTypes.number]
			)
		)]).isRequired,

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

    /** Массив выбранных значений */
    selectedRowKeys: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /** Размер селектора ['small', 'middle', 'large'] */
    size: PropTypes.oneOf(['small', 'middle', 'large']),

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

	/** Поле для уникальной идентификации строки */
	rowKey: PropTypes.string,

	/** Высота строки таблицы */
	rowHeight: PropTypes.number,

	/** Строки будут в зебро-стиле */
	zebraStyle: PropTypes.bool,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadRows: PropTypes.func,

	/** Функция запроса для загрузки строк (данных) */
	requestLoadCount: PropTypes.func,

	/** Значение строки поиска */
	searchValue: PropTypes.string,

	/** Имя параметра для поиска */
	searchParamName: PropTypes.string,

	/** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
	nodeAssociated: PropTypes.bool,

	/** Ключ колонки по которой строить иерархию */
	expandColumnKey: PropTypes.string,

	/** Открыть по умолчанию вложенность до уровня N или 'All' */
	expandDefaultAll: PropTypes.bool,

	/** Загружать ноды иерархии по одной */
	expandLazyLoad: PropTypes.bool,

	/** Поле в котором хранится ссылка на родителя */
	expandParentKey: PropTypes.string,
};

Select.defaultProps = {
	onChangeKeys: noop,
	// onChangeObjects: noop,
	placeholder: 'Выбрать',
	// searchable: false,
    size: 'middle',
	widthControl: 110,
	widthPopup: 400,
	heightPopup: 600,
    rowKey: 'id',
	rowHeight: 30,
	zebraStyle: false,

	requestLoadDefault: undefined,
	requestLoadRows: undefined,
	requestLoadCount: undefined,
	searchValue: '',
	searchParamName: 'searchLine',

	nodeAssociated: true,
	expandColumnKey: undefined,
	expandDefaultAll: true,
	expandLazyLoad: false,
	expandParentKey: 'parentId',
};
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ setDataStore: setDataStore}, dispatch);

export default connect(null, mapDispatchToProps)(Select);
