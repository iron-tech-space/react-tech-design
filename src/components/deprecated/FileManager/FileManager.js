import React, {useState} from "react";
import PropTypes from "prop-types";
import FormTable from "../Form/FormTable";
import {Button, Upload, notification as antNotification, Spin, Typography, Tooltip} from 'antd';
import {
    HomeOutlined,
    RollbackOutlined,
    FolderFilled,
    FileOutlined,
    PlusOutlined,
    LoadingOutlined,
    FileWordOutlined,
    FileExcelOutlined,
    FileImageOutlined,
    FileMarkdownOutlined,
    FilePdfOutlined,
    FilePptOutlined,
    FileTextOutlined,
    FileZipOutlined,
    CopyOutlined
} from '@ant-design/icons';
import { AddFolderModal, EditFileModal, EditFolderModal } from "./AddFolderModal";
import { rtPrefix } from "../../utils/variables";
import { toDDMMYYYYHHMMSS } from "../../utils/datesUtils";
import { copyTextToClipboard } from "../../utils/clipboardUtils";
import { notificationError } from "../../utils/baseUtils";

const FileManager = props => {

    const {
        rowKey,
        isGroupKey,
        expandParentKey
    } = props;

    const [tableRef, setTableRef] = useState({});
    const _setTableRef = (ref) => setTableRef(ref);

    // const tableRef = React.createRef();

    const [breadcrumb, setBreadcrumb] = useState([{[rowKey]: null, name: <HomeOutlined />}]);
    const [tableFilter, setTableFilter] = useState({deleted: false, [expandParentKey]: null});



    /**
     * TABLE EVENTS
     */

    // Down to folder OR download file
    const _onRowDoubleClick = ({rowData, rowIndex, rowKey}) => {
        if(rowData.isGroup) {
            loadTable([...breadcrumb, rowData], { [expandParentKey]: rowKey });
        } else {
            props.requestDownloadFile(rowKey)
        }
        props.onRowDoubleClick && props.onRowDoubleClick({rowData, rowIndex, rowKey});
    };

    // Jump to folder
    const _onClickBreadcrumb = (parentId, index) => {
        loadTable(breadcrumb.slice(0, index), {[expandParentKey]: parentId})
    };

    // Up to folder
    const _onClickBack = () => {
        if(breadcrumb.length > 1) {
            const newBreadcrumb = breadcrumb.slice(0, breadcrumb.length - 1);
            // setBreadcrumb(newBreadcrumb);
            // tableRef && tableRef.reloadData({ filter: { parentId: newBreadcrumb[newBreadcrumb.length - 1].id } });
            loadTable(newBreadcrumb, { [expandParentKey]: newBreadcrumb[newBreadcrumb.length - 1][rowKey] })
        }
    };

    // Delete folder OR file
    const _onClickDelete = (event, _selectedRowKeys) => {
        if(_selectedRowKeys && _selectedRowKeys.length > 0){
            props.requestDeleteRow({data: {[rowKey]: _selectedRowKeys[0], deleted: true}})
                .then((response) => {
                    antNotification.success({message: 'Файл успешно удален'});
                    tableRef && tableRef.reloadData({filter: tableFilter});
                })
                .catch(error => {
                    notificationError(error, 'Ошибка удаления файла');
                    tableRef && tableRef.reloadData({filter: tableFilter});
                });
        }
    };

    /**
     * TABLE FUNCs
     */
    const loadTable = (breadcrumb, filter) => {
        setBreadcrumb(breadcrumb);
        const newFilter = {...tableFilter, ...filter};
        setTableFilter(newFilter);
        tableRef && tableRef.reloadData({filter: newFilter});
    };


    /**
     * MODAL FUNCs
     */
    const processBeforeSaveModal = (rawValues, type, element) => {
        let values = {...rawValues};
        if(type === 'add')
            values[expandParentKey] = breadcrumb[breadcrumb.length - 1][rowKey];

        if(element === 'Group')
            values.extension = 'dir';
        // console.log("FileManager values =>", values);
        return values;
    };

    const parentLoadHandler = (type, selectedRow, {params, data}) => {
        let newData = {...data, [isGroupKey]: true};
        if (type === 'edit') newData.owner = selectedRow && selectedRow[rowKey];
        return props.requestLoadParent({ params, data: newData, });
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

    const _uploadFile = (file) => {
        // console.log('beforeUpload fileList => ', fileList);
        notification(file, 'loading');
        if (props.requestUploadFile) {
            props.requestUploadFile({ file: file, [expandParentKey]: breadcrumb[breadcrumb.length - 1][rowKey] })
                .then((response) => {
                    notification(file, 'success');
                    tableRef && tableRef.reloadData({ filter: tableFilter });
                })
                .catch(() => {
                    notification(file, 'error');
                    tableRef && tableRef.reloadData({ filter: tableFilter });
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
                break;
            case 'error':
                antNotification.error(notifProps);
                break;
            case 'close':
                antNotification.close(file.uid);
                break;
            default:
                break;
        }
    };

    /**
     * RENDER PARAMS
     */
    const customColumnProps = [
        {
            name: 'dateCreate',
            cellRenderer: ({cellData}) => toDDMMYYYYHHMMSS(cellData),
        },
        {
            name: 'dateUpdate',
            cellRenderer: ({cellData}) => toDDMMYYYYHHMMSS(cellData),
        },
        {
            name: 'path',
            cellRenderer: ({rowData}) =>
                rowData[isGroupKey] ? null
                    :
                <Tooltip title="Скопировать путь к файлу">
                    <CopyOutlined onClick={() => copyTextToClipboard(props.pathDownloadFile(rowData[rowKey]))}/>
                </Tooltip>,
        },
        {
            name: 'name',
            cellRenderer: ({rowData}) => {
                const styleDiv = {display: 'flex', alignItems: 'center'};
                let Icon;
                let styleIcon = {marginRight: '10px', fontSize: '16px'};
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


                return (
                    <div style={styleDiv}>
                        {/*{rowData.isGroup*/}
                        {/*    ? <FolderFilled style={{ marginRight: '10px', color: '#3a88c9'}}/>*/}
                        {/*    : <FileOutlined style={{ marginRight: '10px' }}/>*/}
                        {/*}*/}
                        <Icon style={styleIcon}/>
                        {rowData.name}
                    </div>
                );
            },
        }
    ];

    const uploadProps = {
        multiple: true,
        showUploadList: false,
        beforeUpload: _uploadFile
    };

    const uploadRender = () => {
        return (
            <Upload {...uploadProps}>
                <Button icon={<PlusOutlined />}/>
            </Upload>
        )
    };

    const breadcrumbRender = () => {
        return (
            <span className={`${rtPrefix}-file-manager-breadcrumb ml-8`}>
                {breadcrumb.map((item, index) =>
                    <span
                        key={item[rowKey]}
                        // type="text"
                        className={`${rtPrefix}-file-manager-breadcrumb-btn`}
                        onClick={() => _onClickBreadcrumb(item[rowKey], index + 1)}
                    >
                        <span>/</span><span>{item.name}</span>
                    </span>
                )}
            </span>
        )
    };

    return (
        <FormTable
            {...props}
            ref={_setTableRef}
            type={'serverSide'}
            componentType={'FilesTable'}
            onRowDoubleClick={_onRowDoubleClick}
            defaultFilter={tableFilter}
            customColumnProps={customColumnProps}
            commandPanelProps={{
                ...props.commandPanelProps,
                onClickDelete: _onClickDelete,
                systemBtnProps: {
                    add: {
                        actionType: 'modal',
                        tooltip: 'Загрузить файл(ы)',
                        render: uploadRender
                    },
                    addGroup: {actionType: 'modal', tooltip: 'Создать папку'},
                    edit: {actionType: ['modal', 'modal']},
                    delete: {}
                },
                leftCustomSideElement: [
                    {
                        componentType: 'Item',
                        child: {
                            componentType: 'Button',
                            icon: <RollbackOutlined />,
                            label: 'Back',
                            className: 'ml-4',
                            disabled: (breadcrumb.length === 1),
                            onClick: _onClickBack
                        }
                    },
                    {
                        componentType: 'Item',
                        child: {
                            componentType: 'Custom',
                            render: breadcrumbRender
                        }
                    }
                ],
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
            }}
            modals={[
                AddFolderModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows),
                EditFolderModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows),
                EditFileModal(props.requestSaveRow, processBeforeSaveModal, parentLoadHandler, props.requestLoadRows)
            ]}
        />
    );
};

FileManager.propTypes = {

    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.func,

    /** Функция запроса на получение конфига для таблицы */
    requestLoadConfig: PropTypes.func,
};

FileManager.defaultProps = {
    rowKey: 'id',
    isGroupKey: 'isGroup',
    expandParentKey: 'parentId',
};

export default FileManager;
