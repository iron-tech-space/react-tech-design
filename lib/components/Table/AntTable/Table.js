import "antd/es/table/style";
import _Table from "antd/es/table";
import "antd/es/space/style";
import _Space from "antd/es/space";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useRef, useState, useEffect } from "react";
import { rtPrefix } from "../../utils/variables";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AutoResizer } from "react-base-table";
import { VariableSizeGrid as Grid } from 'react-window';
import { findNodeByRowKey, flatten, getObjectExcludedProps, getTableRowKeys, getTableRowObjects, noop, notificationError, useMounted } from "../../utils/baseUtils";

import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined } from "@ant-design/icons";
import { empty, overlay } from "../ReactBaseTable/defaultSettings";
import HeaderCell from "./HeaderCell";
import HeaderRow from "./HeaderRow";
import PropTypes from "prop-types";
import FormItems from "../../Form/FormItems";
import objectPath from "object-path";
import { setDateStore } from "../../../redux/rtd.actions";
import moment from "moment";
import BodyCell from "./BodyCell";

var excludeProps = ["defaultRows", "defaultSelectedRowKeys", "defaultSearchValue", "defaultFilter", "defaultSortBy", "rows", "requestLoadRows", "pageSize", "searchParamName", "onRowClick", "onRowDoubleClick"];

