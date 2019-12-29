import { actionTypes } from './rtd.action.types';

export var initStore = function initStore(path) {
    return {
        type: actionTypes.INIT_STORE,
        payload: { path: path }
    };
};

export var setDateStore = function setDateStore(path, row) {
    return {
        type: actionTypes.SET_DATA_STORE,
        payload: { path: path, row: row }
    };
};