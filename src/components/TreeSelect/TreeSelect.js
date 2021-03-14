import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { TreeSelect as AntTreeSelect } from "antd";
import { getObjectExcludedProps, notificationError, useMounted } from "../utils/baseUtils";

const excludeProps = [
    'componentType',
    'defaultSortBy',
    'defaultFilter',
    'defaultSearchValue',
    'sortBy',
    'filter',
    'searchValue',
    'searchParamName',
    'requestLoadRows',
    'optionConverter',
    'treeData'
];

/** Компонент выбора элемента(ов) из древовидного списка */
const TreeSelect = props => {

    const {
        // Rt Props
        defaultSortBy,
        defaultFilter,
        defaultSearchValue,
        sortBy,
        filter,
        searchValue,
        searchParamName,
        requestLoadRows,
        optionConverter,
        treeData,
    } = props;
    /** Индикатор загрузки данных */
    const [_loading, _setLoading] = useState(false);
    /** Опции селекта */
    const [_treeData, _setTreeData] = useState(treeData);

    const isMounted = useMounted()

    useEffect(() => {
        _loadOptions({
            sortBy: defaultSortBy,
            filter: defaultFilter,
            searchValue: defaultSearchValue,
            reload: true,
        });
    }, []);

    useEffect(() => {
        // console.log("Change sortBy, filter, searchValue", sortBy, filter, searchValue);
        if(isMounted) {
            _loadOptions({
                sortBy: sortBy,
                filter: filter,
                searchLine: searchValue,
                reload: true,
            });
        }
    }, [sortBy, filter, searchValue]);

    const getSort = (sortBy) =>
        sortBy && sortBy.key ? sortBy.key + ',' + sortBy.order : null;

    const getSearchValue = (searchValue) =>
        searchValue ? {[searchParamName]: searchValue} : null

    const _optionConverter = (options) => {
        if(Array.isArray(options))
            return options.map(option => {
                if(option.children && Array.isArray(option.children))
                    option.children = _optionConverter(option.children)
                return optionConverter(option)
            })
    }

    const _loadOptions = (params) => {
        const {sortBy, filter, searchValue} = params;
        if (!_loading && requestLoadRows) {
            _setLoading(true);
            const requestOptions = {
                params: {
                    page: 0,
                    size: 1,
                    sort: getSort(sortBy)
                },
                data: {
                    ...filter,
                    ...getSearchValue(searchValue)
                }
            }
            requestLoadRows(requestOptions)
                .then((response) => {
                    // console.log("infinity then response", response);
                    const result = response.data;
                    _setTreeData(_optionConverter(result))
                })
                .catch((error) => {
                    notificationError(error, 'Ошибка загрузки данных')
                    // _setRowsHandler(_options); // _setRows
                    // setHasMore(false);
                    _setLoading(false);
                });
        }
    }

    const childProps = getObjectExcludedProps(props, excludeProps);
    return (
        <AntTreeSelect
            {...childProps}
            maxTagCount={0}
            maxTagPlaceholder={(omittedValues) => `Выбрано: ${omittedValues.length}`}
            treeData={_treeData}
            showArrow={true}
            // loadData={onLoadData}
        />
    );
};

TreeSelect.propTypes = {
    /** Сортировка по умолчанию */
    defaultSortBy: PropTypes.shape({
        /** Ключ поля для сортировки */
        key: PropTypes.string,
        /** Направление сортировки */
        order: PropTypes.oneOf(['asc', 'desc']),
    }),

    /** Объект фильтрации по умолчанию */
    defaultFilter: PropTypes.object,

    /** Значение строки поиска по умолчанию строк */
    defaultSearchValue: PropTypes.string,

    /** Сортировка */
    sortBy: PropTypes.object,

    /** Фильтр */
    filter: PropTypes.object,

    /** Значение строки поиска */
    searchValue: PropTypes.string,

    /** Имя параметра для поиска */
    searchParamName: PropTypes.string,

    /** Функция запроса для загрузки строк (данных) */
    requestLoadRows: PropTypes.func,

    /** Функция преобразования загруженных объектов в объекты для селекта.
     * Сигнатура `(option) => ({})`
     * Требоваеть вернуть объект с параметрам
     * `{ label: ReactNode, value: any, children: any, checkable: bool, selectable: bool }`
     * ##### Example:
     * ``` JS
     * (option) => ({
     * 	label: (<span><MehOutlined />{option.name}</span>),
     * 	value: option.id,
     * 	children: option.children,
     * 	checkable: !option.isGroup,
     * 	selectable: !option.isGroup,
     * })
     * ```*/
    optionConverter: PropTypes.func.isRequired,

    /** Select options `[{ label, value, children, checkable, selectable }]` */
    options: PropTypes.arrayOf(PropTypes.object),
};

TreeSelect.defaultProps = {
    // Rt Props
    defaultSortBy: undefined,
    defaultFilter: {},
    defaultSearchValue: undefined,
    requestLoadRows: undefined,
};

export default TreeSelect;