var Table = function Table(props) {
  /** Индикатор загрузки данных */
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  /** TABLE STATES */
  /** Столбцы таблицы */


  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      _columns = _useState4[0],
      _setColumns = _useState4[1];
  /** Строки таблицы */


  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      _rows = _useState6[0],
      _setRows = _useState6[1];
  /** Ключи выделенных строк */


  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      _selectedRowKeys = _useState8[0],
      setSelectedRowKeys = _useState8[1];
  /** Значение строки поиска */


  var _useState9 = useState(""),
      _useState10 = _slicedToArray(_useState9, 2),
      _searchValue = _useState10[0],
      setSearchValue = _useState10[1];
  /** Объект фильтра */


  var _useState11 = useState({}),
      _useState12 = _slicedToArray(_useState11, 2),
      _filter = _useState12[0],
      setFilter = _useState12[1];
  /** Объект соритировки */


  var _useState13 = useState({}),
      _useState14 = _slicedToArray(_useState13, 2),
      _sortBy = _useState14[0],
      setSortBy = _useState14[1];

  /** TREE STATES */
  /** Ключи строк с кубиками при selectable = true */
  // const [_indeterminateRowKeys, setIndeterminateRowKeys] = useState([]);
  /** Ключи раскрытых строк при selectable = true */


  var _useState15 = useState([]),
      _useState16 = _slicedToArray(_useState15, 2),
      _expandedRowKeys = _useState16[0],
      setExpandedRowKeys = _useState16[1];

  /** FOOTER STATES */
  /** Отображать ли footer */


  var _useState17 = useState(false),
      _useState18 = _slicedToArray(_useState17, 2),
      _footerShow = _useState18[0],
      _setFooterShow = _useState18[1];
  /** Всего строк по фильтру в таблице */


  var _useState19 = useState(0),
      _useState20 = _slicedToArray(_useState19, 2),
      _totalCountRows = _useState20[0],
      setTotalCountRows = _useState20[1];

  var _useState21 = useState({}),
      _useState22 = _slicedToArray(_useState21, 2),
      subscribeProps = _useState22[0],
      setSubscribeProps = _useState22[1];

  var _useState23 = useState(0),
      _useState24 = _slicedToArray(_useState23, 2),
      headerHeight = _useState24[0],
      setHeaderHeight = _useState24[1];

  var isMounted = useMounted();

  var _props$subscribeProps = _extends({}, props, subscribeProps),
      columns = _props$subscribeProps.columns,
      editMode = _props$subscribeProps.editMode,
      defaultRows = _props$subscribeProps.defaultRows,
      defaultSearchValue = _props$subscribeProps.defaultSearchValue,
      defaultFilter = _props$subscribeProps.defaultFilter,
      defaultSortBy = _props$subscribeProps.defaultSortBy,
      rows = _props$subscribeProps.rows,
      rowKey = _props$subscribeProps.rowKey,
      customFields = _props$subscribeProps.customFields,
      zebraStyle = _props$subscribeProps.zebraStyle,
      className = _props$subscribeProps.className,
      style = _props$subscribeProps.style,
      pageSize = _props$subscribeProps.pageSize,
      requestLoadRows = _props$subscribeProps.requestLoadRows,
      requestLoadCount = _props$subscribeProps.requestLoadCount,
      searchParamName = _props$subscribeProps.searchParamName,
      rowSelection = _props$subscribeProps.rowSelection,
      selectable = _props$subscribeProps.selectable,
      expandable = _props$subscribeProps.expandable,
      nodeAssociated = _props$subscribeProps.nodeAssociated,
      expandColumnKey = _props$subscribeProps.expandColumnKey,
      expandDefaultAll = _props$subscribeProps.expandDefaultAll,
      onRowClick = _props$subscribeProps.onRowClick,
      onRowDoubleClick = _props$subscribeProps.onRowDoubleClick,
      onExpandedRowsChange = _props$subscribeProps.onExpandedRowsChange,
      dispatchPath = _props$subscribeProps.dispatchPath,
      dispatch = _props$subscribeProps.dispatch,
      subscribe = _props$subscribeProps.subscribe,
      value = _props$subscribeProps.value,
      onChange = _props$subscribeProps.onChange;

  var footerProps = _extends({}, Table.defaultProps.footerProps, props.footerProps);

  var selectedDispatchPath = dispatch && dispatch.path ? dispatch.path + ".selected" : dispatchPath && dispatchPath + ".selected";
  var rowsDispatchPath = dispatch && dispatch.path ? dispatch.path + ".rows" : dispatchPath && dispatchPath + ".rows";

  useEffect(function () {
    // console.log("Инициализация дефолтных значений ", selectColumn, columns);
    // console.log("Инициализация дефолтных значений defaultSelectedRowKeys > ", defaultSelectedRowKeys);

    // Инициализация дефолтных значений
    // _setRows(defaultRows);
    if (defaultRows.length > 0) _setRowsHandler(defaultRows);else if (rows.length > 0) _setRowsHandler(rows);
    setSearchValue(defaultSearchValue);
    setFilter(defaultFilter);
    setSortBy(defaultSortBy);

    // Определение нужно ли отображать подвал
    _setFooterShow(footerProps.showElements.length || footerProps.leftCustomSideElement || footerProps.centerCustomSideElement || footerProps.rightCustomSideElement);

    _loadRows({
      sortBy: defaultSortBy,
      filter: defaultFilter,
      searchLine: defaultSearchValue,
      reload: true
    });
    // console.log("tableRef", tableRef);
  }, []);

  useEffect(function () {
    _setColumns(columns);
  }, [columns]);

  useEffect(function () {
    if (value && Array.isArray(value)) _setRowsHandler(value);
  }, [value]);

  /** Подписка на изменение props[subscribe.name] в сторе */
  subscribe.map(function (item) {
    return useEffect(function () {
      if ((item.withMount || isMounted) && item.name) {
        // console.log("Table => useEffect => ", props); //item.name, props[item.name]
        var extraData = {};
        if (item.extraData) {
          if (_typeof(item.extraData) === 'object') Object.keys(item.extraData).forEach(function (key) {
            return extraData[key] = props[item.name + ".extraData." + key];
          });else extraData = props[item.name + "ExtraData"];
        }
        var onChangeObject = {
          value: props[item.name],
          extraData: extraData, //props[`${item.name}ExtraData`],
          reloadTable: reloadData,
          addRows: _addRows,
          addRow: _addRow,
          addRowAsCopy: _addRowAsCopy,
          editRow: _editRow,
          removeRow: _removeRow,
          moveUpRow: _moveUpSelectedRow,
          moveUpRowByKey: _moveUpRowByKey,
          moveDownRow: _moveDownSelectedRow,
          moveDownRowByKey: _moveDownRowByKey,
          setSubscribeProps: _setSubscribeProps
        };
        item.onChange && item.onChange(onChangeObject);
      }
    }, [props[item.name]]);
  });

  /** BASE FUNCTIONS */
  var _setSubscribeProps = function _setSubscribeProps(props) {
    setSubscribeProps(_extends({}, subscribeProps, props));
  };

  var _setLoadedRowsHandler = function _setLoadedRowsHandler(rows) {
    _setRowsHandler(rows);
    onChange && onChange(rows);
  };
  var _setRowsHandler = function _setRowsHandler(rows) {
    // console.log('_setRowsHandler onChange');
    _setRows(rows);
    // setRows(rows);
    rowsDispatch(rows);
  };

  var _setSelectedRowsHandler = function _setSelectedRowsHandler() {
    var selectedKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var selectedObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var rows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    // console.log('_setSelectedRowsHandler => ', selectedKeys)
    if (!editMode) {
      setSelectedRowKeys(selectedKeys);
      if (selectedKeys.length === 0) {
        if (selectable) selectedDispatch([]);else selectedDispatch(undefined);
      } else if (selectedKeys.length > 0 && !selectedObjects) {
        if (selectable) selectedDispatch(flatten(getTableRowObjects(rows, rowKey)).filter(function (item) {
          return selectedKeys.includes(item[rowKey]);
        }));else selectedDispatch(findNodeByRowKey(rows, rowKey, selectedKeys[0]));
      } else selectedDispatch(selectedObjects);
    }
  };

  var rowsDispatch = function rowsDispatch(rows) {
    rowsDispatchPath && props.setDateStore && props.setDateStore(rowsDispatchPath, rows);
  };

  var selectedDispatch = function selectedDispatch(data) {
    selectedDispatchPath && props.setDateStore && props.setDateStore(selectedDispatchPath, data);
  };

  var onTableEventsDispatch = function onTableEventsDispatch(nameEvent, value) {
    var dp = dispatch && dispatch.path ? dispatch.path + ".events." + nameEvent : dispatchPath && dispatchPath + ".events." + nameEvent;

    dp && props.setDateStore && props.setDateStore(dp, {
      timestamp: moment(),
      value: value
    });
    // console.log('onTableEventsDispatch onChange');
    Array.isArray(value) && onChange && onChange(value);
  };

  var reloadData = function reloadData(_ref, appendParams) {
    var sortBy = _ref.sortBy,
        filter = _ref.filter,
        searchValue = _ref.searchValue;

    // console.log("reloadData params ", sortBy, filter, searchValue, loading);
    if (selectable && props.value && props.value.length > 0) _setSelectedRowsHandler(props.value.map(function (item) {
      return item[rowKey];
    }), props.value);else _setSelectedRowsHandler();

    var __sortBy = appendParams ? sortBy ? sortBy : _sortBy : sortBy;
    var __filter = appendParams ? _extends({}, _filter, filter) : filter;
    var __searchValue = appendParams ? searchValue ? searchValue : _searchValue : searchValue;
    setSortBy(__sortBy);
    setFilter(__filter);
    setSearchValue(__searchValue);
    // console.log("reloadData params ", sortBy, filter, searchValue, loading);
    _loadRows({
      sortBy: __sortBy,
      filter: __filter,
      searchLine: __searchValue,
      reload: true
    });
  };

  var _loadRows = function _loadRows(params) {
    var sortBy = params.sortBy,
        filter = params.filter,
        searchLine = params.searchLine,
        expandRow = params.expandRow,
        reload = params.reload;

    if (!loading && requestLoadRows) {
      setLoading(true);
      var pageNum = 0;
      var _params = {
        page: 0,
        size: pageSize,
        sort: sortBy && sortBy.key ? sortBy.key + "," + sortBy.order : null
      };
      var dataQuery = _extends({}, filter, searchLine ? _defineProperty({}, searchParamName, searchLine) : null);
      if (reload && requestLoadCount !== noop && !expandColumnKey) {
        requestLoadCount({ params: _params, data: dataQuery }).then(function (response) {
          // console.log("infinity then response", response);
          setTotalCountRows(response.data);
        }).catch(function (error) {
          return notificationError(error, 'Ошибка получения количества записей по фильтру');
        });
      }
      requestLoadRows({ params: _params, data: dataQuery }).then(function (response) {
        // console.log("infinity then response", response);
        var result = response.data;
        _setLoadedRowsHandler(result); // _setRows

        if (expandColumnKey) {
          expandDefaultAll && setExpandedRowKeys(flatten(getTableRowKeys(result, rowKey)));
        }

        setLoading(false);
      }).catch(function (error) {
        notificationError(error, "Ошибка загрузки данных");
        _setLoadedRowsHandler(_rows); // _setRows
        // setHasMore(false);
        setLoading(false);
      });
    }
  };

  var onChangeTable = function onChangeTable(pagination, filters, sorter, extra) {
    // console.log('Table onChange', pagination, filters, sorter, extra)
    switch (extra.action) {
      case "paginate":
        break;
      case "sort":
        onSort(sorter);
        break;
      case "filter":
        break;
      default:
        break;
    }
  };

  var onSort = function onSort(sorter) {
    // console.log("Table onSort from RT", sorter);
    var sortBy = sorter.order ? { key: sorter.field, order: sorter.order === "ascend" ? "asc" : "desc" } : {};
    setSortBy(sortBy);
    _loadRows({
      sortBy: sortBy,
      filter: _filter,
      searchLine: _searchValue,
      reload: true
    });
  };

  var _onRowClick = function _onRowClick(_ref3) {
    var rowData = _ref3.rowData,
        rowIndex = _ref3.rowIndex,
        rowKey = _ref3.rowKey;

    // console.log('onClick', onRowClick, rowData, rowIndex, rowKey)
    // console.log('onClick', _selectedRowKeys)
    onTableEventsDispatch("onRowClick", rowData);
    _rowSelectAfterClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey, onClick: onRowClick });
  };
  var _onRowDoubleClick = function _onRowDoubleClick(_ref4) {
    var rowData = _ref4.rowData,
        rowIndex = _ref4.rowIndex,
        rowKey = _ref4.rowKey;

    // console.log('onDoubleClick', onRowDoubleClick, rowData, rowIndex, rowKey);
    // console.log('actionDoubleClick')
    onTableEventsDispatch("onRowDoubleClick", rowData);
    _rowSelectAfterClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowKey, onClick: onRowDoubleClick });
  };

  var _rowSelectAfterClick = function _rowSelectAfterClick(_ref5) {
    var rowData = _ref5.rowData,
        rowIndex = _ref5.rowIndex,
        rowKey = _ref5.rowKey,
        onClick = _ref5.onClick;

    var checked = !_selectedRowKeys.includes(rowKey);
    var newRowObject = {
      rowData: _extends({}, rowData),
      rowIndex: rowIndex,
      rowKey: rowKey
    };
    // _setSelectedRowsHandler([rowKey], rowData);
    // if (!expandColumnKey) {
    // setSelectedRowKeys([rowKey]);
    if (selectable) {
      // console.log('_rowSelectAfterClick ', checked);
      if (checked && !expandColumnKey) _setSelectedRowsHandler([].concat(_toConsumableArray(_selectedRowKeys), [rowKey]), undefined, _rows);else {
        // console.log('_rowSelectAfterClick', _selectedRowKeys.filter(row => row !== rowKey), rowKey);
        _setSelectedRowsHandler(_selectedRowKeys.filter(function (row) {
          return row !== rowKey;
        }), undefined, _rows);
      }
    } else {
      if (checked) _setSelectedRowsHandler([rowKey], rowData);
    }
    // onSelectedRowsChange([rowKey], [rowData]);
    console.log('onRowDoubleClick = ', onClick);
    onClick && onClick(_extends({ selected: checked }, newRowObject));
  };

  var onHeaderRowProps = function onHeaderRowProps() {
    return { headerHeight: headerHeight, setHeaderHeight: setHeaderHeight };
  };

  var onRowEvents = function onRowEvents(rowData, rowIndex) {
    return {
      onClick: function onClick(event) {
        return _onRowClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowData[rowKey] });
      }, // click row
      onDoubleClick: function onDoubleClick(event) {
        return _onRowDoubleClick({ rowData: rowData, rowIndex: rowIndex, rowKey: rowData[rowKey] });
      } // double click row
      // onScroll: console.log
      // onContextMenu: event => {}, // right button click row
      // onMouseEnter: event => {}, // mouse enter row
      // onMouseLeave: event => {}, // mouse leave row
    };
  };

  var onResizeHandler = function onResizeHandler(index) {
    return function (_ref6, width) {
      var key = _ref6.key;

      // console.log('handleResize index ', index, width)
      _setColumns(function (columns) {
        var nextColumns = [].concat(_toConsumableArray(columns));
        nextColumns[index] = _extends({}, nextColumns[index], {
          width: width
        });
        return nextColumns;
      });
    };
  };

  /** Utile function
   * Find row by key
   * @param data - table rows
   * @param key - key row for find
   * @param callback - function for return result
   */
  var loop = function loop(data, key, callback) {
    for (var i = 0; i < data.length; i++) {
      if (data[i][rowKey] === key) {
        // console.log(`Selected => index: [${i}], path: [${data[i].path}]`, data);
        return callback(data[i], i, data);
      } else {
        // console.log(`Other => index: [${i}], path: [${data[i].path}]`);
      }
      if (data[i].children) {
        loop(data[i].children, key, callback);
      }
    }
  };

  /** ROW CHANGE FUNCTIONS */
  var _addRows = function _addRows(rows) {
    var saveRows = [].concat(_toConsumableArray(rows));
    if (!expandColumnKey) saveRows = saveRows.map(function (row) {
      row.children = undefined;return row;
    });
    if (customFields) {
      // Фильтрация по пользовательским параметрам
      saveRows = saveRows.filter(function (sRow) {
        var isValid = [];
        customFields.forEach(function (field) {
          // Валидация по пользовательской логике функции validate
          if (field.validate) isValid.push(field.validate(sRow, _rows));

          // Создание или переобразование по пользовательской логике функции value
          if (field.value) sRow[field.name] = field.value(sRow, _rows);
        });
        // console.log("_addRows isValid", isValid);
        if (!isValid.includes(false)) return sRow;
      });
    }
    var _localRows = [].concat(_toConsumableArray(_rows), _toConsumableArray(saveRows));
    _setRowsHandler(_localRows);
    onTableEventsDispatch("onAddRows", _localRows);
  };

  var _addRow = function _addRow(row) {
    var _row = _extends({}, row);
    if (!expandColumnKey) _row.children = undefined;
    var isValid = true;
    if (customFields) {
      var validations = [];
      customFields.forEach(function (field) {
        if (field.validate) validations.push(field.validate(_row, _rows));

        if (field.value) _row[field.name] = field.value(_row, _rows);
      });
      isValid = !validations.includes(false);
    }
    if (isValid) {
      var _localRows = [].concat(_toConsumableArray(_rows), [_row]);
      _setRowsHandler(_localRows);
      onTableEventsDispatch("onAddRow", _localRows);
    }
  };

  var _addRowAsCopy = function _addRowAsCopy() {
    // console.log("_onClickAddAsCopy", selectedRow);
    var _localRows = [].concat(_toConsumableArray(_rows), [findNodeByRowKey(_rows, rowKey, _selectedRowKeys[0])]);
    _setRowsHandler(_localRows);
    onTableEventsDispatch("onAddRowAsCopy", _localRows);
  };

  var _editRow = function _editRow(row) {
    // console.log("_onClickEdit", selectedRow);
    var data = [].concat(_toConsumableArray(_rows));
    var key = row[rowKey];
    loop(data, key, function (item, index, arr) {
      data[index] = row;
      _setRowsHandler(data);
      _setSelectedRowsHandler(_selectedRowKeys, undefined, data);
      onTableEventsDispatch("onEditRow", data);
    });
  };

  var _removeRow = function _removeRow(event) {
    // console.log("_onClickDelete", autoDeleteRows, selectedRowKeys);
    var _localRows = _rows.filter(function (item) {
      return !_selectedRowKeys.includes(item[rowKey]);
    });
    _setRowsHandler(_localRows);
    _setSelectedRowsHandler();
    onTableEventsDispatch("onRemoveRow", _localRows);
  };

  var _moveUpSelectedRow = function _moveUpSelectedRow() {
    _moveUpRowByKey(_selectedRowKeys[0]);
  };

  var _moveUpRowByKey = function _moveUpRowByKey(rowKey) {
    var data = [].concat(_toConsumableArray(_rows));
    loop(data, rowKey, function (item, index, arr) {
      var newRowIndex = _getNewIndexRow(index, index - 1);
      _changeIndexRow(index, newRowIndex, arr, data, "onMoveUpRow");
    });
  };

  var _moveDownSelectedRow = function _moveDownSelectedRow() {
    _moveDownRowByKey(_selectedRowKeys[0]);
  };

  var _moveDownRowByKey = function _moveDownRowByKey(rowKey) {
    var data = [].concat(_toConsumableArray(_rows));
    loop(data, rowKey, function (item, index, arr) {
      var newRowIndex = _getNewIndexRow(index, index + 1);
      _changeIndexRow(index, newRowIndex, arr, data, "onMoveDownRow");
    });
  };

  var _getNewIndexRow = function _getNewIndexRow(oldIndex, newIndex) {
    return newIndex >= 0 && newIndex < _rows.length ? newIndex : oldIndex;
  };

  var _changeIndexRow = function _changeIndexRow(oldIndex, newIndex, arr, data, nameEvent) {
    if (newIndex >= 0 && newIndex < arr.length) {
      // let arr = [..._rows]; // Копируем массив
      var item = arr.splice(oldIndex, 1); // Удаляем элемент со старого места
      // console.log('_changeIndexRow => ',item);
      arr.splice(newIndex > 0 ? newIndex : 0, 0, item[0]); // Ставим элемент на новое место
      // console.log("_changeIndexRow", item[0]);
      _setRowsHandler(data);
      onTableEventsDispatch(nameEvent, data);
    }
  };

  /** TREE FUNCTIONS */
  var _onExpandedRowsChange = function _onExpandedRowsChange(expandedRowKeys) {
    setExpandedRowKeys(expandedRowKeys);
    onExpandedRowsChange(expandedRowKeys);
  };

  /** SELECTABLE FUNCTIONS */
  var onChangeSelectedHandler = function onChangeSelectedHandler(selectedRowKeys, selectedRows) {
    // console.log("onChangeSelectedHandler");
    _setSelectedRowsHandler(selectedRowKeys, selectedRows);
  };

  var onSelectAllHandler = function onSelectAllHandler(selected, selectedRows, changeRows) {
    // console.log("onSelectAllHandler");
    var selectedKeys = selected ? selectedRows.map(function (row) {
      return row[rowKey];
    }) : [];
    _setSelectedRowsHandler(selectedKeys, selectedRows);
  };

  /** VIEW FUNCTIONS */
  var _rowClassName = function _rowClassName(rowData, rowIndex) {
    // const {rowClassName} = props;
    return [
    // rowClassName,
    _selectedRowKeys.includes(rowData[rowKey]) && "ant-table-row-selected", //
    zebraStyle ? rowIndex % 2 === 0 ? "even" : "odd" : ""
    // rowBordered ? 'bordered' : ''
    ].join(" ");
  };

  var ExpandIcon = function ExpandIcon(_ref7) {
    var Icon = _ref7.Icon,
        restProps = _objectWithoutProperties(_ref7, ["Icon"]);

    return React.createElement(
      "span",
      _extends({}, restProps, { className: rtPrefix + "-table-expand-icon" }),
      React.createElement(Icon, null)
    );
  };

  var expandIconRender = function expandIconRender(_ref8) {
    var expanded = _ref8.expanded,
        onExpand = _ref8.onExpand,
        record = _ref8.record;
    return record.children && record.children.length === 0 ? React.createElement(ExpandIcon, { Icon: CaretUpOutlined, style: { visibility: "hidden" } }) : expanded ? React.createElement(ExpandIcon, { Icon: CaretDownOutlined, onClick: function onClick(e) {
        return onExpand(record, e);
      } }) : React.createElement(ExpandIcon, { Icon: CaretRightOutlined, onClick: function onClick(e) {
        return onExpand(record, e);
      } });
  };

  var _footer = function _footer(currentPageData) {
    // console.log('_footer => ', currentPageData);
    return _footerShow ? React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "div",
        { key: "footer-left-custom-side", className: rtPrefix + "-footer-left-custom-side" },
        footerProps.leftCustomSideElement ? Array.isArray(footerProps.leftCustomSideElement) ? React.createElement(FormItems, { items: footerProps.leftCustomSideElement }) : React.createElement(footerProps.leftCustomSideElement, null) : null
      ),
      React.createElement(
        "div",
        { key: "footer-center-custom-side", className: rtPrefix + "-footer-center-custom-side" },
        footerProps.centerCustomSideElement ? Array.isArray(footerProps.centerCustomSideElement) ? React.createElement(FormItems, { items: footerProps.centerCustomSideElement }) : React.createElement(footerProps.centerCustomSideElement, null) : null
      ),
      React.createElement(
        "div",
        { key: "footer-right-custom-side", className: rtPrefix + "-footer-right-custom-side" },
        footerProps.rightCustomSideElement ? Array.isArray(footerProps.rightCustomSideElement) ? React.createElement(FormItems, { items: footerProps.rightCustomSideElement }) : React.createElement(footerProps.rightCustomSideElement, null) : null
      ),
      React.createElement(
        "div",
        { className: rtPrefix + "-footer-right-system-side" },
        React.createElement(
          _Space,
          null,
          selectable ? React.createElement(
            React.Fragment,
            null,
            footerProps.showElements.includes("selected") ? React.createElement(
              "span",
              null,
              footerProps.selectedTitle,
              " ",
              _selectedRowKeys.length
            ) : null,
            footerProps.showElements.includes("loaded") ? React.createElement(
              "span",
              null,
              footerProps.loadedTitle,
              " ",
              flatten(getTableRowKeys(_rows, rowKey)).length
            ) : null
          ) : null,
          footerProps.showElements.includes("total") ? requestLoadCount !== noop && !expandColumnKey ? React.createElement(
            "span",
            null,
            footerProps.totalTitle,
            " ",
            _totalCountRows
          ) : React.createElement(
            "span",
            null,
            footerProps.totalTitle,
            " ",
            flatten(getTableRowKeys(_rows, rowKey)).length
          ) : null
        )
      )
    ) : undefined;
  };

  var getColumns = function getColumns() {
    return _columns.map(function (col, index) {
      return _extends({}, col, {
        onHeaderCell: function onHeaderCell(column) {
          return {
            column: column,
            // resizable: column.resizable,
            // width: column.width,
            onResize: onResizeHandler(index)
          };
        }
      });
    });
  };

  var restProps = getObjectExcludedProps(props, excludeProps);
  var expandableProps = expandColumnKey ? _extends({
    defaultExpandAllRows: expandDefaultAll,
    expandIcon: expandIconRender
  }, expandable, {
    expandedRowKeys: _expandedRowKeys,
    onExpandedRowsChange: _onExpandedRowsChange
  }) : {};

  var rowSelectionProps = selectable ? _extends({
    type: "checkbox",
    fixed: true,
    checkStrictly: !nodeAssociated,
    selectedRowKeys: _selectedRowKeys,
    onChange: onChangeSelectedHandler,
    onSelectAll: onSelectAllHandler
  }, rowSelection) : undefined;

  return React.createElement(
    "div",
    { className: rtPrefix + "-table " + className, style: style },
    React.createElement(
      "div",
      { className: rtPrefix + "-baseTable" },
      React.createElement(
        AutoResizer
        // onResize={({ height, width }) => {setHeight(height); setWidth(width)} }
        ,
        null,
        function (_ref9) {
          var height = _ref9.height,
              width = _ref9.width;
          return React.createElement(
            "div",
            { style: { width: width, height: height } },
            React.createElement(_Table, _extends({}, restProps, {

              /** Required */
              columns: getColumns(),
              dataSource: _rows
              // scroll={{ x: width, y: height - headerHeight }}
              , scroll: { y: height - headerHeight },
              pagination: _extends({ position: ["none", "none"] }, restProps.pagination, { pageSize: _rows.length })

              /** Base Props */
              , loading: loading

              /** Tree Props */
              , expandable: _extends({}, expandableProps)
              /** Selection Props */
              , rowSelection: rowSelectionProps

              /** View Props */
              , rowClassName: _rowClassName,
              footer: _footerShow ? _footer : undefined,
              components: {

                header: {
                  row: HeaderRow,
                  cell: HeaderCell
                },
                body: {
                  cell: BodyCell
                }
              }

              /** Events */
              , onChange: onChangeTable,
              onHeaderRow: onHeaderRowProps,
              onRow: onRowEvents
            }))
          );
        }
      )
    )
  );
};

