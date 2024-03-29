import objectPath from 'object-path';
import {actionTypes} from './rtd.action.types';

const rtdReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.INIT_STORE: {
            const {path} = action.payload;
            // console.log("INIT_TABLE_STORE: ", path);
            let newState = {...state};
            objectPath.set(newState, path, {});
            return newState;
        }
        case actionTypes.SET_DATA_STORE: {
            const {path, row} = action.payload;

            let newState = {...state};
            if(row === undefined)
                objectPath.del(newState, path); // newState[path] is now undefined
            else
                objectPath.set(newState, path, row); // newState[path] is now row

            console.debug("Store change: ", path, row);
            // console.group("Store");
            // console.log("Store: ", newState);
            // console.log("New Data: ", path, row);
            // console.groupEnd();

            return newState;
        }
        default:
            return state;
    }
};

export default rtdReducer;
