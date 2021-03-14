import "antd/es/upload/style";
import _Upload from "antd/es/upload";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/notification/style";
import _notification from "antd/es/notification";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/spin/style";
import _Spin from "antd/es/spin";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import PropTypes from "prop-types";

import { LoadingOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { noop } from "../utils/baseUtils";

var defaultProps = {
    requestUploadFile: noop,
    dataObject: {},
    onCompletedUpload: noop,
    onFailedUpload: noop,
    uploadProps: {},
    toolTipProps: {},
    buttonProps: {}

    /** Компонент загрузки файлов */
};var UploadFile = function UploadFile(props) {
    var requestUploadFile = props.requestUploadFile,
        dataObject = props.dataObject,
        onCompletedUpload = props.onCompletedUpload,
        onFailedUpload = props.onFailedUpload,
        uploadProps = props.uploadProps,
        toolTipProps = props.toolTipProps,
        buttonProps = props.buttonProps;


    var _uploadFile = function _uploadFile(file) {
        // console.log('beforeUpload dataObject => ', dataObject);
        notification(file, 'loading');
        if (requestUploadFile) {
            requestUploadFile({ file: file, dataObject: dataObject }).then(function (response) {
                notification(file, 'success');
            }).catch(function () {
                notification(file, 'error');
            });
        }
        return false;
    };
    var notification = function notification(file, type) {
        var notifProps = {
            key: file.uid,
            duration: type === 'loading' ? 0 : 5,
            icon: type === 'loading' ? React.createElement(_Spin, { indicator: React.createElement(LoadingOutlined, { style: { fontSize: 24 }, spin: true }) }) : null,
            message: React.createElement(
                "span",
                null,
                "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u0430\u0439\u043B\u0430: ",
                React.createElement(
                    _Typography.Text,
                    { code: true },
                    file.name
                )
            )
        };
        switch (type) {
            case 'loading':
                _notification.info(notifProps);
                break;
            case 'success':
                _notification.success(notifProps);
                onCompletedUpload(file);
                props.onChange(file);
                break;
            case 'error':
                _notification.error(notifProps);
                onFailedUpload(file);
                break;
            case 'close':
                _notification.close(file.uid);
                break;
            default:
                break;
        }
    };
    var defaultUploadProps = {
        multiple: true,
        showUploadList: false,
        beforeUpload: _uploadFile
    };

    return React.createElement(
        _Upload,
        _extends({}, defaultUploadProps, uploadProps),
        React.createElement(
            _Tooltip,
            toolTipProps,
            React.createElement(
                _Button,
                _extends({
                    icon: React.createElement(CloudUploadOutlined, null)
                }, buttonProps),
                buttonProps && buttonProps.label
            )
        )
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
    buttonProps: PropTypes.object
};

UploadFile.defaultProps = defaultProps;

export default UploadFile;