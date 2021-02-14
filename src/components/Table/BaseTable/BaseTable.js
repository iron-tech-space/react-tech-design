import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {rtPrefix} from '../../utils/variables';
import {Typography} from "antd";
import { noop } from "../../utils/baseUtils";

const prefixComponent = `${rtPrefix}-base-table`;

const defaultProps = {
    columns: [],
    data: [],
    rowKey: 'id',
    headerHeight: 30,
    rowHeight: 30,
    fixed: false,
};

const BaseTable = rawProps => {
    const props = {...defaultProps, ...rawProps}

    const [header, setHeader] = useState([]);
    const [rows, setRows] = useState([]);
    const [headerCls, setHeaderCls] = useState('');

    const {
        columns,
        data,

        rowKey,

        /** Style props */
        headerHeight,
        rowHeight,

        fixed,
    } = props;

    useEffect(() => {
        console.log('props', props);
        const inline = fixed ? 'inline-block' : 'inline';


    }, []);

    useEffect(() => {
        console.log('columns: ', columns);
        setHeader(columns.map((col, columnIndex) => {
            let cls = [`${prefixComponent}-header-cell`];
            if(col.align === 'center')
                cls.push(`${prefixComponent}-header-cell--align-center`)

            if(col.hidden)
                return null;
            else
                return (
                    <div key={col.key} className={cls.join(' ')} style={{width: fixed ? col.width : 'auto', minHeight: headerHeight}}>
                        {
                            col.headerRenderer
                                ? col.headerRenderer({ columns, column: col, columnIndex, container: { props } })
                                : <Typography.Text ellipsis={true}
                                                   style={{ width: fixed ? col.width - 16 : 'auto' }}>{col.title}</Typography.Text>
                        }
                    </div>
                )
        }));
    }, [columns]);

    useEffect(() => {
        const inline = fixed ? 'inline-block' : 'inline';
        setRows(data.map((rowData, rowIndex) => {
            return <Row key={rowData[rowKey]} rowData={rowData} rowIndex={rowIndex}/>
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
        }))
    }, [data]);

    const onClickRowHandler = (...args) => { //{ rowData, rowIndex, rowKey, event }
        console.log("onClickRowHandler", args, rows);
        // let _rows = [...rows];
        // _rows[rowIndex] = <Row key={rowData[rowKey]} rowData={rowData} rowIndex={rowIndex}/>
        // setRows(_rows);
    }

    const Row = (props) => {
        const {rowData, rowIndex} = props;
        return(
            <div className={`${prefixComponent}-row`}
                 onClick={onClickRowHandler}>
                { //.bind(null, {rowData, rowIndex, rowKey, rows})
                    columns.map((col, columnIndex) => {
                        // console.log('col.cellRenderer', col.cellRenderer);
                        let cls = [`${prefixComponent}-row-cell`];
                        if(col.align === 'center')
                            cls.push(`${prefixComponent}-row-cell--align-center`)

                        if(col.hidden)
                            return null;
                        else
                            return <RowCell key={`${rowData[rowKey]}-${rowIndex}-${columnIndex}`} column={col} rowData={rowData} rowIndex={rowIndex} columnIndex={columnIndex} className={cls.join(' ')}/>
                    })
                }
            </div>
        )
    }

    const RowCell = ({column, rowData, rowIndex, columnIndex, className}) => {

        return (
            <div className={className} style={{width: fixed ? column.width : 'auto', minHeight: rowHeight}}>
                {
                    column.cellRenderer
                        ? column.cellRenderer({ cellData: rowData[column.dataKey], columns, column: column, columnIndex, rowData, rowIndex, container: {props} })
                        : <Typography.Text ellipsis={true} style={{width: fixed ? column.width - 16 : 'auto'}}>{rowData[column.dataKey]}</Typography.Text>
                }
            </div>
        )
    }

    const _getHeaderCls = () => {
        let cls = [`${prefixComponent}-header`];
        if(fixed)
            cls.push('block')
        else
            cls.push('flex')

        return cls.join(' ')
    }

    return (
        <div className={prefixComponent}>
            <div className={_getHeaderCls()}>{header}</div>
            <div className={`${prefixComponent}-body`}>{rows}</div>
            <div className={`${prefixComponent}-footer`}></div>
            <div className={`${prefixComponent}-overlay`}></div>
        </div>
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
        order: PropTypes.oneOf(['asc', 'desc']),
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
    onRowExpand: PropTypes.func,
};

export default BaseTable;
