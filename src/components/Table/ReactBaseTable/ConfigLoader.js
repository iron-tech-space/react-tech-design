import React, {useEffect, useState} from "react";
import { getSortBy, noop, notificationError } from "../../utils/baseUtils";
import Table from "./Table";
import { Typography } from "antd";

const defaultProps = {
    defaultFilter: {},
    rowKey: 'id',
    pageSize: 50,
    requestLoadConfig: noop,
    expandColumnKey: undefined,
    expandLazyLoad: false,
    expandParentKey: 'parentId',
    customColumnProps: [],
};

const ConfigLoader = props => {

    /** Конфигурация таблицы */
    const [tableConfig, setTableConfig] = useState(undefined);

    const {
        defaultSortBy,
        defaultFilter,
        rowKey,
        pageSize,
        requestLoadConfig,
        expandColumnKey,
        expandLazyLoad,
        expandParentKey,
        customColumnProps,
        cellBordered,
    } = {...defaultProps, ...props};

    useEffect(() => {
        let cleanupFunction = false;
        const loadData = async () => {
            if (requestLoadConfig) {
                // console.log('requestLoadConfig => ', typeof requestLoadConfig);
                // console.log('requestLoadRows => ', typeof props.requestLoadRows);
                requestLoadConfig()
                    .then((response) => {
                        // let result = response.data;
                        // console.log('requestLoadConfig -> ', response.data);
                        if(!cleanupFunction) {
                            // setTableConfig(response.data);
                            configParser(response.data);
                        }
                    })
                    .catch(error => notificationError(error, 'Ошибка получения конфигурации') );
            }
        };
        loadData().then(r => r);
        return () => cleanupFunction = true;
    }, []);

    const configParser = (config) => {
        // Массив колонок
        let _columns = [];
        // Сортировка по умолчанию
        let _defaultSorter = [];

        config && config.fields && config.fields.forEach((item) => {
            const colProps = customColumnProps &&
                customColumnProps.find((render) =>
                    render.name === item.name || render.name === item.alias);

            // Индекс или имя поля в данных
            const dataIndex = (item.alias ? item.alias : item.name);

            if (_defaultSorter.length === 0 || _defaultSorter[1] === undefined)
                _defaultSorter = getSortBy(defaultSortBy, item.defaultSort, dataIndex);

            _columns.push({
                key: dataIndex,
                title: item.header ? item.header : item.name,
                dataKey: dataIndex,
                align: item.align,
                width: item.width,
                resizable: item.resizable,
                sortable: item.sortable,
                hidden: !item.visible,
                className: [cellBordered ? 'bordered' : ''].join(' '),
                headerClassName: [cellBordered ? 'bordered' : ''].join(' '),
                // cellRenderer: cellR && cellR.cellRender,
                ...colProps,
                cellRenderer: (object) => {
                    if (colProps && colProps.cellRenderer)
                        return <colProps.cellRenderer {...object}/>
                        // return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';
                    else
                        return object.cellData
                            ? <Typography.Text ellipsis={true} style={{width: '100%'}} className={'rt-table-cell'}>{object.cellData}</Typography.Text>
                            : <Typography.Text ellipsis={true} style={{width: '100%'}} className={'rt-table-cell'}>---</Typography.Text> ;
                        // return object.cellData ? object.cellData : '---';
                },
            });
        });

        let _defaultFilter;
        if (config && config.hierarchical && config.hierarchyLazyLoad) {
            const parentKey = config.hierarchyField
                ? config.hierarchyField.split('/')[1]
                : expandParentKey;
            _defaultFilter =  {...defaultFilter, [parentKey]: null};
        } else _defaultFilter = defaultFilter;


        setTableConfig({
            columns: _columns,
            defaultSortBy: _defaultSorter[0],
            defaultFilter: _defaultFilter,
            rowKey:
                config && config.hierarchical && config.hierarchyField
                    ? config.hierarchyField.split('/')[0]
                    : rowKey,
            expandParentKey:
                config && config.hierarchical && config.hierarchyField
                    ? config.hierarchyField.split('/')[1]
                    : expandParentKey,
            expandColumnKey:
                config && config.hierarchical && config.hierarchyView
                    ? config.hierarchyView
                    : expandColumnKey,
            expandLazyLoad:
                config && config.hierarchical && config.hierarchyLazyLoad
                    ? config.hierarchyLazyLoad
                    : expandLazyLoad,
            pageSize: config && config.hierarchical ? 1 : pageSize,
        });
    }

    if(tableConfig)
        return ( <Table {...props} {...tableConfig} /> );
    else
        return null
};

export default ConfigLoader;
