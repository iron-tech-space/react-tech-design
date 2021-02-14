import React, {forwardRef, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SortOrder from 'react-base-table/lib/SortOrder';
import AdvancedTable from '../AdvancedTable/AdvancedTable';
import { generateUUID, getObjectExcludedProps, noop, notificationError } from "../../utils/baseUtils";
import FormModal from './FormModal';
import { notification as antNotification, notification } from "antd";
import { rtPrefix } from "../../utils/variables";
import { empty, overlay } from "../Table/defaultSettings";


const excludeProps = ['onChange', 'defaultValue', 'modals', 'events', 'history'];

const FormTable = forwardRef((props, ref) => {

    /** Состояние первоначалной настройки компонента*/
    const [loading, setLoading] = useState(false);

    /** Состояние отображения модалок таблицы */
    const [visibleModals, setVisibleModals] = useState({
        addOnServer: false,
        editOnServer: false,
        addOnLocal: false,
        editOnLocal: false,
        addGroupOnServer: false,
        editGroupOnServer: false,
        addGroupOnLocal: false,
        editGroupOnLocal: false,
        select: false,
        viewGroup: false,
        viewObject: false});
    const [tableRows, setTableRows] = useState([]);
    const [tableSelectedRowKeys, setTableSelectedRowKeys] = useState([]);
    const [tableSelectedRow, setTableSelectedRow] = useState({});

    /** Ссылка на объект таблицы */
    const [tableRef, setTableRef] = useState({});
    const _setTableRef = (_ref) => {
        setTableRef(_ref);
        ref && ref(_ref)
    };

    const {
        rowKey,
        rowKeyType,
        customFields,
        modals,
        isGroupKey,
        history,

        componentType,
        name,

        // Form.Item props
        value,

        // Requests
        requestDeleteRow,

        dataDeleteRow
    } = props;
    const cmdProps = props.commandPanelProps;

    // let advancedTableProps = getObjectExcludedProps(props, excludeProps);

    /** Аналог componentDidMounted */
    useEffect(() => {
        // Если таблица локальная, то пробуем загрузить исходные данные
        if(!loading && props.type === 'localSide') {
            let cleanupFunction = false;
            setLoading(true);
            const loadData = async () => {
                if (!loading && props.requestLoadRows) {
                    props.requestLoadRows({params: {page: 0, size: 1}, data: {}})
                        .then((response) => {
                            // console.log('FormTable -> requestLoadRows -> response', response);
                            // console.log('FormTable -> requestLoadRows -> value', value);
                            if (!cleanupFunction)
                                _addRowsToLocalTable(response.data, value);
                        })
                        .catch(error => notificationError(error, 'Ошибка загрузки данных') );
                }
                // console.log('FormTable -> setMounted ', advancedTableProps.type);
                setLoading(false);
            };
            loadData();
            return () => cleanupFunction = true;
        }
    }, [props.type]);

    useEffect(() => {
        if(props.selectable) {
            console.log("FormTable => useEffect => value: ", value);
            if(value && value.length > 0)
                setTableSelectedRowKeys(value.map(item => item[rowKey]));
            else
                setTableSelectedRowKeys([]);

        }
    }, [value]);

    /** Получить список кнопок для Command Panel */
    const getEvents = () => {
        return (cmdProps && cmdProps.systemBtnProps && Object.keys(cmdProps.systemBtnProps)) || [];
    };

    /** Получить рендер модалок */
    const getModals = () => {
        return modals.map((modal, index) => {
            return (
                <FormModal
                    key={index}
                    modal={modal}
                    selectedRow={tableSelectedRow}
                    visible={visibleModals[modal.type]}
                    setVisible={(type, value) => setVisibleModals({ ...visibleModals, [type]: value })}
                    saveRow={_onSaveRow}
                />
            )

        })
    };

    /** Проверка существования кнопки в Command Panel */
    const isExistCmdBtn = (btnType) => (cmdProps && cmdProps.systemBtnProps && cmdProps.systemBtnProps[btnType]);

    /** Проверка соответствия типа кнопки и события ? (params) === (props) */
    const equalsActionTypeCmdBtn = (btnType, actionType) => {
        if(isExistCmdBtn(btnType)) {
            if(btnType === 'edit') {
                const aTypes = actionType.split('/');
                if(aTypes[0] === 'g') {
                    return !!(cmdProps.systemBtnProps[btnType].actionType
                        && cmdProps.systemBtnProps[btnType].actionType.length === 2
                        && cmdProps.systemBtnProps[btnType].actionType[1] === aTypes[1]);
                }
                else if (aTypes[0] === 'i') {
                    return !!(cmdProps.systemBtnProps[btnType].actionType
                        && cmdProps.systemBtnProps[btnType].actionType.length === 2
                        && cmdProps.systemBtnProps[btnType].actionType[0] === aTypes[1]);
                }
            } else {
                return !!(cmdProps.systemBtnProps[btnType].actionType
                    && cmdProps.systemBtnProps[btnType].actionType === actionType);
            }
        }
        return false;
    };

    /** Command Panel Events */
    /** Добавить */
    const _onClickAddHandler = () => {
        if(equalsActionTypeCmdBtn('add', 'modal')) {
            // console.log("FormTable => _onClickAddHandler => modal");
            if (props.type !== 'localSide') {
                setVisibleModals({...visibleModals, addOnServer: true});
            } else {
                if (modals && (modals.find(modal => modal.type === 'select') !== undefined)) {
                    setVisibleModals({...visibleModals, select: true});
                    // console.log("FormTable => _onClickAddHandler => select", modals.find(modal => modal.type === 'select'));
                } else {
                    setVisibleModals({...visibleModals, addOnLocal: true});
                    // console.log("FormTable => _onClickAddHandler => addOnLocal"); location.pathname
                }
            }
        } else if (equalsActionTypeCmdBtn('add', 'page')) {
            history.push(`${history.location.pathname}/new`);
        }
    };

    /** Добавить копированием */
    const _onClickAddAsCopyHandler = (event, row) => {
        _addRowToLocalTable(row);
    };

    /** Добавить группу */
    const _onClickAddGroupHandler = () => {
        if(equalsActionTypeCmdBtn('addGroup', 'modal')) {
            // console.log("FormTable => _onClickAddGroupHandler => modal");
            if (props.type !== 'localSide')
                setVisibleModals({...visibleModals, addGroupOnServer: true});
            else
                setVisibleModals({...visibleModals, addGroupOnLocal: true});
        } else if (equalsActionTypeCmdBtn('addGroup', 'page')) {
            // console.log("FormTable => _onClickAddGroupHandler => page");
            history.push(`${history.location.pathname}/newGroup`);
        }
    };

    /** Изменить */
    const _onClickEditHandler = (event, {rowData}) => {
        // console.log("FormTable -> _onClickEditHandler -> row ", rowData, props.type);
        if (rowData[isGroupKey]) {
            if (equalsActionTypeCmdBtn('edit', 'g/modal')) {
                // console.log("FormTable => _onClickEditHandler => g/modal");
                if (props.type !== 'localSide')
                    setVisibleModals({...visibleModals, editGroupOnServer: true});
                else
                    setVisibleModals({...visibleModals, editGroupOnLocal: true});
            } else if (equalsActionTypeCmdBtn('edit', 'g/page')) {
                // console.log("FormTable => _onClickEditHandler => g/page");
                history.push(`${history.location.pathname}/${rowData[rowKey]}`);
            }
        } else {
            if (equalsActionTypeCmdBtn('edit', 'i/modal')) {
                // console.log("FormTable => _onClickEditHandler => i/modal");
                if (props.type !== 'localSide')
                    setVisibleModals({...visibleModals, editOnServer: true});
                else
                    setVisibleModals({...visibleModals, editOnLocal: true});
            } else if (equalsActionTypeCmdBtn('edit', 'i/page')) {
                // console.log("FormTable => _onClickEditHandler => i/page");
                history.push(`${history.location.pathname}/${rowData[rowKey]}`);
            }
        }
    };

    /** Удалить */
    const _onClickDelete = (event, _selectedRowKeys) => {
        if(props.type === 'localSide') {
            const _rows = tableRows.filter(
                (item) => !_selectedRowKeys.includes(item[rowKey])
            );
            setTableRows(_rows);
            _onChange(_rows);
        } else {
            if(_selectedRowKeys && _selectedRowKeys.length > 0 && requestDeleteRow){
                const deleteData = _selectedRowKeys.map(item => { return {[rowKey]: item, ...dataDeleteRow} } );
                requestDeleteRow({data: {deleteData: deleteData}})
                    .then((response) => {
                        antNotification.success({message: 'Успешное удаленение'});
                        tableRef && tableRef.reloadData({});

                    })
                    .catch(error => {
                        notificationError(error, 'Ошибка удаления записи');
                        tableRef && tableRef.reloadData({});
                    });
            }
        }
        cmdProps.onClickDelete && cmdProps.onClickDelete(event, _selectedRowKeys);
    };

    /** Переместить вверх / вниз */
    const _onClickUpHandler = (event, row, rows) => {
        _onChange(rows);
        cmdProps.onClickUp && cmdProps.onClickUp(event, row, rows);
    };

    const _onClickDownHandler = (event, row, rows) => {
        _onChange(rows);
        cmdProps.onClickDown && cmdProps.onClickDown(event, row, rows);
    };

    /** Modal Events */
    const _onSaveRow = ({type, row, requestSaveRow}) => {
        // console.log("FormTable -> _saveRow -> row ", row);
        if(type === 'select') {
            // Получить массив строк из таблицы в модальной форме
            let selectRows = row[name];
            // console.log("FormTable -> _onSaveRow -> row [0]", row);
            // console.log("FormTable -> _onSaveRow -> saveRows [0]", selectRows);

            // Фильтрация выбранных строк, оставить только те которых еще нет в таблице
            let saveRows = selectRows.filter((sRow) =>
                tableRows.findIndex((tRow) => tRow[rowKey] === sRow[rowKey]) === -1
            );
            // console.log("FormTable -> _onSaveRow -> saveRows [1]", saveRows);
            if (customFields)
                // Фильтрация по пользовательским параметрам
                saveRows = saveRows.filter((sRow) => {
                    let isValid = true;
                    customFields.forEach((field) => {
                        // Валидация по пользовательской логике функции validate
                        if(field.validate)
                            isValid = field.validate(sRow, tableRows);

                        // Создание или переобразование по пользовательской логике функции value
                        if(field.value)
                            sRow[field.name] = field.value(sRow, tableRows);
                    });
                    if(isValid)
                        return sRow;
                });
            setVisibleModals({ ...visibleModals, [type]: false });
            notification.success({
                message: `Добавлено ${saveRows.length} строк`
            });
            // console.log("FormTable -> _onSaveRow -> saveRows [2]", saveRows);
            _addRowsToLocalTable([...tableRows, ...saveRows]);
        }
        else {
            let saveRow = {...row};
            if(type.indexOf('Group') !== -1)
                saveRow[isGroupKey] = true;
            else
                saveRow[isGroupKey] = false;
            if (customFields)
                customFields.forEach((field) => saveRow[field.name] = field.value(saveRow, tableRows));
            switch (type) {
                case 'addOnServer':
                case 'editOnServer':
                case 'addGroupOnServer':
                case 'editGroupOnServer':
                    _addRowToServerTable({requestSaveRow, type, saveRow});
                    break;
                case 'addOnLocal':
                case 'addGroupOnLocal':
                    setVisibleModals({ ...visibleModals, [type]: false });
                    _addRowToLocalTable(saveRow);
                    break;
                case 'editOnLocal':
                case 'editGroupOnLocal':
                    setVisibleModals({ ...visibleModals, [type]: false });
                    _editRowToLocalTable(saveRow);
                    break;

                //            addGroupOnServer: false,
                //         editGroupOnServer: false,
                //         addGroupOnLocal: false,
                //         editGroupOnLocal: false,
                // case 'select':
                case 'viewGroup':
                case 'viewObject':
                    setVisibleModals({ ...visibleModals, [type]: false });
                    break;
            }
            // console.log("Modal Events => type: ", type, itemName, componentType, saveRow);
        }

    };

    const _addRowToLocalTable = (row) => {
        let saveObj = {...row};
        if(rowKeyType === 'uuid')
            saveObj[rowKey] = generateUUID();

        // console.log('_addRowToLocalTable', tableRows);
        _addRowsToLocalTable([...tableRows, saveObj]);
    };

    const _editRowToLocalTable = (row) => {
        let arr = [...tableRows];
        const rowIndex = arr.findIndex(item => item[rowKey] === row[rowKey]);
        arr.splice(rowIndex, 1, row);
        setTableRows(arr);
        setTableSelectedRow(row);
        _onChange(arr);
    };

    const _addRowsToLocalTable = (rows, keys) => {
        // console.log('FormTable -> _addRowsToLocalTable -> rows', rows, keys);
        setTableRows(rows);
        if(props.selectable)
            _onChange(keys);
        else
            _onChange(rows);
    };

    const _addRowToServerTable = ({requestSaveRow, type, saveRow}) => {
        if (requestSaveRow
            && ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'].includes(type)
        ) {
            const method = (type === 'addOnServer' || type === 'addGroupOnServer') ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, itemName, componentType, saveRow);
            requestSaveRow({
                method,
                data: saveRow,
            })
                .then(response => {
                    notification.success({
                        message: 'Сохранение прошло успешно'
                    });
                    setVisibleModals({ ...visibleModals, [type]: false });
                    tableRef && tableRef.reloadData({ filter: props.defaultFilter});
                    // ref && ref.current && ref.current.reloadData({ filter: props.defaultFilter});
                    // console.log('_addRowToServerTable tableRef =>', tableRef);
                })
                .catch(error => notificationError(error, 'Ошибка при сохранении') );
        }
    };

    const _onRowClick = ({selected, rowData, rowIndex, rowKey}) => {
        if(!props.selectable) {
            setTableSelectedRow(rowData);
            setTableSelectedRowKeys([rowKey]);
            if(componentType === 'SelectTable')
                _onChange([rowData]);
        }
        props.onRowClick && props.onRowClick({selected, rowData, rowIndex, rowKey});
    };

    const _onRowDoubleClick = ({rowData, rowIndex, rowKey}) => {
        if (rowData[isGroupKey]) {
            setVisibleModals({...visibleModals, viewGroup: true});
        } else {
            setVisibleModals({...visibleModals, viewObject: true});
        }
        props.onRowDoubleClick && props.onRowDoubleClick({rowData, rowIndex, rowKey});
    };

    const _onSelectedRowsChange = (keys, rows) => {
        // console.log("_onSelectedRowsChange", keys, rows);
        if(props.selectable) {
            setTableSelectedRow(rows[0]);
            setTableSelectedRowKeys(keys);
            _onChange(rows);
        }
    };

    const _onChange = (rows) => {
        if(rows !== undefined)
            props.onChange(rows);
        else
            props.onChange(tableRows);
    };

    const getTableCls = () => {
        let cls = [`${rtPrefix}-form-table`];
        if (props.className)
            cls.push(props.className);
        return cls.join(' ');
    };

    return (
        <div className={getTableCls()} style={props.style} >
            <AdvancedTable
                ref={_setTableRef}
                {...getObjectExcludedProps(props, excludeProps)}
                rows={tableRows}
                setRows={setTableRows}
                // selectedRowKeys={tableSelectedRow[rowKey] ? [tableSelectedRow[rowKey]] : []}
                selectedRowKeys={tableSelectedRowKeys}
                onRowClick={_onRowClick}
                onRowDoubleClick={_onRowDoubleClick}
                onSelectedRowsChange={_onSelectedRowsChange}
                autoDeleteRows={false}
                commandPanelProps={{
                    ...props.commandPanelProps,
                    showElements: getEvents(),// getShowElements(),
                    onClickAdd: _onClickAddHandler,
                    onClickAddAsCopy: _onClickAddAsCopyHandler,
                    onClickAddGroup: _onClickAddGroupHandler,
                    onClickEdit: _onClickEditHandler,
                    onClickDelete: _onClickDelete,
                    onClickDown: _onClickDownHandler,
                    onClickUp: _onClickUpHandler,
                }}
                filterPanelProps={{
                    ...props.filterPanelProps,
                    // onApplyFilter: (filter) => console.log('filter', filter)
                }}
            />
            {modals && getModals()}
        </div>
    );
});

