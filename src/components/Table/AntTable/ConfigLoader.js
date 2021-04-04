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

        // Массив колонок
        let _columns = [];
        // Счетчик видимых полей
        let visibleIndex = 0;
        // Индекс колонки около которой ставить иконку дерева
        let expandIconColumnIndex = -1;
        // Ключ иерархии
        let _expandColumnKey = config && config.hierarchical && config.hierarchyView
            ? config.hierarchyView
            : expandColumnKey

        if (config && config.fields) {
            config.fields.forEach((item, index) => {
                // console.log('configParser item => ', item);

                // Индекс или имя поля в данных
                const dataIndex = (item.alias ? item.alias : item.name)
                // Сортировка по умолчанию
                const defaultSortOrder = (defaultSortBy && defaultSortBy.key === dataIndex)
                  ? defaultSortBy.order === 'asc' ? 'ascend' : 'descend'
                  : undefined
                // Ширина колонок
                const widthCol = fixWidthColumn ? {width: item.width, maxWidth: 1000} : {}
                // Дополнительные props колонок
                const colProps = customColumnProps &&
                    customColumnProps.find((render) =>
                        render.name === item.name || render.name === item.alias);

                if (item.visible) {
                    // Увеличить счетчик видимых полей
                    visibleIndex++;
                    // Проверка у этого ли поля ставить иконку дерева
                    if(_expandColumnKey === dataIndex)
                        expandIconColumnIndex = visibleIndex + (selectable ? 1 : -1);

                    // Формирование title колонки
                    let titleNode = colProps.headerRenderer
                        ? (typeof colProps.headerRenderer === 'function' ? colProps.headerRenderer() : colProps.headerRenderer)
                        : (item.header ? item.header : item.name)

                    const column = {
                        key: item.name,
                        title: titleNode,
                        dataIndex: item.alias ? item.alias : item.name,
                        align: item.align,
                        resizable: item.resizable,
                        sorter: item.sortable ? item.sortable : undefined,
                        ellipsis: true,
                        defaultSortOrder: defaultSortOrder,
                        ...widthCol,
                        ...colProps,
                    };
                    // Дополнительные props для компонента ячейки
                    column.onCell = (rowData, rowIndex) => ({column, rowData, rowIndex})
                    // Рендер ячейки
                    column.render = (cellData, rowData, rowIndex) => {
                        if (colProps && colProps.cellRenderer)
                            return <colProps.cellRenderer
                              column={column}
                              cellData={cellData}
                              rowData={rowData}
                              rowIndex={rowIndex} />
                        else
                            return item.typeData === 'json' ? JSON.stringify(cellData) : cellData ? cellData : '---'
                    };
                    _columns.push(column)
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

        // console.log('expandIconColumnIndex => ', _expandColumnKey, expandIconColumnIndex);
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
