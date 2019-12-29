import 'antd/es/typography/style';
import _Typography from 'antd/es/typography';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import { getObjectExcludedProps } from '../utils/baseUtils';
import moment from "moment";

import { getISO, toFormat } from "../..";

export var withStore = function withStore(Component, antFormItemProps) {

    var mapStateToProps = function mapStateToProps(store, ownProps) {
        var subscribe = ownProps.subscribe;

        if (subscribe) {
            var name = subscribe.name,
                path = subscribe.path;

            if (name && path) return _defineProperty({}, name, objectPath.get(store, path));
        }

        return {};
    };
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return bindActionCreators({ setDateStore: setDateStore }, dispatch);
    };

    var defaultGetValueFromEvent = function defaultGetValueFromEvent(valuePropName, event) {
        if (event && event.target && valuePropName in event.target) {
            return event.target[valuePropName];
        }
        return event;
    };

    var defaultProps = {
        trigger: 'onChange',
        valuePropName: 'value'
    };

    var withStoreProps = _extends({}, defaultProps, antFormItemProps);

    return connect(mapStateToProps, mapDispatchToProps)(function (props) {
        var dispatchPath = props.dispatchPath;


        var subscribe = props.subscribe ? props.subscribe : {};

        var _useState = useState({}),
            _useState2 = _slicedToArray(_useState, 2),
            subscribeProps = _useState2[0],
            setSubscribeProps = _useState2[1];

        var trigger = withStoreProps.trigger,
            getValueFromEvent = withStoreProps.getValueFromEvent,
            valuePropName = withStoreProps.valuePropName;


        var excludeProps = ['componentType', 'setDateStore', 'subscribe', subscribe.name, 'dispatchPath'];

        var getValue = function getValue() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var newValue = void 0;
            if (getValueFromEvent) {
                newValue = getValueFromEvent.apply(undefined, args);
                // console.log("storeHOC => getValueFromEvent: ", newValue);
            } else {
                newValue = defaultGetValueFromEvent.apply(undefined, [valuePropName].concat(args));
                // console.log("storeHOC => defaultGetValueFromEvent: ", newValue);
            }
            return newValue;
        };

        /** Подписка на изменение props[subscribe.name] в сторе */
        useEffect(function () {
            if (subscribe.name) {
                // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                subscribe.onChange && subscribe.onChange({ value: props[subscribe.name], setSubscribeProps: setSubscribeProps });
            }
            // console.log("Change Props[2]: ", props.subscribeЗф);
        }, [props[subscribe.name]]);

        useEffect(function () {
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, props.value);
            if (dispatchPath) {
                var newValue = props[valuePropName];
                // console.log("storeHOC => dispatch: ", newValue);
                dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            }
        }, [props]);

        useEffect(function () {
            if (subscribeProps.value) {
                // console.log('subscribeProps.value => ', subscribeProps.value);
                props[trigger] && props[trigger](subscribeProps.value);
            }
        }, [subscribeProps.value]);

        var onChange = function onChange() {
            // const newValue = getValue(...args);
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            props[trigger] && props[trigger].apply(props, arguments);
        };

        var childProps = getObjectExcludedProps(props, excludeProps);
        return React.createElement(Component, _extends({}, childProps, subscribeProps, _defineProperty({}, trigger, onChange)));
    });
};

export var DatePickerHOC = function DatePickerHOC(Component) {
    return function (props) {
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
        var value = props.value ? typeof props.value === 'string' ? moment(props.value) : props.value : null;
        return React.createElement(Component, _extends({}, props, { value: value }));
    };
};

export var TypographyTitle = function TypographyTitle(props) {
    return React.createElement(
        _Typography.Title,
        props,
        ' ',
        props.label || props.value,
        ' '
    );
};

export var TypographyText = function TypographyText(props) {
    return React.createElement(
        _Typography.Text,
        props,
        ' ',
        props.label || props.value,
        ' '
    );
};

export var TypographyDate = function TypographyDate(props) {
    var label = props.label,
        value = props.value,
        format = props.format;

    var _value = value ? format ? toFormat(value, format) : getISO(value) : null;
    return React.createElement(
        _Typography.Text,
        props,
        ' ',
        label || _value,
        ' '
    );
};