Table.propTypes = {
  /**
   * REQUIRED
   * */

  /** Столбцы таблицы */
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,

  /** Режим загрузки данных по скроллу */
  infinityMode: PropTypes.bool,

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
    /** Ключ поля для сортировки */
    key: PropTypes.string,
    /** Направление сортировки */
    order: PropTypes.oneOf(["asc", "desc"])
  }),

  /**
   * ПРОПРЫ ДЛЯ ВНЕШНЕГО КОНТРОЛЯ ТАБЛИЦЫ
   * */

  /** Строки таблицы. Используется для контроля таблицы из вне. */
  rows: PropTypes.arrayOf(PropTypes.object),

  /** Функция задания строк таблицы. */
  setRows: PropTypes.func,

  /** Выделенные строки таблицы. */
  selectedRowKeys: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  /** Значение строки поиска */
  searchValue: PropTypes.string,

  /** Объект фильтрации */
  filter: PropTypes.object,

  /** Объект сортировки */
  sortBy: PropTypes.shape({
    /** Ключ поля для сортировки */
    key: PropTypes.string,
    /** Направление сортировки */
    order: PropTypes.oneOf(["asc", "desc"])
  }),

  /**
   * BASE PROPS
   * */

  /** Поле для уникальной идентификации строки */
  rowKey: PropTypes.string,

  /** Дополнительные поля и валидация в объекты таблицы
   * Данный параметр (props) осуществляет дополнительную обработку объекта таблицы после закрытия модалки, но перед добавлением в таблицу.
   * Можно как изменить существующие поля объекта, так и добавить новые поля объекта.
   * `customFields` - массив объектов для дополнения или изменения полей объектов таблицы
   * ```json
   * [
   *  {
   * 		name: <String>,
   * 		value: <func>,
   * 		validate: <func>
   * 	}
   * ]
   * ```
   * `name` – Имя параметра в объекте
   * `value` – Функция формирования значения - `(row, rows) => { return {} }`
   * `validate` – Функция проверки значения - `(row, rows) => { return <Bool> }`
   * Параметра **validate** работает **только** для модельного окна тип `select`.
   * Validate можно наложить на любое кол-во полей объекта и если хотя бы один `validate` === `false`, то исключает строку из добавления.
   */
  customFields: PropTypes.arrayOf(PropTypes.object),

  /**
   * Данный параметр (props) позволяет добавить или переопределить пропсы для колонок, которые заданы конфигурацией на сервере
   * `customColumnProps` - массив объектов `props` к `columns`. Один объект описывает доп. параметры для одной колонки
   * ```json
   * [
   *  {
   * 		name: <String>,
   * 		cellRenderer: <func>,
   * 		...advancedColProps
   * 	}
   * ]
   * ```
   * `name` – key колонки к которой надо применить дополнительные пропсы
   * `cellRenderer` – `({ cellData, columns, column, columnIndex, rowData, rowIndex, container, isScrolling }) => return <ReactNode>`
   * `advancedColProps` – подолнительные свойства колонок тут -> [Column](https://autodesk.github.io/react-base-table/api/column)
   */
  customColumnProps: PropTypes.arrayOf(PropTypes.object),

  /**
   * VIEW PROPS
   * */

  /** Вывод когда нет данных */
  empty: PropTypes.element,

  /** Отображение загрузки данных */
  overlay: PropTypes.element,

  /** Фиксированная ширина столбцов. Появится боковой скрол */
  fixWidthColumn: PropTypes.bool,

  footerProps: PropTypes.shape({

    /** Высота подвала */
    height: PropTypes.number,

    /** Массив элементов футтера, которые надо отобразить
     * ['selected', 'loaded', 'total'] */
    showElements: PropTypes.arrayOf(PropTypes.string),

    /** Заколовок для кол-ва выбранных объектов */
    selectedTitle: PropTypes.string,

    /** Заколовок для кол-ва загруженны объектов */
    loadedTitle: PropTypes.string,

    /** Заколовок для кол-ва всего объектов */
    totalTitle: PropTypes.string,

    /** Левый кастомный элемент командной панели */
    leftCustomSideElement: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),

    /** Центральный кастомный элемент командной панели */
    centerCustomSideElement: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)]),

    /** Правый кастомный элемент командной панели */
    rightCustomSideElement: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)])
  }),

  /** Высота заголовка таблицы */
  headerHeight: PropTypes.number,

  /** Высота строки таблицы */
  rowHeight: PropTypes.number,

  /** Custom row renderer
   * Параметры - `({ isScrolling, cells, columns, rowData, rowIndex, depth })` */
  rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),

  /** Строки будут в зебро-стиле */
  zebraStyle: PropTypes.bool,

  /** Высота расширения */
  estimatedRowHeight: PropTypes.number,

  /** Отображать ли разделители ячеек в строке */
  cellBordered: PropTypes.bool,

  /** Отобрадать ли разделители строк */
  rowBordered: PropTypes.bool,

  /**
   * LOAD DATA PROPS
   * */

  /** Порог в пикселях для вызова _onLoad.
   * Кол-во пикселей от низа таблицы для срабатывания события загрузки (onEndReached) */
  loadThreshold: PropTypes.number,

  /** Размер страницы */
  pageSize: PropTypes.number,

  /** Функция запроса для конфигурации */
  requestLoadConfig: PropTypes.func,

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

  /** Родительский узел и дочерние узлы связаны (Работает только при `selectable`) */
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

  /** Событие при клике на строку (только при `selectable` = `false`)
   * `({selected, rowData, rowIndex}) => {}` */
  onRowClick: PropTypes.func,

  /** Событие при двойном клике на строку.
   * `({rowData, rowIndex, rowKey}) => {}` */
  onRowDoubleClick: PropTypes.func,

  /** События при открытии / закрытии ноды
   * `({ expanded, rowData, rowIndex, rowKey }) => {}` */
  onRowExpand: PropTypes.func,

  /** Событие при выборе строки.
   * `([rowKeys], [rowDatas]) => {}` */
  onSelectedRowsChange: PropTypes.func,

  /** События при открытии / закрытии ноды
   * `(expandedRowKeys) => {}` - массив ключей открытых нод */
  onExpandedRowsChange: PropTypes.func,

  /** SELECTED PANEL */

  /** Отображать ли панель выбранных элементов */
  showSelection: PropTypes.bool,

  /** Строка или функция для отображения элементов списка выбранных
   * Строка - имя поля
   * Функция - рендер строк.
   * `({ rowData, rowIndex }) => { return <Component> }` */
  rowRenderShowSelection: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),

  /** Путь в сторе куда класть выбранную строку таблицы */
  dispatchPath: PropTypes.string,

  /** Объект для подписки на изменения в STORE */
  subscribe: PropTypes.arrayOf(PropTypes.object)
};

