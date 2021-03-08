import 'antd/es/typography/style';
import _Typography from 'antd/es/typography';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import { dispatchToStore, getObjectExcludedProps, useMounted } from "../utils/baseUtils";
import moment from "moment";

import { getISO, toFormat } from "../utils/datesUtils";

export var withStore = function withStore(Component, antFormItemProps) {

    var mapStateToProps = function mapStateToProps(store, ownProps) {
        var subscribe = ownProps.subscribe,
            dispatch = ownProps.dispatch;

        var state = {};
        if (subscribe && subscribe.length > 0) {
            subscribe.forEach(function (item) {
                var name = item.name,
                    path = item.path,
                    extraData = item.extraData;

                if (name && path) state[name] = objectPath.get(store, path);
                if (name && extraData) state[name + 'ExtraData'] = objectPath.get(store, extraData);
            });
        }
        if (dispatch && dispatch.extraData) {
            // console.log('subscribe to ', dispatch.extraData)
            state.dispatchExtraData = objectPath.get(store, dispatch.extraData);
        }

        return state;
    };
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return bindActionCreators({ setDateStore: setDateStore }, dispatch);
    };

    var defaultProps = {
        trigger: 'onChange',
        valuePropName: 'value'
    };

    var withStoreProps = _extends({}, defaultProps, antFormItemProps);

    return connect(mapStateToProps, mapDispatchToProps)(function (props) {
        var componentType = props.componentType,
            setDateStore = props.setDateStore,
            dispatchExtraData = props.dispatchExtraData;

        // Объект подписки на стор

        var subscribe = props.subscribe ? props.subscribe : [];

        // Объект публикации в стор
        var dispatch = props.dispatch ? props.dispatch : {};

        var _useState = useState({}),
            _useState2 = _slicedToArray(_useState, 2),
            subscribeProps = _useState2[0],
            setSubscribeProps = _useState2[1];

        var trigger = withStoreProps.trigger,
            valuePropName = withStoreProps.valuePropName;


        var excludeProps = ['componentType', 'setDateStore', 'subscribe'].concat(_toConsumableArray(subscribe.map(function (item) {
            return item.name;
        })), ['dispatch', 'dispatchExtraData']);

        var isMounted = useMounted();

        /** Подписка на изменение props[subscribe.name] в сторе */
        subscribe.map(function (item) {
            return useEffect(function () {
                if (isMounted && item.name) {
                    // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                    item.onChange && item.onChange({ value: props[item.name], extraData: props[item.name + 'ExtraData'], setSubscribeProps: setSubscribeProps });
                }
                // console.log("Change Props[2]: ", props.subscribeЗф);
            }, [props[item.name]]);
        });

        /** Подписка на изменение props и отправка данных в стор */
        useEffect(function () {
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, props.value);
            var _value = props[valuePropName];
            if (_value === null || _value === undefined || typeof _value === 'string' && _value.trim() === '') _value = undefined;

            // console.log(`storeHOC [${dispatch.name}] => `, _value);
            // console.log(`storeHOC => `, props);

            if (componentType !== 'Button' && componentType !== 'Search') dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: _value });
        }, [props]);

        /** Подписка на изменение subscribeProps.value и отправка данных в props[trigger] (как правило это onChange) */
        useEffect(function () {
            if (subscribeProps && subscribeProps.value) {
                // console.log('subscribeProps.value => ', subscribeProps.value);
                props[trigger] && props[trigger](subscribeProps.value);
            }
        }, [subscribeProps.value]);

        var onChange = function onChange() {
            // console.log('withStore [trigger] ', props.componentType)
            // const newValue = getValue(...args);
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            if (componentType === 'Button') dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: arguments.length <= 0 ? undefined : arguments[0], extraData: dispatchExtraData });
            // else if(componentType === 'Search')
            //     args[1].preventDefault();

            props[trigger] && props[trigger].apply(props, arguments);
        };

        var _onSearch = function _onSearch(searchLine, e) {
            e.preventDefault();
            // console.log("_onSearch", searchLine);
            dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: searchLine, extraData: dispatchExtraData });
        };

        var childProps = getObjectExcludedProps(props, excludeProps);
        var onSearchProps = componentType === 'Search' ? { onSearch: _onSearch } : {};
        // console.log(`storeHOC Component => `, componentType, Component);
        return React.createElement(
            Component,
            _extends({}, childProps, subscribeProps, _defineProperty({}, trigger, onChange), onSearchProps),
            props.children
        );
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
        var value = props.value ? typeof props.value === 'string' ? moment(props.value) : props.value : undefined;
        var style = _extends({ width: '100%' }, props && props.style); // locale={locale}
        // console.log("DatePickerHOC value => ", value);
        return React.createElement(Component, _extends({}, props, { style: style, value: value }));
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

    var _value = value ? format ? toFormat(value, format) : getISO(value) : undefined;
    return React.createElement(
        _Typography.Text,
        props,
        ' ',
        label || _value,
        ' '
    );
};