import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import { dispatchToStore, getObjectExcludedProps, useMounted } from "../utils/baseUtils";

export const withStore = (Component, antFormItemProps) => {

    const mapStateToProps = (store, ownProps) => {
        const {subscribe, dispatch} = ownProps;
        let state = {};
        if(subscribe && subscribe.length > 0){
            subscribe.forEach(item => {
                const {name, path, extraData} = item;
                if(name && path)
                    state[name] = objectPath.get(store, path);
                if(name && extraData)
                    state[`${name}ExtraData`] = objectPath.get(store, extraData);
            })
        }
        if(dispatch && dispatch.extraData) {
            // console.log('subscribe to ', dispatch.extraData)
            state.dispatchExtraData = objectPath.get(store, dispatch.extraData);
        }

        return state;
    };
    const mapDispatchToProps = (dispatch) =>
        bindActionCreators({ setDateStore: setDateStore}, dispatch);

    const defaultProps = {
        trigger: 'onChange',
        valuePropName: 'value',
    };

    const withStoreProps = { ...defaultProps, ...antFormItemProps };

    return connect(mapStateToProps, mapDispatchToProps)( (props) => {

        const {componentType, setDateStore, dispatchExtraData} = props;

        // Объект подписки на стор
        const subscribe = props.subscribe ? props.subscribe : [];

        // Объект публикации в стор
        const dispatch = props.dispatch ? props.dispatch : {};

        const [subscribeProps, setSubscribeProps] = useState({});

        const {trigger, valuePropName} = withStoreProps;

        const excludeProps = ['componentType', 'setDateStore', 'subscribe', ...subscribe.map(item => item.name), 'dispatch', 'dispatchExtraData'];

        const isMounted = useMounted()

        /** Подписка на изменение props[subscribe.name] в сторе */
        subscribe.map(item => {
            return useEffect( () => {
                if(isMounted && item.name) {
                    // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                    item.onChange && item.onChange({
                        value: props[item.name],
                        extraData: props[`${item.name}ExtraData`],
                        setSubscribeProps: setSubscribePropsHandler});
                }
                // console.log("Change Props[2]: ", props.subscribeЗф);
            }, [props[item.name]]);
        })

        /** Подписка на изменение props и отправка данных в стор */
        useEffect(() => {
            let _value = props[valuePropName];
            // console.log(`storeHOC => `, _value);
            // if (_value === null || _value === undefined || (typeof _value === 'string' && _value.trim() === ''))
            //     _value = undefined;
            if (componentType !== 'Button' && componentType !== 'Search')
                dispatchToStore({ dispatch, setDateStore, value: _value });
        }, [props[valuePropName]]);

        /** Подписка на изменение subscribeProps.value и отправка данных в props[trigger] (как правило это onChange) */
        // useEffect(() => {
        //     if(isMounted) {
        //         console.log('onChange subscribeProps.value => ', subscribeProps.value);
        //         props[trigger] && props[trigger](subscribeProps.value);
        //     }
        // }, [subscribeProps.value]);

        const setSubscribePropsHandler = (_subscribeProps) => {
            // console.log('onChange setSubscribePropsHandler => ', value);
            setSubscribeProps((prevState) => ({ ...prevState, ..._subscribeProps }));
            if(_subscribeProps && objectPath.has(_subscribeProps, valuePropName)) {
                const value = _subscribeProps[valuePropName]
                // console.log('setSubscribePropsHandler => ', componentType, value);
                if(componentType === 'Search')
                    _searchDispatchToStore(value)

                props[trigger] && props[trigger](value);
            }
        }

        const onChange = (...args) => {
            // console.log('withStore [trigger] ',  props[trigger], args)
            if(componentType === 'Button')
                dispatchToStore({dispatch, setDateStore, value: args[0], extraData: dispatchExtraData});

            if(subscribeProps && objectPath.has(subscribeProps, valuePropName)) {
                const _subscribeProps = {...subscribeProps}
                objectPath.del(_subscribeProps, valuePropName);
                // console.log('onClear subscribeProps[valuePropName] => ', _subscribeProps);
                setSubscribeProps(_subscribeProps)
            }

            props[trigger] && props[trigger](...args);
        };

        const _onSearch = (searchLine, e) => {
            e.preventDefault();
            // console.log("_onSearch", searchLine);
            _searchDispatchToStore(searchLine)
        };
        const _searchDispatchToStore = (searchLine) =>
          dispatchToStore({dispatch, setDateStore, value: searchLine, extraData: dispatchExtraData});

        const childProps = getObjectExcludedProps(props, excludeProps);
        const onSearchProps = (componentType === 'Search') ? {onSearch: _onSearch} : {}
        // console.log(`storeHOC Component => `, componentType, Component);
        return (
            <Component
                {...childProps}
                {...subscribeProps}
                {...{[trigger]: onChange}}
                {...onSearchProps}
            >{props.children}</Component>
        )
    })
};
