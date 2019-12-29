import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import {getObjectExcludedProps} from '../utils/baseUtils';
import moment from "moment";
import { Typography as AntTypography } from "antd";
import { getISO, toFormat } from "../..";

export const withStore = (Component, antFormItemProps) => {

    const mapStateToProps = (store, ownProps) => {
        const {subscribe} = ownProps;
        if(subscribe){
            const {name, path} = subscribe;
            if(name && path)
                return { [name]: objectPath.get(store, path) };
        }

        return {};
    };
    const mapDispatchToProps = (dispatch) =>
        bindActionCreators({ setDateStore: setDateStore}, dispatch);

    const defaultGetValueFromEvent = (valuePropName, event) => {
        if (event && event.target && valuePropName in event.target) {
            return event.target[valuePropName];
        }
        return event;
    };

    const defaultProps = {
        trigger: 'onChange',
        valuePropName: 'value',
    };

    const withStoreProps = { ...defaultProps, ...antFormItemProps };

    return connect(mapStateToProps, mapDispatchToProps)( (props) => {

        const {dispatchPath} = props;

        const subscribe = props.subscribe ? props.subscribe : {};

        const [subscribeProps, setSubscribeProps] = useState({});

        const {trigger, getValueFromEvent, valuePropName} = withStoreProps;

        const excludeProps = ['componentType', 'setDateStore', 'subscribe', subscribe.name, 'dispatchPath'];

        const getValue = (...args) => {
            let newValue;
            if (getValueFromEvent) {
                newValue = getValueFromEvent(...args);
                // console.log("storeHOC => getValueFromEvent: ", newValue);
            } else {
                newValue = defaultGetValueFromEvent(valuePropName, ...args);
                // console.log("storeHOC => defaultGetValueFromEvent: ", newValue);
            }
            return newValue;
        };

        /** Подписка на изменение props[subscribe.name] в сторе */
        useEffect( () => {
            if(subscribe.name) {
                // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                subscribe.onChange && subscribe.onChange({value: props[subscribe.name], setSubscribeProps});
            }
            // console.log("Change Props[2]: ", props.subscribeЗф);
        }, [props[subscribe.name]]);

        useEffect(() => {
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, props.value);
            if(dispatchPath) {
                const newValue = props[valuePropName];
                // console.log("storeHOC => dispatch: ", newValue);
                dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            }
        }, [props]);

        useEffect(() => {
            if(subscribeProps.value) {
                // console.log('subscribeProps.value => ', subscribeProps.value);
                props[trigger] && props[trigger](subscribeProps.value);
            }
        }, [subscribeProps.value]);

        const onChange = (...args) => {
            // const newValue = getValue(...args);
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            props[trigger] && props[trigger](...args);
        };

        const childProps = getObjectExcludedProps(props, excludeProps);
        return <Component {...childProps} {...subscribeProps} {...{[trigger]: onChange }}/>
    })
};


export const DatePickerHOC = (Component) => {
    return props => {
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
        const value = props.value ? (typeof props.value === 'string' ? moment(props.value) : props.value) : null;
        return <Component {...props} value={value} />
    };
};

export const TypographyTitle = (props) =>
    <AntTypography.Title {...props}> {props.label || props.value} </AntTypography.Title>;

export const TypographyText = (props) =>
    <AntTypography.Text {...props}> {props.label || props.value} </AntTypography.Text>;

export const TypographyDate = (props) => {
    const {label, value, format } = props;
    const _value = value ? (format ? toFormat(value, format) : getISO(value)) : null;
    return <AntTypography.Text {...props}> {label || _value} </AntTypography.Text>;
}
