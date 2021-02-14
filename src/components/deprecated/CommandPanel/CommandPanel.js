import React from 'react';
import PropTypes from 'prop-types';
import {noop} from '../../utils/baseUtils';
import {rtPrefix} from '../../utils/variables';
import {Input, Tooltip, Popconfirm, Modal, Button} from 'antd';
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
import FormItems from "../Form/FormItems";
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
        systemBtnProps,
		disabledElements,
		leftCustomSideElement,
		centerCustomSideElement,
		rightCustomSideElement,
	} = props;

    const defaultSystemBtnProps = {
        add: {
            tooltip: 'Добавить',
            onClick: onClickAdd,
            icon: <PlusOutlined />
        },
        addAsCopy: {
            tooltip: 'Добавить копированием',
            onClick: onClickAddAsCopy,
            icon: <CopyOutlined />
        },
        addGroup: {
            tooltip: 'Добавить группу',
            onClick: onClickAddGroup,
            icon: <FolderAddOutlined />
        },
        edit: {
            tooltip: 'Изменить',
            onClick: onClickEdit,
            icon: <EditOutlined />
        },
        delete: {
            tooltip: 'Удалить',
            icon: <DeleteOutlined />
        },
        up: {
            tooltip: 'Переместить вверх',
            onClick: onClickUp,
            icon: <ArrowUpOutlined />
        },
        down: {
            tooltip: 'Переместить вниз',
            onClick: onClickDown,
            icon: <ArrowDownOutlined />
        },
		search: {
			placeholder: 'Поиск',
			onSearch: onSearch,
		},
        settings: {
            tooltip: 'Настройки таблицы',
            tooltipPlacement: 'topRight',
            onClick: () => {},
            icon: <SettingOutlined />
        },
        filter: {
            tooltip: 'Настройки фильтров',
            tooltipPlacement: 'topRight',
            onClick: () => {},
            icon: <FilterOutlined />
        }
    };

	const _onClickDelete = (event) => {
		if (deleteConfirmType === 'Modal') {
			deleteButtonModalConfirm();
		} else {
			onClickDelete(event);
		}
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
				{renderDeleteBtn(false)}
			</Popconfirm>
		);
	};

    const deleteButtonModalConfirm = () => {
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
	};

    const renderDeleteBtn = (withOnClick) => {
        const genProps = {...defaultSystemBtnProps['all'], ...systemBtnProps['all']};
        const btnProps = {...defaultSystemBtnProps['delete'], ...systemBtnProps['delete']};

        return (
            <Tooltip title={btnProps.tooltip}>
                <Button
                    {...genProps}
                    className={`${rtPrefix}-btn`}
                    icon={btnProps.icon}
                    onClick={withOnClick ? _onClickDelete : null}
                    disabled={disabledElements.includes('delete')}
                />
            </Tooltip>
        );
    };

    const renderBtn = (type) => {
        const genProps = {...defaultSystemBtnProps['all'], ...systemBtnProps['all']};
        const btnProps = {...defaultSystemBtnProps[type], ...systemBtnProps[type]};

        if(showElements.includes(type)) {
            if(btnProps.render)
                return btnProps.render({
                    disabled: disabledElements.includes(type),
                    onClick: btnProps.onClick,
					onSearch: btnProps.onSearch
				});
             else
             	if (type === 'search')
					return (
						<Input.Search
							disabled={disabledElements.includes(type)}
							defaultValue={defaultValueSearch}
							placeholder={btnProps.placeholder}
							onSearch={btnProps.onSearch}
							className={'search'}
						/>
					);
				else
					return (
						<Tooltip title={btnProps.tooltip} placement={btnProps.tooltipPlacement ? btnProps.tooltipPlacement : 'top'}>
							<Button
								{...genProps}
								className={`${rtPrefix}-btn`}
								icon={btnProps.icon}
								onClick={btnProps.onClick}
								disabled={disabledElements.includes(type)}
							/>
						</Tooltip>
					)
        }
        else
            return null
    };

	return (
		<React.Fragment>
			{showElements.length ||
			leftCustomSideElement ||
			centerCustomSideElement ||
			rightCustomSideElement ? (
				<div
					className={`${rtPrefix}-command-panel border-${borderStyle}`}
				>
					<div className={'left-system-side'}>
                        {renderBtn('add')}
                        {renderBtn('addAsCopy')}
                        {renderBtn('addGroup')}
                        {renderBtn('edit')}

						{showElements.includes('delete')
							? deleteConfirm
								? deleteConfirmType === 'Popup'
									? deleteButtonPopupConfirm()
									: renderDeleteBtn(true)
								: renderDeleteBtn(true)
							: null}

                        {renderBtn('up')}
                        {renderBtn('down')}
					</div>
					<div className={'left-custom-side'}>
						{leftCustomSideElement ? <FormItems items={leftCustomSideElement} /> : null}
					</div>
					<div className={'center-custom-side'}>
						{centerCustomSideElement ? <FormItems items={centerCustomSideElement} /> : null}
					</div>
					<div className={'right-custom-side'}>
						{rightCustomSideElement ? <FormItems items={rightCustomSideElement} /> : null}
					</div>
					<div className={'right-system-side'}>
						{renderBtn('search')}
                        {renderBtn('settings')}
                        {renderBtn('filter')}
					</div>
				</div>
			) : null}
		</React.Fragment>
	);
};

CommandPanel.propTypes = {
	/** Центральный кастомный элемент командной панели */
	centerCustomSideElement: PropTypes.arrayOf(PropTypes.object), // PropTypes.element,

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
    systemBtnProps: {},
};
export default CommandPanel;
