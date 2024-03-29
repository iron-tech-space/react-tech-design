import "antd/es/notification/style";
import _notification from "antd/es/notification";
import "antd/es/form/style";
import _Form from "antd/es/form";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormItems from "./FormItems";

import { dispatchToStore, getObjectExcludedProps, noop, notificationError } from "../utils/baseUtils";
import { rtPrefix } from "../utils/variables";
import { setDataStore } from "../../redux/rtd.actions";

var excludeProps = ["dispatch", "setDataStore", "componentType", "noPadding", "scrollable", "header", "body", "footer", "loadInitData", "requestSaveForm", "methodSaveForm", "processBeforeSaveForm"];

/** Компонент заголовка формы */
export var FormHeader = function FormHeader(props) {
    return React.createElement(
        "div",
        _extends({}, props, { className: rtPrefix + "-form-header " + (props.className || '') }),
        props.children
    );
};

/** Компонент тела формы */
var FormBody = function FormBody(props) {
    var noPadding = props.noPadding,
        scrollable = props.scrollable,
        rest = _objectWithoutProperties(props, ["noPadding", "scrollable"]);

    var cls = [rtPrefix + "-form-body"];
    noPadding && cls.push(rtPrefix + "-form-body-no-padding");
    scrollable && cls.push(rtPrefix + "-form-body-scrollable");
    return React.createElement("div", _extends({}, rest, { className: cls.join(" ") }));
};

/** Компонент подвала формы */
export { FormBody };
export var FormFooter = function FormFooter(props) {
    return React.createElement(
        "div",
        { className: rtPrefix + "-form-footer" },
        props.children
    );
};

/** Компонент формы */
var Form = function Form(props) {
    var dispatch = props.dispatch,
        setDataStore = props.setDataStore,
        loadInitData = props.loadInitData,
        header = props.header,
        body = props.body,
        footer = props.footer,
        requestSaveForm = props.requestSaveForm,
        methodSaveForm = props.methodSaveForm,
        processBeforeSaveForm = props.processBeforeSaveForm;

    /** Состояние первоначалной настройки компонента*/

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        loaded = _useState2[0],
        setLoaded = _useState2[1];

    var _useState3 = useState({}),
        _useState4 = _slicedToArray(_useState3, 2),
        antFormProps = _useState4[0],
        setAntFormProps = _useState4[1];

    var _useState5 = useState({}),
        _useState6 = _slicedToArray(_useState5, 2),
        initFormData = _useState6[0],
        setInitFormData = _useState6[1];

    useEffect(function () {
        if (!loaded) {
            if (loadInitData !== noop) loadInitData(_setInitFormData);else setLoaded(true);
        }
    }, [loaded]);

    useEffect(function () {
        setAntFormProps(getObjectExcludedProps(props, excludeProps));
        // console.log('antFormProps props => ', getObjectExcludedProps(props, excludeProps));
    }, [props]);

    var _setInitFormData = function _setInitFormData(data) {
        // console.log("Form loaded init data => ", data);
        setInitFormData(data);
        setLoaded(true);
    };

    var antForm = void 0;
    if (props && props.form) {
        antForm = props.form;
    } else {
        var _AntForm$useForm = _Form.useForm(),
            _AntForm$useForm2 = _slicedToArray(_AntForm$useForm, 1),
            form = _AntForm$useForm2[0];

        antForm = form;
    }

    var getBodyCls = function getBodyCls() {
        var cls = [rtPrefix + "-form-body"];
        props.noPadding && cls.push(rtPrefix + "-form-body-no-padding");
        props.scrollable && cls.push(rtPrefix + "-form-body-scrollable");
        return cls.join(" ");
    };

    var onFinish = function onFinish(rawValues) {
        var values = processBeforeSaveForm ? processBeforeSaveForm(rawValues) : rawValues;
        // console.log(`Success form [${props.name ? props.name : 'no name form'}]: `, values);
        var saveObject = _extends({}, initFormData, values);
        console.log("Success form [" + (props.name ? props.name : 'no name form') + "]: ", saveObject);
        if (requestSaveForm && methodSaveForm) {
            requestSaveForm({
                method: methodSaveForm,
                data: saveObject
            }).then(function (response) {
                _notification.success({
                    message: "Сохранение прошло успешно"
                });
                props.onFinish && props.onFinish(saveObject, response.data);
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        } else if (props.onFinish) props.onFinish(saveObject);
    };

    var onFinishFailed = function onFinishFailed(errorInfo) {
        console.error("Failed:", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    var Header = function Header(header) {
        return React.createElement(
            "div",
            { className: rtPrefix + "-form-header" },
            React.createElement(FormItems, { items: header })
        );
    };
    var Footer = function Footer(footer) {
        return React.createElement(
            "div",
            { className: rtPrefix + "-form-footer" },
            React.createElement(FormItems, { items: footer })
        );
    };

    return React.createElement(
        React.Fragment,
        null,
        loaded ? React.createElement(
            _Form,
            _extends({
                form: antForm
            }, antFormProps, {
                className: antFormProps.className + " " + rtPrefix + "-form",
                style: _extends({}, antFormProps.style, { width: '100%', height: '100%' }),
                initialValues: _extends({}, antFormProps.initialValues, initFormData),
                onFinish: onFinish,
                onFinishFailed: onFinishFailed,
                onFieldsChange: function onFieldsChange(changedFields, allFields) {
                    var values = _extends({}, initFormData, antForm.getFieldsValue());
                    // console.log('dispatchToStore => ', dispatch, values);
                    dispatch && dispatchToStore({ dispatch: dispatch, setDataStore: setDataStore, value: values });
                }
            }),
            React.createElement(
                React.Fragment,
                null,
                header ? Header(header) : null,
                body ? React.createElement(
                    "div",
                    { className: getBodyCls() },
                    React.createElement(FormItems, { items: body })
                ) : null,
                props.children,
                footer ? Footer(footer) : null
            )
        ) : null
    );
};

Form.propTypes = {

    /** Не делать отступы у формы от краев блока. **Only config Form** */
    noPadding: PropTypes.bool,

    /** Разрешит скролл внтри формы. **Only config Form** */
    scrollable: PropTypes.bool,

    /** Массив объектов для шапки формы. Как правило только заголовок. */
    header: PropTypes.arrayOf(PropTypes.object),

    /** Массив объектов для тела формы */
    body: PropTypes.arrayOf(PropTypes.object),

    /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
    footer: PropTypes.arrayOf(PropTypes.object),

    /** Ссылка на функцию загрузки значений по умолчанию
     * `(callBack) => callBack(initObject)` */
    loadInitData: PropTypes.func,

    /** Запрос для автоматического сохранения формы */
    requestSaveForm: PropTypes.func,

    /** HTTP Метод, передаваемый в запрос сохранения */
    methodSaveForm: PropTypes.string,

    /** Функция обработки перед сохранением формы */
    processBeforeSaveForm: PropTypes.func
};

Form.defaultProps = {
    noPadding: false,
    scrollable: false,
    loadInitData: noop,
    methodSaveForm: 'POST'
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setDataStore: setDataStore }, dispatch);
};

export default connect(null, mapDispatchToProps)(Form);