import React, { useEffect, useState } from "react";
import { getSortBy, noop, notificationError } from "../../utils/baseUtils";
import Table from "./Table";

const defaultProps = {
    defaultFilter: {},
    rowKey: "id",
    pageSize: 50,
    expandColumnKey: undefined,
    expandLazyLoad: false,
    expandParentKey: "parentId",
    customColumnProps: [],
    nullDash: "---",
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
        selectable,
        nullDash
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
    }, []);

    const configParser = (config) => {

        // Массив колонок
        let _columns = [];
        // Сортировка по умолчанию
        let _defaultSorter = [];
        // Счетчик видимых полей
        let visibleIndex = 0;
        // Индекс колонки около которой ставить иконку дерева
        let expandIconColumnIndex = -1;
        // Ключ иерархии
        let _expandColumnKey = config && config.hierarchical && config.hierarchyView
            ? config.hierarchyView
            : expandColumnKey;

        config && config.fields && config.fields.forEach((item, index) => {
            // console.log('configParser item => ', item);

            // Дополнительные props колонок
            const colProps = customColumnProps &&
                customColumnProps.find((render) =>
                    render.name === item.name || render.name === item.alias);

            // Если поле не надо показывать, то след цикл
            if (!item.visible || (colProps && colProps.hidden))
                return;

            // Индекс или имя поля в данных
            const dataIndex = (item.alias ? item.alias : item.name);
            // Сортировка по умолчанию
            if (_defaultSorter.length === 0 || _defaultSorter[1] === undefined)
                _defaultSorter = getSortBy(defaultSortBy, item.defaultSort, dataIndex);

            // Ширина колонок
            const widthCol = fixWidthColumn ? { width: item.width, maxWidth: 1000 } : {};
            // Увеличить счетчик видимых полей
            visibleIndex++;
            // Проверка у этого ли поля ставить иконку дерева
            if (_expandColumnKey === dataIndex)
                expandIconColumnIndex = visibleIndex + (selectable ? 1 : -1);
            // Формирование title колонки
            let titleNode = colProps && colProps.headerRenderer
                ? (typeof colProps.headerRenderer === "function" ? colProps.headerRenderer() : colProps.headerRenderer)
                : (item.header ? item.header : item.name);

            const column = {
                key: dataIndex,
                title: titleNode,
                dataIndex: dataIndex,
                align: item.align,
                resizable: item.resizable,
                sorter: item.sortable ? item.sortable : undefined,
                ellipsis: true,
                defaultSortOrder: _defaultSorter[1],
                ...widthCol,
                ...colProps
            };
            // Дополнительные props для компонента ячейки
            column.onCell = (rowData, rowIndex) => ({ column, rowData, rowIndex });
            // Рендер ячейки
            column.render = (cellData, rowData, rowIndex) => {
                if (colProps && colProps.cellRenderer)
                    return <colProps.cellRenderer
                        column={column}
                        cellData={cellData}
                        rowData={rowData}
                        rowIndex={rowIndex} />;
                else
                    return item.typeData === "json" ? JSON.stringify(cellData) : cellData ? cellData : nullDash;
            };
            _columns.push(column);
        });

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
            defaultSortBy: _defaultSorter[0],
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
            pageSize: config && config.hierarchical ? 1 : pageSize,
        });
    };

    if (tableConfig)
        return (<Table {...props} {...tableConfig} />);
    else
        return null;
};

export default ConfigLoader;
