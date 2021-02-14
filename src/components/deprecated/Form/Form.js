import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormItems from "./FormItems";
import { Form as AntForm, notification } from "antd";
import { getObjectExcludedProps, noop, notificationError } from "../../utils/baseUtils";
import { rtPrefix } from "../../utils/variables";

const excludeProps = ["noPadding", "scrollable", "header", "body", "footer", "loadInitData", "autoSaveForm", "requestSaveForm", "methodSaveForm", "processBeforeSaveForm"];


const Form = (props) => {
    const { loadInitData, header, body, footer,
        autoSaveForm, requestSaveForm, methodSaveForm, processBeforeSaveForm } = props;

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
        console.log(`Success form [${props.name ? props.name : 'no name form'}]: `, values);
        if (autoSaveForm && requestSaveForm) {
            const saveObject = {
                ...initFormData,
                ...values,
                // dateStart: getISO(values['dateStart'])
            };
            requestSaveForm({
                method: methodSaveForm,
                data: saveObject
            })
                .then(response => {
                    notification.success({
                        message: "Сохранение прошло успешно"
                    });
                    if (props.onFinish)
                        props.onFinish(values);
                })
                .catch(error => notificationError(error, 'Ошибка при сохранении') );
        } else if (props.onFinish)
            props.onFinish(values);
    };

    const onFinishFailed = errorInfo => {
        console.error("Failed:", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    return (
        <React.Fragment>
            {loaded ?
                <AntForm
                    form={antForm}
                    {...antFormProps}
                    className={`${antFormProps.className} ${rtPrefix}-form`}
                    style={{ ...antFormProps.style, width: '100%', height: '100%' }}
                    initialValues={{ ...antFormProps.initialValues, ...initFormData }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {header ? <div className={`${rtPrefix}-form-header`}><FormItems items={header}/></div> : null}
                    <div className={getBodyCls()}><FormItems items={body}/></div>
                    {footer ? <div className={`${rtPrefix}-form-footer`}><FormItems items={footer}/></div> : null}
                </AntForm>
                : null}
        </React.Fragment>
    );
};

Form.propTypes = {

    /** Не делать отступы у формы от краев блока */
    noPadding: PropTypes.bool,

    /** scrollable
     */
    scrollable: PropTypes.bool,

    /** Массив объектов для шапки формы. Как правило только заголовок. */
    header: PropTypes.arrayOf(PropTypes.object),

    /** Массив объектов для тела формы */
    body: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Массив объектов для подвала формы. Как правило только кнопки "Сохранить" и "Отмена" */
    footer: PropTypes.arrayOf(PropTypes.object),

    /** Ссылка на функцию загрузки значений по умолчанию
     * (callBack) => callBack(initObject) */
    loadInitData: PropTypes.func,

    /** Производить ли автоматическое сохранение по параметрам requestSaveForm и methodSaveForm */
    autoSaveForm: PropTypes.bool,

    /** Запрос для автоматического сохранения формы */
    requestSaveForm: PropTypes.func,

    /** HTTP Метод, передаваемый в запрос сохранения */
    methodSaveForm: PropTypes.string,

    /** Функция обработки перед сохранением формы */
    processBeforeSaveForm: PropTypes.func,
};

Form.defaultProps = {
    noPadding: false,
    scrollable: false,
    loadInitData: noop,
    autoSaveForm: true
};

export default Form;
