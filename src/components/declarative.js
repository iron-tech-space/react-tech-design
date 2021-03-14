import React from "react";
import {
    DatePicker as RtDatePicker,
    TypographyDate,
    Button as RtButton,
    Custom,
    FormHeader,
    FormBody,
    FormFooter,
    TabPane as RtTabPane,
    withStore
} from "./Base";
import {
    Form as AntForm,
    Typography as AntTypography,
    Radio as AntRadio,
    Divider as AntDivider,
    Checkbox as AntCheckbox,
    Input as AntInput,
    InputNumber as AntInputNumber,
    Switch as AntSwitch,
    Space as AntSpace,
    Row as AntRow,
    Col as AntCol,
    Tabs as AntTabs,
    List as AntList
} from "antd";
import RtForm from "./Form/Form";
import RtLayout from "./Layout/Layout";
import RtSwitcher from './Switcher/Switcher';
import RtTable from "./Table/ConfigLoader";
import RtSelect from "./Select/Select";
import RtTreeSelect from './TreeSelect/TreeSelect'
import RtModal from "./Modal/Modal";
import RtUploadFile from "./UploadFile/UploadFile";
import { getObjectExcludedProps } from "./utils/baseUtils";

/**
 * Renders
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

const renderFormItemComponent = (Component) => (props) => {
    const componentProps = getObjectExcludedProps(props, ['itemProps']);
    return renderDeclarative(AntForm.Item)
        ({...props.itemProps, noStyle: !(props.itemProps && props.itemProps.label)})
        (renderClassic(Component)(componentProps))
}


/** */
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

const classicComponents = {
    Form:       RtForm,
    FormHeader: FormHeader,
    FormBody:   FormBody,
    FormFooter: FormFooter,
    FormList:   AntForm.List,
    Space:      renderFormItemComponent(AntSpace),
    Row:        renderFormItemComponent(AntRow),
    Col:        renderFormItemComponent(AntCol),
    Layout:     renderFormItemComponent(RtLayout),
    Tabs:       AntTabs,
    TabPane:    RtTabPane,
    List:       renderFormItemComponent(AntList),
}
const withComponentType = {
    Button:     ComponentClassicWithOutStore(RtButton),
    Title:      ComponentClassicWithLabel(AntTypography.Title),
    Text:       ComponentClassicWithLabel(AntTypography.Text),
    Divider:    ComponentClassicWithLabel(AntDivider),
    Checkbox:   ComponentClassicWithLabel(AntCheckbox),
    DatePicker: ComponentClassicWithPlaceholder(RtDatePicker, 'Выберите дату'),
    DateText:   ComponentClassic(TypographyDate),
    Input:      ComponentClassicWithPlaceholder(AntInput, 'Введите значение'),
    Search:     ComponentClassicWithPlaceholder(AntInput.Search, 'Поиск'),
    TextArea:   ComponentClassicWithPlaceholder(AntInput.TextArea, 'Введите текст'),
    Password:   ComponentClassicWithPlaceholder(AntInput.Password, 'Введите пароль'),
    InputNumber:ComponentClassicWithPlaceholder(AntInputNumber, 'Введите значение'),
    Switch:     ComponentClassic(AntSwitch),
    RadioGroup: ComponentClassic(AntRadio.Group),
    Select:     ComponentClassicWithPlaceholder(RtSelect, 'Выберите значение'),
    TreeSelect: ComponentClassicWithPlaceholder(RtTreeSelect, 'Выберите значение'),
    Table:      ComponentClassicWithOutStore(RtTable),
    Modal:      ComponentClassicWithOutStore(RtModal),
    Custom:     ComponentClassic(Custom),
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
