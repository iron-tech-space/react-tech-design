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
import { setDataStore } from "../../redux/rtd.actions";
import Form from "../Form/Form";
import { getExtraData, mapDispatchToProps, mapStateToProps } from "../utils/storeUtils";

var excludeProps = ["buttonProps", "toolTipProps", "modalConfig", "modalData", "subscribe", "dispatch"];
var modalTypes = ['save', 'select', 'view'];

var defaultProps = {
    subscribe: [],
    dispatch: {},
    methodSaveForm: 'POST'
};

var getDefaultFooterProps = function getDefaultFooterProps(modal) {

    var okText = '';
    var cancelText = '';
    var modalTitle = '';

    switch (modal.type) {
        case 'save':
            okText = 'Сохранить';
            cancelText = 'Отмена';
            break;
        case 'select':
            okText = 'Добавить';
            cancelText = 'Отмена';
            break;
        case 'view':
            okText = 'Закрыть';
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
                //     let extraData = {};
                //     if (item.extraData) {
                //         if (typeof item.extraData === 'object')
                //             Object.keys(item.extraData).forEach((key) => extraData[key] = props[`${item.name}.extraData.${key}`]);
                //         else
                //             extraData = props[`${item.name}ExtraData`];
                //     }
                item.onChange && item.onChange({
                    value: props[item.name],
                    extraData: getExtraData(item, props), //extraData,
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
        var saveObj = _extends({}, _modalData, values);

        if (modalProps.requestSaveForm && modalProps.methodSaveForm) {
            // console.log("Modal Events => type: ", type, method, row, _modalData);
            modalProps.requestSaveForm({
                method: modalProps.methodSaveForm,
                data: saveObj
            }).then(function (response) {
                _notification.success({
                    message: 'Сохранение прошло успешно'
                });
                modalProps.onOk && modalProps.onOk(saveObj, response.data);
                modalProps.onFinish && modalProps.onFinish(saveObj, response.data);
                dispatchToStore({ dispatch: dispatch, setDateStore: props.setDateStore, value: saveObj });
                _onCloseModal();
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else {
            modalProps.onOk && modalProps.onOk(saveObj);
            modalProps.onFinish && modalProps.onFinish(saveObj);
            dispatchToStore({ dispatch: dispatch, setDateStore: props.setDateStore, value: saveObj });
            _onCloseModal();
        }
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
        type: PropTypes.oneOf(modalTypes),

        /** Запрос для автоматического сохранения формы */
        requestSaveForm: PropTypes.func,

        /** HTTP Метод, передаваемый в запрос сохранения */
        methodSaveForm: PropTypes.string,

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
//
// const mapStateToProps = (store, ownProps) => {
//     const {subscribe} = ownProps;
//     let state = {};
//     if(subscribe && subscribe.length > 0){
//         subscribe.forEach(item => {
//             const {name, path, extraData} = item;
//             if(name && path)
//                 state[name] = objectPath.get(store, path);
//             if(name && extraData)
//                 if(typeof extraData === 'object')
//                     Object.keys(extraData).forEach( (key) => state[`${name}.extraData.${key}`] = objectPath.get(store, extraData[key]) );
//                 else
//                     state[`${name}ExtraData`] = objectPath.get(store, extraData);
//         })
//     }
//     return state;
// };
// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators( { setDateStore: setDataStore, }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);