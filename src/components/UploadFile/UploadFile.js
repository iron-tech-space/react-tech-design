import React from "react";
import PropTypes from "prop-types";
import { Button, notification as antNotification, Spin, Tooltip, Typography, Upload } from "antd";
import { LoadingOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { noop } from "../utils/baseUtils";


const defaultProps = {
    requestUploadFile: noop,
    dataObject: undefined,
    onCompletedUpload: noop,
    onFailedUpload: noop,
    uploadProps: {},
    toolTipProps: {},
    buttonProps: {}
}

/** Компонент загрузки файлов */
const UploadFile = props => {

    const {
        value,
        requestUploadFile,
        dataObject,
        onCompletedUpload,
        onFailedUpload,
        uploadProps,
        toolTipProps,
        buttonProps,
    } = props

    const _uploadFile = (file) => {
        // console.log('beforeUpload dataObject => ', dataObject, value, dataObject || value.dataObject);
        notification(file, 'loading');
        if (requestUploadFile) {
            const _dataObject = dataObject || value.dataObject
            requestUploadFile({ file: file, dataObject: _dataObject })
                .then((response) => {
                    notification(file, 'success');
                })
                .catch(() => {
                    notification(file, 'error');
                });
        }
        return false;
    };
    const notification = (file, type) => {
        const notifProps = {
            key: file.uid,
            duration: type === 'loading' ? 0 : 5,
            icon: type === 'loading'
                ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                : null,
            message: <span>Загрузка файла: <Typography.Text code>{file.name}</Typography.Text></span>
        };
        switch (type) {
            case 'loading':
                antNotification.info(notifProps);
                break;
            case 'success':
                antNotification.success(notifProps);
                onCompletedUpload(file);
                props.onChange({...value, file});
                break;
            case 'error':
                antNotification.error(notifProps);
                onFailedUpload(file);
                break;
            case 'close':
                antNotification.close(file.uid);
                break;
            default:
                break;
        }
    };
    const defaultUploadProps = {
        multiple: true,
        showUploadList: false,
        beforeUpload: _uploadFile
    };

    return (
        <Upload {...defaultUploadProps} {...uploadProps}>
            <Tooltip {...toolTipProps}>
                <Button
                    icon={<CloudUploadOutlined />}
                    {...buttonProps}
                >{buttonProps && buttonProps.label}</Button>
            </Tooltip>
        </Upload>
    );
};

UploadFile.propTypes = {
    /** Функция запроса для отправки файла с данным на сервер */
    requestUploadFile: PropTypes.func.isRequired,

    /** Данные, прикрепляемые к файлу */
    dataObject: PropTypes.object,

    /** Функция, вызываемая при удачной загрузке файла */
    onCompletedUpload: PropTypes.func,

    /** Функция, вызываемая при НЕ удачной загрузке файла */
    onFailedUpload: PropTypes.func,

    /** Ant Props для [Upload](https://ant.design/components/upload/) компонента */
    uploadProps: PropTypes.object,

    /** Ant Props для [Tooltip](https://ant.design/components/tooltip/) компонента */
    toolTipProps: PropTypes.object,

    /** Ant Props для [Button](https://ant.design/components/button/) компонента */
    buttonProps: PropTypes.object,
};

UploadFile.defaultProps = defaultProps

export default UploadFile;
