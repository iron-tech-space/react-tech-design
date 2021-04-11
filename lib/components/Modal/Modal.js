import "antd/es/modal/style";
import _Modal from "antd/es/modal";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/notification/style";
import _notification from "antd/es/notification";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { notificationError, dispatchToStore, useMounted, getObjectExcludedProps } from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import Form from "../Form/Form";

var excludeProps = ["buttonProps", "toolTipProps", "modalConfig", "modalData", "subscribe", "dispatch"];
var serverModalTypes = ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'];
var localModalTypes = ['addOnLocal', 'addGroupOnLocal', 'editOnLocal', 'editGroupOnLocal'];
var allModalTypes = [].concat(serverModalTypes, localModalTypes, ['select', 'viewGroup', 'viewObject']);

var defaultProps = {
    subscribe: [],
    dispatch: {}
};

var getDefaultFooterProps = function getDefaultFooterProps(modal) {

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

/**
 * Компонент модального окна
 */
var Modal = function Modal(props) {
    var buttonProps = props.buttonProps,
        toolTipProps = props.toolTipProps,
        modalConfig = props.modalConfig,
        modalData = props.modalData,
        subscribe = props.subscribe,
        dispatch = props.dispatch;

    var modalProps = _extends({}, getDefaultFooterProps(modalConfig), getObjectExcludedProps(modalConfig, excludeProps));

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        visible = _useState2[0],
        setVisible = _useState2[1];

    var _useState3 = useState({}),
        _useState4 = _slicedToArray(_useState3, 2),
        _modalData = _useState4[0],
        _setModalData = _useState4[1];

    var _useState5 = useState({}),
        _useState6 = _slicedToArray(_useState5, 2),
        _buttonProps = _useState6[0],
        setButtonProps = _useState6[1];

    var isMounted = useMounted();

    useEffect(function () {
        _setModalData(modalData);
    }, []);

    /** Подписка на изменение props[subscribe.name] в сторе */
    subscribe.map(function (item) {
        return useEffect(function () {
            // if(!isMounted && !item.name)
            //     return;
            if ((item.withMount || isMounted) && item.name) {
                // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                item.onChange && item.onChange({
                    value: props[item.name],
                    extraData: props[item.name + "ExtraData"],
                    setModalData: setModalData,
                    setButtonProps: setButtonProps,
                    openModal: _onOpenModal,
                    closeModal: _onCloseModal
                });
            }
            // console.log("Change Props[2]: ", props.subscribeЗф);
        }, [props[item.name]]);
    });

    var setModalData = function setModalData(value) {
        return _setModalData && _setModalData(value);
    };
    var _onOpenModal = function _onOpenModal() {
        return setVisible(true);
    };
    var _onCloseModal = function _onCloseModal() {
        return setVisible(false);
    };

    var onFinishHandler = function onFinishHandler(values) {
        //} {type, row, requestSaveRow}) => {
        // console.log("Modal Events => before dispatchToStore: ", dispatch);

        var saveObj = void 0;
        if (modalProps.type.startsWith('add')) saveObj = _extends({}, values);else saveObj = _extends({}, _modalData, values);

        dispatchToStore({ dispatch: dispatch, setDateStore: props.setDateStore, value: saveObj });

        if (modalProps.requestSaveRow && serverModalTypes.includes(modalProps.type)) {
            var method = modalProps.type === 'addOnServer' || modalProps.type === 'addGroupOnServer' ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, method, row, _modalData);
            modalProps.requestSaveRow({
                method: method,
                data: saveObj
            }).then(function (response) {
                _notification.success({
                    message: 'Сохранение прошло успешно'
                });
                modalProps.onOk && modalProps.onOk(values, response.data);
                modalProps.onFinish && modalProps.onFinish(values, response.data);
                _onCloseModal();
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else _onCloseModal();
    };

    var onFinishFailedHandler = function onFinishFailedHandler(errorInfo) {
        // console.log('FormModal Failed:', errorInfo);
        console.error("FormModal fields failed: ", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    var loadInitDataHandler = function loadInitDataHandler(callBack) {
        return formConfig.loadInitData(callBack, _modalData);
    };

    var _onCancelHandler = function _onCancelHandler(e) {
        // setVisibleModals({ ...visibleModals, [modal.type]: false });
        // form.resetFields();
        _onCloseModal();
        if (modalProps.onCancel) modalProps.onCancel(e);
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
    }, modalProps.form);

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            _Tooltip,
            toolTipProps,
            React.createElement(
                _Button,
                _extends({
                    type: "primary"
                }, buttonProps, _buttonProps, {
                    onClick: _onOpenModal
                }),
                buttonProps && buttonProps.label
            )
        ),
        React.createElement(
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
                    onFinish: onFinishHandler,
                    onFinishFailed: onFinishFailedHandler,
                    loadInitData: loadInitDataHandler
                }),
                props.children
            )
        )
    );
};

Modal.propTypes = {

    /** Свойства [Button](https://ant.design/components/button/) из Ant Design
     * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
    buttonProps: PropTypes.object,

    /** Объект модального окна. Стандартная конфигурация. */
    modalConfig: PropTypes.shape({
        /** Тип модального окна */
        type: PropTypes.oneOf(allModalTypes),

        /** Ссылка на функцию сохранения данных */
        requestSaveRow: PropTypes.func,

        /** Пропсы формы.
         * Если верстка через конфиги, то пропс body обязателен */
        form: PropTypes.object
    }),

    /** Данные для модального окна */
    modalData: PropTypes.object,

    /** Путь в сторе куда класть данных окна после закрытия */
    dispatch: PropTypes.object,

    /** Объект для подписки на изменения в STORE.
     * Параметры в `onChange`:
     * * `value`: значение за которым ведется наблюдение,
     * * `extraData`: дополнительные данные, передаваемые при срабатывании события
     * * `setModalData`: функция задания объекта формы
     * * `setButtonProps`: функция задания пропсов кнопке
     * * `openModal`: функция открытия модального окна
     * * `closeModal`: функция закрытия модального окна */
    subscribe: PropTypes.arrayOf(PropTypes.object)
};

Modal.defaultProps = defaultProps;

var mapStateToProps = function mapStateToProps(store, ownProps) {
    var subscribe = ownProps.subscribe;

    var state = {};
    if (subscribe && subscribe.length > 0) {
        subscribe.forEach(function (item) {
            var name = item.name,
                path = item.path,
                extraData = item.extraData;

            if (name && path) state[name] = objectPath.get(store, path);
            if (name && extraData) state[name + "ExtraData"] = objectPath.get(store, extraData);
        });
    }
    return state;
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);