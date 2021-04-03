import React, { useEffect, useState } from "react";
import { noop, notificationError } from "../../utils/baseUtils";
import Table from "./Table";

const defaultProps = {
    defaultFilter: {},
    rowKey: "id",
    pageSize: 50,
    requestLoadConfig: noop,
    expandColumnKey: undefined,
    expandLazyLoad: false,
    expandParentKey: "parentId",
    customColumnProps: []
};

const ConfigLoader = props => {

    /** Конфигурация таблицы */
    const [tableConfig, setTableConfig] = useState(undefined);

    const {
        defaultFilter,
        defaultSortBy,
        rowKey,
        pageSize,
        requestLoadConfig,
        expandColumnKey,
        // expandLazyLoad,
        expandParentKey,
        customColumnProps,
        // cellBordered,
        fixWidthColumn,
        selectable
    } = { ...defaultProps, ...props };

    useEffect(() => {
        let cleanupFunction = false;
        const loadData = async () => {
            if (requestLoadConfig) {
                // console.log("requestLoadConfig => ", typeof requestLoadConfig);
                // console.log("requestLoadRows => ", typeof props.requestLoadRows);
                requestLoadConfig()
                    .then((response) => {
                        // let result = response.data;
                        // console.log('requestLoadConfig -> ', response.data);
                        if (!cleanupFunction) {
                            // setTableConfig(response.data);
                            configParser(response.data);
                        }
                    })
                    .catch(error => notificationError(error, "Ошибка получения конфигурации"));
            }
        };
        loadData().then(r => r);
        return () => cleanupFunction = true;
    }, [props]);

    const configParser = (config) => {
        let _expandColumnKey = config && config.hierarchical && config.hierarchyView
            ? config.hierarchyView
            : expandColumnKey

        let visibleIndex = 0;
        let expandIconColumnIndex = -1;

        let _columns = [];
        if (config && config.fields) {
            // for(let i = 0; i < config.fields.length; i++) {
            //     const item = config.fields[i];
            // _columns = config.fields.map((item) => {
            config.fields.forEach((item, index) => {
                // console.log('configParser item => ', item);
                // if(item.visible) {
                const dataIndex = (item.alias ? item.alias : item.name)

                const defaultSortOrder = (defaultSortBy && defaultSortBy.key === dataIndex)
                  ? defaultSortBy.order === 'asc' ? 'ascend' : 'descend'
                  : undefined

                const colProps =
                    customColumnProps &&
                    customColumnProps.find(
                        (render) =>
                            render.name === item.name || render.name === item.alias
                    );
                const widthCol = fixWidthColumn ? {width: item.width, maxWidth: 1000} : {}
                if (item.visible) {
                    visibleIndex++;
                    if(_expandColumnKey === dataIndex)
                        expandIconColumnIndex = visibleIndex + (selectable ? 1 : -1);
                    _columns.push({
                        key: item.name,
                        title: item.header ? item.header : item.name,
                        dataIndex: item.alias ? item.alias : item.name,
                        align: item.align,
                        resizable: item.resizable,
                        sorter: item.sortable ? item.sortable : undefined,
                        ellipsis: true,
                        defaultSortOrder: defaultSortOrder,
                        ...widthCol,
                        ...colProps,
                        // className: [cellBordered ? 'bordered' : ''].join(' '),
                        // headerClassName: [cellBordered ? 'bordered' : ''].join(' '),
                        // cellRenderer: cellR && cellR.cellRender,
                        render: (cellData, rowData, rowIndex) => {
                            if (colProps && colProps.cellRenderer)
                                return <colProps.cellRenderer cellData={cellData} rowData={rowData}
                                                              rowIndex={rowIndex} />
                            else
                                return item.typeData === 'json' ? JSON.stringify(cellData) : cellData ? cellData : '---'
                        },

                        // render: (cellData, rowData, rowIndex) => {
                        //     if (colProps && colProps.cellRenderer)
                        //         return <colProps.cellRenderer cellData={cellData} rowData={rowData} rowIndex={rowIndex}/>
                        //         // return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';
                        //     else
                        //         if (cellData)
                        //             if (item.typeData === 'json')
                        //                 return <BodyCell cellData={JSON.stringify(cellData)}/>;
                        //             else
                        //                 return <BodyCell cellData={cellData}/>;
                        //         else
                        //             return <BodyCell cellData={'---'}/>;
                        //
                        //         // return object.cellData ? object.cellData : '---';
                        // },
                    });
                }
            });
        }

        let _defaultFilter;
        if (config && config.hierarchical && config.hierarchyLazyLoad) {
            const parentKey = config.hierarchyField
                ? config.hierarchyField.split("/")[1]
                : expandParentKey;
            _defaultFilter = { ...defaultFilter, [parentKey]: null };
        } else _defaultFilter = defaultFilter;

        console.log('expandIconColumnIndex => ', _expandColumnKey, expandIconColumnIndex);
        setTableConfig({
            columns: _columns,
            defaultFilter: _defaultFilter,
            rowKey:
                config && config.hierarchical && config.hierarchyField
                    ? config.hierarchyField.split("/")[0]
                    : rowKey,
            // expandParentKey:
            //     config && config.hierarchical && config.hierarchyField
            //         ? config.hierarchyField.split('/')[1]
            //         : expandParentKey,
            expandColumnKey: _expandColumnKey,
            expandable: { expandIconColumnIndex },
            // expandLazyLoad:
            //     config && config.hierarchical && config.hierarchyLazyLoad
            //         ? config.hierarchyLazyLoad
            //         : expandLazyLoad,
            pageSize: config && config.hierarchical ? 1 : pageSize
        });
    };

    if (tableConfig)
        return (<Table {...props} {...tableConfig} />);
    else
        return null;
};

export default ConfigLoader;
