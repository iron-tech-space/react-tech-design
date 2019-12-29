import 'antd/es/notification/style';
import _notification from 'antd/es/notification';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _this = this;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SortOrder from 'react-base-table/lib/SortOrder';
import AdvancedTable from '../AdvancedTable/AdvancedTable';
import { generateUUID, getObjectExcludedProps, noop, notificationError } from "../utils/baseUtils";
import FormModal from './FormModal';

import { rtPrefix } from "../utils/variables";
import { empty, overlay } from "../Table/defaultSettings";

var excludeProps = ['onChange', 'defaultValue', 'modals', 'events', 'history'];

var FormTable = forwardRef(function (props, ref) {

    /** Состояние первоначалной настройки компонента*/
    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        loading = _useState2[0],
        setLoading = _useState2[1];

    /** Состояние отображения модалок таблицы */


    var _useState3 = useState({
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
        viewObject: false }),
        _useState4 = _slicedToArray(_useState3, 2),
        visibleModals = _useState4[0],
        setVisibleModals = _useState4[1];

    var _useState5 = useState([]),
        _useState6 = _slicedToArray(_useState5, 2),
        tableRows = _useState6[0],
        setTableRows = _useState6[1];

    var _useState7 = useState([]),
        _useState8 = _slicedToArray(_useState7, 2),
        tableSelectedRowKeys = _useState8[0],
        setTableSelectedRowKeys = _useState8[1];

    var _useState9 = useState({}),
        _useState10 = _slicedToArray(_useState9, 2),
        tableSelectedRow = _useState10[0],
        setTableSelectedRow = _useState10[1];

    /** Ссылка на объект таблицы */


    var _useState11 = useState({}),
        _useState12 = _slicedToArray(_useState11, 2),
        tableRef = _useState12[0],
        setTableRef = _useState12[1];

    var _setTableRef = function _setTableRef(_ref) {
        setTableRef(_ref);
        ref && ref(_ref);
    };

    var rowKey = props.rowKey,
        rowKeyType = props.rowKeyType,
        customFields = props.customFields,
        modals = props.modals,
        isGroupKey = props.isGroupKey,
        history = props.history,
        componentType = props.componentType,
        name = props.name,
        value = props.value,
        requestDeleteRow = props.requestDeleteRow,
        dataDeleteRow = props.dataDeleteRow;

    var cmdProps = props.commandPanelProps;

    // let advancedTableProps = getObjectExcludedProps(props, excludeProps);

    /** Аналог componentDidMounted */
    useEffect(function () {
        // Если таблица локальная, то пробуем загрузить исходные данные
        if (!loading && props.type === 'localSide') {
            var cleanupFunction = false;
            setLoading(true);
            var loadData = function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    if (!loading && props.requestLoadRows) {
                                        props.requestLoadRows({ params: { page: 0, size: 1 }, data: {} }).then(function (response) {
                                            // console.log('FormTable -> requestLoadRows -> response', response);
                                            // console.log('FormTable -> requestLoadRows -> value', value);
                                            if (!cleanupFunction) _addRowsToLocalTable(response.data, value);
                                        }).catch(function (error) {
                                            return notificationError(error, 'Ошибка загрузки данных');
                                        });
                                    }
                                    // console.log('FormTable -> setMounted ', advancedTableProps.type);
                                    setLoading(false);

                                case 2:
                                case 'end':
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function loadData() {
                    return _ref2.apply(this, arguments);
                };
            }();
            loadData();
            return function () {
                return cleanupFunction = true;
            };
        }
    }, [props.type]);

    useEffect(function () {
        if (props.selectable) {
            console.log("FormTable => useEffect => value: ", value);
            if (value && value.length > 0) setTableSelectedRowKeys(value.map(function (item) {
                return item[rowKey];
            }));else setTableSelectedRowKeys([]);
        }
    }, [value]);

    /** Получить список кнопок для Command Panel */
    var getEvents = function getEvents() {
        return cmdProps && cmdProps.systemBtnProps && Object.keys(cmdProps.systemBtnProps) || [];
    };

    /** Получить рендер модалок */
    var getModals = function getModals() {
        return modals.map(function (modal, index) {
            return React.createElement(FormModal, {
                key: index,
                modal: modal,
                selectedRow: tableSelectedRow,
                visible: visibleModals[modal.type],
                setVisible: function setVisible(type, value) {
                    return setVisibleModals(_extends({}, visibleModals, _defineProperty({}, type, value)));
                },
                saveRow: _onSaveRow
            });
        });
    };

    /** Проверка существования кнопки в Command Panel */
    var isExistCmdBtn = function isExistCmdBtn(btnType) {
        return cmdProps && cmdProps.systemBtnProps && cmdProps.systemBtnProps[btnType];
    };

    /** Проверка соответствия типа кнопки и события ? (params) === (props) */
    var equalsActionTypeCmdBtn = function equalsActionTypeCmdBtn(btnType, actionType) {
        if (isExistCmdBtn(btnType)) {
            if (btnType === 'edit') {
                var aTypes = actionType.split('/');
                if (aTypes[0] === 'g') {
                    return !!(cmdProps.systemBtnProps[btnType].actionType && cmdProps.systemBtnProps[btnType].actionType.length === 2 && cmdProps.systemBtnProps[btnType].actionType[1] === aTypes[1]);
                } else if (aTypes[0] === 'i') {
                    return !!(cmdProps.systemBtnProps[btnType].actionType && cmdProps.systemBtnProps[btnType].actionType.length === 2 && cmdProps.systemBtnProps[btnType].actionType[0] === aTypes[1]);
                }
            } else {
                return !!(cmdProps.systemBtnProps[btnType].actionType && cmdProps.systemBtnProps[btnType].actionType === actionType);
            }
        }
        return false;
    };

    /** Command Panel Events */
    /** Добавить */
    var _onClickAddHandler = function _onClickAddHandler() {
        if (equalsActionTypeCmdBtn('add', 'modal')) {
            // console.log("FormTable => _onClickAddHandler => modal");
            if (props.type !== 'localSide') {
                setVisibleModals(_extends({}, visibleModals, { addOnServer: true }));
            } else {
                if (modals && modals.find(function (modal) {
                    return modal.type === 'select';
                }) !== undefined) {
                    setVisibleModals(_extends({}, visibleModals, { select: true }));
                    // console.log("FormTable => _onClickAddHandler => select", modals.find(modal => modal.type === 'select'));
                } else {
                    setVisibleModals(_extends({}, visibleModals, { addOnLocal: true }));
                    // console.log("FormTable => _onClickAddHandler => addOnLocal"); location.pathname
                }
            }
        } else if (equalsActionTypeCmdBtn('add', 'page')) {
            history.push(history.location.pathname + '/new');
        }
    };

    /** Добавить копированием */
    var _onClickAddAsCopyHandler = function _onClickAddAsCopyHandler(event, row) {
        _addRowToLocalTable(row);
    };

    /** Добавить группу */
    var _onClickAddGroupHandler = function _onClickAddGroupHandler() {
        if (equalsActionTypeCmdBtn('addGroup', 'modal')) {
            // console.log("FormTable => _onClickAddGroupHandler => modal");
            if (props.type !== 'localSide') setVisibleModals(_extends({}, visibleModals, { addGroupOnServer: true }));else setVisibleModals(_extends({}, visibleModals, { addGroupOnLocal: true }));
        } else if (equalsActionTypeCmdBtn('addGroup', 'page')) {
            // console.log("FormTable => _onClickAddGroupHandler => page");
            history.push(history.location.pathname + '/newGroup');
        }
    };

    /** Изменить */
    var _onClickEditHandler = function _onClickEditHandler(event, _ref3) {
        var rowData = _ref3.rowData;

        // console.log("FormTable -> _onClickEditHandler -> row ", rowData, props.type);
        if (rowData[isGroupKey]) {
            if (equalsActionTypeCmdBtn('edit', 'g/modal')) {
                // console.log("FormTable => _onClickEditHandler => g/modal");
                if (props.type !== 'localSide') setVisibleModals(_extends({}, visibleModals, { editGroupOnServer: true }));else setVisibleModals(_extends({}, visibleModals, { editGroupOnLocal: true }));
            } else if (equalsActionTypeCmdBtn('edit', 'g/page')) {
                // console.log("FormTable => _onClickEditHandler => g/page");
                history.push(history.location.pathname + '/' + rowData[rowKey]);
            }
        } else {
            if (equalsActionTypeCmdBtn('edit', 'i/modal')) {
                // console.log("FormTable => _onClickEditHandler => i/modal");
                if (props.type !== 'localSide') setVisibleModals(_extends({}, visibleModals, { editOnServer: true }));else setVisibleModals(_extends({}, visibleModals, { editOnLocal: true }));
            } else if (equalsActionTypeCmdBtn('edit', 'i/page')) {
                // console.log("FormTable => _onClickEditHandler => i/page");
                history.push(history.location.pathname + '/' + rowData[rowKey]);
            }
        }
    };

    /** Удалить */
    var _onClickDelete = function _onClickDelete(event, _selectedRowKeys) {
        if (props.type === 'localSide') {
            var _rows = tableRows.filter(function (item) {
                return !_selectedRowKeys.includes(item[rowKey]);
            });
            setTableRows(_rows);
            _onChange(_rows);
        } else {
            if (_selectedRowKeys && _selectedRowKeys.length > 0 && requestDeleteRow) {
                var deleteData = _selectedRowKeys.map(function (item) {
                    return _extends(_defineProperty({}, rowKey, item), dataDeleteRow);
                });
                requestDeleteRow({ data: { deleteData: deleteData } }).then(function (response) {
                    _notification.success({ message: 'Успешное удаленение' });
                    tableRef && tableRef.reloadData({});
                }).catch(function (error) {
                    notificationError(error, 'Ошибка удаления записи');
                    tableRef && tableRef.reloadData({});
                });
            }
        }
        cmdProps.onClickDelete && cmdProps.onClickDelete(event, _selectedRowKeys);
    };

    /** Переместить вверх / вниз */
    var _onClickUpHandler = function _onClickUpHandler(event, row, rows) {
        _onChange(rows);
        cmdProps.onClickUp && cmdProps.onClickUp(event, row, rows);
    };

    var _onClickDownHandler = function _onClickDownHandler(event, row, rows) {
        _onChange(rows);
        cmdProps.onClickDown && cmdProps.onClickDown(event, row, rows);
    };

    /** Modal Events */
    var _onSaveRow = function _onSaveRow(_ref4) {
        var type = _ref4.type,
            row = _ref4.row,
            requestSaveRow = _ref4.requestSaveRow;

        // console.log("FormTable -> _saveRow -> row ", row);
        if (type === 'select') {
            // Получить массив строк из таблицы в модальной форме
            var selectRows = row[name];
            // console.log("FormTable -> _onSaveRow -> row [0]", row);
            // console.log("FormTable -> _onSaveRow -> saveRows [0]", selectRows);

            // Фильтрация выбранных строк, оставить только те которых еще нет в таблице
            var saveRows = selectRows.filter(function (sRow) {
                return tableRows.findIndex(function (tRow) {
                    return tRow[rowKey] === sRow[rowKey];
                }) === -1;
            });
            // console.log("FormTable -> _onSaveRow -> saveRows [1]", saveRows);
            if (customFields)
                // Фильтрация по пользовательским параметрам
                saveRows = saveRows.filter(function (sRow) {
                    var isValid = true;
                    customFields.forEach(function (field) {
                        // Валидация по пользовательской логике функции validate
                        if (field.validate) isValid = field.validate(sRow, tableRows);

                        // Создание или переобразование по пользовательской логике функции value
                        if (field.value) sRow[field.name] = field.value(sRow, tableRows);
                    });
                    if (isValid) return sRow;
                });
            setVisibleModals(_extends({}, visibleModals, _defineProperty({}, type, false)));
            _notification.success({
                message: '\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E ' + saveRows.length + ' \u0441\u0442\u0440\u043E\u043A'
            });
            // console.log("FormTable -> _onSaveRow -> saveRows [2]", saveRows);
            _addRowsToLocalTable([].concat(_toConsumableArray(tableRows), _toConsumableArray(saveRows)));
        } else {
            var saveRow = _extends({}, row);
            if (type.indexOf('Group') !== -1) saveRow[isGroupKey] = true;else saveRow[isGroupKey] = false;
            if (customFields) customFields.forEach(function (field) {
                return saveRow[field.name] = field.value(saveRow, tableRows);
            });
            switch (type) {
                case 'addOnServer':
                case 'editOnServer':
                case 'addGroupOnServer':
                case 'editGroupOnServer':
                    _addRowToServerTable({ requestSaveRow: requestSaveRow, type: type, saveRow: saveRow });
                    break;
                case 'addOnLocal':
                case 'addGroupOnLocal':
                    setVisibleModals(_extends({}, visibleModals, _defineProperty({}, type, false)));
                    _addRowToLocalTable(saveRow);
                    break;
                case 'editOnLocal':
                case 'editGroupOnLocal':
                    setVisibleModals(_extends({}, visibleModals, _defineProperty({}, type, false)));
                    _editRowToLocalTable(saveRow);
                    break;

                //            addGroupOnServer: false,
                //         editGroupOnServer: false,
                //         addGroupOnLocal: false,
                //         editGroupOnLocal: false,
                // case 'select':
                case 'viewGroup':
                case 'viewObject':
                    setVisibleModals(_extends({}, visibleModals, _defineProperty({}, type, false)));
                    break;
            }
            // console.log("Modal Events => type: ", type, itemName, componentType, saveRow);
        }
    };

    var _addRowToLocalTable = function _addRowToLocalTable(row) {
        var saveObj = _extends({}, row);
        if (rowKeyType === 'uuid') saveObj[rowKey] = generateUUID();

        // console.log('_addRowToLocalTable', tableRows);
        _addRowsToLocalTable([].concat(_toConsumableArray(tableRows), [saveObj]));
    };

    var _editRowToLocalTable = function _editRowToLocalTable(row) {
        var arr = [].concat(_toConsumableArray(tableRows));
        var rowIndex = arr.findIndex(function (item) {
            return item[rowKey] === row[rowKey];
        });
        arr.splice(rowIndex, 1, row);
        setTableRows(arr);
        setTableSelectedRow(row);
        _onChange(arr);
    };

    var _addRowsToLocalTable = function _addRowsToLocalTable(rows, keys) {
        // console.log('FormTable -> _addRowsToLocalTable -> rows', rows, keys);
        setTableRows(rows);
        if (props.selectable) _onChange(keys);else _onChange(rows);
    };

    var _addRowToServerTable = function _addRowToServerTable(_ref5) {
        var requestSaveRow = _ref5.requestSaveRow,
            type = _ref5.type,
            saveRow = _ref5.saveRow;

        if (requestSaveRow && ['addOnServer', 'editOnServer', 'addGroupOnServer', 'editGroupOnServer'].includes(type)) {
            var method = type === 'addOnServer' || type === 'addGroupOnServer' ? 'POST' : 'PUT';
            // console.log("Modal Events => type: ", type, itemName, componentType, saveRow);
            requestSaveRow({
                method: method,
                data: saveRow
            }).then(function (response) {
                _notification.success({
                    message: 'Сохранение прошло успешно'
                });
                setVisibleModals(_extends({}, visibleModals, _defineProperty({}, type, false)));
                tableRef && tableRef.reloadData({ filter: props.defaultFilter });
                // ref && ref.current && ref.current.reloadData({ filter: props.defaultFilter});
                // console.log('_addRowToServerTable tableRef =>', tableRef);
            }).catch(function (error) {
                return notificationError(error, 'Ошибка при сохранении');
            });
        }
    };

    var _onRowClick = function _onRowClick(_ref6) {
        var selected = _ref6.selected,
            rowData = _ref6.rowData,
            rowIndex = _ref6.rowIndex,
            rowKey = _ref6.rowKey;

        if (!props.selectable) {
            setTableSelectedRow(rowData);
            setTableSelectedRowKeys([rowKey]);
            if (componentType === 'SelectTable') _onChange([rowData]);
        }
        props.onRowClick && props.onRowClick({ selected: selected, rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
    };

    var _onRowDoubleClick = function _onRowDoubleClick(_ref7) {
        var rowData = _ref7.rowData,
            rowIndex = _ref7.rowIndex,
            rowKey = _ref7.rowKey;

        if (rowData[isGroupKey]) {
            setVisibleModals(_extends({}, visibleModals, { viewGroup: true }));
        } else {
            setVisibleModals(_extends({}, visibleModals, { viewObject: true }));
        }
        props.onRowDoubleClick && props.onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey });
    };

    var _onSelectedRowsChange = function _onSelectedRowsChange(keys, rows) {
        // console.log("_onSelectedRowsChange", keys, rows);
        if (props.selectable) {
            setTableSelectedRow(rows[0]);
            setTableSelectedRowKeys(keys);
            _onChange(rows);
        }
    };

    var _onChange = function _onChange(rows) {
        if (rows !== undefined) props.onChange(rows);else props.onChange(tableRows);
    };

    var getTableCls = function getTableCls() {
        var cls = [rtPrefix + '-form-table'];
        if (props.className) cls.push(props.className);
        return cls.join(' ');
    };

    return React.createElement(
        'div',
        { className: getTableCls(), style: props.style },
        React.createElement(AdvancedTable, _extends({
            ref: _setTableRef
        }, getObjectExcludedProps(props, excludeProps), {
            rows: tableRows,
            setRows: setTableRows
            // selectedRowKeys={tableSelectedRow[rowKey] ? [tableSelectedRow[rowKey]] : []}
            , selectedRowKeys: tableSelectedRowKeys,
            onRowClick: _onRowClick,
            onRowDoubleClick: _onRowDoubleClick,
            onSelectedRowsChange: _onSelectedRowsChange,
            autoDeleteRows: false,
            commandPanelProps: _extends({}, props.commandPanelProps, {
                showElements: getEvents(), // getShowElements(),
                onClickAdd: _onClickAddHandler,
                onClickAddAsCopy: _onClickAddAsCopyHandler,
                onClickAddGroup: _onClickAddGroupHandler,
                onClickEdit: _onClickEditHandler,
                onClickDelete: _onClickDelete,
                onClickDown: _onClickDownHandler,
                onClickUp: _onClickUpHandler
            }),
            filterPanelProps: _extends({}, props.filterPanelProps)
        })),
        modals && getModals()
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
    defaultSelectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue: PropTypes.string,

    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.object,

    /** Сортировка по умолчанию */
    defaultSortBy: PropTypes.shape({
        key: PropTypes.string,
        order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
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
        order: PropTypes.oneOf([SortOrder.ASC, SortOrder.DESC])
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
        totalRows: PropTypes.string
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
    rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

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
    dataDeleteRow: PropTypes.object
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
        totalRows: 'Всего записей:'
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
    isGroupKey: 'isGroup'
};

export default FormTable;