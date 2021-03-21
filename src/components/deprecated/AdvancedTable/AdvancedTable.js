import React, {forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Table from '../Table/Table';
import { notification, Typography } from "antd";
import { notificationError } from "../../utils/baseUtils";

const AdvancedTable = forwardRef((props, ref) => {
	const [config, setConfig] = useState({});

	const {
		configData,
        customColumnProps,
		defaultFilter,
		expandColumnKey,
		expandLazyLoad,
		expandParentKey,
		pageSize,
		rowKey,
		requestLoadConfig,
	} = props;

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
                        if(!cleanupFunction)
                            setConfig(response.data);
                    })
                    .catch(error => notificationError(error, 'Ошибка получения конфигурации') );
            } else {
                if(!cleanupFunction)
                    setConfig(configData);
            }
        };
        loadData();
        return () => cleanupFunction = true;
	}, []);

	const columnsByConfig = () =>
		config &&
		config.fields &&
		config.fields.map((item) => {

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
						return <colProps.cellRenderer {...object}/>
					// return colProps.cellRenderer(object) ? colProps.cellRenderer(object) : '---';
					else
						return object.cellData
							? <Typography.Text ellipsis={true} style={{width: '100%'}} className={'rt-table-cell'}>{object.cellData}</Typography.Text>
							: <Typography.Text ellipsis={true} style={{width: '100%'}} className={'rt-table-cell'}>---</Typography.Text> ;
					// return object.cellData ? object.cellData : '---';
                },
			};
		});

	const getDefaultFilter = () => {
		if (config && config.hierarchical && config.hierarchyLazyLoad) {
			const parentKey = config.hierarchyField
				? config.hierarchyField.split('/')[1]
				: expandParentKey;
			return {...defaultFilter, [parentKey]: null};
		} else return defaultFilter;
	};

	if (config && config.fields) {
		// console.log('AdvancedTable render table -> ', config);
		return (
			<Table
				{...props}
				ref={ref}
				columns={columnsByConfig()}
				defaultFilter={getDefaultFilter()}
				rowKey={
					config && config.hierarchical && config.hierarchyField
						? config.hierarchyField.split('/')[0]
						: rowKey
				}
				expandParentKey={
					config && config.hierarchical && config.hierarchyField
						? config.hierarchyField.split('/')[1]
						: expandParentKey
				}
				expandColumnKey={
					config && config.hierarchical && config.hierarchyView
						? config.hierarchyView
						: expandColumnKey
				}
				expandLazyLoad={
					config && config.hierarchical && config.hierarchyLazyLoad
						? config.hierarchyLazyLoad
						: expandLazyLoad
				}
				pageSize={config && config.hierarchical ? 1 : pageSize}
			/>
		);
	} else return null;
});

AdvancedTable.propTypes = {
	/** Функция запроса на получение конфига для таблицы */
	requestLoadConfig: PropTypes.func,

	/** Конфигурация внешнего вида таблицы */
	configData: PropTypes.shape({
		hierarchical: PropTypes.bool,
		hierarchyField: PropTypes.string,
		hierarchyView: PropTypes.string,
		hierarchyLazyLoad: PropTypes.bool,
		fields: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string,
				alias: PropTypes.string,
				header: PropTypes.string,
				visible: PropTypes.bool,
				resizable: PropTypes.bool,
				sortable: PropTypes.bool,
				align: PropTypes.oneOf(['left', 'center', 'right']),
				width: PropTypes.number,
			})
		),
	}),

	/** Дополнительные пропсы для колонок */
    customColumnProps: PropTypes.arrayOf(PropTypes.object),
};

AdvancedTable.defaultProps = {};

export default AdvancedTable;
