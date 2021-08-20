import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import objectPath from "object-path";
import { dispatchToStore, getObjectExcludedProps, useMounted } from "../utils/baseUtils";
import { getExtraData, mapDispatchToProps, mapStateToProps } from "../utils/storeUtils";

const defaultProps = {
    trigger: 'onChange',
    valuePropName: 'value',
};

export const withStore = (Component) => {

    return connect(mapStateToProps, mapDispatchToProps)( (props) => {

        const {componentType, setDataStore, dispatchExtraData} = props;

        // Объект подписки на стор
        const subscribe = props.subscribe ? props.subscribe : [];

        // Объект публикации в стор
        const dispatch = props.dispatch ? props.dispatch : {};

        const [subscribeProps, setSubscribeProps] = useState({});

        const {trigger, valuePropName} = { ...defaultProps, ...props.itemProps };

        const excludeProps = ['itemProps', 'componentType', 'setDataStore', 'subscribe', ...subscribe.map(item => item.name), 'dispatch', 'dispatchExtraData']; // ...subscribe.map(item => item.name),

        const isMounted = useMounted()

        /** Подписка на изменение props[subscribe.name] в сторе */
        subscribe.map(item => {
            return useEffect( () => {
                // console.log("withStore subscribe: ", item.name, item.withMount);
                if((item.withMount || isMounted) && item.name) {
                    // console.log("storeHOC => subscribe: ", props[subscribe.name]);
                    item.onChange && item.onChange({
                        value: props[item.name],
                        extraData: getExtraData(item, props), //extraData,
                        setSubscribeProps: setSubscribePropsHandler});
                }
                // console.log("Change Props[2]: ", props.subscribeЗф);
            }, [props[item.name]]);
        })

        /** Подписка на изменение props и отправка данных в стор */
        useEffect(() => {
            let _value = props[valuePropName];
            // console.log(`storeHOC => `, dispatch.path, _value, valuePropName);
            // if (_value === null || _value === undefined || (typeof _value === 'string' && _value.trim() === ''))
            //     _value = undefined;
            if (componentType !== 'Button' && componentType !== 'Search')
                dispatchToStore({ dispatch, setDataStore, value: _value });
        }, [props[valuePropName]]);

        /** Подписка на изменение subscribeProps.value и отправка данных в props[trigger] (как правило это onChange) */
        // useEffect(() => {
        //     if(isMounted) {
        //         console.log('onChange subscribeProps.value => ', subscribeProps.value);
        //         props[trigger] && props[trigger](subscribeProps.value);
        //     }
        // }, [subscribeProps.value]);

        const setSubscribePropsHandler = (_subscribeProps) => {
            // console.log('onChange setSubscribePropsHandler => ', dispatch.path, _subscribeProps);
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
            // console.log('withStore [trigger] ', dispatch.path, props[trigger], args)
            if(componentType === 'Button')
                dispatchToStore({dispatch, setDataStore, value: args[0], extraData: dispatchExtraData});

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
          dispatchToStore({dispatch, setDataStore, value: searchLine, extraData: dispatchExtraData});

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
