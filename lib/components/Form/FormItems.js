import "antd/es/form/style";
import _Form from "antd/es/form";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from "react";
import FormItem from "./FormItem";

import { renderDeclarativeByName } from "../core/renders";

var FormItems = function FormItems(props) {
    var items = props.items;
    // console.log('FormItems props => ', props);

    var getItems = function getItems(data, formListProps) {
        return data && data.map(function (item, index) {
            var componentType = item.componentType,
                children = item.children,
                itemProps = _objectWithoutProperties(item, ["componentType", "children"]);
            // console.log('FormItems index => ', index);


            switch (componentType) {
                case "Item":
                    var _item = _extends({}, item);
                    var _key = index;
                    if (formListProps && formListProps.field) {
                        if (_item.name) {
                            if (Array.isArray(_item.name)) {
                                _item.name = [formListProps.field.name].concat(_toConsumableArray(_item.name));
                                _item.fieldKey = [formListProps.field.name].concat(_toConsumableArray(_item.name));
                            } else {
                                _item.name = [formListProps.field.name, _item.name];
                                _item.fieldKey = [formListProps.field.name].concat(_toConsumableArray(_item.name));
                            }
                        }
                    }
                    // console.log('_item ', _item.name);
                    return React.createElement(FormItem, _extends({ key: "" + _key }, _item, { field: _extends({}, formListProps) }));
                case "ListItems":
                    return React.createElement(
                        _Form.List,
                        _extends({ key: index }, itemProps),
                        function (fields, operation) {
                            var param = { fields: [].concat(_toConsumableArray(fields)), operation: _extends({}, operation) };
                            return getItems(children, param);
                        }
                    );
                case "ListItem":
                    // console.log('formListProps => ', formListProps);
                    return React.createElement(
                        "div",
                        { key: index },
                        formListProps && formListProps.fields && formListProps.fields.map(function (field, fIndex) {
                            // console.log('index field.key', index, field);
                            var param = _extends({ field: _extends({}, field) }, formListProps);
                            return React.createElement(
                                "div",
                                { key: field.key },
                                getItems(children, param),
                                " "
                            );
                        })
                    );
                default:
                    return renderDeclarativeByName(componentType)(_extends({ key: index }, itemProps))(getItems(children, formListProps));
            }
        }) || null;
    };

    return getItems(items);
};

export default FormItems;