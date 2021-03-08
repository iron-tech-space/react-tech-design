import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import { TreeSelect as AntTreeSelect } from "antd";
import { getObjectExcludedProps, notificationError, useMounted } from "../utils/baseUtils";

const TreeSelect = props => {

    const {
        defaultSortBy,
        defaultFilter,
        defaultSearchValue,
        sortBy,
        filter,
        searchValue,
        // infinityMode,
        requestLoadRows,
        optionConverter,
        treeData,
        // widthControl,
        subscribe = [],
        // pageSize,
        searchParamName,
        //
        // // Ant Props
        // mode,
        // onChange,
        // value,
    } = props;
    /** Индикатор загрузки данных */
    const [_loading, _setLoading] = useState(false);
    /** Опции селекта */
    const [_treeData, _setTreeData] = useState(treeData);
    /** Объект сортировки */
    const [_sortBy, _setSortBy] = useState(undefined);
    /** Объект фильтрации */
    const [_filter, _setFilter] = useState({});
    /** Строка поиска */
    const [_searchValue, _setSearchValue] = useState(undefined);

    const excludeProps = [
        'componentType', 'defaultSortBy', 'defaultFilter', 'defaultSearchValue',
        'infinityMode', 'requestLoadRows', 'optionConverter', 'options', 'widthControl',
        'pageSize', 'searchParamName',
        'subscribe', ...subscribe.map(item => item.name), 'dispatch', 'dispatchExtraData'];

    const isMounted = useMounted()

    useEffect(() => {
        _setSearchValue(defaultSearchValue);
        _loadOptions({
            sortBy: defaultSortBy,
            filter: defaultFilter,
            searchValue: defaultSearchValue,
            reload: true,
        });
    }, []);

    // useEffect(() => {
    //     // console.log("Change sortBy, filter, searchValue", sortBy, filter, searchValue);
    //     if(isMounted) {
    //         const __sortBy = sortBy ? sortBy : _sortBy;
    //         const __filter = filter ? filter : _filter;
    //         const __searchValue = searchValue ? searchValue : _searchValue;
    //         _setSortBy(__sortBy);
    //         _setFilter(__filter);
    //         _setSearchValue(__searchValue);
    //         _loadOptions({
    //             sortBy: __sortBy,
    //             filter: __filter,
    //             searchLine: __searchValue,
    //             reload: true,
    //         });
    //     }
    // }, [sortBy, filter, searchValue]);

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

};

TreeSelect.defaultProps = {
    // Ant Props
    placeholder: "Выберите",
};

export default TreeSelect;
