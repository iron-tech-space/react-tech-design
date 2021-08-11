import { actionTypes } from './rtd.action.types';

export var setDataStore = function setDataStore(path, row) {
    return {
        type: actionTypes.SET_DATA_STORE,
        payload: { path: path, row: row }
    };
};