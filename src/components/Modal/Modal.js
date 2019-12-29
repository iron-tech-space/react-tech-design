import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormModal from "../Form/FormModal";
import { notification, Button} from "antd";
import { notificationError } from "../utils/baseUtils";
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";

const Modal = props => {

    const {buttonProps, modalConfig, modalData, dispatchPath} = props;

    const [visible, setVisible] = useState(false);
    const [_modalData, _setModalData] = useState({});
    const [_buttonProps, setButtonProps] = useState({});

    const subscribe = props.subscribe ? props.subscribe : {};

    const setModalData = (value) => {
        // console.log("setModalData: ", value);
        _setModalData && _setModalData(value);
    }

    useEffect(() => {
        _setModalData(modalData);
    }, []);

    /** Подписка на изменение props[subscribe.name] в сторе */
    useEffect( () => {
        if(subscribe.name) {
            // console.log("Modal => subscribe: ", props[subscribe.name]);
            subscribe.onChange && subscribe.onChange({value: props[subscribe.name], setModalData, setButtonProps});
        }
        // console.log("Change Props[2]: ", props.subscribeЗф);
    }, [props[subscribe.name]]);

    const _onOpenModal = () => {
        // console.log("Modal => _modalData: ", _modalData);
        setVisible(true)
    }

    const _onCloseModal = () => {
        setVisible(false)
    }

    const _onSaveRow = ({type, row, requestSaveRow}) => {
        dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, row);

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
            <Button
                type="primary"
                {...buttonProps}
                {..._buttonProps}
                onClick={_onOpenModal}
            >{buttonProps && buttonProps.label}</Button>
            <FormModal
                modal={modalConfig}
                selectedRow={_modalData}
                visible={visible}
                setVisible={_onCloseModal}
                saveRow={_onSaveRow}
            />
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
    dispatchPath: PropTypes.string,

    /** Объект для подписки на изменения в STORE */
    subscribe: PropTypes.object,
};

const mapStateToProps = (store, ownProps) => {
    const {subscribe} = ownProps;
    if(subscribe){
        const {name, path} = subscribe;
        if(name && path)
            return { [name]: objectPath.get(store, path) };
    }
    return {};
};
const mapDispatchToProps = (dispatch) =>
    bindActionCreators( { setDateStore: setDateStore, }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
