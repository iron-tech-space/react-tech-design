import { bindActionCreators } from 'redux';
import objectPath from "object-path";
import { setDataStore } from "../../redux/rtd.actions";
import { StoreProps } from "../core/wrappers";

export const getExtraData = (item: {name: string; extraData?: string;}, props: any) => {
    let extraData: any = {};
    if (item.extraData) {
        if (typeof item.extraData === 'object')
            Object.keys(item.extraData).forEach((key) => extraData[key] = props[`${item.name}.extraData.${key}`]);
        else
            extraData = props[`${item.name}ExtraData`];
    }
    return extraData;
}

export const mapStateToProps = (store: any, ownProps: StoreProps) => {
    const {subscribe, dispatch} = ownProps;
    let state: any = {};
    if(subscribe && subscribe.length > 0){
        subscribe.forEach(item => {
            const {name, path, extraData} = item;
            if(name && path)
                state[name] = objectPath.get(store, path);
            if(name && extraData)
                if(typeof extraData === 'object')
                    Object.keys(extraData).forEach( (key) => state[`${name}.extraData.${key}`] = objectPath.get(store, extraData[key]) );
                else
                    state[`${name}ExtraData`] = objectPath.get(store, extraData);
        })
    }
    if(dispatch && dispatch.extraData) {
        // console.log('subscribe to ', dispatch.extraData)
        state.dispatchExtraData = objectPath.get(store, dispatch.extraData);
    }
    // console.log('mapStateToProps', state)
    return state;
};
export const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ setDataStore: setDataStore}, dispatch);