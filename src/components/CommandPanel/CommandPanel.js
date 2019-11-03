import React from 'react';
import PropTypes from 'prop-types';
import {noop} from '../utils/baseUtils';
import {Input, Tooltip, Popconfirm, Modal} from 'antd';
import {
	PlusOutlined,
	CopyOutlined,
	FolderAddOutlined,
	DeleteOutlined,
	EditOutlined,
	ArrowUpOutlined,
	ArrowDownOutlined,
	SettingOutlined,
	FilterOutlined,
	ExclamationCircleOutlined,
} from '@ant-design/icons';
const {confirm} = Modal;

const CommandPanel = (props) => {
	const {
		borderStyle,
		defaultValueSearch,
		deleteConfirm,
		deleteConfirmType,
		deleteConfirmTitle,
		deleteConfirmDescription,
		onClickAdd,
		onClickAddAsCopy,
		onClickAddGroup,
		onClickDelete,
		onClickEdit,
		onClickUp,
		onClickDown,
		onSearch,
		showElements,
		disabledElements,
		leftCustomSideElement,
		centerCustomSideElement,
		rightCustomSideElement,
	} = props;

	const _onClickDelete = (event) => {
		if (deleteConfirmType === 'Modal') {
			deleteButtonModalConfirm();
		} else {
			onClickDelete(event);
		}
	};

	const deleteButton = (withOnClick) => {
		return (
			<Tooltip title='Удалить'>
				<button
					disabled={disabledElements.includes('delete')}
					onClick={withOnClick ? _onClickDelete : null}
				>
					<DeleteOutlined />
				</button>
			</Tooltip>
		);
	};

	const deleteButtonPopupConfirm = () => {
		return (
			<Popconfirm
				placement='top'
				title={deleteConfirmDescription}
				onConfirm={onClickDelete}
				okText='Да'
				cancelText='Нет'
			>
				{deleteButton(false)}
			</Popconfirm>
		);
	};

	function deleteButtonModalConfirm() {
		confirm({
			title: deleteConfirmTitle,
			icon: <ExclamationCircleOutlined />,
			content: deleteConfirmDescription,
			centered: true,
			okText: 'Ок',
			cancelText: 'Отмена',
			onOk() {
				onClickDelete();
			},
		});
	}

	return (
		<React.Fragment>
			{showElements.length ||
			leftCustomSideElement ||
			centerCustomSideElement ||
			rightCustomSideElement ? (
				<div
					className={'command-panel-container border-' + borderStyle}
				>
					<div className={'left-system-side'}>
						{showElements.includes('add') ? (
							<Tooltip title='Добавить'>
								<button
									disabled={disabledElements.includes('add')}
									onClick={onClickAdd}
								>
									<PlusOutlined />
								</button>
							</Tooltip>
						) : null}

						{showElements.includes('addAsCopy') ? (
							<Tooltip title='Добавить копированием'>
								<button
									disabled={disabledElements.includes(
										'addAsCopy'
									)}
									onClick={onClickAddAsCopy}
								>
									<CopyOutlined />
								</button>
							</Tooltip>
						) : null}

						{showElements.includes('addGroup') ? (
							<Tooltip title='Добавить группу'>
								<button
									disabled={disabledElements.includes(
										'addGroup'
									)}
									onClick={onClickAddGroup}
								>
									<FolderAddOutlined />
								</button>
							</Tooltip>
						) : null}

						{showElements.includes('edit') ? (
							<Tooltip title='Изменить'>
								<button
									disabled={disabledElements.includes('edit')}
									onClick={onClickEdit}
								>
									<EditOutlined />
								</button>
							</Tooltip>
						) : null}

						{showElements.includes('delete')
							? deleteConfirm
								? deleteConfirmType === 'Popup'
									? deleteButtonPopupConfirm()
									: deleteButton(true)
								: deleteButton(true)
							: null}

						{showElements.includes('up') ? (
							<Tooltip title='Переместить вверх'>
								<button
									disabled={disabledElements.includes('up')}
									onClick={onClickUp}
								>
									<ArrowUpOutlined />
								</button>
							</Tooltip>
						) : null}

						{showElements.includes('down') ? (
							<Tooltip title='Переместить вниз'>
								<button
									disabled={disabledElements.includes('down')}
									onClick={onClickDown}
								>
									<ArrowDownOutlined />
								</button>
							</Tooltip>
						) : null}
					</div>
					<div className={'left-custom-side'}>
						{leftCustomSideElement}
					</div>
					<div className={'center-custom-side'}>
						{centerCustomSideElement}
					</div>
					<div className={'right-custom-side'}>
						{rightCustomSideElement}
					</div>
					<div className={'right-system-side'}>
						{showElements.includes('search') ? (
							<Input.Search
								disabled={disabledElements.includes('search')}
								defaultValue={defaultValueSearch}
								size='small'
								placeholder='Поиск'
								onSearch={onSearch}
								className={'search'}
							/>
						) : null}
						{showElements.includes('settings') ? (
							<Tooltip
								title='Настройки таблицы'
								placement='topRight'
							>
								<button
									disabled={disabledElements.includes(
										'settings'
									)}
									onClick={() => {}}
								>
									<SettingOutlined />
								</button>
							</Tooltip>
						) : null}

						{showElements.includes('filter') ? (
							<Tooltip
								title='Настройки фильтров'
								placement='topRight'
							>
								<button
									disabled={disabledElements.includes(
										'filter'
									)}
									onClick={() => {}}
								>
									<FilterOutlined />
								</button>
							</Tooltip>
						) : null}
					</div>
				</div>
			) : null}
		</React.Fragment>
	);
};

CommandPanel.propTypes = {
	/** Центральный кастомный элемент командной панели */
	centerCustomSideElement: PropTypes.element,

	/** Тип бордера панели (по умолчанию 'bottom')
	 * ['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right'] */
	borderStyle: PropTypes.oneOf([
		'all',
		'none',
		'top',
		'left',
		'bottom',
		'right',
		'top-bottom',
		'left-right',
	]),

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
	showElements: PropTypes.arrayOf(PropTypes.string),
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
	showElements: [],
};
export default CommandPanel;
