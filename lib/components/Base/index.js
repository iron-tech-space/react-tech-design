import "antd/es/tabs/style";
import _Tabs from "antd/es/tabs";
import "antd/es/button/style";
import _Button from "antd/es/button";
import "antd/es/typography/style";
import _Typography from "antd/es/typography";
import "antd/es/date-picker/style";
import _DatePicker from "antd/es/date-picker";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from "react";
import moment from "moment";

import { getISO, toFormat } from "../utils/datesUtils";
import { withStore } from "./withStore";
import { rtPrefix } from "../utils/variables";
import { renderFormItemComponent, renderClassicWithLabel } from "../declarative";

/** Компонент выбора даты */
var DatePicker = function DatePicker(props) {
    // console.log("DatePickerHOC => ", props);
    if (props.value) {
        if (typeof props.value === 'string') {
            // console.log("DatePickerHOC => onChange => string");
            props.onChange(moment(props.value), props.value);
        }
        // else {
        // 	console.log("DatePickerHOC => onChange => moment");
        // 	props.onChange(props.value, props.format ? toFormat(props.value,props.format) : getISO(props.value));
        // }
    }
    var value = props.value ? typeof props.value === 'string' ? moment(props.value) : props.value : undefined;
    var style = _extends({ width: '100%' }, props && props.style); // locale={locale}
    // console.log("DatePickerHOC value => ", value);
    return React.createElement(_DatePicker, _extends({}, props, { style: style, value: value }));
};

/** Компонент вывода даты в текстовом виде */
var TypographyDate = function TypographyDate(props) {
    var label = props.label,
        value = props.value,
        format = props.format;

    var _value = value ? format ? toFormat(value, format) : getISO(value) : undefined;
    return React.createElement(
        _Typography.Text,
        props,
        " ",
        label || _value,
        " "
    );
};

/** Компонент кнопки со всеми пропрами AntButton */
var Button = function Button(props) {
    var Component = withStore(_Button, { trigger: 'onClick' });
    // console.log('Props classic field renderClassic => ', props.field);
    // const onClick = (e) => childProps.onClick && childProps.onClick(e, field);
    var onClick = function onClick(e) {
        return props.onClick && props.onClick(e, props.field);
    };
    return renderClassicWithLabel(Component)(_extends({}, props, { onClick: onClick }));
};

/** Custom компонент */
var Custom = function Custom(props) {
    var children = props.children;

    var childNode = null;
    var childProps = null;

    if (Array.isArray(children)) {
        console.warn('Custom component: `children` is array. Don\'t render component');
        return null;
    } else if (props.render) {
        // console.log('childNode = props.render')
        childNode = props.render;
        childProps = _extends({}, props, { componentType: 'Custom' });
        return renderFormItemComponent(childNode)(childProps);
    } else if (React.isValidElement(children)) {
        // console.log('childNode = children')
        childProps = _extends({}, children.props, props, { componentType: 'Custom' });
        return React.cloneElement(children, childProps);
    } else {
        console.warn('Custom component: not exist valid render');
        return null;
    }
};

/** Компонент заголовка формы */
var FormHeader = function FormHeader(props) {
    return React.createElement(
        "div",
        { className: rtPrefix + "-form-header" },
        props.children
    );
};

/** Компонент тела формы */
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

/** Компонент подвала формы */
var FormFooter = function FormFooter(props) {
    return React.createElement(
        "div",
        { className: rtPrefix + "-form-footer" },
        props.children
    );
};

var TabPane = function TabPane(props) {
    var cls = [];
    props.className && cls.push(props.className);
    props.scrollable && cls.push(rtPrefix + "-tabs-tabpane-scrollable");
    return React.createElement(
        _Tabs.TabPane,
        _extends({}, props, { className: cls.join(" ") }),
        props.children
    );
};

export { DatePicker, TypographyDate, Button, Custom, FormHeader, FormBody, FormFooter, TabPane, withStore };