import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/tooltip/style';
import _Tooltip from 'antd/es/tooltip';
import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/popconfirm/style';
import _Popconfirm from 'antd/es/popconfirm';
import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../../utils/baseUtils';
import { rtPrefix } from '../../utils/variables';

import { PlusOutlined, CopyOutlined, FolderAddOutlined, DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined, SettingOutlined, FilterOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import FormItems from "../Form/FormItems";
var confirm = _Modal.confirm;


var CommandPanel = function CommandPanel(props) {
	var borderStyle = props.borderStyle,
	    defaultValueSearch = props.defaultValueSearch,
	    deleteConfirm = props.deleteConfirm,
	    deleteConfirmType = props.deleteConfirmType,
	    deleteConfirmTitle = props.deleteConfirmTitle,
	    deleteConfirmDescription = props.deleteConfirmDescription,
	    onClickAdd = props.onClickAdd,
	    onClickAddAsCopy = props.onClickAddAsCopy,
	    onClickAddGroup = props.onClickAddGroup,
	    onClickDelete = props.onClickDelete,
	    onClickEdit = props.onClickEdit,
	    onClickUp = props.onClickUp,
	    onClickDown = props.onClickDown,
	    onSearch = props.onSearch,
	    showElements = props.showElements,
	    systemBtnProps = props.systemBtnProps,
	    disabledElements = props.disabledElements,
	    leftCustomSideElement = props.leftCustomSideElement,
	    centerCustomSideElement = props.centerCustomSideElement,
	    rightCustomSideElement = props.rightCustomSideElement;


	var defaultSystemBtnProps = {
		add: {
			tooltip: 'Добавить',
			onClick: onClickAdd,
			icon: React.createElement(PlusOutlined, null)
		},
		addAsCopy: {
			tooltip: 'Добавить копированием',
			onClick: onClickAddAsCopy,
			icon: React.createElement(CopyOutlined, null)
		},
		addGroup: {
			tooltip: 'Добавить группу',
			onClick: onClickAddGroup,
			icon: React.createElement(FolderAddOutlined, null)
		},
		edit: {
			tooltip: 'Изменить',
			onClick: onClickEdit,
			icon: React.createElement(EditOutlined, null)
		},
		delete: {
			tooltip: 'Удалить',
			icon: React.createElement(DeleteOutlined, null)
		},
		up: {
			tooltip: 'Переместить вверх',
			onClick: onClickUp,
			icon: React.createElement(ArrowUpOutlined, null)
		},
		down: {
			tooltip: 'Переместить вниз',
			onClick: onClickDown,
			icon: React.createElement(ArrowDownOutlined, null)
		},
		search: {
			placeholder: 'Поиск',
			onSearch: onSearch
		},
		settings: {
			tooltip: 'Настройки таблицы',
			tooltipPlacement: 'topRight',
			onClick: function onClick() {},
			icon: React.createElement(SettingOutlined, null)
		},
		filter: {
			tooltip: 'Настройки фильтров',
			tooltipPlacement: 'topRight',
			onClick: function onClick() {},
			icon: React.createElement(FilterOutlined, null)
		}
	};

	var _onClickDelete = function _onClickDelete(event) {
		if (deleteConfirmType === 'Modal') {
			deleteButtonModalConfirm();
		} else {
			onClickDelete(event);
		}
	};

	var deleteButtonPopupConfirm = function deleteButtonPopupConfirm() {
		return React.createElement(
			_Popconfirm,
			{
				placement: 'top',
				title: deleteConfirmDescription,
				onConfirm: onClickDelete,
				okText: '\u0414\u0430',
				cancelText: '\u041D\u0435\u0442'
			},
			renderDeleteBtn(false)
		);
	};

	var deleteButtonModalConfirm = function deleteButtonModalConfirm() {
		confirm({
			title: deleteConfirmTitle,
			icon: React.createElement(ExclamationCircleOutlined, null),
			content: deleteConfirmDescription,
			centered: true,
			okText: 'Ок',
			cancelText: 'Отмена',
			onOk: function onOk() {
				onClickDelete();
			}
		});
	};

	var renderDeleteBtn = function renderDeleteBtn(withOnClick) {
		var genProps = _extends({}, defaultSystemBtnProps['all'], systemBtnProps['all']);
		var btnProps = _extends({}, defaultSystemBtnProps['delete'], systemBtnProps['delete']);

		return React.createElement(
			_Tooltip,
			{ title: btnProps.tooltip },
			React.createElement(_Button, _extends({}, genProps, {
				className: rtPrefix + '-btn',
				icon: btnProps.icon,
				onClick: withOnClick ? _onClickDelete : null,
				disabled: disabledElements.includes('delete')
			}))
		);
	};

	var renderBtn = function renderBtn(type) {
		var genProps = _extends({}, defaultSystemBtnProps['all'], systemBtnProps['all']);
		var btnProps = _extends({}, defaultSystemBtnProps[type], systemBtnProps[type]);

		if (showElements.includes(type)) {
			if (btnProps.render) return btnProps.render({
				disabled: disabledElements.includes(type),
				onClick: btnProps.onClick,
				onSearch: btnProps.onSearch
			});else if (type === 'search') return React.createElement(_Input.Search, {
				disabled: disabledElements.includes(type),
				defaultValue: defaultValueSearch,
				placeholder: btnProps.placeholder,
				onSearch: btnProps.onSearch,
				className: 'search'
			});else return React.createElement(
				_Tooltip,
				{ title: btnProps.tooltip, placement: btnProps.tooltipPlacement ? btnProps.tooltipPlacement : 'top' },
				React.createElement(_Button, _extends({}, genProps, {
					className: rtPrefix + '-btn',
					icon: btnProps.icon,
					onClick: btnProps.onClick,
					disabled: disabledElements.includes(type)
				}))
			);
		} else return null;
	};

	return React.createElement(
		React.Fragment,
		null,
		showElements.length || leftCustomSideElement || centerCustomSideElement || rightCustomSideElement ? React.createElement(
			'div',
			{
				className: rtPrefix + '-command-panel border-' + borderStyle
			},
			React.createElement(
				'div',
				{ className: 'left-system-side' },
				renderBtn('add'),
				renderBtn('addAsCopy'),
				renderBtn('addGroup'),
				renderBtn('edit'),
				showElements.includes('delete') ? deleteConfirm ? deleteConfirmType === 'Popup' ? deleteButtonPopupConfirm() : renderDeleteBtn(true) : renderDeleteBtn(true) : null,
				renderBtn('up'),
				renderBtn('down')
			),
			React.createElement(
				'div',
				{ className: 'left-custom-side' },
				leftCustomSideElement ? React.createElement(FormItems, { items: leftCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ className: 'center-custom-side' },
				centerCustomSideElement ? React.createElement(FormItems, { items: centerCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ className: 'right-custom-side' },
				rightCustomSideElement ? React.createElement(FormItems, { items: rightCustomSideElement }) : null
			),
			React.createElement(
				'div',
				{ className: 'right-system-side' },
				renderBtn('search'),
				renderBtn('settings'),
				renderBtn('filter')
			)
		) : null
	);
};

CommandPanel.propTypes = {
	/** Центральный кастомный элемент командной панели */
	centerCustomSideElement: PropTypes.arrayOf(PropTypes.object), // PropTypes.element,

	/** Тип бордера панели (по умолчанию 'bottom')
  * ['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right'] */
	borderStyle: PropTypes.oneOf(['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right']),

	/** Значение по умолчанию для строки поиска */
	defaultValueSearch: PropTypes.string,

	/** Нужно ли делать подтверждение на кнопке удалить */
	deleteConfirm: PropTypes.bool,

	/** Тип подтверждения удаления 'Popup' / 'Modal' */
	deleteConfirmType: PropTypes.oneOf(['Popup', 'Modal']),

	/** Текст подтверждения на удаление элемента */
	deleteConfirmTitle: PropTypes.string,

	/** Текст подтверждения на удаление элемента */
	deleteConfirmDescription: PropTypes.string,

	/** Массив элементов командной панели для блокировки
     ['add', 'addAsCopy', 'addGroup', 'delete', 'edit', 'up', 'down', 'search', 'settings', 'filter'] */
	disabledElements: PropTypes.arrayOf(PropTypes.string),

	/** Левый кастомный элемент командной панели */
	leftCustomSideElement: PropTypes.arrayOf(PropTypes.object),

	/** Событие при нажатии на кнопку "Добавить" */
	onClickAdd: PropTypes.func,

	/** Событие при нажатии на кнопку "Добавить копированием" */
	onClickAddAsCopy: PropTypes.func,

	/** Событие при нажатии на кнопку "Добавить группу" */
	onClickAddGroup: PropTypes.func,

	/** Событие при нажатии на кнопку "Удалить" */
	onClickDelete: PropTypes.func,

	/** Событие при нажатии на кнопку "Переместить вниз" */
	onClickDown: PropTypes.func,

	/** Событие при нажатии на кнопку "Изменить" */
	onClickEdit: PropTypes.func,

	/** Событие при нажатии на кнопку "Переместить вверх" */
	onClickUp: PropTypes.func,

	/** Событие при поиске */
	onSearch: PropTypes.func,

	/** Правый кастомный элемент командной панели */
	rightCustomSideElement: PropTypes.arrayOf(PropTypes.object),

	/** Массив элементов командной панели, которые надо отобразить
     ['add', 'addAsCopy', 'addGroup', 'delete', 'edit', 'up', 'down', 'search', 'settings', 'filter'] */
	showElements: PropTypes.arrayOf(PropTypes.string),

	/** Объект кастомизации системных кнопок
  { [btnType]: { tooltip: <String>, icon: <Icon />, render: ({disabled, onClick}) => <Component /> } } */
	systemBtnProps: PropTypes.object
};

CommandPanel.defaultProps = {
	centerCustomSideElement: null,
	borderStyle: 'bottom',
	defaultValueSearch: undefined,
	deleteConfirm: true,
	deleteConfirmType: 'Modal',
	deleteConfirmTitle: 'Подтвержение удаления',
	deleteConfirmDescription: 'Вы действительно хотите удалить?',
	disabledElements: [],
	leftCustomSideElement: null,
	onClickAdd: noop,
	onClickAddAsCopy: noop,
	onClickAddGroup: noop,
	onClickDelete: noop,
	onClickEdit: noop,
	onClickUp: noop,
	onClickDown: noop,
	onSearch: noop,
	rightCustomSideElement: null,
	showElements: [],
	systemBtnProps: {}
};
export default CommandPanel;