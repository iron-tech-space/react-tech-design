import React from "react";
import moment from "moment";
import { Button as AntButton, DatePicker as AntDatePicker, Typography as AntTypography, Tabs as AntTabs,  } from "antd";
import { getISO, toFormat } from "../utils/datesUtils";
import {withStore} from "./withStore";
import { rtPrefix } from "../utils/variables";
import { renderClassic, renderClassicWithLabel } from "../declarative";

/** Компонент выбора даты */
const DatePicker = (props) => {
    // console.log("DatePickerHOC => ", props);
    if(props.value){
        if(typeof props.value === 'string'){
            // console.log("DatePickerHOC => onChange => string");
            props.onChange(moment(props.value), props.value);
        }
        // else {
        // 	console.log("DatePickerHOC => onChange => moment");
        // 	props.onChange(props.value, props.format ? toFormat(props.value,props.format) : getISO(props.value));
        // }
    }
    const value = props.value ? (typeof props.value === 'string' ? moment(props.value) : props.value) : undefined;
    const style = {width: '100%', ...(props && props.style)}; // locale={locale}
    // console.log("DatePickerHOC value => ", value);
    return <AntDatePicker {...props} style={style} value={value} />
};

/** Компонент вывода даты в текстовом виде */
const TypographyDate = (props) => {
    const {label, value, format } = props;
    const _value = value ? (format ? toFormat(value, format) : getISO(value)) : undefined;
    return <AntTypography.Text {...props}> {label || _value} </AntTypography.Text>;
}

/** Компонент кнопки со всеми пропрами AntButton */
const Button = (props) => {
    const Component = withStore(AntButton, { trigger: 'onClick' });
    // console.log('Props classic field renderClassic => ', props.field);
    // const onClick = (e) => childProps.onClick && childProps.onClick(e, field);
    const onClick = (e) => props.onClick && props.onClick(e, props.field);
    return renderClassicWithLabel(Component)({...props, onClick: onClick})
}

/** Custom компонент */
const Custom = (props) => {
    const {children} = props
    let childNode = null;
    let childProps = null;

    if (Array.isArray(children)) {
        console.warn('Custom component: `children` is array. Don\'t render component')
        return null;
    } else if(props.render) {
        // console.log('childNode = props.render')
        childNode = props.render;
        childProps = { ...props, componentType: 'Custom' };
        return renderClassic(childNode)(childProps)
    } else if(React.isValidElement(children)) {
        // console.log('childNode = children')
        childProps = { ...children.props, ...props, componentType: 'Custom' };
        return  React.cloneElement(children, childProps);
    } else {
        console.warn('Custom component: not exist valid render')
        return null;
    }
}

/** Компонент заголовка формы */
const FormHeader = (props) => {
    return <div className={`${rtPrefix}-form-header`}>{props.children}</div>
}

/** Компонент тела формы */
const FormBody = (props) => {
    let cls = [`${rtPrefix}-form-body`];
    props.noPadding && cls.push(`${rtPrefix}-form-body-no-padding`);
    props.scrollable && cls.push(`${rtPrefix}-form-body-scrollable`);
    return <div className={cls.join(" ")}>{props.children}</div>
}

/** Компонент подвала формы */
const FormFooter = (props) => {
    return <div className={`${rtPrefix}-form-footer`}>{props.children}</div>
}

const TabPane = (props) => {
    let cls = [];
    props.className && cls.push(props.className);
    props.scrollable && cls.push(`${rtPrefix}-tabs-tabpane-scrollable`);
    return <AntTabs.TabPane {...props} className={cls.join(" ")}>{props.children}</AntTabs.TabPane>
}


export {
    DatePicker,
    TypographyDate,
    Button,
    Custom,
    FormHeader,
    FormBody,
    FormFooter,
    TabPane,
    withStore
}
