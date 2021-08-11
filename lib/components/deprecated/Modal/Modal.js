import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/notification/style";
import _notification from "antd/es/notification";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormModal from "../Form/FormModal";

import { notificationError } from "../../utils/baseUtils";
import objectPath from "object-path";
import { setDataStore } from "../../../redux/rtd.actions";

var Modal = function Modal(props) {
    var buttonProps = props.buttonProps,
        modalConfig = props.modalConfig,
        modalData = props.modalData,
        dispatchPath = props.dispatchPath;

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

    var subscribe = props.subscribe ? props.subscribe : {};

    var setModalData = function setModalData(value) {
        // console.log("setModalData: ", value);
        _setModalData && _setModalData(value);
    };

    useEffect(function () {
        _setModalData(modalData);
    }, []);

    /** Подписка на изменение props[subscribe.name] в сторе */
    useEffect(function () {
        if (subscribe.name) {
            // console.log("Modal => subscribe: ", props[subscribe.name]);
            subscribe.onChange && subscribe.onChange({ value: props[subscribe.name], setModalData: setModalData, setButtonProps: setButtonProps });
        }
        // console.log("Change Props[2]: ", props.subscribeЗф);
    }, [props[subscribe.name]]);

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

        dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, row);

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
            _Button,
            _extends({
                type: "primary"
            }, buttonProps, _buttonProps, {
                onClick: _onOpenModal
            }),
            buttonProps && buttonProps.label
        ),
        React.createElement(FormModal, {
            modal: modalConfig,
            selectedRow: _modalData,
            visible: visible,
            setVisible: _onCloseModal,
            saveRow: _onSaveRow
        })
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
    dispatchPath: PropTypes.string,

    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.object
};

var mapStateToProps = function mapStateToProps(store, ownProps) {
    var subscribe = ownProps.subscribe;

    if (subscribe) {
        var name = subscribe.name,
            path = subscribe.path;

        if (name && path) return _defineProperty({}, name, objectPath.get(store, path));
    }
    return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDateStore: setDataStore }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);