import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import PropTypes from 'prop-types';
import { getObjectExcludedProps } from '../utils/baseUtils';
import Form from './Form';


var excludeProps = ['type', 'initialValues', 'form'];

var FormModal = function FormModal(props) {
    var modal = props.modal,
        selectedRow = props.selectedRow,
        visible = props.visible,
        setVisible = props.setVisible,
        saveRow = props.saveRow;


    var getDefaultFooterProps = function getDefaultFooterProps() {

        var okText = '';
        var cancelText = '';
        var modalTitle = '';

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
            default:
                break;
        }

        if (modal.okText) okText = modal.okText;

        if (modal.cancelText) cancelText = modal.cancelText;

        if (modal.title) modalTitle = modal.title;

        return { okText: okText, cancelText: cancelText, title: modalTitle, okType: 'primary' };
    };

    var modalProps = _extends({}, getDefaultFooterProps(), getObjectExcludedProps(modal, excludeProps));

    var onFinish = function onFinish(values) {
        // console.log('FormModal Success:', values, selectedRow);
        var saveObj = {};
        if (modal.type.startsWith('add')) saveObj = _extends({}, values);else saveObj = _extends({}, selectedRow, values);

        saveRow({ type: modal.type, row: saveObj, requestSaveRow: modal.requestSaveRow });

        if (modalProps.onOk) modalProps.onOk(values);
        if (modalProps.onFinish) modalProps.onFinish(values);
    };

    var onFinishFailed = function onFinishFailed(errorInfo) {
        // console.log('FormModal Failed:', errorInfo);
        console.error("FormModal fields failed: ", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    var _onCancelHandler = function _onCancelHandler(e) {
        // setVisibleModals({ ...visibleModals, [modal.type]: false });
        // form.resetFields();
        setVisible(modal.type, false);
        if (modalProps.onCancel) modalProps.onCancel(e);
    };

    var _onLoadInitData = function _onLoadInitData(callBack) {
        // console.log("Modal => loadInitData", selectedRow);
        formConfig.loadInitData(callBack, selectedRow);
    };

    var defaultFooter = [{
        componentType: 'Item',
        child: _extends({
            componentType: 'Button',
            label: modalProps.cancelText,
            className: 'mr-8',
            onClick: _onCancelHandler
        }, modalProps.cancelButtonProps)
    }, {
        componentType: 'Item',
        child: _extends({
            componentType: 'Button',
            label: modalProps.okText,
            type: modalProps.okType,
            htmlType: 'submit'
        }, modalProps.okButtonProps)
    }];

    var formConfig = _extends({
        footer: defaultFooter,
        loadInitData: function loadInitData(callBack, row) {
            return callBack(row);
        }
    }, modal.form);
    return React.createElement(
        _Modal,
        _extends({}, modalProps, {
            centered: true,
            destroyOnClose: true,
            visible: visible,
            onCancel: _onCancelHandler,
            bodyStyle: _extends({ padding: 0 }, modalProps.bodyStyle),
            footer: null
        }),
        React.createElement(
            Form,
            _extends({}, formConfig, {
                onFinish: onFinish,
                onFinishFailed: onFinishFailed,
                loadInitData: _onLoadInitData
            }),
            props.children
        )
    );
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
    saveRow: PropTypes.func
};

export default FormModal;