FormTable.propTypes = {
    /** Объект со свойствами Command Panel */
    commandPanelProps: PropTypes.object,

    /** Объект со свойствами Filter Panel */
    filterPanelProps: PropTypes.object,

    /**
     * ПРОПСЫ ЗАДАНИЯ ЗНАЧЕНИЙ ПО УМОЛЧАНИЮ
     * */

    /** Строки по умолчанию */
    defaultRows: PropTypes.arrayOf(PropTypes.object),

    /** Ключи выделенных по умолчанию строк */
    defaultSelectedRowKeys: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue: PropTypes.string,

    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.object,

    /** Сортировка по умолчанию */
    defaultSortBy: PropTypes.shape({
        key: PropTypes.string,
        order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC]),
    }),

    /**
     * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
     * */

    /** Значение строки поиска */
    searchValue: PropTypes.string,

    /** Фильтр */
    filter: PropTypes.object,

    /** Объект сортировки ({ key: 'string', order: 'asc' }).
     * key - поле по которому сотрировать,
     * order - направление сортировки ("asc", "desc")
     * */
    sortBy: PropTypes.shape({
        key: PropTypes.string,
        order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC]),
    }),

    /**
     * BASE PROPS
     * */

    /** Автоудаление строк из таблицы по кнопке в командной панели*/
    autoDeleteRows: PropTypes.bool,

    /** Поле для уникальной идентификации строки */
    rowKey: PropTypes.string,

    /** Тип поля для уникальной идентификации строки */
    rowKeyType: PropTypes.oneOf(['uuid', 'number']),

    /**
     * VIEW PROPS
     * */

    /** Вывод когда нет данных. JSX для заглушки "Нет данных".  */
    empty: PropTypes.element,

    /** Отображение загрузки данных. JSX для загрузки данных. */
    overlay: PropTypes.element,

    /** Фиксированная ширина столбцов. Появится боковой скрол */
    fixWidthColumn: PropTypes.bool,

    /** Высота подвала */
    footerHeight: PropTypes.number,

    /** Отображать ли подвал */
    footerShow: PropTypes.bool,

    /** Названия футтера */
    footerTitles: PropTypes.shape({
        selectedRows: PropTypes.string,
        loadedRows: PropTypes.string,
        totalRows: PropTypes.string,
    }),

    /** Высота заголовка таблицы */
    headerHeight: PropTypes.number,

    /** Высота строки таблицы */
    rowHeight: PropTypes.number,

    /** Custom row renderer
     * Параметры - ({ isScrolling, cells, columns, rowData, rowIndex, depth }) */
    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

    /** Строки будут в зебро-стиле */
    zebraStyle: PropTypes.bool,

    /**
     * LOAD DATA PROPS
     * */

    /** Порог в пикселях для вызова _onLoad.
     * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
    loadThreshold: PropTypes.number,

    /** Размер страницы */
    pageSize: PropTypes.number,

    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.func,

    /** Функция запроса для загрузки строк (данных) */
    requestLoadCount: PropTypes.func,

    /** Имя параметра для поиска */
    searchParamName: PropTypes.string,

    /**
     * SELECTABLE PROPS
     * */

    /** Таблица с возможностью выбора строки */
    selectable: PropTypes.bool,

    /**
     * TREE PROPS
     * */

    /** Родительский узел и дочерние узлы связаны (Работает только при selectable) */
    nodeAssociated: PropTypes.bool,

    /** Ключ колонки по которой строить иерархию */
    expandColumnKey: PropTypes.string,

    /** Открыть по умолчанию вложенность до уровня N или 'All' */
    expandDefaultAll: PropTypes.bool,

    /** Загружать ноды иерархии по одной */
    expandLazyLoad: PropTypes.bool,

    /** Поле в котором хранится ссылка на родителя */
    expandParentKey: PropTypes.string,

    /**
     * EVENTS
     * */

    /** Событие при клике на строку (только при selectable = false)
     * Параметр - ({selected, rowData, rowIndex}) */
    onRowClick: PropTypes.func,

    /** Событие при двойном клике на строку.
     * Параметр - ({rowData, rowIndex, rowKey}) */
    onRowDoubleClick: PropTypes.func,

    /** События при открытии / закрытии ноды
     * Парметры - ({ expanded, rowData, rowIndex, rowKey }) */
    onRowExpand: PropTypes.func,

    /** Событие при выборе строки.
     * Параметр - массив выбранных строе (только rowKey) */
    onSelectedRowsChange: PropTypes.func,

    /** События при открытии / закрытии ноды
     * Парметры - (expandedRowKeys) - массив ключей открытых нод */
    onExpandedRowsChange: PropTypes.func,

    /** SELECTED PANEL */

    /** Отображать ли панель выбранных элементов */
    showSelection: PropTypes.bool,

    /** Строка или функция для отображения элементов списка выбранных
     * Строка - имя поля
     * Функция - рендер строк.
     * Параметры - ({ rowData, rowIndex }) */
    rowRenderShowSelection: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),


    /** Дополнительные пропсы для колонок */
    customColumnProps: PropTypes.arrayOf(PropTypes.object),

    /** Дополнительные поля и валидация в объекты таблицы */
    customFields: PropTypes.arrayOf(PropTypes.object),

    /** Модальные окна */
    modals: PropTypes.arrayOf(PropTypes.object),

    /** Событие об изменении объектов таблицы
     * Параметр - (rows)*/
    onChange: PropTypes.func,

    /** implemented - только для (LocalTable + selectable) - Контроль значение из вне */
    // value: PropTypes.arrayOf(PropTypes.object),

    /** Not implemented - Задание значений по умолчанию */
    defaultValue: PropTypes.arrayOf(PropTypes.object),

    /** Классы стилей */
    className: PropTypes.string,

    /** Стили */
    style: PropTypes.object,

    /** Поле для идентификации группы */
    isGroupKey: PropTypes.string,

    /** Объект history для перемещения по путям */
    history: PropTypes.object,

    /** Функция запроса на получение конфига для таблицы */
    requestLoadConfig: PropTypes.func,

    /** Функция запроса на уделание данных */
    requestDeleteRow: PropTypes.func,

    /** Параметры объекта удаления */
    dataDeleteRow: PropTypes.object,
};

