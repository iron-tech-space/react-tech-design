import React from 'react';
import PropTypes from 'prop-types';
import {getObjectExcludedProps} from '../utils/baseUtils';
import Form from './Form';
import {Modal} from 'antd';

const excludeProps = ['type', 'initialValues', 'form'];

const FormModal = props => {

    const {
        modal,
        selectedRow,
        visible,
        setVisible,
        saveRow,
    } = props;

    const getDefaultFooterProps = () => {

        let okText = '';
        let cancelText = '';
        let modalTitle = '';

        switch (modal.type) {
            case 'addOnServer':
            case 'addGroupOnServer':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Сохранить на сервере';
                break;
            case 'addOnLocal':
            case 'addGroupOnLocal':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Сохранить локально';
                break;
            case 'editOnServer':
            case 'editGroupOnServer':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Измененить на сервере';
                break;
            case 'editOnLocal':
            case 'editGroupOnLocal':
                okText = 'Сохранить';
                cancelText = 'Отмена';
                modalTitle = 'Изменение локально';
                break;
            case 'select':
                okText = 'Добавить';
                cancelText = 'Отмена';
                modalTitle = 'Выбор';
                break;
            case 'viewGroup':
            case 'viewObject':
                okText = 'Закрыть';
                modalTitle = 'Просмотр';
                break;
            default: break;
        }

        if(modal.okText)
            okText = modal.okText;

        if(modal.cancelText)
            cancelText = modal.cancelText;

        if(modal.title)
            modalTitle = modal.title;

        return {okText, cancelText, title: modalTitle, okType: 'primary'}
    };

    let modalProps = { ...getDefaultFooterProps(), ...getObjectExcludedProps(modal, excludeProps) };

    const onFinish = values => {
        // console.log('FormModal Success:', values, selectedRow);
        let saveObj = {};
        if(modal.type.startsWith('add'))
            saveObj = {...values};
        else
            saveObj = {...selectedRow, ...values};

        saveRow({type: modal.type, row: saveObj, requestSaveRow: modal.requestSaveRow});

        if (modalProps.onOk) modalProps.onOk(values);
        if (modalProps.onFinish) modalProps.onFinish(values);
    };

    const onFinishFailed = errorInfo => {
        // console.log('FormModal Failed:', errorInfo);
        console.error("FormModal fields failed: ", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    const _onCancelHandler = (e) => {
        // setVisibleModals({ ...visibleModals, [modal.type]: false });
        // form.resetFields();
        setVisible(modal.type, false);
        if (modalProps.onCancel) modalProps.onCancel(e)
    };

    const _onLoadInitData = (callBack) => {
        // console.log("Modal => loadInitData", selectedRow);
        formConfig.loadInitData(callBack, selectedRow)
    }

    const defaultFooter = [
        {
            componentType: 'Item',
            child: {
                componentType: 'Button',
                label: modalProps.cancelText,
                className: 'mr-8',
                onClick: _onCancelHandler,
                ...modalProps.cancelButtonProps
            }
        },
        {
            componentType: 'Item',
            child: {
                componentType: 'Button',
                label: modalProps.okText,
                type: modalProps.okType,
                htmlType: 'submit',
                ...modalProps.okButtonProps
            }
        }
    ];

    const formConfig =  {
        footer: defaultFooter,
        ...modal.form
    };
    return (
        <Modal
            {...modalProps}
            centered
            destroyOnClose
            visible={visible}
            onCancel={_onCancelHandler}
            bodyStyle={{padding: 0, ...modalProps.bodyStyle}}
            footer={null}
        >
            <Form
                {...formConfig}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                loadInitData={_onLoadInitData}
            />
        </Modal>
    )
};

FormModal.propTypes = {
    /** Объект модального окна */
    modal: PropTypes.object,

    /** Выделенная строка таблицы */
    selectedRow: PropTypes.object,

    /** Состояние видимости модалки */
    visible: PropTypes.bool,

    /** Задание состояния видимости модалки */
    setVisible: PropTypes.func,

    /** CallBack функция для сохранения данных */
    saveRow: PropTypes.func,
};

export default FormModal;
