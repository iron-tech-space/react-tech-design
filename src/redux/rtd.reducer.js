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
            objectPath.set(newState, path, row); // obj.a is now {}
            // console.log("SET_ROWS newState: ", newState);
            return newState;
        }
        default:
            return state;
    }
};

export default rtdReducer;
