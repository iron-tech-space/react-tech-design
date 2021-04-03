import "antd/es/radio/style";
import _Radio from "antd/es/radio";
import "antd/es/switch/style";
import _Switch from "antd/es/switch";
import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/checkbox/style";
import _Checkbox from "antd/es/checkbox";
import "antd/es/divider/style";
import _Divider from "antd/es/divider";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/list/style";
import _List from "antd/es/list";
import "antd/es/tabs/style";
import _Tabs from "antd/es/tabs";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/space/style";
import _Space from "antd/es/space";
import "antd/es/form/style";
import _Form from "antd/es/form";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from "react";
import { DatePicker as RtDatePicker, TypographyDate, Button as RtButton, Custom, FormHeader, FormBody, FormFooter, TabPane as RtTabPane, withStore } from "./Base";

import RtForm from "./Form/Form";
import RtLayout from "./Layout/Layout";
import RtSwitcher from './Switcher/Switcher';
import RtTable from "./Table/ReactBaseTable/ConfigLoader";
import AntTable from "./Table/AntTable/ConfigLoader";
import RtSelect from "./Select/Select";
import RtTreeSelect from './TreeSelect/TreeSelect';
import RtModal from "./Modal/Modal";
import RtUploadFile from "./UploadFile/UploadFile";
import { getObjectExcludedProps } from "./utils/baseUtils";

/**
 * Renders
 */
export var renderClassic = function renderClassic(Component) {
    return function (props) {
        return React.createElement(
            Component,
            props,
            props.children
        );
    };
};

export var renderClassicWithLabel = function renderClassicWithLabel(Component) {
    return function (props) {
        return React.createElement(
            Component,
            props,
            props.label || props.value || props.children
        );
    };
};

var renderClassicWithComponentType = function renderClassicWithComponentType(Component, componentType) {
    return function (props) {
        return renderClassic(Component)(_extends({}, props, { componentType: componentType }));
    };
};

export var renderClassicByName = function renderClassicByName(componentName) {
    return function (props) {
        if (classic[componentName]) {
            // console.log("renderClassicByName => ", props);
            return renderClassic(classic[componentName])(props);
        } else {
            console.log("NO renderClassicByName => ", componentName);
            return null;
        }
    };
};
export var renderDeclarativeByName = function renderDeclarativeByName(componentName) {
    return function (props) {
        return function (children) {
            if (classic[componentName]) {
                // console.log("renderDeclarativeByName => ", props);
                return renderDeclarative(classic[componentName])(props)(children);
            } else {
                console.log("NO renderDeclarativeByName => ", componentName);
                return null;
            }
        };
    };
};

export var renderDeclarative = function renderDeclarative(Component) {
    return function (props) {
        return function (children) {
            // console.log("renderDeclarative => ", props);
            return React.createElement(
                Component,
                props,
                children
            );
        };
    };
};

var renderFormItemComponent = function renderFormItemComponent(Component) {
    return function (props) {
        var componentProps = getObjectExcludedProps(props, ['itemProps']);
        return renderDeclarative(_Form.Item)(_extends({}, props.itemProps, { noStyle: !(props.itemProps && props.itemProps.label) }))(renderClassic(Component)(componentProps));
    };
};

/** */
var ComponentClassic = function ComponentClassic(Component) {
    return function (props) {
        // console.log("ComponentClassic => ", Component)
        var StoreComponent = withStore(Component, props.itemProps);
        return renderFormItemComponent(StoreComponent)(props);
    };
};
var ComponentClassicWithLabel = function ComponentClassicWithLabel(Component) {
    return function (props) {
        var StoreComponent = withStore(Component, props.itemProps);
        return renderFormItemComponent(renderClassicWithLabel(StoreComponent))(props);
    };
};
var ComponentClassicWithPlaceholder = function ComponentClassicWithPlaceholder(Component, placeholder) {
    return function (props) {
        var StoreComponent = withStore(Component, props.itemProps);
        var _placeholder = props && props.placeholder ? props.placeholder : placeholder;
        return renderFormItemComponent(StoreComponent)(_extends({}, props, { placeholder: _placeholder }));
    };
};
var ComponentClassicWithOutStore = function ComponentClassicWithOutStore(Component) {
    return function (props) {
        // console.log("ComponentClassicWithOutStore => ", Component)
        return renderFormItemComponent(Component)(props);
    };
};

var TableWrapper = function TableWrapper(props) {
    var type = props.type,
        restProps = _objectWithoutProperties(props, ["type"]);

    if (type) return type === 'rt' ? React.createElement(RtTable, restProps) : React.createElement(AntTable, restProps);else return props.infinityMode ? React.createElement(RtTable, props) : React.createElement(AntTable, props);
};

var classicComponents = {
    Form: RtForm,
    FormHeader: FormHeader,
    FormBody: FormBody,
    FormFooter: FormFooter,
    FormList: _Form.List,
    Space: renderFormItemComponent(_Space),
    Row: renderFormItemComponent(_Row),
    Col: renderFormItemComponent(_Col),
    Layout: renderFormItemComponent(RtLayout),
    Tabs: _Tabs,
    TabPane: RtTabPane,
    List: renderFormItemComponent(_List)
};
var withComponentType = {
    Button: ComponentClassicWithOutStore(RtButton),
    Title: ComponentClassicWithLabel(_Typography.Title),
    Text: ComponentClassicWithLabel(_Typography.Text),
    Divider: ComponentClassicWithLabel(_Divider),
    Checkbox: ComponentClassicWithLabel(_Checkbox),
    DatePicker: ComponentClassicWithPlaceholder(RtDatePicker, 'Выберите дату'),
    DateText: ComponentClassic(TypographyDate),
    Input: ComponentClassicWithPlaceholder(_Input, 'Введите значение'),
    Search: ComponentClassicWithPlaceholder(_Input.Search, 'Поиск'),
    TextArea: ComponentClassicWithPlaceholder(_Input.TextArea, 'Введите текст'),
    Password: ComponentClassicWithPlaceholder(_Input.Password, 'Введите пароль'),
    InputNumber: ComponentClassicWithPlaceholder(_InputNumber, 'Введите значение'),
    Switch: ComponentClassic(_Switch),
    RadioGroup: ComponentClassic(_Radio.Group),
    Select: ComponentClassicWithPlaceholder(RtSelect, 'Выберите значение'),
    TreeSelect: ComponentClassicWithPlaceholder(RtTreeSelect, 'Выберите значение'),
    Table: ComponentClassicWithOutStore(TableWrapper),
    RtTable: ComponentClassicWithOutStore(RtTable),
    AntTable: ComponentClassicWithOutStore(AntTable),
    Modal: ComponentClassicWithOutStore(RtModal),
    Custom: ComponentClassic(Custom),
    Switcher: ComponentClassic(RtSwitcher),
    UploadFile: ComponentClassic(RtUploadFile)
};

export var classic = _extends({}, classicComponents, Object.keys(withComponentType).reduce(function (obj, key) {
    return _extends({}, obj, _defineProperty({}, key, renderClassicWithComponentType(withComponentType[key], key)));
}, {}));

export var declarative = Object.keys(classic).reduce(function (obj, key) {
    return _extends({}, obj, _defineProperty({}, key, renderDeclarative(classic[key])));
}, {});