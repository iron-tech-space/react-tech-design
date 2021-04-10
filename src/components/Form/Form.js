import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormItems from "./FormItems";
import { Form as AntForm, notification } from "antd";
import { dispatchToStore, getObjectExcludedProps, noop, notificationError } from "../utils/baseUtils";
import { rtPrefix } from "../utils/variables";
import { setDateStore } from "../../redux/rtd.actions";

const excludeProps = [
    "dispatch",
    "setDateStore",
    "componentType",
    "noPadding",
    "scrollable",
    "header",
    "body",
    "footer",
    "loadInitData",
    "autoSaveForm",
    "requestSaveForm",
    "methodSaveForm",
    "processBeforeSaveForm"
];

/** Компонент формы */
const Form = (props) => {
    const {
        dispatch,
        setDateStore,
        loadInitData,
        header,
        body,
        footer,
        autoSaveForm,
        requestSaveForm,
        methodSaveForm,
        processBeforeSaveForm
    } = props;

    /** Состояние первоначалной настройки компонента*/
    const [loaded, setLoaded] = useState(false);
    const [antFormProps, setAntFormProps] = useState({});
    const [initFormData, setInitFormData] = useState({});

    useEffect(() => {
        if (!loaded) {
            if (loadInitData !== noop)
                loadInitData(_setInitFormData);
            else
                setLoaded(true);
        }
    }, [loaded]);

    useEffect(() => {
        setAntFormProps(getObjectExcludedProps(props, excludeProps));
        // console.log('antFormProps props => ', getObjectExcludedProps(props, excludeProps));
    }, [props]);


    const _setInitFormData = (data) => {
        // console.log("Form loaded init data => ", data);
        setInitFormData(data);
        setLoaded(true);
    };


    let antForm;
    if (props && props.form) {
        antForm = props.form;
    } else {
        const [form] = AntForm.useForm();
        antForm = form;
    }

    const getBodyCls = () => {
        let cls = [`${rtPrefix}-form-body`];
        props.noPadding && cls.push(`${rtPrefix}-form-body-no-padding`);
        props.scrollable && cls.push(`${rtPrefix}-form-body-scrollable`);
        return cls.join(" ");
    };

    const onFinish = (rawValues) => {
        const values = processBeforeSaveForm ? processBeforeSaveForm(rawValues) : rawValues;
        // console.log(`Success form [${props.name ? props.name : 'no name form'}]: `, values);
        const saveObject = {
            ...initFormData,
            ...values,
            // dateStart: getISO(values['dateStart'])
        };

        // console.group(`Success form [${props.name ? props.name : 'no name form'}]:`);
        // console.log("values: ", values);
        // console.log("saveObject: ", saveObject);
        // console.groupEnd();
        console.log(`Success form [${props.name ? props.name : 'no name form'}]: `, saveObject);
        if (autoSaveForm && requestSaveForm) {
            // const saveObject = {
            //     ...initFormData,
            //     ...values,
            //     // dateStart: getISO(values['dateStart'])
            // };
            requestSaveForm({
                method: methodSaveForm,
                data: saveObject
            })
                .then(response => {
                    notification.success({
                        message: "Сохранение прошло успешно"
                    });
                    props.onFinish && props.onFinish(values);
                })
                .catch(error => notificationError(error, 'Ошибка при сохранении') );
        } else if (props.onFinish)
            props.onFinish(values);
    };

    const onFinishFailed = errorInfo => {
        console.error("Failed:", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    const Header = (header) => <div className={`${rtPrefix}-form-header`}><FormItems items={header}/></div>
    const Footer = (footer) => <div className={`${rtPrefix}-form-footer`}><FormItems items={footer}/></div>

    return (
        <React.Fragment>
            {loaded
                ? <AntForm
                    form={antForm}
                    {...antFormProps}
                    className={`${antFormProps.className} ${rtPrefix}-form`}
                    style={{ ...antFormProps.style, width: '100%', height: '100%' }}
                    initialValues={{ ...antFormProps.initialValues, ...initFormData }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onFieldsChange={(changedFields, allFields) => {
                        const values = antForm.getFieldsValue();
                        // console.log('dispatchToStore => ', dispatch, values);
                        dispatch && dispatchToStore({ dispatch, setDateStore, value: values })}
                    }
                >
                    <React.Fragment>
                        {header ? Header(header) : null}
                        {body ? <div className={getBodyCls()}><FormItems items={body}/></div> : null}
                        {props.children}
                        {footer ? Footer(footer) : null}
                    </React.Fragment>
                </AntForm>
                : null}
        </React.Fragment>
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

    /** Производить ли автоматическое сохранение по параметрам `requestSaveForm` и `methodSaveForm` */
    autoSaveForm: PropTypes.bool,

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
    autoSaveForm: true
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setDateStore: setDateStore}, dispatch);

export default connect(null, mapDispatchToProps)(Form);
