import React, {useEffect, useState} from "react";
import { noop, notificationError } from "../utils/baseUtils";
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
        defaultFilter,
        rowKey,
        pageSize,
        requestLoadConfig,
        expandColumnKey,
        expandLazyLoad,
        expandParentKey,
        customColumnProps,
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
        let _columns = [];
        if(config && config.fields) {
            _columns = config.fields.map((item) => {
                const colProps =
                    customColumnProps &&
                    customColumnProps.find(
                        (render) =>
                            render.name === item.name || render.name === item.alias
                    );
                return {
                    key: item.name,
                    title: item.header ? item.header : item.name,
                    dataKey: item.alias ? item.alias : item.name,
                    align: item.align,
                    width: item.width,
                    resizable: item.resizable,
                    sortable: item.sortable,
                    hidden: !item.visible,
                    // cellRenderer: cellR && cellR.cellRender,
                    ...colProps,
                    cellRenderer: (object) => {
                        if (colProps && colProps.cellRenderer)
                            return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';
                        else
                            return object.cellData ? <Typography.Text ellipsis={true} style={{width: '100%'}}>{object.cellData}</Typography.Text> : '---';
                            // return object.cellData ? object.cellData : '---';
                    },
                };
            });
        }

        let _defaultFilter;
        if (config && config.hierarchical && config.hierarchyLazyLoad) {
            const parentKey = config.hierarchyField
                ? config.hierarchyField.split('/')[1]
                : expandParentKey;
            _defaultFilter =  {...defaultFilter, [parentKey]: null};
        } else _defaultFilter = defaultFilter;


        setTableConfig({
            columns: _columns,
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
}

export default ConfigLoader;
