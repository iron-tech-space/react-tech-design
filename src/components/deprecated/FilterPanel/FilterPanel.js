import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "antd";
import { noop } from "../../utils/baseUtils";
import DateRange from "../DateRange/DateRange";
import SingleDate from "../SingleDate/SingleDate";
import Select from "../Select/Select";
import { rtPrefix } from "../../utils/variables";

const FilterPanel = (props) => {
  /**
   * Период с, по (день / месяц / год)
   * Множественный выбор (дерево с галочками с поиском) (ajax / const)
   * Множественный выбор (список с поиском) (ajax / const)
   * Единственный выбор (список с поиском) (ajax / const)
   */

  const [filter, setFilter] = useState(props.defaultFilter);
  // const [multiSelectObjects, setMultiSelectObjects] = useState([]);

  const {
    applyFilterTooltip,
    applyFilterSize,
    applyFilterRender,
    borderStyle,
    onChangeFilter,
    onApplyFilter,
    configFilter,
    resetFilterRender,
    resetFilterTooltip,
    resetFilterSize
  } = props;

  useEffect(() => {
    setFilter(props.defaultFilter);
  }, []);

  const _onChangeData = (name, value) => {
    // console.log("FilterPanel -> onChangeData", name, value);
    let _filter = { ...filter };
    if (value === null) {
      delete _filter[name];
    } else {
      _filter = { ..._filter, ...{ [name]: value } };
    }
    // console.log("onChangeData:", _filter);
    setFilter(_filter);
    onChangeFilter(_filter);
  };

  const _applyFilter = () => {
    // console.log("_applyFilter:", filter);
    onApplyFilter(filter);
  };
  const _resetFilter = () => {
    // console.log("_resetFilter:", props.defaultFilter);
    setFilter(props.defaultFilter);
    onChangeFilter(props.defaultFilter);
    onApplyFilter(props.defaultFilter);
    // setMultiSelectObjects([]);
  };

  // const _onChangeObjects = (name, value) => {
  // 	let _multiSelectObjects = {...multiSelectObjects};
  // 	if (value === null) {
  // 		delete _multiSelectObjects[name];
  // 	} else {
  // 		_multiSelectObjects = {..._multiSelectObjects, ...{[name]: value}};
  // 	}
  // 	// console.log("onChangeData:", _filter);
  // 	setMultiSelectObjects(_multiSelectObjects);
  // };
  const getPanelCls = () => {
    let cls = [`${rtPrefix}-filter-panel`];
    cls.push(`border-${borderStyle}`);
    if (configFilter.findIndex((item) => !!item.title) === -1)
      cls.push(`${rtPrefix}-filter-panel-no-title`);
    return cls.join(" ");
  };

  return (
    <React.Fragment>
      {configFilter && configFilter.length ? (
        <div className={getPanelCls()}>
          {configFilter.map((item, index) => {
            // console.log("item.defaultRows", item.defaultRows);
            let cls = [`${rtPrefix}-filter-panel-item`];
            item.className && cls.push(item.className);
            switch (item.componentType) {
              case "DateRange":
                return (
                  <DateRange
                    key={index}
                    {...item}
                    className={cls.join(" ")}
                    defaultValueStart={
                      filter[item.nameStart]
                        ? filter[item.nameStart]
                        : null
                    }
                    defaultValueEnd={
                      filter[item.nameEnd]
                        ? filter[item.nameEnd]
                        : null
                    }
                    onChange={_onChangeData}
                    valueStart={filter[item.nameStart]}
                    valueEnd={filter[item.nameEnd]}
                  />
                );
              case "SingleDate":
                return (
                  <SingleDate
                    key={index}
                    {...item}
                    className={cls.join(" ")}
                    dateFormat={
                      item.dateFormat
                        ? item.dateFormat
                        : undefined
                    }
                    defaultValue={
                      filter[item.name]
                        ? filter[item.name]
                        : null
                    }
                    onChange={_onChangeData}
                    value={filter[item.name]}
                  />
                );
              case "MultiSelect":
              case "SingleSelect":
                return (
                  <Select
                    key={index}
                    {...item}
                    type={item.componentType}
                    defaultSelectedRowKeys={
                      filter[item.name]
                        ? filter[item.name]
                        : null
                    }
                    selectedRowKeys={filter[item.name] ? filter[item.name] : []}
                    className={cls.join(" ")}
                    onChangeKeys={_onChangeData}
                    defaultValue={
                      filter[item.name]
                        ? filter[item.name]
                        : null
                    }
                    value={filter[item.name]}
                  />
                );
              case "Custom":
                return (
                  <React.Fragment key={index}>
                    {
                      item.render({
                        onChange: _onChangeData,
                        defaultValue: filter[item.name]
                          ? filter[item.name]
                          : null,
                        value: filter[item.name]
                      })
                    }
                  </React.Fragment>);
              default:
                return null;
            }
          })}
          <Tooltip title={applyFilterTooltip}>
            <Button
              type='primary'
              size={applyFilterSize}
              style={{ marginLeft: "auto" }}
              onClick={_applyFilter}
            >
              {applyFilterRender}
            </Button>
          </Tooltip>
          <Tooltip title={resetFilterTooltip}>
            <Button
              size={resetFilterSize}
              style={{ marginLeft: "10px" }}
              onClick={_resetFilter}
            >
              {resetFilterRender}
            </Button>
          </Tooltip>
        </div>
      ) : null}
    </React.Fragment>
  );
};

FilterPanel.propTypes = {

  /** Тест Tooltip для кнопки "Применить фильтр" */
  applyFilterTooltip: PropTypes.string,

  /** Размер кнопки "Применить фильтр" ['small', 'middle', 'large'] */
  applyFilterSize: PropTypes.oneOf(["small", "middle", "large"]),

  /** Строка / функция / элемент для отображения в кнопке "Применить фильтр" */
  applyFilterRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.string
  ]),

  /** Тип бордера панели (по умолчанию 'none')
   * ['all', 'none', 'top', 'left', 'bottom', 'right', 'top-bottom', 'left-right'] */
  borderStyle: PropTypes.oneOf([
    "all",
    "none",
    "top",
    "left",
    "bottom",
    "right",
    "top-bottom",
    "left-right"
  ]),

  /** Объект фильтра по умолчанию */
  defaultFilter: PropTypes.object,

  /** Конфигурация панели фильтров */
  configFilter: PropTypes.arrayOf(PropTypes.object),

  /** Событие по кнопке выполнить фильтр */
  onApplyFilter: PropTypes.func,

  /** Событие по изменение объекта фильтра */
  onChangeFilter: PropTypes.func,

  /** Тест Tooltip для кнопки "Сбросить фильтр" */
  resetFilterTooltip: PropTypes.string,

  /** Размер кнопки "Сбросить фильтр" ['small', 'middle', 'large'] */
  resetFilterSize: PropTypes.oneOf(["small", "middle", "large"]),

  /** Строка / функция / элемент для отображения в кнопке "Сбросить фильтр" */
  resetFilterRender: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.string
  ])
};

FilterPanel.defaultProps = {
  applyFilterTooltip: "Применить фильтр",
  applyFilterSize: "middle",
  applyFilterRender: "Применить",
  borderStyle: "none",
  defaultFilter: {},
  configFilter: [],
  onApplyFilter: noop,
  onChangeFilter: noop,
  resetFilterTooltip: "Сбросить фильтр",
  resetFilterSize: "middle",
  resetFilterRender: "Сбросить"
};

export default FilterPanel;
