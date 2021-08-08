import "antd/es/form/style";
import _Form from "antd/es/form";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React from "react";
import PropTypes from "prop-types";
import FormItem from "./FormItem";

import { getObjectExcludedProps } from "../utils/baseUtils";
import { renderDeclarativeByName } from "../core/renders";

var excludeProps = ["children", "componentType"];

var FormItems = function FormItems(props) {
    var items = props.items;

    // console.log('FormItems props => ', props);

    var getItems = function getItems(data, antFormListParams) {

        return data && data.map(function (item, index) {
            var itemProps = getObjectExcludedProps(item, excludeProps);
            // console.log('FormItems index => ', index);

            switch (item.componentType) {
                case "Item":
                    var _item = _extends({}, item);
                    var _key = index;
                    if (antFormListParams && antFormListParams.field) {
                        if (_item.name) {
                            if (Array.isArray(_item.name)) {
                                _item.name = [antFormListParams.field.name].concat(_toConsumableArray(_item.name));
                                _item.fieldKey = [antFormListParams.field.name].concat(_toConsumableArray(_item.name));
                            } else {
                                _item.name = [antFormListParams.field.name, _item.name];
                                _item.fieldKey = [antFormListParams.field.name].concat(_toConsumableArray(_item.name));
                            }
                        }
                    }
                    // console.log('_item ', _item.name);
                    return React.createElement(FormItem, _extends({ key: "" + _key }, _item, { field: _extends({}, antFormListParams) }));
                case "ListItems":
                    return React.createElement(
                        _Form.List,
                        _extends({ key: index }, itemProps),
                        function (fields, operation) {
                            var param = { fields: [].concat(_toConsumableArray(fields)), operation: _extends({}, operation) };
                            return getItems(item.children, param);
                        }
                    );
                case "ListItem":
                    // console.log('antFormListParams => ', antFormListParams);
                    return React.createElement(
                        "div",
                        { key: index },
                        antFormListParams && antFormListParams.fields && antFormListParams.fields.map(function (field, fIndex) {
                            // console.log('index field.key', index, field);
                            var param = _extends({ field: _extends({}, field) }, antFormListParams);
                            return React.createElement(
                                "div",
                                { key: field.key },
                                getItems(item.children, param),
                                " "
                            );
                        })
                    );
                default:
                    return renderDeclarativeByName(item.componentType)(_extends({ key: index }, itemProps))(getItems(item.children, antFormListParams));
            }
        }) || null;
    };

    return getItems(items);
};

FormItems.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FormItems;