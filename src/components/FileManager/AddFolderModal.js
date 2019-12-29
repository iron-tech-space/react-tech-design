const getTitle = (type, element) => {
    if(element === 'Group')
        if(type === 'edit')
            return 'Изменение папки';
        else
            return 'Создание папки';
    else
        return 'Изменение файла';
};

const Modal = (type, element, requestSaveRow, processBeforeSaveForm, parentLoadHandler, requestLoadRows) => {
    // console.log("FolderModal", type, requestSaveRow, processBeforeSaveForm, parentLoadHandler, requestLoadRows);
    let selectedRow;
    return {
        type: `${type}${element}OnServer`,
        title: getTitle(type, element),
        requestSaveRow: requestSaveRow,
        width: 500,
        // bodyStyle: {height: 650},
        form: {
            name: 'FileManagerModalModal',
            labelCol: {span: 8},
            wrapperCol: {span: 16},
            processBeforeSaveForm: (rawValues) => processBeforeSaveForm(rawValues, type, element),
            loadInitData: (callBack, row) => {
                selectedRow = row;
                callBack(type === 'edit' ? row : null);
            },
            body: [
                {
                    componentType: 'Item',
                    label: 'Наименование',
                    name: 'name',
                    rules: [
                        {
                            message: `Заполните наименование`,
                            required: true,
                        },
                    ],
                    child: {componentType: 'Input'},
                },
                type === 'edit'
                    ? {
                        componentType: 'Item',
                        label: 'Родитель',
                        name: 'parentId',
                        child: {
                            componentType: 'SingleSelect',
                            widthControl: 0,
                            heightPopup: 300,
                            expandColumnKey: 'id',
                            rowRender: 'name',
                            nodeAssociated: false,
                            expandDefaultAll: true,
                            // (info) аналогично ({params, data})
                            // Но поскольку тут раскрывать объект не нужно, мы можем просто передать его дальше
                            requestLoadRows: (info) => parentLoadHandler(type, selectedRow, info),
                            requestLoadDefault: requestLoadRows,
                        },
                    }
                    : {},
            ],
        },
    };
};

export const AddFolderModal = (...args) => Modal('add', 'Group', ...args);
export const EditFolderModal = (...args) => Modal('edit', 'Group', ...args);
export const EditFileModal = (...args) => Modal('edit', '', ...args);

