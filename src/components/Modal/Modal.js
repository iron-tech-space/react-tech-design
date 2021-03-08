import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormModal from "../Form/FormModal";
import { notification, Button, Tooltip} from "antd";
import { notificationError, dispatchToStore, useMounted, getObjectExcludedProps } from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";

const defaultProps = {
    subscribe: [],
    dispatch: {}
}

const excludeProps = ["buttonProps", "toolTipProps", "modalConfig", "modalData", "subscribe", "dispatch"];

const Modal = props => {

    const {buttonProps, toolTipProps, modalConfig, modalData, subscribe, dispatch} = props;

    const [visible, setVisible] = useState(false);
    const [_modalData, _setModalData] = useState({});
    const [_buttonProps, setButtonProps] = useState({});

    const isMounted = useMounted()

    const setModalData = (value) => {
        // console.log("setModalData: ", value);
        _setModalData && _setModalData(value);
    }

    useEffect(() => {
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
    subscribe.map(item => {
        return useEffect( () => {
            if(isMounted && item.name) {
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

    const _onOpenModal = () => {
        // console.log("Modal => _modalData: ", _modalData);
        setVisible(true)
    }

    const _onCloseModal = () => {
        setVisible(false)
    }

    const _onSaveRow = ({type, row, requestSaveRow}) => {
        // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, row);
        // console.log("Modal Events => before dispatchToStore: ", dispatch);
        dispatchToStore({dispatch, setDateStore: props.setDateStore, value: row});

        if (requestSaveRow
            && ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'].includes(type)
        ) {
            const method = (type === 'addOnServer' || type === 'addGroupOnServer') ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, method, row, _modalData);
            requestSaveRow({
                method,
                data: row,
            })
                .then(response => {
                    notification.success({
                        message: 'Сохранение прошло успешно'
                    });
                    _onCloseModal();
                })
                .catch(error => notificationError(error, 'Ошибка при сохранении'));
        } else _onCloseModal();
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
            <FormModal
                modal={ modalConfig }
                selectedRow={_modalData}
                visible={visible}
                setVisible={_onCloseModal}
                saveRow={_onSaveRow}
            >{props.children}</FormModal>
        </React.Fragment>
    )
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
