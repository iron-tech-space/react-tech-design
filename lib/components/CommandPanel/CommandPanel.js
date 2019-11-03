import 'antd/es/input/style';
import _Input from 'antd/es/input';
import 'antd/es/popconfirm/style';
import _Popconfirm from 'antd/es/popconfirm';
import 'antd/es/tooltip/style';
import _Tooltip from 'antd/es/tooltip';
import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';
import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../utils/baseUtils';

import { PlusOutlined, CopyOutlined, FolderAddOutlined, DeleteOutlined, EditOutlined, ArrowUpOutlined, ArrowDownOutlined, SettingOutlined, FilterOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
	    disabledElements = props.disabledElements,
	    leftCustomSideElement = props.leftCustomSideElement,
	    centerCustomSideElement = props.centerCustomSideElement,
	    rightCustomSideElement = props.rightCustomSideElement;


	var _onClickDelete = function _onClickDelete(event) {
		if (deleteConfirmType === 'Modal') {
			deleteButtonModalConfirm();
		} else {
			onClickDelete(event);
		}
	};

	var deleteButton = function deleteButton(withOnClick) {
		return React.createElement(
			_Tooltip,
			{ title: '\u0423\u0434\u0430\u043B\u0438\u0442\u044C' },
			React.createElement(
				'button',
				{
					disabled: disabledElements.includes('delete'),
					onClick: withOnClick ? _onClickDelete : null
				},
				React.createElement(DeleteOutlined, null)
			)
		);
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
			deleteButton(false)
		);
	};

	function deleteButtonModalConfirm() {
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
	}

	return React.createElement(
		React.Fragment,
		null,
		showElements.length || leftCustomSideElement || centerCustomSideElement || rightCustomSideElement ? React.createElement(
			'div',
			{
				className: 'command-panel-container border-' + borderStyle
			},
			React.createElement(
				'div',
				{ className: 'left-system-side' },
				showElements.includes('add') ? React.createElement(
					_Tooltip,
					{ title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('add'),
							onClick: onClickAdd
						},
						React.createElement(PlusOutlined, null)
					)
				) : null,
				showElements.includes('addAsCopy') ? React.createElement(
					_Tooltip,
					{ title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('addAsCopy'),
							onClick: onClickAddAsCopy
						},
						React.createElement(CopyOutlined, null)
					)
				) : null,
				showElements.includes('addGroup') ? React.createElement(
					_Tooltip,
					{ title: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0433\u0440\u0443\u043F\u043F\u0443' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('addGroup'),
							onClick: onClickAddGroup
						},
						React.createElement(FolderAddOutlined, null)
					)
				) : null,
				showElements.includes('edit') ? React.createElement(
					_Tooltip,
					{ title: '\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('edit'),
							onClick: onClickEdit
						},
						React.createElement(EditOutlined, null)
					)
				) : null,
				showElements.includes('delete') ? deleteConfirm ? deleteConfirmType === 'Popup' ? deleteButtonPopupConfirm() : deleteButton(true) : deleteButton(true) : null,
				showElements.includes('up') ? React.createElement(
					_Tooltip,
					{ title: '\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('up'),
							onClick: onClickUp
						},
						React.createElement(ArrowUpOutlined, null)
					)
				) : null,
				showElements.includes('down') ? React.createElement(
					_Tooltip,
					{ title: '\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437' },
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('down'),
							onClick: onClickDown
						},
						React.createElement(ArrowDownOutlined, null)
					)
				) : null
			),
			React.createElement(
				'div',
				{ className: 'left-custom-side' },
				leftCustomSideElement
			),
			React.createElement(
				'div',
				{ className: 'center-custom-side' },
				centerCustomSideElement
			),
			React.createElement(
				'div',
				{ className: 'right-custom-side' },
				rightCustomSideElement
			),
			React.createElement(
				'div',
				{ className: 'right-system-side' },
				showElements.includes('search') ? React.createElement(_Input.Search, {
					disabled: disabledElements.includes('search'),
					defaultValue: defaultValueSearch,
					size: 'small',
					placeholder: '\u041F\u043E\u0438\u0441\u043A',
					onSearch: onSearch,
					className: 'search'
				}) : null,
				showElements.includes('settings') ? React.createElement(
					_Tooltip,
					{
						title: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0442\u0430\u0431\u043B\u0438\u0446\u044B',
						placement: 'topRight'
					},
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('settings'),
							onClick: function onClick() {}
						},
						React.createElement(SettingOutlined, null)
					)
				) : null,
				showElements.includes('filter') ? React.createElement(
					_Tooltip,
					{
						title: '\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0444\u0438\u043B\u044C\u0442\u0440\u043E\u0432',
						placement: 'topRight'
					},
					React.createElement(
						'button',
						{
							disabled: disabledElements.includes('filter'),
							onClick: function onClick() {}
						},
						React.createElement(FilterOutlined, null)
					)
				) : null
			)
		) : null
	);
};

CommandPanel.propTypes = {
	/** Центральный кастомный элемент командной панели */
	centerCustomSideElement: PropTypes.element,

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
	leftCustomSideElement: PropTypes.element,

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
	rightCustomSideElement: PropTypes.element,

	/** Массив элементов командной панели, которые надо отобразить
     ['add', 'addAsCopy', 'addGroup', 'delete', 'edit', 'up', 'down', 'search', 'settings', 'filter'] */
	showElements: PropTypes.arrayOf(PropTypes.string)
};

CommandPanel.defaultProps = {
	centerCustomSideElement: undefined,
	borderStyle: 'bottom',
	defaultValueSearch: undefined,
	deleteConfirm: true,
	deleteConfirmType: 'Modal',
	deleteConfirmTitle: 'Подтвержение удаления',
	deleteConfirmDescription: 'Вы действительно хотите удалить?',
	disabledElements: [],
	leftCustomSideElement: undefined,
	onClickAdd: noop,
	onClickAddAsCopy: noop,
	onClickAddGroup: noop,
	onClickDelete: noop,
	onClickEdit: noop,
	onClickUp: noop,
	onClickDown: noop,
	onSearch: noop,
	rightCustomSideElement: undefined,
	showElements: []
};
export default CommandPanel;