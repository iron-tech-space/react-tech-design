

var getTitle = function getTitle(type, element) {
    if (element === 'Group') {
        if (type === 'edit') return 'Изменение папки';else return 'Создание папки';
    } else return 'Изменение файла';
};

var Modal = function Modal(type, element, requestSaveRow, _processBeforeSaveForm, parentLoadHandler, requestLoadRows) {
    // console.log("FolderModal", type, requestSaveRow, processBeforeSaveForm, parentLoadHandler, requestLoadRows);
    var selectedRow = void 0;
    return {
        type: '' + type + element + 'OnServer',
        title: getTitle(type, element),
        requestSaveRow: requestSaveRow,
        width: 500,
        // bodyStyle: {height: 650},
        form: {
            name: 'FileManagerModalModal',
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
            processBeforeSaveForm: function processBeforeSaveForm(rawValues) {
                return _processBeforeSaveForm(rawValues, type, element);
            },
            loadInitData: function loadInitData(callBack, row) {
                selectedRow = row;
                callBack(type === 'edit' ? row : null);
            },
            body: [{
                componentType: 'Item',
                label: 'Наименование',
                name: 'name',
                rules: [{
                    message: '\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435',
                    required: true
                }],
                child: { componentType: 'Input' }
            }, type === 'edit' ? {
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
                    requestLoadRows: function requestLoadRows(info) {
                        return parentLoadHandler(type, selectedRow, info);
                    },
                    requestLoadDefault: requestLoadRows
                }
            } : {}]
        }
    };
};

export var AddFolderModal = function AddFolderModal() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return Modal.apply(undefined, ['add', 'Group'].concat(args));
};
export var EditFolderModal = function EditFolderModal() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return Modal.apply(undefined, ['edit', 'Group'].concat(args));
};
export var EditFileModal = function EditFileModal() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return Modal.apply(undefined, ['edit', ''].concat(args));
};