Table.defaultProps = {
  size: "small",
  bordered: true,
  infinityMode: false,
  editMode: false,
  defaultRows: [],
  defaultSelectedRowKeys: [],
  defaultSearchValue: "",
  defaultFilter: {},
  defaultSortBy: {},

  rows: [],
  setRows: noop,
  selectedRowKeys: [],
  searchValue: "",
  filter: {},
  sortBy: {},

  rowKey: "id",

  empty: empty,
  overlay: overlay,
  fixWidthColumn: false,
  footerProps: {
    height: 30,
    showElements: [],
    selectedTitle: "Выделено:",
    loadedTitle: "Загружено записей:",
    totalTitle: "Всего записей:",
    leftCustomSideElement: null,
    centerCustomSideElement: null,
    rightCustomSideElement: null
  },
  headerHeight: 30,
  rowHeight: 30,
  zebraStyle: false,
  estimatedRowHeight: undefined,
  cellBordered: false,
  rowBordered: true,
  className: "",
  style: {},

  loadThreshold: 300,
  pageSize: 50,
  requestLoadRows: undefined,
  requestLoadCount: noop,
  searchParamName: "searchLine",

  selectable: false,

  nodeAssociated: true,
  expandColumnKey: undefined,
  expandDefaultAll: true,
  expandLazyLoad: false,
  expandParentKey: "parentId",

  onRowClick: noop,
  onRowDoubleClick: noop,
  onRowExpand: noop,
  onSelectedRowsChange: noop,
  onExpandedRowsChange: noop,

  showSelection: false,

  dispatchPath: undefined,
  subscribe: []
};

var mapStateToProps = function mapStateToProps(store, ownProps) {
  var subscribe = ownProps.subscribe;

  var state = {};
  if (subscribe && subscribe.length > 0) {
    subscribe.forEach(function (item) {
      var name = item.name,
          path = item.path,
          extraData = item.extraData;

      if (name && path) state[name] = objectPath.get(store, path);
      if (name && extraData) {
        if ((typeof extraData === "undefined" ? "undefined" : _typeof(extraData)) === 'object') Object.keys(extraData).forEach(function (key) {
          return state[name + ".extraData." + key] = objectPath.get(store, extraData[key]);
        });else state[name + "ExtraData"] = objectPath.get(store, extraData);
      }
    });
  }
  return state;
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setDateStore: setDateStore }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Table);