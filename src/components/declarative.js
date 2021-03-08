import React from "react";
import { DatePickerHOC, TypographyDate, withStore } from "./Form/HOCs";
import {
    Form as AntForm,
    Button as AntButton,
    Typography as AntTypography,
    Radio as AntRadio,
    Divider as AntDivider,
    Checkbox as AntCheckbox,
    DatePicker as AntDatePicker,
    Input as AntInput,
    InputNumber as AntInputNumber,
    Switch as AntSwitch,
    Space as AntSpace,
    Row as AntRow,
    Col as AntCol,
    Tabs as AntTabs,
} from "antd";

import RtForm from "./Form/Form";
import RtLayout from "./Layout/Layout";
import RtSwitcher from './Switcher/Switcher';
import RtTable from "./Table/ConfigLoader";
import RtSelect from "./Select/Select";
import RtTreeSelect from './TreeSelect/TreeSelect'
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
export const renderClassic = (Component) => (props) => {
    return (<Component {...props}>{props.children}</Component>)
}

export const renderClassicWithLabel = (Component) => (props) => {
    return (<Component {...props}>{props.label || props.value || props.children}</Component>)
}

const renderClassicWithComponentType = (Component, componentType) => (props) => {
    return renderClassic(Component)({...props, componentType});
}

export const renderClassicByName = (componentName) => (props) => {
    if(classic[componentName]) {
        // console.log("renderClassicByName => ", props);
        return renderClassic(classic[componentName])(props)
    } else {
        console.log("NO renderClassicByName => ", componentName);
        return null;
    }
}
export const renderDeclarativeByName = (componentName) => (props) => (children) => {
    if(classic[componentName]) {
        // console.log("renderDeclarativeByName => ", props);
        return renderDeclarative(classic[componentName])(props)(children)
    } else {
        console.log("NO renderDeclarativeByName => ", componentName);
        return null;
    }
}

export const renderDeclarative = (Component) => (props) => (children) => {
    // console.log("renderDeclarative => ", props);
    return (<Component {...props}>{children}</Component>)
}

/**
 * HOCs
 */
const renderFormItemComponent = (Component) => (props) => {
    const componentProps = getObjectExcludedProps(props, ['itemProps']);
    return renderDeclarative(AntForm.Item)
        ({...props.itemProps, noStyle: !(props.itemProps && props.itemProps.label)})
        (renderClassic(Component)(componentProps))
}


/**
 * Компонент withStore
 *
 * Clear render
 * Label render
 *
 * FormItem render
 * FormItem Label render
 */

const ComponentClassic = (Component) => (props) => {
    // console.log("ComponentClassic => ", Component)
    const StoreComponent = withStore(Component, {});
    return renderFormItemComponent(StoreComponent)(props);
}
const ComponentClassicWithLabel = (Component) => (props) => {
    const StoreComponent = withStore(Component, {});
    return renderFormItemComponent(renderClassicWithLabel(StoreComponent))(props);
}
const ComponentClassicWithPlaceholder = (Component, placeholder) => (props) => {
    const StoreComponent = withStore(Component, {});
    const _placeholder = (props && props.placeholder) ? props.placeholder : placeholder;
    return renderFormItemComponent(StoreComponent)({...props, placeholder: _placeholder});
}
const ComponentClassicWithOutStore = (Component) => (props) => {
    // console.log("ComponentClassicWithOutStore => ", Component)
    return renderFormItemComponent(Component)(props);
}

/**
 * Components
 */
const Button = (props) => {
    const Component = withStore(AntButton, { trigger: 'onClick' });
    // console.log('Props classic field renderClassic => ', props.field);
    // const onClick = (e) => childProps.onClick && childProps.onClick(e, field);
    const onClick = (e) => props.onClick && props.onClick(e, props.field);
    return renderClassicWithLabel(Component)({...props, onClick: onClick})
}
const Custom = (props) => {
    return renderClassic(props.render)({...props, componentType: 'Custom' })
}
const FormHeader = (props) => {
    return <div className={`${rtPrefix}-form-header`}>{props.children}</div>
}
const FormBody = (props) => {
    let cls = [`${rtPrefix}-form-body`];
    props.noPadding && cls.push(`${rtPrefix}-form-body-no-padding`);
    props.scrollable && cls.push(`${rtPrefix}-form-body-scrollable`);
    return <div className={cls.join(" ")}>{props.children}</div>
}
const FormFooter = (props) => {
    return <div className={`${rtPrefix}-form-footer`}>{props.children}</div>
}


const classicComponents = {
    Form:       RtForm,
    FormHeader: FormHeader,
    FormBody:   FormBody,
    FormFooter: FormFooter,
    Space:      AntSpace,
    Row:        AntRow,
    Col:        AntCol,
    Layout:     RtLayout,
    Tabs:       AntTabs,
    TabPane:    AntTabs.TabPane,
}
const withComponentType = {
    Button:     ComponentClassicWithOutStore(Button),
    Title:      ComponentClassicWithLabel(AntTypography.Title),
    Text:       ComponentClassicWithLabel(AntTypography.Text),
    Divider:    ComponentClassicWithLabel(AntDivider),
    Checkbox:   ComponentClassicWithLabel(AntCheckbox),
    DatePicker: ComponentClassicWithPlaceholder(DatePickerHOC(AntDatePicker), 'Выберите дату'),
    DateText:   ComponentClassic(TypographyDate),
    Input:      ComponentClassicWithPlaceholder(AntInput, 'Введите значение'),
    Search:     ComponentClassicWithPlaceholder(AntInput.Search, 'Поиск'),
    TextArea:   ComponentClassicWithPlaceholder(AntInput.TextArea, 'Введите текст'),
    Password:   ComponentClassicWithPlaceholder(AntInput.Password, 'Введите пароль'),
    InputNumber:ComponentClassicWithPlaceholder(AntInputNumber, 'Введите значение'),
    Switch:     ComponentClassic(AntSwitch),
    RadioGroup: ComponentClassic(AntRadio.Group),
    Select:     ComponentClassic(RtSelect),
    TreeSelect: ComponentClassic(RtTreeSelect),
    Table:      ComponentClassicWithOutStore(RtTable),
    Modal:      ComponentClassicWithOutStore(RtModal),
    Custom:     ComponentClassicWithOutStore(Custom),
    Switcher:   ComponentClassic(RtSwitcher),
    UploadFile: ComponentClassic(RtUploadFile)
}

export const classic = {
    ...classicComponents,
    ...Object.keys(withComponentType)
        .reduce((obj, key) =>
            ({ ...obj, [key]: renderClassicWithComponentType(withComponentType[key], key) }), {})
}

export const declarative =
    Object.keys(classic)
    .reduce((obj, key) =>
        ({ ...obj, [key]: renderDeclarative(classic[key]) }), {});
