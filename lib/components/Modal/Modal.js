import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/notification/style";
import _notification from "antd/es/notification";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormModal from "../Form/FormModal";

import { notificationError, dispatchToStore, useMounted, getObjectExcludedProps } from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";

var defaultProps = {
    subscribe: [],
    dispatch: {}
};

var excludeProps = ["buttonProps", "toolTipProps", "modalConfig", "modalData", "subscribe", "dispatch"];

var Modal = function Modal(props) {
    var buttonProps = props.buttonProps,
        toolTipProps = props.toolTipProps,
        modalConfig = props.modalConfig,
        modalData = props.modalData,
        subscribe = props.subscribe,
        dispatch = props.dispatch;

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

    var setModalData = function setModalData(value) {
        // console.log("setModalData: ", value);
        _setModalData && _setModalData(value);
    };

    useEffect(function () {
        _setModalData(modalData);
    }, []);

    /** Подписка на изменение props[subscribe.name] в сторе */
    // useEffect( () => {
    //     if(subscribe.name) {
    //         // console.log("Modal => subscribe: ", props[subscribe.name]);
    //         subscribe.onChange && subscribe.onChange({value: props[subscribe.name], setModalData, setButtonProps});
    //     }
    //     // console.log("Change Props[2]: ", props.subscribeЗф);
    // }, [props[subscribe.name]]);

    /** Подписка на изменение props[subscribe.name] в сторе */
    subscribe.map(function (item) {
        return useEffect(function () {
            if (isMounted && item.name) {
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

    var _onOpenModal = function _onOpenModal() {
        // console.log("Modal => _modalData: ", _modalData);
        setVisible(true);
    };

    var _onCloseModal = function _onCloseModal() {
        setVisible(false);
    };

    var _onSaveRow = function _onSaveRow(_ref) {
        var type = _ref.type,
            row = _ref.row,
            requestSaveRow = _ref.requestSaveRow;

        // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, row);
        // console.log("Modal Events => before dispatchToStore: ", dispatch);
        dispatchToStore({ dispatch: dispatch, setDateStore: props.setDateStore, value: row });

        if (requestSaveRow && ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'].includes(type)) {
            var method = type === 'addOnServer' || type === 'addGroupOnServer' ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, method, row, _modalData);
            requestSaveRow({
                method: method,
                data: row
            }).then(function (response) {
                _notification.success({
                    message: 'Сохранение прошло успешно'
                });
                _onCloseModal();
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else _onCloseModal();
    };

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
            FormModal,
            {
                modal: modalConfig,
                selectedRow: _modalData,
                visible: visible,
                setVisible: _onCloseModal,
                saveRow: _onSaveRow
            },
            props.children
        )
    );
};

Modal.propTypes = {

    /** Свойства [Button](https://ant.design/components/button/) из Ant Design
     * Добавлено свойство `label` с типом `ReactNode` или `string` для формирования контента кнопки*/
    buttonProps: PropTypes.object,

    /** Объект модального окна. Стандартная конфигурация. */
    modalConfig: PropTypes.object,

    /** Данные для модального окна */
    modalData: PropTypes.object,

    /** Путь в сторе куда класть данных окна после закрытия */
    dispatch: PropTypes.object,

    /** Объект для подписки на изменения в STORE */
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