import React, {useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import objectPath from "object-path";
import { setDateStore } from "../../redux/rtd.actions";
import { dispatchToStore, getObjectExcludedProps, useMounted } from "../utils/baseUtils";
import moment from "moment";
import { Typography as AntTypography } from "antd";
import { getISO, toFormat } from "../utils/datesUtils";

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
                    item.onChange && item.onChange({value: props[item.name], extraData: props[`${item.name}ExtraData`], setSubscribeProps});
                }
                // console.log("Change Props[2]: ", props.subscribeЗф);
            }, [props[item.name]]);
        })

        /** Подписка на изменение props и отправка данных в стор */
        useEffect(() => {
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, props.value);
            let _value = props[valuePropName];
            if (_value === null || _value === undefined || (typeof _value === 'string' && _value.trim() === ''))
                _value = undefined;

            // console.log(`storeHOC [${dispatch.name}] => `, _value);
            // console.log(`storeHOC => `, props);

            if (componentType !== 'Button' && componentType !== 'Search')
                dispatchToStore({ dispatch, setDateStore, value: _value });
        }, [props]);

        /** Подписка на изменение subscribeProps.value и отправка данных в props[trigger] (как правило это onChange) */
        useEffect(() => {
            if(subscribeProps && subscribeProps.value) {
                // console.log('subscribeProps.value => ', subscribeProps.value);
                props[trigger] && props[trigger](subscribeProps.value);
            }
        }, [subscribeProps.value]);

        const onChange = (...args) => {
            // console.log('withStore [trigger] ', props.componentType)
            // const newValue = getValue(...args);
            // dispatchPath && props.setDateStore && props.setDateStore(dispatchPath, newValue);
            if(componentType === 'Button')
                dispatchToStore({dispatch, setDateStore, value: args[0], extraData: dispatchExtraData});
            // else if(componentType === 'Search')
            //     args[1].preventDefault();

            props[trigger] && props[trigger](...args);
        };

        const _onSearch = (searchLine, e) => {
            e.preventDefault();
            // console.log("_onSearch", searchLine);
            dispatchToStore({dispatch, setDateStore, value: searchLine, extraData: dispatchExtraData});
        };

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
        const value = props.value ? (typeof props.value === 'string' ? moment(props.value) : props.value) : undefined;
        const style = {width: '100%', ...(props && props.style)}; // locale={locale}
        // console.log("DatePickerHOC value => ", value);
        return <Component {...props} style={style} value={value} />
    };
};

export const TypographyTitle = (props) =>
    <AntTypography.Title {...props}> {props.label || props.value} </AntTypography.Title>;

export const TypographyText = (props) =>
    <AntTypography.Text {...props}> {props.label || props.value} </AntTypography.Text>;

export const TypographyDate = (props) => {
    const {label, value, format } = props;
    const _value = value ? (format ? toFormat(value, format) : getISO(value)) : undefined;
    return <AntTypography.Text {...props}> {label || _value} </AntTypography.Text>;
}