FormTable.defaultProps = {
    defaultRows: [],
    defaultSelectedRowKeys: [],
    defaultSearchValue: '',
    defaultFilter: {},
    defaultSortBy: {},

    searchValue: '',
    filter: {},
    sortBy: {},

    autoDeleteRows: true,
    rowKey: 'id',

    empty: empty,
    overlay: overlay,
    fixWidthColumn: false,
    footerHeight: 30,
    footerShow: false,
    footerTitles: {
        selectedRows: 'Выделено:',
        loadedRows: 'Загружено записей:',
        totalRows: 'Всего записей:',
    },
    headerHeight: 30,
    rowHeight: 30,
    zebraStyle: false,

    loadThreshold: 300,
    pageSize: 50,
    requestLoadRows: noop,
    requestLoadCount: noop,
    searchParamName: 'searchLine',

    selectable: false,

    nodeAssociated: true,
    expandColumnKey: undefined,
    expandDefaultAll: true,
    expandLazyLoad: false,
    expandParentKey: 'parentId',

    onRowClick: noop,
    onRowDoubleClick: noop,
    onRowExpand: noop,
    onSelectedRowsChange: noop,
    onExpandedRowsChange: noop,

    showSelection: false,

    rowKeyType: 'uuid',
    onChange: noop,
    isGroupKey: 'isGroup',
};

export default FormTable;
