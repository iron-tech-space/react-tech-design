import "antd/es/upload/style";
import _Upload from "antd/es/upload";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/tooltip/style";
import _Tooltip from "antd/es/tooltip";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/spin/style";
import _Spin from "antd/es/spin";
import "antd/es/notification/style";
import _notification from "antd/es/notification";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState } from "react";
import PropTypes from "prop-types";
import FormTable from "../Form/FormTable";

import { HomeOutlined, RollbackOutlined, FolderFilled, FileOutlined, PlusOutlined, LoadingOutlined, FileWordOutlined, FileExcelOutlined, FileImageOutlined, FileMarkdownOutlined, FilePdfOutlined, FilePptOutlined, FileTextOutlined, FileZipOutlined, CopyOutlined } from '@ant-design/icons';
import { AddFolderModal, EditFileModal, EditFolderModal } from "./AddFolderModal";
import { rtPrefix } from "../utils/variables";
import { toDDMMYYYYHHMMSS } from "../utils/datesUtils";
import { copyTextToClipboard } from "../utils/clipboardUtils";
import { notificationError } from "../utils/baseUtils";

var FileManager = function FileManager(props) {
    var _ref;

    var rowKey = props.rowKey,
        isGroupKey = props.isGroupKey,
        expandParentKey = props.expandParentKey;

    var _useState = useState({}),
        _useState2 = _slicedToArray(_useState, 2),
        tableRef = _useState2[0],
        setTableRef = _useState2[1];

    var _setTableRef = function _setTableRef(ref) {
        return setTableRef(ref);
    };

    // const tableRef = React.createRef();

    var _useState3 = useState([(_ref = {}, _defineProperty(_ref, rowKey, null), _defineProperty(_ref, "name", React.createElement(HomeOutlined, null)), _ref)]),
        _useState4 = _slicedToArray(_useState3, 2),
        breadcrumb = _useState4[0],
        setBreadcrumb = _useState4[1];

    var _useState5 = useState(_defineProperty({ deleted: false }, expandParentKey, null)),
        _useState6 = _slicedToArray(_useState5, 2),
        tableFilter = _useState6[0],
        setTableFilter = _useState6[1];

    /**
     * TABLE EVENTS
     */

    // Down to folder OR download file


    var _onRowDoubleClick = function _onRowDoubleClick(_ref2) {
        var rowData = _ref2.rowData,
            rowIndex = _ref2.rowIndex,
            rowKey = _ref2.rowKey;

        if (rowData.isGroup) {
            loadTable([].concat(_toConsumableArray(breadcrumb), [rowData]), _defineProperty({}, expandParentKey, rowKey));
        } else {
            props.requestDownloadFile(rowKey);
        }
        props.onRowDoubleClick && props.onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
    };

    // Jump to folder
    var _onClickBreadcrumb = function _onClickBreadcrumb(parentId, index) {
        loadTable(breadcrumb.slice(0, index), _defineProperty({}, expandParentKey, parentId));
    };

    // Up to folder
    var _onClickBack = function _onClickBack() {
        if (breadcrumb.length > 1) {
            var newBreadcrumb = breadcrumb.slice(0, breadcrumb.length - 1);
            // setBreadcrumb(newBreadcrumb);
            // tableRef && tableRef.reloadData({ filter: { parentId: newBreadcrumb[newBreadcrumb.length - 1].id } });
            loadTable(newBreadcrumb, _defineProperty({}, expandParentKey, newBreadcrumb[newBreadcrumb.length - 1][rowKey]));
        }
    };

    // Delete folder OR file
    var _onClickDelete = function _onClickDelete(event, _selectedRowKeys) {
        if (_selectedRowKeys && _selectedRowKeys.length > 0) {
            var _data;

            props.requestDeleteRow({ data: (_data = {}, _defineProperty(_data, rowKey, _selectedRowKeys[0]), _defineProperty(_data, "deleted", true), _data) }).then(function (response) {
                _notification.success({ message: 'Файл успешно удален' });
                tableRef && tableRef.reloadData({ filter: tableFilter });
            }).catch(function (error) {
                notificationError(error, 'Ошибка удаления файла');
                tableRef && tableRef.reloadData({ filter: tableFilter });
            });
        }
    };

    /**
     * TABLE FUNCs
     */
    var loadTable = function loadTable(breadcrumb, filter) {
        setBreadcrumb(breadcrumb);
        var newFilter = _extends({}, tableFilter, filter);
        setTableFilter(newFilter);
        tableRef && tableRef.reloadData({ filter: newFilter });
    };

    /**
     * MODAL FUNCs
     */
    var processBeforeSaveModal = function processBeforeSaveModal(rawValues, type, element) {
        var values = _extends({}, rawValues);
        if (type === 'add') values[expandParentKey] = breadcrumb[breadcrumb.length - 1][rowKey];

        if (element === 'Group') values.extension = 'dir';
        // console.log("FileManager values =>", values);
        return values;
    };

    var parentLoadHandler = function parentLoadHandler(type, selectedRow, _ref3) {
        var params = _ref3.params,
            data = _ref3.data;

        var newData = _extends({}, data, _defineProperty({}, isGroupKey, true));
        if (type === 'edit') newData.owner = selectedRow && selectedRow[rowKey];
        return props.requestLoadParent({ params: params, data: newData });
    };

    // const _onChangeViewDeleted = (checked) => {
    //     const newFilter = {...tableFilter, deleted: checked };//? undefined : checked};
    //     setTableFilter(newFilter);
    //     tableRef && tableRef.reloadData({filter: newFilter});
    // };

    // console.log("EditFolderModal", EditFolderModal(props.requestSaveRow, processBeforeSaveForm));


    /**
     * UPLOAD FUNCs
     */

    var _uploadFile = function _uploadFile(file) {
        // console.log('beforeUpload fileList => ', fileList);
        notification(file, 'loading');
        if (props.requestUploadFile) {
            props.requestUploadFile(_defineProperty({ file: file }, expandParentKey, breadcrumb[breadcrumb.length - 1][rowKey])).then(function (response) {
                notification(file, 'success');
                tableRef && tableRef.reloadData({ filter: tableFilter });
            }).catch(function () {
                notification(file, 'error');
                tableRef && tableRef.reloadData({ filter: tableFilter });
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
                break;
            case 'error':
                _notification.error(notifProps);
                break;
            case 'close':
                _notification.close(file.uid);
                break;
            default:
                break;
        }
    };

    /**
     * RENDER PARAMS
     */
    var customColumnProps = [{
        name: 'dateCreate',
        cellRenderer: function cellRenderer(_ref4) {
            var cellData = _ref4.cellData;
            return toDDMMYYYYHHMMSS(cellData);
        }
    }, {
        name: 'dateUpdate',
        cellRenderer: function cellRenderer(_ref5) {
            var cellData = _ref5.cellData;
            return toDDMMYYYYHHMMSS(cellData);
        }
    }, {
        name: 'path',
        cellRenderer: function cellRenderer(_ref6) {
            var rowData = _ref6.rowData;
            return rowData[isGroupKey] ? null : React.createElement(
                _Tooltip,
                { title: "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0443\u0442\u044C \u043A \u0444\u0430\u0439\u043B\u0443" },
                React.createElement(CopyOutlined, { onClick: function onClick() {
                        return copyTextToClipboard(props.pathDownloadFile(rowData[rowKey]));
                    } })
            );
        }
    }, {
        name: 'name',
        cellRenderer: function cellRenderer(_ref7) {
            var rowData = _ref7.rowData;

            var styleDiv = { display: 'flex', alignItems: 'center' };
            var Icon = void 0;
            var styleIcon = { marginRight: '10px', fontSize: '16px' };
            switch (rowData.extension) {
                case 'dir':
                    Icon = FolderFilled;
                    styleIcon.color = '#3a88c9';
                    break;
                case 'doc':
                case 'docm':
                case 'docx':
                case 'dot':
                case 'dotx':
                    Icon = FileWordOutlined;
                    styleIcon.color = '#185abc';
                    break;
                case 'xlm':
                case 'xls':
                case 'xlsm':
                case 'xlt':
                case 'xltm':
                case 'xltx':
                case 'xlsx':
                    Icon = FileExcelOutlined;
                    styleIcon.color = '#1f7244';
                    break;
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'tiff':
                case 'bmp':
                case 'ico':
                case 'gif':
                case 'svg':
                    Icon = FileImageOutlined;
                    break;
                case 'markdown':
                case 'md':
                    Icon = FileMarkdownOutlined;
                    styleIcon.color = '#175987';
                    break;
                case 'pdf':
                    Icon = FilePdfOutlined;
                    styleIcon.color = '#bd1f07';
                    break;
                case 'ppt':
                    Icon = FilePptOutlined;
                    styleIcon.color = '#be5239';
                    break;
                case 'txt':
                    Icon = FileTextOutlined;
                    break;
                case 'zip':
                    Icon = FileZipOutlined;
                    break;
                default:
                    Icon = FileOutlined;
            }

            return React.createElement(
                "div",
                { style: styleDiv },
                React.createElement(Icon, { style: styleIcon }),
                rowData.name
            );
        }
    }];

    var uploadProps = {
        multiple: true,
        showUploadList: false,
        beforeUpload: _uploadFile
    };

    var uploadRender = function uploadRender() {
        return React.createElement(
            _Upload,
            uploadProps,
            React.createElement(_Button, { icon: React.createElement(PlusOutlined, null) })
        );
    };

    var breadcrumbRender = function breadcrumbRender() {
        return React.createElement(
            "span",
            { className: rtPrefix + "-file-manager-breadcrumb ml-8" },
            breadcrumb.map(function (item, index) {
                return React.createElement(
                    "span",
                    {
                        key: item[rowKey]
                        // type="text"
                        , className: rtPrefix + "-file-manager-breadcrumb-btn",
                        onClick: function onClick() {
                            return _onClickBreadcrumb(item[rowKey], index + 1);
                        }
                    },
                    React.createElement(
                        "span",
                        null,
                        "/"
                    ),
                    React.createElement(
                        "span",
                        null,
                        item.name
                    )
                );
            })
        );
    };

    return React.createElement(FormTable, _extends({}, props, {
        ref: _setTableRef,
        type: 'serverSide',
        componentType: 'FilesTable',
        onRowDoubleClick: _onRowDoubleClick,
        defaultFilter: tableFilter,
        customColumnProps: customColumnProps,
        commandPanelProps: _extends({}, props.commandPanelProps, {
            onClickDelete: _onClickDelete,
            systemBtnProps: {
                add: {
                    actionType: 'modal',
                    tooltip: 'Загрузить файл(ы)',
                    render: uploadRender
                },
                addGroup: { actionType: 'modal', tooltip: 'Создать папку' },
                edit: { actionType: ['modal', 'modal'] },
                delete: {}
            },
            leftCustomSideElement: [{
                componentType: 'Item',
                child: {
                    componentType: 'Button',
                    icon: React.createElement(RollbackOutlined, null),
                    label: 'Back',
                    className: 'ml-4',
                    disabled: breadcrumb.length === 1,
                    onClick: _onClickBack
                }
            }, {
                componentType: 'Item',
                child: {
                    componentType: 'Custom',
                    render: breadcrumbRender
                }
            }]
            // rightCustomSideElement: [
            //     {
            //         componentType: 'Item',
            //         label: 'View deleted',
            //         className: 'mb-0',
            //         child: {
            //             componentType: 'Switch',
            //             checked: tableFilter.deleted,
            //             onChange: _onChangeViewDeleted
            //         }
            //     },
            // ]
        }),
        modals: [AddFolderModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows), EditFolderModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows), EditFileModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows)]
    }));
};

FileManager.propTypes = {

    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.func,

    /** Функция запроса на получение конфига для таблицы */
    requestLoadConfig: PropTypes.func
};

FileManager.defaultProps = {
    rowKey: 'id',
    isGroupKey: 'isGroup',
    expandParentKey: 'parentId'
};

export default FileManager;