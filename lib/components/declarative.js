import "antd/es/radio/style";
import _Radio from "antd/es/radio";
import "antd/es/switch/style";
import _Switch from "antd/es/switch";
import "antd/es/input-number/style";
import _InputNumber from "antd/es/input-number";
import "antd/es/input/style";
import _Input from "antd/es/input";
import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";
import "antd/es/checkbox/style";
import _Checkbox from "antd/es/checkbox";
import "antd/es/divider/style";
import _Divider from "antd/es/divider";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/tabs/style";
import _Tabs from "antd/es/tabs";
import "antd/es/col/style";
import _Col from "antd/es/col";
import "antd/es/row/style";
import _Row from "antd/es/row";
import "antd/es/space/style";
import _Space from "antd/es/space";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/form/style";
import _Form from "antd/es/form";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from "react";
import { DatePickerHOC, TypographyDate, withStore } from "./Form/HOCs";


import RtForm from "./Form/Form";
import RtLayout from "./Layout/Layout";
import RtSwitcher from './Switcher/Switcher';
import RtTable from "./Table/ConfigLoader";
import RtSelect from "./Select/Select";
import RtTreeSelect from './TreeSelect/TreeSelect';
import RtModal from "./Modal/Modal";
import RtUploadFile from "./UploadFile/UploadFile";

import { rtPrefix } from "./utils/variables";
import { getObjectExcludedProps } from "./utils/baseUtils";

// console.log("RtTable => ", RtTable)
// console.log("RtSelect => ", RtSelect)
// console.log("RtTreeSelect => ", RtTreeSelect)

/**
 * Renders
 *
 * Clear render
 * Label render
 * FormItem render
 * FormItem Label render
 *
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

/**
 * HOCs
 */
var renderFormItemComponent = function renderFormItemComponent(Component) {
    return function (props) {
        var componentProps = getObjectExcludedProps(props, ['itemProps']);
        return renderDeclarative(_Form.Item)(_extends({}, props.itemProps, { noStyle: !(props.itemProps && props.itemProps.label) }))(renderClassic(Component)(componentProps));
    };
};

/**
 * Компонент withStore
 *
 * Clear render
 * Label render
 *
 * FormItem render
 * FormItem Label render
 */

var ComponentClassic = function ComponentClassic(Component) {
    return function (props) {
        // console.log("ComponentClassic => ", Component)
        var StoreComponent = withStore(Component, {});
        return renderFormItemComponent(StoreComponent)(props);
    };
};
var ComponentClassicWithLabel = function ComponentClassicWithLabel(Component) {
    return function (props) {
        var StoreComponent = withStore(Component, {});
        return renderFormItemComponent(renderClassicWithLabel(StoreComponent))(props);
    };
};
var ComponentClassicWithPlaceholder = function ComponentClassicWithPlaceholder(Component, placeholder) {
    return function (props) {
        var StoreComponent = withStore(Component, {});
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

/**
 * Components
 */
var Button = function Button(props) {
    var Component = withStore(_Button, { trigger: 'onClick' });
    // console.log('Props classic field renderClassic => ', props.field);
    // const onClick = (e) => childProps.onClick && childProps.onClick(e, field);
    var onClick = function onClick(e) {
        return props.onClick && props.onClick(e, props.field);
    };
    return renderClassicWithLabel(Component)(_extends({}, props, { onClick: onClick }));
};
var Custom = function Custom(props) {
    return renderClassic(props.render)(_extends({}, props, { componentType: 'Custom' }));
};
var FormHeader = function FormHeader(props) {
    return React.createElement(
        "div",
        { className: rtPrefix + "-form-header" },
        props.children
    );
};
var FormBody = function FormBody(props) {
    var cls = [rtPrefix + "-form-body"];
    props.noPadding && cls.push(rtPrefix + "-form-body-no-padding");
    props.scrollable && cls.push(rtPrefix + "-form-body-scrollable");
    return React.createElement(
        "div",
        { className: cls.join(" ") },
        props.children
    );
};
var FormFooter = function FormFooter(props) {
    return React.createElement(
        "div",
        { className: rtPrefix + "-form-footer" },
        props.children
    );
};

var classicComponents = {
    Form: RtForm,
    FormHeader: FormHeader,
    FormBody: FormBody,
    FormFooter: FormFooter,
    Space: _Space,
    Row: _Row,
    Col: _Col,
    Layout: RtLayout,
    Tabs: _Tabs,
    TabPane: _Tabs.TabPane
};
var withComponentType = {
    Button: ComponentClassicWithOutStore(Button),
    Title: ComponentClassicWithLabel(_Typography.Title),
    Text: ComponentClassicWithLabel(_Typography.Text),
    Divider: ComponentClassicWithLabel(_Divider),
    Checkbox: ComponentClassicWithLabel(_Checkbox),
    DatePicker: ComponentClassicWithPlaceholder(DatePickerHOC(_DatePicker), 'Выберите дату'),
    DateText: ComponentClassic(TypographyDate),
    Input: ComponentClassicWithPlaceholder(_Input, 'Введите значение'),
    Search: ComponentClassicWithPlaceholder(_Input.Search, 'Поиск'),
    TextArea: ComponentClassicWithPlaceholder(_Input.TextArea, 'Введите текст'),
    Password: ComponentClassicWithPlaceholder(_Input.Password, 'Введите пароль'),
    InputNumber: ComponentClassicWithPlaceholder(_InputNumber, 'Введите значение'),
    Switch: ComponentClassic(_Switch),
    RadioGroup: ComponentClassic(_Radio.Group),
    Select: ComponentClassic(RtSelect),
    TreeSelect: ComponentClassic(RtTreeSelect),
    Table: ComponentClassicWithOutStore(RtTable),
    Modal: ComponentClassicWithOutStore(RtModal),
    Custom: ComponentClassicWithOutStore(Custom),
    Switcher: ComponentClassic(RtSwitcher),
    UploadFile: ComponentClassic(RtUploadFile)
};

export var classic = _extends({}, classicComponents, Object.keys(withComponentType).reduce(function (obj, key) {
    return _extends({}, obj, _defineProperty({}, key, renderClassicWithComponentType(withComponentType[key], key)));
}, {}));

export var declarative = Object.keys(classic).reduce(function (obj, key) {
    return _extends({}, obj, _defineProperty({}, key, renderDeclarative(classic[key])));
}, {});