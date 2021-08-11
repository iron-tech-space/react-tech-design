var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import objectPath from "object-path";
import { setDataStore } from "../../redux/rtd.actions";
import { dispatchToStore, getObjectExcludedProps, useMounted } from "../utils/baseUtils";
import { getExtraData, mapDispatchToProps, mapStateToProps } from "../utils/storeUtils";

export var withStore = function withStore(Component, antFormItemProps) {

    // const mapStateToProps = (store, ownProps) => {
    //     const {subscribe, dispatch} = ownProps;
    //     let state = {};
    //     if(subscribe && subscribe.length > 0){
    //         subscribe.forEach(item => {
    //             const {name, path, extraData} = item;
    //             if(name && path)
    //                 state[name] = objectPath.get(store, path);
    //             if(name && extraData)
    //                 if(typeof extraData === 'object')
    //                     Object.keys(extraData).forEach( (key) => state[`${name}.extraData.${key}`] = objectPath.get(store, extraData[key]) );
    //                 else
    //                     state[`${name}ExtraData`] = objectPath.get(store, extraData);
    //         })
    //     }
    //     if(dispatch && dispatch.extraData) {
    //         // console.log('subscribe to ', dispatch.extraData)
    //         state.dispatchExtraData = objectPath.get(store, dispatch.extraData);
    //     }
    //
    //     return state;
    // };
    // const mapDispatchToProps = (dispatch) =>
    //     bindActionCreators({ setDateStore: setDataStore}, dispatch);

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
        })), ['dispatch', 'dispatchExtraData']); // ...subscribe.map(item => item.name),

        var isMounted = useMounted();

        /** Подписка на изменение props[subscribe.name] в сторе */
        subscribe.map(function (item) {
            return useEffect(function () {
                // console.log("withStore subscribe: ", item.name, item.withMount);
                if ((item.withMount || isMounted) && item.name) {
                    // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                    // let extraData = {};
                    // if (item.extraData) {
                    //     if (typeof item.extraData === 'object')
                    //         Object.keys(item.extraData).forEach((key) => extraData[key] = props[`${item.name}.extraData.${key}`]);
                    //     else
                    //         extraData = props[`${item.name}ExtraData`];
                    // }
                    item.onChange && item.onChange({
                        value: props[item.name],
                        extraData: getExtraData(item, props), //extraData,
                        setSubscribeProps: setSubscribePropsHandler });
                }
                // console.log("Change Props[2]: ", props.subscribeЗф);
            }, [props[item.name]]);
        });

        /** Подписка на изменение props и отправка данных в стор */
        useEffect(function () {
            var _value = props[valuePropName];
            // console.log(`storeHOC => `, _value);
            // if (_value === null || _value === undefined || (typeof _value === 'string' && _value.trim() === ''))
            //     _value = undefined;
            if (componentType !== 'Button' && componentType !== 'Search') dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: _value });
        }, [props[valuePropName]]);

        /** Подписка на изменение subscribeProps.value и отправка данных в props[trigger] (как правило это onChange) */
        // useEffect(() => {
        //     if(isMounted) {
        //         console.log('onChange subscribeProps.value => ', subscribeProps.value);
        //         props[trigger] && props[trigger](subscribeProps.value);
        //     }
        // }, [subscribeProps.value]);

        var setSubscribePropsHandler = function setSubscribePropsHandler(_subscribeProps) {
            // console.log('onChange setSubscribePropsHandler => ', value);
            setSubscribeProps(function (prevState) {
                return _extends({}, prevState, _subscribeProps);
            });
            if (_subscribeProps && objectPath.has(_subscribeProps, valuePropName)) {
                var value = _subscribeProps[valuePropName];
                // console.log('setSubscribePropsHandler => ', componentType, value);
                if (componentType === 'Search') _searchDispatchToStore(value);

                props[trigger] && props[trigger](value);
            }
        };

        var onChange = function onChange() {
            // console.log('withStore [trigger] ',  props[trigger], args)
            if (componentType === 'Button') dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: arguments.length <= 0 ? undefined : arguments[0], extraData: dispatchExtraData });

            if (subscribeProps && objectPath.has(subscribeProps, valuePropName)) {
                var _subscribeProps = _extends({}, subscribeProps);
                objectPath.del(_subscribeProps, valuePropName);
                // console.log('onClear subscribeProps[valuePropName] => ', _subscribeProps);
                setSubscribeProps(_subscribeProps);
            }

            props[trigger] && props[trigger].apply(props, arguments);
        };

        var _onSearch = function _onSearch(searchLine, e) {
            e.preventDefault();
            // console.log("_onSearch", searchLine);
            _searchDispatchToStore(searchLine);
        };
        var _searchDispatchToStore = function _searchDispatchToStore(searchLine) {
            return dispatchToStore({ dispatch: dispatch, setDateStore: setDateStore, value: searchLine, extraData: dispatchExtraData });
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