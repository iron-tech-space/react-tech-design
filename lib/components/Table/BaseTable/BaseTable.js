import "antd/es/typography/style";
import _Typography from "antd/es/typography";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { rtPrefix } from '../../utils/variables';

import { noop } from "../../utils/baseUtils";

var prefixComponent = rtPrefix + "-base-table";

var defaultProps = {
    columns: [],
    data: [],
    rowKey: 'id',
    headerHeight: 30,
    rowHeight: 30,
    fixed: false
};

var BaseTable = function BaseTable(rawProps) {
    var props = _extends({}, defaultProps, rawProps);

    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        header = _useState2[0],
        setHeader = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        rows = _useState4[0],
        setRows = _useState4[1];

    var _useState5 = useState(''),
        _useState6 = _slicedToArray(_useState5, 2),
        headerCls = _useState6[0],
        setHeaderCls = _useState6[1];

    var columns = props.columns,
        data = props.data,
        rowKey = props.rowKey,
        headerHeight = props.headerHeight,
        rowHeight = props.rowHeight,
        fixed = props.fixed;


    useEffect(function () {
        console.log('props', props);
        var inline = fixed ? 'inline-block' : 'inline';
    }, []);

    useEffect(function () {
        console.log('columns: ', columns);
        setHeader(columns.map(function (col, columnIndex) {
            var cls = [prefixComponent + "-header-cell"];
            if (col.align === 'center') cls.push(prefixComponent + "-header-cell--align-center");

            if (col.hidden) return null;else return React.createElement(
                "div",
                { key: col.key, className: cls.join(' '), style: { width: fixed ? col.width : 'auto', minHeight: headerHeight } },
                col.headerRenderer ? col.headerRenderer({ columns: columns, column: col, columnIndex: columnIndex, container: { props: props } }) : React.createElement(
                    _Typography.Text,
                    { ellipsis: true,
                        style: { width: fixed ? col.width - 16 : 'auto' } },
                    col.title
                )
            );
        }));
    }, [columns]);

    useEffect(function () {
        var inline = fixed ? 'inline-block' : 'inline';
        setRows(data.map(function (rowData, rowIndex) {
            return React.createElement(Row, { key: rowData[rowKey], rowData: rowData, rowIndex: rowIndex });
            // return(
            //     <div key={rowData[rowKey]} className={`${prefixComponent}-row`}>
            //         {
            //             columns.map((col, columnIndex) => {
            //                 // console.log('col.cellRenderer', col.cellRenderer);
            //                 let cls = [`${prefixComponent}-row-cell`];
            //                 if(col.align === 'center')
            //                     cls.push(`${prefixComponent}-row-cell--align-center`)
            //
            //                 if(col.hidden)
            //                     return null;
            //                 else
            //                     return (
            //                         <div key={`${rowData[rowKey]}-${rowIndex}-${columnIndex}`} className={cls.join(' ')} style={{width: fixed ? col.width : 'auto', minHeight: rowHeight}}>
            //                             {
            //                                 col.cellRenderer
            //                                     ? col.cellRenderer({ cellData: rowData[col.dataKey], columns, column: col, columnIndex, rowData, rowIndex, container: {props} })
            //                                     : <Typography.Text ellipsis={true} style={{width: fixed ? col.width - 16 : 'auto'}}>{rowData[col.dataKey]}</Typography.Text>
            //                             }
            //                         </div>
            //                     )
            //             })
            //         }
            //     </div>
            // )
        }));
    }, [data]);

    var onClickRowHandler = function onClickRowHandler() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        //{ rowData, rowIndex, rowKey, event }
        console.log("onClickRowHandler", args, rows);
        // let _rows = [...rows];
        // _rows[rowIndex] = <Row key={rowData[rowKey]} rowData={rowData} rowIndex={rowIndex}/>
        // setRows(_rows);
    };

    var Row = function Row(props) {
        var rowData = props.rowData,
            rowIndex = props.rowIndex;

        return React.createElement(
            "div",
            { className: prefixComponent + "-row",
                onClick: onClickRowHandler },
            //.bind(null, {rowData, rowIndex, rowKey, rows})
            columns.map(function (col, columnIndex) {
                // console.log('col.cellRenderer', col.cellRenderer);
                var cls = [prefixComponent + "-row-cell"];
                if (col.align === 'center') cls.push(prefixComponent + "-row-cell--align-center");

                if (col.hidden) return null;else return React.createElement(RowCell, { key: rowData[rowKey] + "-" + rowIndex + "-" + columnIndex, column: col, rowData: rowData, rowIndex: rowIndex, columnIndex: columnIndex, className: cls.join(' ') });
            })
        );
    };

    var RowCell = function RowCell(_ref) {
        var column = _ref.column,
            rowData = _ref.rowData,
            rowIndex = _ref.rowIndex,
            columnIndex = _ref.columnIndex,
            className = _ref.className;


        return React.createElement(
            "div",
            { className: className, style: { width: fixed ? column.width : 'auto', minHeight: rowHeight } },
            column.cellRenderer ? column.cellRenderer({ cellData: rowData[column.dataKey], columns: columns, column: column, columnIndex: columnIndex, rowData: rowData, rowIndex: rowIndex, container: { props: props } }) : React.createElement(
                _Typography.Text,
                { ellipsis: true, style: { width: fixed ? column.width - 16 : 'auto' } },
                rowData[column.dataKey]
            )
        );
    };

    var _getHeaderCls = function _getHeaderCls() {
        var cls = [prefixComponent + "-header"];
        if (fixed) cls.push('block');else cls.push('flex');

        return cls.join(' ');
    };

    return React.createElement(
        "div",
        { className: prefixComponent },
        React.createElement(
            "div",
            { className: _getHeaderCls() },
            header
        ),
        React.createElement(
            "div",
            { className: prefixComponent + "-body" },
            rows
        ),
        React.createElement("div", { className: prefixComponent + "-footer" }),
        React.createElement("div", { className: prefixComponent + "-overlay" })
    );
};

BaseTable.propTypes = {
    // ref={tableRef}
    /** Required */
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    /** Control Props */
    sortBy: PropTypes.shape({
        /** Ключ поля для сортировки */
        key: PropTypes.string,
        /** Направление сортировки */
        order: PropTypes.oneOf(['asc', 'desc'])
    }),
    /** Base Props */
    width: PropTypes.number,
    height: PropTypes.number,
    rowKey: PropTypes.string,
    // rowProps={rowProps}

    /** View Props */
    rowClassName: PropTypes.func, // ???
    emptyRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    fixed: PropTypes.bool,
    footerHeight: PropTypes.number,
    headerHeight: PropTypes.number,
    rowHeight: PropTypes.number,
    overlayRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    footerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rowRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    estimatedRowHeight: PropTypes.number,
    /** Load Data Props */
    onEndReachedThreshold: PropTypes.number,
    onEndReached: PropTypes.func,
    disabled: PropTypes.bool,
    /** Tree Props */
    expandColumnKey: PropTypes.string,
    expandedRowKeys: PropTypes.arrayOf(PropTypes.string),
    /** Events */
    onColumnSort: PropTypes.func,
    rowEventHandlers: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    onExpandedRowsChange: PropTypes.func,
    onRowExpand: PropTypes.func
};

export default BaseTable;