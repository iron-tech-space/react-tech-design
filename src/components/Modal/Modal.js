import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { notification, Button, Tooltip, Modal as AntModal} from "antd";
import { notificationError, dispatchToStore, useMounted, getObjectExcludedProps } from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import Form from "../Form/Form";

const excludeProps = ["buttonProps", "toolTipProps", "modalConfig", "modalData", "subscribe", "dispatch"];
const serverModalTypes = ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer']
const localModalTypes = ['addOnLocal', 'addGroupOnLocal', 'editOnLocal', 'editGroupOnLocal']
const allModalTypes = [...serverModalTypes, ...localModalTypes, 'select', 'viewGroup', 'viewObject']

const defaultProps = {
    subscribe: [],
    dispatch: {}
}

const getDefaultFooterProps = (modal) => {

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

/**
 * Компонент модального окна
 */
const Modal = props => {

    const {buttonProps, toolTipProps, modalConfig, modalData, subscribe, dispatch} = props;
    const modalProps = { ...getDefaultFooterProps(modalConfig), ...getObjectExcludedProps(modalConfig, excludeProps) };

    const [visible, setVisible] = useState(false);
    const [_modalData, _setModalData] = useState({});
    const [_buttonProps, setButtonProps] = useState({});

    const isMounted = useMounted()

    useEffect(() => {
        _setModalData(modalData);
    }, []);

    /** Подписка на изменение props[subscribe.name] в сторе */
    subscribe.map(item => {
        return useEffect( () => {
            // if(!isMounted && !item.name)
            //     return;
            if((item.withMount || isMounted) && item.name) {
            // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                item.onChange && item.onChange({
                    value: props[item.name],
                    extraData: props[`${item.name}ExtraData`],
                    setModalData,
                    setButtonProps,
                    openModal: _onOpenModal,
                    closeModal: _onCloseModal
                });
            }
            // console.log("Change Props[2]: ", props.subscribeЗф);
        }, [props[item.name]]);
    })

    const setModalData = (value) => _setModalData && _setModalData(value);
    const _onOpenModal = () => setVisible(true)
    const _onCloseModal = () => setVisible(false)

    const onFinishHandler = (values) => { //} {type, row, requestSaveRow}) => {
        // console.log("Modal Events => before dispatchToStore: ", dispatch);

        let saveObj;
        if(modalProps.type.startsWith('add'))
            saveObj = {...values};
        else
            saveObj = {..._modalData, ...values};

        dispatchToStore({dispatch, setDateStore: props.setDateStore, value: saveObj});

        if (modalProps.requestSaveRow && serverModalTypes.includes(modalProps.type)) {
            const method = (modalProps.type === 'addOnServer' || modalProps.type === 'addGroupOnServer') ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, method, row, _modalData);
            modalProps.requestSaveRow({
                method,
                data: saveObj,
            })
                .then(response => {
                    notification.success({
                        message: 'Сохранение прошло успешно'
                    });
                    modalProps.onOk && modalProps.onOk(values, response.data);
                    modalProps.onFinish && modalProps.onFinish(values, response.data);
                    _onCloseModal();
                })
                .catch(error => notificationError(error, 'Ошибка при сохранении'));
        } else _onCloseModal();


    };

    const onFinishFailedHandler = (errorInfo) => {
        // console.log('FormModal Failed:', errorInfo);
        console.error("FormModal fields failed: ", errorInfo);
        props.onFinishFailed && props.onFinishFailed(errorInfo);
    };

    const loadInitDataHandler = (callBack) =>
        formConfig.loadInitData(callBack, _modalData)


    const _onCancelHandler = (e) => {
        // setVisibleModals({ ...visibleModals, [modal.type]: false });
        // form.resetFields();
        _onCloseModal()
        if (modalProps.onCancel) modalProps.onCancel(e)
    };

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
        loadInitData: (callBack, row) => callBack(row),
        ...modalProps.form
    };

    return (
        <React.Fragment>
            <Tooltip {...toolTipProps}>
                <Button
                    type="primary"
                    {...buttonProps}
                    {..._buttonProps}
                    onClick={_onOpenModal}
                >{buttonProps && buttonProps.label}</Button>
            </Tooltip>
            {/*<FormModal*/}
            {/*    modal={ modalConfig }*/}
            {/*    selectedRow={_modalData}*/}
            {/*    visible={visible}*/}
            {/*    setVisible={_onCloseModal}*/}
            {/*    saveRow={_onSaveRow}*/}
            {/*>{props.children}</FormModal>*/}
            <AntModal
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
                    onFinish={onFinishHandler}
                    onFinishFailed={onFinishFailedHandler}
                    loadInitData={loadInitDataHandler}
                >{props.children}</Form>
            </AntModal>
        </React.Fragment>
    )
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
    subscribe: PropTypes.arrayOf(PropTypes.object),
};

Modal.defaultProps = defaultProps;

const mapStateToProps = (store, ownProps) => {
    const {subscribe} = ownProps;
    let state = {};
    if(subscribe && subscribe.length > 0){
        subscribe.forEach(item => {
            const {name, path, extraData} = item;
            if(name && path)
                state[name] = objectPath.get(store, path);
            if(name && extraData)
                state[`${name}ExtraData`] = objectPath.get(store, extraData);
        })
    }
    return state;
};
const mapDispatchToProps = (dispatch) =>
    bindActionCreators( { setDateStore: setDateStore, }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
