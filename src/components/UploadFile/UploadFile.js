import React from "react";
import PropTypes from "prop-types";
import { Button, notification as antNotification, Spin, Tooltip, Typography, Upload } from "antd";
import { LoadingOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { noop } from "../utils/baseUtils";


const defaultProps = {
    requestUploadFile: noop,
    dataObject: {},
    onCompletedUpload: noop,
    onFailedUpload: noop,
    uploadProps: {},
    toolTipProps: {},
    buttonProps: {}
}

const UploadFile = props => {

    const {
        requestUploadFile,
        dataObject,
        onCompletedUpload,
        onFailedUpload,
        uploadProps,
        toolTipProps,
        buttonProps,
    } = props

    const _uploadFile = (file) => {
        // console.log('beforeUpload fileList => ', fileList);
        notification(file, 'loading');
        if (requestUploadFile) {
            requestUploadFile({ file: file, dataObject })
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
                props.onChange(file);
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
    requestUploadFile: PropTypes.func.isRequired,
    dataObject: PropTypes.object,
    onCompletedUpload: PropTypes.func,
    onFailedUpload: PropTypes.func,

    uploadProps: PropTypes.object,
    toolTipProps: PropTypes.object,
    buttonProps: PropTypes.object,
};

UploadFile.defaultProps = defaultProps

export default UploadFile;
